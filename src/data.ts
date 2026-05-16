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
    colors: ['#FFFFFF', '#000000', '#FF0000', '#ADD8E6'],
    specifications: [
      { label: 'Power', value: '1350 W' },
      { label: 'Voltage', value: '220-240 V' },
      { label: 'Frequency', value: '50/60 Hz' },
      { label: 'Dimensions', value: '149 x 330 x 303 mm' }
    ],
    userReviews: [
      { id: 'r1', user: 'Marco Rossi', rating: 5, comment: 'Exceptional build quality and the espresso is perfect.', date: '2024-03-12', avatar: 'https://i.pravatar.cc/150?u=marco' },
      { id: 'r2', user: 'Sarah Jenkins', rating: 5, comment: 'Beautiful addition to my kitchen. Worth every penny.', date: '2024-03-10', avatar: 'https://i.pravatar.cc/150?u=sarah' }
    ]
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
    colors: ['#4B4B4B', '#F5F5F0', '#C5C5C5', '#3D3D3D'],
    specifications: [
      { label: 'Display', value: '6.3" LTPO Super Retina XDR' },
      { label: 'Processor', value: 'A18 Pro chip' },
      { label: 'Camera', value: '48MP Main | 12MP Ultra Wide' },
      { label: 'Battery', value: 'Up to 27 hours video playback' }
    ],
    userReviews: [
      { id: 'r3', user: 'TechGuru', rating: 5, comment: 'The camera upgrades are insane. Best phone of the year.', date: '2024-03-15', avatar: 'https://i.pravatar.cc/150?u=tech' },
      { id: 'r4', user: 'Liam O.', rating: 4, comment: 'Great performance, though battery life could be better.', date: '2024-03-14', avatar: 'https://i.pravatar.cc/150?u=liam' }
    ]
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
    colors: ['#000000', '#808080', '#FFFFFF'],
    specifications: [
      { label: 'Type', value: 'Compact Microwave' },
      { label: 'Capacity', value: '25 Litres' },
      { label: 'Control', value: 'Electronic' },
      { label: 'Material', value: 'Sheet metal' }
    ],
    userReviews: [
      { id: 'r5', user: 'Emily White', rating: 5, comment: 'Looks amazing and heats food very evenly.', date: '2024-02-28', avatar: 'https://i.pravatar.cc/150?u=emily' }
    ]
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
    colors: ['#2E4A7D', '#FFFFFF', '#D4FF00', '#3D3D3D', '#F5F5DC'],
    specifications: [
      { label: 'Wireless Range', value: 'Up to 30 ft (9 m)' },
      { label: 'Bluetooth Version', value: '5.3' },
      { label: 'Battery Life', value: 'Up to 6 hours' },
      { label: 'Charging Case', value: 'USB-C / Wireless' }
    ],
    userReviews: [
      { id: 'r6', user: 'AudiophileX', rating: 4, comment: 'ANC is second to none. Soundstage is impressive.', date: '2024-03-01', avatar: 'https://i.pravatar.cc/150?u=audio' }
    ]
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
    colors: ['#000000', '#FF0000', '#F5F5DC'],
    specifications: [
      { label: 'Dimensions', value: '248 x 226 x 171 mm' },
      { label: 'Body material', value: 'Stainless steel' },
      { label: 'Internal volume', value: '1.7 Litres' }
    ],
    userReviews: [
      { id: 'r7', user: 'Jane Smith', rating: 5, comment: 'Heats up fast and looks beautiful on my counter.', date: '2024-01-20', avatar: 'https://i.pravatar.cc/150?u=jane' }
    ]
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
    colors: ['#3D3C3A', '#808080'],
    specifications: [
      { label: 'Motor speed', value: '110,000 RPM' },
      { label: 'Cord Length', value: '3 Metres' },
      { label: 'Weight', value: '450g' }
    ],
    userReviews: [
      { id: 'r8', user: 'Stylist88', rating: 4, comment: 'Very light and dries hair in half the time.', date: '2024-01-15', avatar: 'https://i.pravatar.cc/150?u=stylist' }
    ]
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
    colors: ['#000000', '#FFFFFF', '#808080'],
    specifications: [
      { label: 'Driver Type', value: 'Dynamic' },
      { label: 'Noise Cancelling', value: 'Active' },
      { label: 'Battery Life', value: '30 Hours' }
    ],
    userReviews: [
      { id: 'r9', user: 'MusicLover', rating: 5, comment: 'Best noise cancelling on the market.', date: '2024-02-10', avatar: 'https://i.pravatar.cc/150?u=music' }
    ]
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
    colors: ['#8B4513', '#A52A2A'],
    specifications: [
      { label: 'Resolution', value: '4K Ultra HD' },
      { label: 'Panel Type', value: 'OLED' },
      { label: 'Frame', value: 'Solid Walnut' },
      { label: 'OS', value: 'Smart TV OS' }
    ],
    userReviews: [
      { id: 'r10', user: 'RetroFan', rating: 5, comment: 'A piece of art that actually works!', date: '2024-03-05', avatar: 'https://i.pravatar.cc/150?u=retro' }
    ]
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
    colors: ['#000000'],
    specifications: [
      { label: 'Connection', value: 'Bluetooth 5.0' },
      { label: 'Charging', value: 'USB-C' },
      { label: 'Range', value: '15 Metres' }
    ],
    userReviews: [
      { id: 'r11', user: 'User99', rating: 4, comment: 'Very responsive, though slightly small.', date: '2024-02-15', avatar: 'https://i.pravatar.cc/150?u=user99' }
    ]
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
    colors: ['#FFFFFF', '#F5F5F0'],
    specifications: [
      { label: 'Capacity', value: '12000 BTU' },
      { label: 'Energy Class', value: 'A+++' },
      { label: 'Noise Level', value: '19 dB' },
      { label: 'Control', value: 'App / Voice / Remote' }
    ],
    userReviews: [
      { id: 'r12', user: 'CoolingMaster', rating: 5, comment: 'So quiet I forget it is even on.', date: '2024-03-20', avatar: 'https://i.pravatar.cc/150?u=cool' }
    ]
  }
];
