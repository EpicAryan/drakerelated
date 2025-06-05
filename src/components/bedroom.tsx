'use client'

import React from 'react';
import InteractiveRoom from './interactiveRoom';
import { NavigationType } from './navigation';

const Bedroom = () => {
  const BG_IMAGE = 'https://res.cloudinary.com/dmvfmpkb9/image/upload/v1749069612/work/room4_1_dxv4z3.png';
  
  const hotspots = [
  { id: "1", x: 15, y: 45, title: 'Vinyl Records', description: 'Vintage music collection' },
  { id: "2", x: 25, y: 65, title: 'Coffee Table', description: 'Modern hexagonal design' },
  { id: "3", x: 45, y: 35, title: 'Bed', description: 'Cozy sleeping area' },
  { id: "4", x: 70, y: 30, title: 'Desk Setup', description: 'Work & study space' },
  { id: "5", x: 82, y: 45, title: 'Reading Lamp', description: 'Ambient lighting' },
  { id: "6", x: 53, y: 60, title: 'Floor Decor', description: 'Scattered rose petals' },
];



  return (
    <InteractiveRoom 
      backgroundImage={BG_IMAGE}
      hotspots={hotspots}
      navigationItems={navigationItems}
    />
  );
};

export default Bedroom;

const navigationItems: NavigationType[] = [
    {
      id: "nav1",
      x: 15,
      y: 25,
      direction: 'left',
      label: 'Enter Lounge',
      onClick: () => {
        console.log('Navigating to lounge...');
        // Add your navigation logic here
        // For example: router.push('/lounge') or setCurrentRoom('lounge')
      }
    },
    {
      id: "nav2",
      x: 85,
      y: 25,
      direction: 'right',
      label: 'Kitchen',
      onClick: () => {
        console.log('Navigating to kitchen...');
        // Add your navigation logic here
      }
    },
    {
      id: "nav3",
      x: 50,
      y: 15,
      direction: 'left',
      label: 'Upstairs',
      onClick: () => {
        console.log('Going upstairs...');
        // Add your navigation logic here
      }
    }
  ];
