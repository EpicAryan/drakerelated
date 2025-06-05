'use client'

import React from 'react';
import InteractiveRoom from './interactiveRoom';

const Bedroom = () => {
  const BG_IMAGE = 'https://res.cloudinary.com/dmvfmpkb9/image/upload/v1749069612/work/room4_1_dxv4z3.png';
  
  const hotspots = [
  { id: "1", x: 15, y: 45, title: 'Vinyl Records', description: 'Vintage music collection' },
  { id: "2", x: 25, y: 65, title: 'Coffee Table', description: 'Modern hexagonal design' },
  { id: "3", x: 45, y: 35, title: 'Bed', description: 'Cozy sleeping area' },
  { id: "4", x: 70, y: 25, title: 'Desk Setup', description: 'Work & study space' },
  { id: "5", x: 80, y: 45, title: 'Reading Lamp', description: 'Ambient lighting' },
  { id: "6", x: 60, y: 70, title: 'Floor Decor', description: 'Scattered rose petals' },
];



  return (
    <InteractiveRoom 
      backgroundImage={BG_IMAGE}
      hotspots={hotspots}
    />
  );
};

export default Bedroom;
