import http from 'k6/http';
import { check, sleep } from 'k6';

const KM_TO_DEG = 0.0090
const MIN_RANGE_KM = 10
const MAX_RANGE_KM = 100

const getRandomFloat = (min, max) => Math.random() * (max - min) + min

const generateRandomPolygon = () => {
    const lengthKm = getRandomFloat(MIN_RANGE_KM, MAX_RANGE_KM)
    const lengthDeg = lengthKm * KM_TO_DEG

    const widthKm = getRandomFloat(MIN_RANGE_KM, MAX_RANGE_KM)
    const widthDeg = widthKm * KM_TO_DEG

    const [lon, lat] = [35.2274, 31.7912]

    const newPolygon = [
        [lat, lon],
        [lat, +(lon + widthDeg).toFixed(4)],
        [+(lat + widthDeg).toFixed(4), +(lon + widthDeg).toFixed(4)],
        [+(lat + widthDeg).toFixed(4), lon],
        [lat, lon],
    ]

    return newPolygon
}


39
shay120

const getPolygonCenter = (polygon) => {
    const minX = Math.min(...polygon.map(([_, lon]) => lon))
    const maxX = Math.max(...polygon.map(([_, lon]) => lon))
    const minY = Math.min(...polygon.map(([lat]) => lat))
    const maxY = Math.max(...polygon.map(([lat]) => lat))

    const lon = (minX + maxX) / 2
    const lat = (minY + maxY) / 2
    return [lat, lon]
}


export const options = {
    stages: [
        { duration: '30s', target: 50},
        { duration: '1m', target: 100 },
        { duration: '30s', target: 50 },
    ]
}

export default function() {
    try {
        const randomPolygon = generateRandomPolygon()
        const center = getPolygonCenter(randomPolygon)

        const losRes = http.post(
            'url/los-polygon',
            JSON.stringify({coordinates: randomPolygon, center: center}),
            {headers: {'Content-Type': 'application/json'}} 
        )

        const weRes = http.post(
            'url/window-elevations',
            JSON.stringify({coordinates: randomPolygon}),
            {headers: {'Content-Type': 'application/json'}}
        )

        check(losRes, { 'Status is 200': r => r.status === 200 });
        check(weRes, { 'Status is 200': r => r.status === 200})
    } catch (error) {
        console.log(error);
    } finally {
        sleep(1); // sleep for 1 second before making the next request
    }
}