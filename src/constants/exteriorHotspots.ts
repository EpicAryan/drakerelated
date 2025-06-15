import { HotspotType } from "@/components/hotspot";
import type { LucideIcon } from 'lucide-react';
import { 
  Monitor, 
  Star, 
  Mic, 
  Wifi, 
  Zap, 
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

export const exteriorHotspots: HotspotTypeWithIcons[] = [
  {
    id: "1",
    x: 63.4,
    y: 38.7,
    title: "Video DoorBell",
    description: "This smart video door phone provides high-resolution video and two-way communication, ensuring secure and convenient visitor management. Its sleek design and advanced features make it ideal for modern homes.",
    image: "https://images.ctfassets.net/m3x6aw9x53qp/686OKDzgVRqvxgLSOnnykI/20bad0eaf7b9627a6f3418b9f4bc52d2/Qubo_Doorbell.png",
    imageClassName: "w-48 h-48 sm:w-56 sm:h-56 absolute top-0",
    cardPosition: 'left',
    brand: "/flipkart.svg",
    productName: "Video Door Phone",
    featuresWithIcons: [
      { text: "2K resolution camera", icon: Monitor },
      { text: "140° wide-angle lens", icon: Star },
      { text: "Night vision", icon: Mic },
      { text: "Motion and person detection", icon: Wifi },
      { text: "Two-way audio with echo cancellation", icon: Zap },
      { text: "Dual-band Wi-Fi and Ethernet PoE support", icon: Star },
      { text: "Smart assistant compatibility", icon: Star },
      { text: "Expandable storage up to 1TB", icon: Star },
      { text: "Mobile app integration", icon: Star }
    ],
    buttonText: "Add to Cart",
    hasMagnifier: true,
    magnifierZoom: 3,
    magnifierRadius: 60,
  },
  {
    id: "2",
    x: 68.2,
    y: 40.3,
    title: "Smart Door Lock",
    description: "This sleek smart door lock offers advanced security with multiple access methods, ensuring both convenience and protection for your home. Its durable build and intelligent features make it an ideal choice for modern households.",
    image: "https://images.ctfassets.net/m3x6aw9x53qp/6iZwAtiSfuBTR0qaXkBYXv/e1c61065f8c086e4132be81fdedefae4/Yale_doorlock.jpg",
    imageClassName: "w-52 h-52 sm:w-56 sm:h-56 absolute -top-2 sm:top-2",
    cardPosition: 'left',
    brand: "/flipkart.svg",
    productName: "Smart Door Lock",
    featuresWithIcons: [
      { text: "Fingerprint access", icon: Monitor },
      { text: "PIN code entry", icon: Star },
      { text: "RFID card access", icon: Mic },
      { text: "Mechanical key backup", icon: Zap },
      { text: "Bluetooth mobile app control", icon: Wifi },
      { text: "One-Time Password (OTP) sharing", icon: Star },
      { text: "Voice guidance", icon: Star },
      { text: "Low battery alerts", icon: Star },
      { text: "Emergency USB charging", icon: Star }
    ],
    buttonText: "Add to Cart",
    hasMagnifier: true,
    magnifierZoom: 3,
    magnifierRadius: 70,
  },
  {
    id: "3",
    x: 80,
    y: 24,
    title: "Outdoor Camera",
    description: "This weatherproof outdoor camera combines high-resolution video with smart AI features, ensuring reliable surveillance in all conditions. Its robust design and intelligent detection capabilities make it ideal for safeguarding your property.",
    image: "https://images.ctfassets.net/m3x6aw9x53qp/1VABeET7zxtzAwN5H8c1Nn/01f7dd95c5994273481e9733a9d863e6/Qubo_Outdoor_Cam.png",
    imageClassName: "w-48 h-40 sm:w-56 sm:h-50 absolute top-0",
    cardPosition: 'bottom',

    brand: "/flipkart.svg",
    productName: "Outdoor Camera",
    featuresWithIcons: [
      { text: "3MP (1296p) resolution", icon: Monitor },
      { text: "130° wide-angle lens", icon: Star },
      { text: "Color night vision", icon: Mic },
      { text: "IP66 weather resistance", icon: Star },
      { text: "AI-powered person detection", icon: Wifi },
      { text: "Smart spotlight with multiple modes", icon: Zap },
      { text: "Two-way audio with echo cancellation", icon: Star },
      { text: "Up to 1TB microSD and cloud storage support", icon: Star },
      { text: "Wi-Fi (2.4GHz) connectivity", icon: Star },
      { text: "Mobile app control with OTA updates", icon: Star }
    ],
    buttonText: "Add to Cart",

    hasLightBeam: true,
    beamAngle: 145, 
    beamLength: 900,
    beamWidth: 60,
    beamColor: '#ffffff', 
    beamSpread: 800,
    beamOpacity: 0.1,
    beamGlowIntensity: 3,
    hasMagnifier: true,
    magnifierZoom: 2.8,
    magnifierRadius: 60,
  },
];
