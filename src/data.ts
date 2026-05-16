import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Coffee Machine',
    brand: 'SMEG',
    category: 'Kitchen',
    price: 985.99,
    oldPrice: 1056.00,
    rating: 5.0,
    reviews: 124,
    image: 'coffee-machine.jpeg',
    badge: 'Sale 15%',
    description: 'A stylish and compact coffee machine that brings the Italian cafe experience to your home. Featuring the iconic retro design of the 50s.',
    features: [
      '15 bar pressure for the perfect espresso',
      'Stainless steel filter holder',
      'Adjustable cappuccino system',
      'Removable water tank (1L)'
    ],
    colors: ['#FFFFFF', '#000000', '#FF0000', '#ADD8E6']
  },
  {
    id: '2',
    name: 'iPhone 16 Pro 128GB',
    brand: 'APPLE',
    category: 'Smartphones',
    price: 1130.00,
    rating: 4.8,
    reviews: 3502,
    image: 'iphone.jpeg',
    description: 'The latest iPhone with a desert titanium finish, featuring the advanced A18 Pro chip and a stunning pro camera system.',
    features: [
      '6.3-inch Super Retina XDR display',
      'Advanced Pro camera system',
      '4K 120 fps Dolby Vision',
      'A18 Pro chip with 6-core GPU'
    ],
    colors: ['#4B4B4B', '#F5F5F0', '#C5C5C5', '#3D3D3D']
  },
  {
    id: '3',
    name: 'Microwave oven',
    brand: 'SMEG',
    category: 'Kitchen',
    price: 129.00,
    rating: 4.9,
    reviews: 89,
    image: 'microwave.jpeg',
    description: 'A powerful and efficient microwave oven with a sleek minimalist design, perfect for modern kitchens.',
    features: [
      '800W microwave power',
      '5 power levels',
      'Defrost by time or weight',
      'Electronic timer'
    ],
    colors: ['#000000', '#808080', '#FFFFFF']
  },
  {
    id: '4',
    name: 'QuietComfort Ultra',
    brand: 'BOSE',
    category: 'Game Console',
    price: 449.00,
    rating: 4.2,
    reviews: 12384,
    image: 'earbuds-main.jpeg',
    images: ['earbuds-main.jpeg', 'earbuds-2.jpeg'],
    badge: 'Trending',
    description: 'With Bose Immersive Audio — breakthrough spatialised audio makes your music feel more real — no matter the content or streaming source.',
    features: [
      'World-class noise cancelling',
      'Breakthrough spatialised audio',
      'Up to 6-hours or 24 hours total with case',
      'CustomTune technology for personalised sound'
    ],
    colors: ['#2E4A7D', '#FFFFFF', '#D4FF00', '#3D3D3D', '#F5F5DC']
  },
  {
    id: '5',
    name: 'Electric Kettle',
    brand: 'SMEG',
    category: 'Kitchen',
    price: 159.00,
    oldPrice: 180.00,
    rating: 4.7,
    reviews: 215,
    image: 'kettle.jpeg',
    badge: 'Sale 10%',
    description: 'Experience pure elegance and efficiency with the 50s-style retro electric kettle.',
    features: [
      '1.7 litre capacity',
      'Stainless steel body',
      'Auto shut-off at 100°C',
      'Soft-opening lid'
    ],
    colors: ['#000000', '#FF0000', '#F5F5DC']
  },
  {
    id: '6',
    name: 'Professional Hair Dryer',
    brand: 'REMEZ',
    category: 'Kitchen',
    price: 249.00,
    oldPrice: 299.00,
    rating: 4.6,
    reviews: 56,
    image: 'steamer.jpeg',
    badge: 'Sale 15%',
    description: 'Professional-grade hair dryer with ion technology for smooth, shiny results every time.',
    features: [
      'Powerful 2200W motor',
      'Negative ion technology',
      '3 heat and 2 speed settings',
      'Cool shot button'
    ],
    colors: ['#3D3C3A', '#808080']
  },
  {
    id: '7',
    name: 'Wireless Headphones',
    brand: 'BOSE',
    category: 'Game Console',
    price: 399.00,
    rating: 4.9,
    reviews: 842,
    image: 'headphones.jpeg',
    description: 'High-fidelity audio meets industry-leading noise cancellation for an unparalleled listening experience.',
    features: [
      'Customizable EQ',
      'Multi-point connection',
      'Up to 30 hours battery life',
      'Fast charging'
    ],
    colors: ['#000000', '#FFFFFF', '#808080']
  },
  {
    id: '8',
    name: 'Vintage Master TV',
    brand: 'RETRO-TECH',
    category: 'TV & Video',
    price: 1250.00,
    rating: 5.0,
    reviews: 42,
    image: 'tv.png',
    description: 'A masterpiece of design combining 70s aesthetics with modern 4K technology. Encased in genuine walnut wood.',
    features: [
      'Genuine walnut wooden frame',
      '4K Ultra HD resolution',
      'Mechanical channel selectors',
      'High-fidelity built-in speakers'
    ],
    colors: ['#8B4513', '#A52A2A']
  },
  {
    id: '9',
    name: 'Precision Remote',
    brand: 'BSTECH',
    category: 'TV & Video',
    price: 89.00,
    rating: 4.7,
    reviews: 1205,
    image: 'remote.png',
    description: 'The ultimate minimalist control experience. Universal compatibility with ultra-low latency.',
    features: [
      'Touch-sensitive trackpad',
      'Bluetooth 5.0 connectivity',
      'Rechargeable via USB-C',
      'Ergonomic curved design'
    ],
    colors: ['#000000']
  },
  {
    id: '10',
    name: 'Smart Air Conditioner',
    brand: 'BSTECH',
    category: 'Home Comfort',
    price: 849.00,
    rating: 4.8,
    reviews: 642,
    image: 'ac.png',
    images: ['ac.png', 'ac2.jpeg', 'ac3.jpeg'],
    badge: 'Trending',
    description: 'Ultra-quiet, energy-efficient smart air conditioner with AI-powered temperature regulation.',
    features: [
      'Dual inverter compressor',
      'Wi-Fi enabled with app control',
      'Ultra-silent operation (19dB)',
      'Multiple air purification filters'
    ],
    colors: ['#FFFFFF', '#F5F5F0']
  }
];
