import { HotspotType } from "@/components/hotspot";
import type { LucideIcon } from 'lucide-react';
import { 
  Monitor, 
  Star, 
  Mic, 
  Wifi, 
  Zap, 
  Lightbulb, 
  Smartphone, 
  Settings, 
  Eye, 
  Moon, 
  Volume2, 
  Radio,
  Gauge
} from 'lucide-react';


export interface HotspotTypeWithIcons extends HotspotType {
  featuresWithIcons?: Array<{
    text: string;
    icon: LucideIcon;
  }>;
  imageWidth?: number | string;
  imageHeight?: number | string;
  imageClassName?: string;
}

export const livingroomHotspots: HotspotTypeWithIcons[] = [
  {
    id: "1",
    x: 12,
    y: 52,
    title: "Video Screen",
    description: "This smart video door phone provides high-resolution video and two-way communication, ensuring secure and convenient visitor management. Its sleek design and advanced features make it ideal for modern homes.",
    image: "https://images.ctfassets.net/m3x6aw9x53qp/6MBuQWbiNQWt0NFDTSIir6/73b5795f4a8cd0c95fdd75ee70112602/Indoor_Camera_tp_link.jpg",
    imageClassName: "w-80 h-60 absolute top-0",
    cardPosition: 'right',
    brand: "Qubo",
    productName: "Video Door Phone",
    featuresWithIcons: [
      { text: "2K resolution camera", icon: Monitor },
      { text: "140° wide-angle lens", icon: Star },
      { text: "Night vision", icon: Mic },
      { text: "Mobile app integration", icon: Star },
      { text: "Motion and person detection", icon: Wifi },
      { text: "Two-way audio with echo cancellation", icon: Zap },
      { text: "Dual-band Wi-Fi and Ethernet PoE support", icon: Star },
      { text: "Smart assistant compatibility", icon: Star },
      { text: "Expandable storage up to 1TB", icon: Star }
    ],
    buttonText: "Add to Cart"
  },
  {
    id: "2",
    x: 22,
    y: 42,
    title: "Smart Light",
    description: "This smart LED bulb offers vibrant lighting with customizable colors and remote control, enhancing your home's ambiance and convenience. Its energy-efficient design and smart features make it a perfect addition to modern living spaces.",
    image: "https://images.ctfassets.net/m3x6aw9x53qp/4zHTPU0slfi0O7CcetZEIy/6a3d6ce8183c1784ff1eadb791db2a77/Tapo_strip_light.jpg",
    imageClassName: "w-96 h-60 absolute top-0",
    cardPosition: 'right',
    brand: "Philips",
    productName: "Smart Light",
    featuresWithIcons: [
      { text: "16 million color options", icon: Lightbulb },
      { text: "Tunable white light (2700K-6500K)", icon: Lightbulb },
      { text: "Dimmable brightness (10%-100%)l", icon: Smartphone },
      { text: "Voice control via Alexa and Google Assistant", icon: Mic },
      { text: "Remote access through mobile app", icon: Settings },
      { text: "Customizable scheduling and timers", icon: Zap },
      { text: "Group control for multiple bulbs", icon: Zap },
      { text: "No hub required; operates over Wi-Fi", icon: Zap }
    ],
    buttonText: "Add to Cart"
  },
  {
    id: "3",
    x: 51.2,
    y: 5,
    title: "Indoor Camera",
    description: "This compact indoor camera offers crystal-clear Full HD video and full-room coverage with 360° rotation. It's ideal for home or office security with smart features packed into a sleek design.",
    image:"https://images.ctfassets.net/m3x6aw9x53qp/6MBuQWbiNQWt0NFDTSIir6/73b5795f4a8cd0c95fdd75ee70112602/Indoor_Camera_tp_link.jpg",
    imageClassName: "w-96 h-68 absolute top-0",
    cardPosition: 'bottom',
    tooltipPosition: "bottom",
    brand: "Tp-Link",
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
      { text: "Motion and human detection", icon: Moon }
    ],
    hasLightBeam: true,
    beamAngle: 50, 
    beamLength: 500,
    beamWidth: 60,
    beamColor: '#ffffff', 
    beamSpread: 480,
    beamOpacity: 0.1,
    beamGlowIntensity: 6,
    buttonText: "Add to Cart"
  },
  {
    id: "4",
    x: 93.5,
    y: 56,
    title: "Baby Camera",
    description: "This compact indoor camera offers crystal-clear Full HD video and full-room coverage with 360° rotation. It's ideal for home or office security with smart features packed into a sleek design.",
    image: "https://images.ctfassets.net/m3x6aw9x53qp/6MBuQWbiNQWt0NFDTSIir6/73b5795f4a8cd0c95fdd75ee70112602/Indoor_Camera_tp_link.jpg",
    imageClassName: "w-80 h-68 absolute top-0",
    cardPosition: 'left',
    brand: "TP-Link",
    productName: "Baby Camera",
    featuresWithIcons: [
      { text: "Full HD 1080p resolution", icon: Monitor },
      { text: "360° pan and tilt", icon: Moon },
      { text: "Night vision", icon: Moon },
      { text: "Two-way audio", icon: Volume2 },
      { text: "Wi-Fi and Ethernet support", icon: Wifi },
      { text: "Voice assistant compatible", icon: Moon },
      { text: "MicroSD card support", icon: Moon },
      { text: "Mobile app control", icon: Eye },
      { text: "Motion and human detection", icon: Moon }
    ],
    hasLightBeam: true,
    beamAngle: 175, 
    beamLength: 600,
    beamWidth: 60,
    beamColor: '#ffffff', 
    beamSpread: 480,
    beamOpacity: 0.2,
    beamGlowIntensity: 6,
    buttonText: "Add to Cart"
  },
  {
    id: "5",
    x: 79.8,
    y: 46,
    title: "Smart Switch",
    description: "This smart switch module transforms your existing switches into smart ones, enabling remote control and automation without altering your current setup. Its seamless integration with voice assistants and mobile apps offers enhanced convenience and energy efficiency.",
    image: "https://images.ctfassets.net/m3x6aw9x53qp/4zHTPU0slfi0O7CcetZEIy/6a3d6ce8183c1784ff1eadb791db2a77/Tapo_strip_light.jpg",
    imageClassName: "w-96 h-60 absolute top-0",
    cardPosition: 'left',
    brand: "Wipro",
    productName: "Smart Switch",
    featuresWithIcons: [
      { text: "Control up to 4 switches", icon: Radio },
      { text: "Wi-Fi connectivity (2.4GHz)", icon: Settings },
      { text: "Voice assistant compatibility (Alexa, Google Assistant)", icon: Mic },
      { text: "Mobile app control", icon: Settings },
      { text: "Manual override support", icon: Smartphone },
      { text: "Compact retrofit design", icon: Gauge },
      { text: "No hub required", icon: Gauge },
      { text: "Energy-efficient operation", icon: Gauge }
    ],
    buttonText: "Add to Cart"
  },
];
