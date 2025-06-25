import { HotspotType } from "@/components/hotspot";
import type { LucideIcon } from 'lucide-react';
import { 
  Monitor, 
  Star, 
  Mic, 
  Wifi, 
  Zap, 
  Eye, 
  Moon, 
  Volume2, 
} from 'lucide-react';

export interface HotspotTypeWithIcons extends HotspotType {
  featuresWithIcons?: Array<{
    text: string;
    icon: LucideIcon;
    isFullWidth?: boolean;
  }>;
  imageWidth?: number | string;
  imageHeight?: number | string;
  imageClassName?: string;
}


export const kitchenHotspots: HotspotTypeWithIcons[] = [
  {
    id: "1",
    x: 23,
    y: 60,
    title: "Strip Light",
    description: "This smart LED strip offers vibrant, customizable lighting with flexible installation and intuitive app control. Its multicolor effects and smart assistant compatibility make it ideal for enhancing ambiance in any space.",
    image: "https://images.ctfassets.net/m3x6aw9x53qp/4zHTPU0slfi0O7CcetZEIy/6a3d6ce8183c1784ff1eadb791db2a77/Tapo_strip_light.jpg",
    imageClassName: "w-auto h-38 sm:h-48 absolute top-0",
    cardPosition: 'right',
    brand: "/flipkart.svg",
    productName: "Strip Light",
    featuresWithIcons: [
      { text: "16 million colors", icon: Monitor },
      { text: "50 separate color zones", icon: Star },
      { text: "Music sync", icon: Mic },
      { text: "No hub required", icon: Zap },
      { text: "Cuttable and flexible with 3M adhesive", icon: Star },
      { text: "PU coating for durability", icon: Star },
      { text: "2100 mcd brightness", icon: Star },
      { text: "Up to 50,000 hours lifespan", icon: Star },
      { text: "Voice control via Alexa, Google Assistant, and Siri Shortcuts", icon: Wifi, isFullWidth: true },
    ],
    buttonText: "Buy Now",
    hasMagnifier: true,
    magnifierZoom: 2.0,
    magnifierRadius: 50,
  },
  {
    id: "2",
    x: 67.3,
    y: 2.2,
     title: "Indoor Security Camera",
    description: "This compact indoor camera offers crystal-clear Full HD video and full-room coverage with 360° rotation. It's ideal for home or office security with smart features packed into a sleek design.",
    image:"https://images.ctfassets.net/m3x6aw9x53qp/6MBuQWbiNQWt0NFDTSIir6/73b5795f4a8cd0c95fdd75ee70112602/Indoor_Camera_tp_link.jpg",
    imageClassName: "w-auto h-44 sm:h-48 absolute top-0",
    cardPosition: 'bottom',
    tooltipPosition: "bottom",
    brand: "/flipkart.svg",
    productName: "Indoor Security Camera",
    featuresWithIcons: [
      { text: "Full HD 1080p resolution", icon: Monitor },
      { text: "360° pan and tilt", icon: Moon },
      { text: "Night vision", icon: Moon },
      { text: "Two-way audio", icon: Volume2 },
      { text: "Wi-Fi and Ethernet support", icon: Wifi },
      { text: "Voice assistant compatible", icon: Moon },
      { text: "MicroSD card support", icon: Moon },
      { text: "Mobile app control", icon: Eye },
      { text: "Motion and human detection", icon: Moon, isFullWidth: true }
    ],
    buttonText: "Buy Now",
    hasLightBeam: true,
    beamAngle: 120, 
    beamLength: 800,
    beamWidth: 60,
    beamColor: '#ffffff', 
    beamSpread: 700,
    beamOpacity: 0.15,
    beamGlowIntensity: 3,
    hasMagnifier: true,
    magnifierZoom: 1.8,
    magnifierRadius: 60,
  },
];
