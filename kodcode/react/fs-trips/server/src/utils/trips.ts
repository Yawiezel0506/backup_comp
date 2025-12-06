import { Trip } from "../models/trip";
import { v4 as uuidv4 } from 'uuid';


const trips: Trip[] =  [
  {
    id: '1',
    name: 'Beach Paradise',
    destination: 'Hawaii, USA',
    startDate: '2023-10-01',
    endDate: '2023-10-10',
    description: 'Enjoy the sun and surf on the beautiful beaches of Hawaii.',
    price: 1200,
    image: 'https://content.api.news/v3/images/bin/ded3be00f6965dcfa60d91c42563592d',
    activities: ['Surfing', 'Snorkeling', 'Hiking'],
  },
  {
    id: '2',
    name: 'Mountain Retreat',
    destination: 'Swiss Alps',
    startDate: '2023-11-05',
    endDate: '2023-11-15',
    description: 'Escape to the Swiss Alps for a serene mountain getaway.',
    price: 1500,
    image: 'https://media.cntraveller.com/photos/611bf1ae042ccafe9a9ae6c1/16:9/w_1920,c_limit/swissalps_cnt_24nov09_iStock_b.jpg',
    activities: ['Skiing', 'Snowboarding', 'Hiking'],
  },
  {
    id: '3',
    name: 'City Exploration',
    destination: 'Paris, France',
    startDate: '2023-09-15',
    endDate: '2023-09-23',
    description: 'Discover the romantic charm of Paris, the City of Light.',
    price: 1100,
    image: 'https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/newsletter/eiffel-tower-in-paris-151-medium.jpg?1564742900',
    activities: ['Eiffel Tower Visit', 'Louvre Museum', 'Seine River Cruise'],
  },
  {
    id: '4',
    name: 'Desert Adventure',
    destination: 'Sahara Desert, Morocco',
    startDate: '2023-12-03',
    endDate: '2023-12-12',
    description: 'Embark on a thrilling desert expedition in Morocco.',
    price: 1400,
    image: 'https://i0.wp.com/www.hachettebookgroup.com/wp-content/uploads/2019/01/Morocco_ErgChabbi_LucasPeters.jpg?resize=1080%2C1080&ssl=1',
    activities: ['Camel Trek', 'Sand Dune Safari', 'Berber Camp'],
  },
  {
    id: '5',
    name: 'Tropical Paradise',
    destination: 'Maldives',
    startDate: '2023-08-20',
    endDate: '2023-08-30',
    description: 'Relax in luxury overwater bungalows in the Maldives.',
    price: 1800,
    image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2021/05/05125431/5r4t-21.jpg?tr=w-1366,pr-true',
    activities: ['Snorkeling', 'Scuba Diving', 'Island Hopping'],
  },
  {
    id: '6',
    name: 'Historical Journey',
    destination: 'Rome, Italy',
    startDate: '2023-09-28',
    endDate: '2023-10-05',
    description: 'Explore the ancient ruins and history of Rome.',
    price: 1300,
    image: 'https://a.cdn-hotels.com/gdcs/production40/d811/5e89ad90-8f10-11e8-b6b0-0242ac110007.jpg?impolicy=fcrop&w=1600&h=1066&q=medium',
    activities: ['Colosseum Tour', 'Vatican City', 'Roman Forum'],
  },
  {
    id: '7',
    name: 'Wildlife Safari',
    destination: 'Serengeti National Park, Tanzania',
    startDate: '2024-02-10',
    endDate: '2024-02-20',
    description: 'Witness the majestic wildlife of the Serengeti.',
    price: 1600,
    image: 'https://media.discoverafrica.com/wp-content/uploads/2021/11/grumeti_2014-54.11-13.jpg?strip=all&lossy=1&resize=768%2C512&ssl=1',
    activities: ['Game Drives', 'Hot Air Balloon Safari', 'Maasai Village Visit'],
  },
  {
    id: '8',
    name: 'Island Paradise',
    destination: 'Bora Bora, French Polynesia',
    startDate: '2023-11-25',
    endDate: '2023-12-05',
    description: 'Experience overwater luxury in Bora Bora.',
    price: 2200,
    image: 'https://www.travelandleisure.com/thmb/wr0dCgqK_xbU8k9V2xk3NeoHZh4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bora-bora-beach_BORAHONEY1022-afb3f11b791441d198105c3d1b1c783b.jpg',
    activities: ['Snorkeling', 'Jet Skiing', 'Sunset Cruise'],
  },
  {
    id: '9',
    name: 'Cultural Immersion',
    destination: 'Kyoto, Japan',
    startDate: '2024-04-15',
    endDate: '2024-04-25',
    description: 'Immerse yourself in the rich culture of Kyoto.',
    price: 1550,
    image: 'https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/6/2021/02/Kyoto-Japan-old-town-streets-in-the-Higashiyama-district@3x-1024x683.jpg',
    activities: ['Temples and Shrines', 'Tea Ceremony', 'Geisha Experience'],
  },
  {
    id: '10',
    name: 'Northern Lights Adventure',
    destination: 'Reykjavik, Iceland',
    startDate: '2023-12-20',
    endDate: '2023-12-30',
    description: 'Chase the mesmerizing Northern Lights in Iceland.',
    price: 1900,
    image: 'https://images.ctfassets.net/a68ipajj4t9l/49TE81PXbCD6MrHUG6CLhO/e667d99b666048e7e0e2767fbe77a1dc/NL_4.jpg',
    activities: ['Aurora Borealis Tour', 'Blue Lagoon', 'Glacier Hike'],
  },
];


export function getAllTrips(): Partial<Trip>[] {
  return trips.map(trip => ({id: trip.id, name: trip.name,destination: trip.destination,startDate: trip.startDate,endDate:trip.endDate,image:trip.image}));
}

// Get a trip by ID
export function getTripById(id: string): Trip | undefined {
  return trips.find((trip) => trip.id === id);
}

// Create a new trip
export function createTrip(newTrip: Trip): Trip {
  newTrip.id = uuidv4();
  trips.push(newTrip);
  return newTrip;
}

// Update a trip
export function updateTrip(updatedTrip: Trip): Trip | undefined {
  const index = trips.findIndex((trip) => trip.id === updatedTrip.id);
  if (index === -1) {
    return undefined; // Trip not found
  }
  trips[index] = updatedTrip;
  return updatedTrip;
}

// Delete a trip
export function deleteTrip(id: string): Trip | undefined {
  const index = trips.findIndex((trip) => trip.id === id);
  if (index === -1) {
    return undefined; // Trip not found
  }
  return trips.splice(index, 1)[0];
}
