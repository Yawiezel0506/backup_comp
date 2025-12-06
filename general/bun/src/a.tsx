import {Coordinate} from 'ol/coordinate'

import {useEffect, useRef, useState} from 'react'

interface Props {
    point: Coordinate
}

const METER_SUFIX = ' m\' '
const WEB_SOCKET_CLOSE_MASSAGE = 'socket was close!'

const usePointGroundLevel = ({point}: Coordinate) => {
    const WS_URL = import.meta.env.WS_URL

    const [pointGroundLevel, setPointGroundLevel] = useState<string>('---')

    const webSocket = useRef<WebSocket | null>(null)

    useEffect(()=> {
        webSocket.current = new WebSocket(WS_URL)
        webSocket.current.onmessage = (event) => {
            const elevation = JSON.parse(event.data)

            if (elevation.height !== undefined && elevation.height !== null) {
                setPointGroundLevel(`\u200e${elevation.height} ${METER_SUFIX}`)
            } else {
                setPointGroundLevel('---')
            }
        }
        webSocket.current.onclose = () => {
            console.log(WEB_SOCKET_CLOSE_MASSAGE)
        }
        return ()=> webSocket.current.close()
    })
    useEffect(()=> {
        const coordinate = {lon: point[0], lat: point[1]}

        if (webSocket.current.readyState === WebSocket.OPEN) {
            webSocket.current.send(JSON.stringify(coordinate))
        }
    },[point[0].toFixed(4),point[1].toFixed(4)])
    return {
        pointGroundLevel
    }
}
