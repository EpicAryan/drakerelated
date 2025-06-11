import { HotspotType } from "@/components/hotspot";

export const livingroomHotspots: HotspotType[] = [
  {
    id: "1",
    x: 12,
    y: 52,
    title: "Video Screen",
    description: "Vintage music collection",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
    cardPosition: 'right'
  },
  {
    id: "2",
    x: 22,
    y: 42,
    title: "Smart Light",
    description: "Modern hexagonal design",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop",
    cardPosition: 'bottom'
  },
  {
    id: "3",
    x: 51.2,
    y: 5,
    title: "Indoor Camera",
    description: "Cozy sleeping area",
    image:"https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop",
    cardPosition: 'bottom',
    tooltipPosition: "bottom",

    hasLightBeam: true,
    beamAngle: 50, 
    beamLength: 500,
    beamWidth: 60,
    beamColor: '#ffffff', 
    beamSpread: 480,
    beamOpacity: 0.1,
    beamGlowIntensity: 6
  },
  {
    id: "4",
    x: 93.5,
    y: 57,
    title: "Baby Camera",
    description: "Work & study space",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    cardPosition: 'left',

    hasLightBeam: true,
    beamAngle: 175, 
    beamLength: 600,
    beamWidth: 60,
    beamColor: '#ffffff', 
    beamSpread: 480,
    beamOpacity: 0.2,
    beamGlowIntensity: 6
  },
  {
    id: "5",
    x: 79.8,
    y: 46,
    title: " Smart Switch",
    description: "Ambient lighting",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    cardPosition: 'top'
  },
];
