import { HotspotType } from "@/components/hotspot";

export const exteriorHotspots: HotspotType[] = [
  {
    id: "1",
    x: 63,
    y: 39,
    title: "Video DoorBell",
    description: "Vintage music collection",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
    cardPosition: 'left'
  },
  {
    id: "2",
    x: 68,
    y: 38,
    title: "Smart Door Lock",
    description: "Modern hexagonal design",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
    cardPosition: 'bottom'
  },
  {
    id: "3",
    x: 80,
    y: 24,
    title: "Outdoor Camera",
    description: "Cozy sleeping area",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
    cardPosition: 'right',

    hasLightBeam: true,
    beamAngle: 145, 
    beamLength: 700,
    beamWidth: 60,
    beamColor: '#ffffff', 
    beamSpread: 600,
    beamOpacity: 0.1,
    beamGlowIntensity: 3
  },
];
