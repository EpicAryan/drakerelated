import { HotspotType } from "@/components/hotspot";
import type { LucideIcon } from 'lucide-react';
import { 
  Monitor, 
  Star, 
  Mic, 
  Wifi, 
  Zap,
  Fingerprint, Lock, ShieldCheck, KeyRound, Smartphone, ListOrdered, Users, BatteryCharging, Droplets 
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

export const exteriorHotspots: HotspotTypeWithIcons[] = [
  {
    id: "1",
    x: 63.4,
    y: 38.7,
    title: "Video Door Phone",
    description: "This smart video door phone provides high-resolution video and two-way communication, ensuring secure and convenient visitor management. Its sleek design and advanced features make it ideal for modern homes.",
    image: "https://images.ctfassets.net/m3x6aw9x53qp/2jo4LN0GrmiafAqkrS4lgt/9f477c436ac0015a82f23289a48c67bb/Qubo_Door_phone.webp",
    mediaType: "image",
    redirectUrl: "https://www.flipkart.com/qubo-wifi-door-bell-pro-tab-hero-group-3mp-1296p-instant-visitor-video-phone/p/itmb010a84980eb3?pid=VIPHYXQG8FPKS8GK&lid=LSTVIPHYXQG8FPKS8GKTJEWND&marketplace=FLIPKART&q=video+door+phone&store=search.flipkart.com&srno=s_1_13&otracker=search&otracker1=search&fm=Search&iid=f5670266-7fdc-4b30-844a-1f0b8b9f9806.VIPHYXQG8FPKS8GK.SEARCH&ppt=sp&ppn=sp&ssid=l63i6nbxxs0000001747997597196&qH=8a816cd0662dea57",
    imageClassName: "w-auto h-36 xl:h-44 absolute top-2 xl:top-0",
    cardPosition: 'left',
    cardOffsetY: 40,
    brand: "/qubo-logo.webp",
    brandClass: "h-auto w-14 sm:w-18",
    brandLogoWidth: 200,
    brandLogoHeight: 48,
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
    buttonText: "Buy Now",
    hasMagnifier: true,
    magnifierZoom: 0.7,
    magnifierRadius: 70,
    magnifierImage: "/magnify/video-doorbell.webp",
    magnifierImageWidth: 600,
    magnifierImageHeight: 600,
    magnifierFocusX: 46,
    magnifierFocusY: 52,
  },
  {
    id: "2",
    x: 68.2,
    y: 40.3,
    title: "Smart Door Lock",
    description: "Designed for modern homes, the Atomberg SL1 combines advanced security with sleek design. With six unlocking methods, robust 5 stainless steel bolts, and free professional installation, it ensures both convenience and peace of mind.",
    image: "https://images.ctfassets.net/m3x6aw9x53qp/lKQ6knBnjJiH1hSk9PA5M/ecdac03b8eb88957b9ae497749c7210f/smart-door-lock.webp",
    mediaType: "image",
    redirectUrl: "https://www.flipkart.com/atomberg-sl1-6-ways-unlocking-fingerprint-5-ss-bolt-free-installation-smart-door-lock/p/itm51cdcb8b535b2?pid=SLOGTBZ36YXCVHPM&lid=LSTSLOGTBZ36YXCVHPM8CTW34",
    imageClassName: "w-auto h-48 lg:h-46 xl:h-54 absolute -top-2",
    cardPosition: 'left',
    cardOffsetY: 36,
    brand: "/atomberg-logo.webp",
    brandClass: "h-auto w-14 sm:w-18",
    brandLogoWidth: 200,
    brandLogoHeight: 48,
    productName: "Smart Door Lock",
    featuresWithIcons: [
      { text: "6-in-1 Smart Unlock Options", icon: Lock },
      { text: "Fast Fingerprint Access", icon: Fingerprint },
      { text: "5 Stainless Steel Locking Bolts", icon: ShieldCheck },
      { text: "Anti-Peep Secure PIN Entry", icon: KeyRound },
      { text: "Manual Deadbolt Privacy Lock", icon: Lock },
      { text: "App Control via Bluetooth", icon: Smartphone },
      { text: "Real-Time Access Logs", icon: ListOrdered },
      { text: "100 Fingerprints & NFC Cards", icon: Users },
      { text: "8-Month Battery with Backup", icon: BatteryCharging },
      { text: "IPX5 Water Resistance & Warranty", icon: Droplets }
    ],
    buttonText: "Buy Now",
    hasMagnifier: true,
    magnifierZoom: 0.75,
    magnifierRadius: 70,
    magnifierImage: "/magnify/atomberg.webp",
    magnifierImageWidth: 450,
    magnifierImageHeight: 450,
    magnifierFocusX: 48,
    magnifierFocusY: 52,
  },
  {
    id: "3",
    x: 80,
    y: 24,
    title: "Outdoor Camera",
    description: "This weatherproof outdoor camera combines high-resolution video with smart AI features, ensuring reliable surveillance in all conditions. Its robust design and intelligent detection capabilities make it ideal for safeguarding your property.",
    image: "https://images.ctfassets.net/m3x6aw9x53qp/316VrAONe8k9J1gyOscLNZ/b7b480eca210bc8bd258e1e8c3c020aa/Outdoor_cab.webp",
    mediaType: "image",
    redirectUrl: "https://www.flipkart.com/qubo-outdoor-bullet-cam-hero-group-3mp-1296p-wifi-cctv-full-hd-weather-resistant-security-camera/p/itmfb298d0933008?pid=HSAGSREGRFVFADJX&lid=LSTHSAGSREGRFVFADJXLHHWIG&marketplace=FLIPKART&q=qubo+outdoor+camera&store=igc%2Fj69%2Fagd&srno=s_1_2&otracker=AS_QueryStore_OrganicAutoSuggest_1_9_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_9_na_na_na&fm=search-autosuggest&iid=947cb6f5-fc7d-4652-b0cf-e2b7b9e54855.HSAGSREGRFVFADJX.SEARCH&ppt=sp&ppn=sp&ssid=1qt5yao7r40000001747997759818&qH=5888d2ed8fc132e6",
    imageClassName: "w-auto h-44 xl:h-52 absolute top-0",
    cardPosition: 'left',
    cardOffsetY: 124,
    brand: "/qubo-logo.webp",
    brandClass: "h-auto w-14 sm:w-18",
    brandLogoWidth: 200,
    brandLogoHeight: 48,
    productName: "Outdoor Camera",
    featuresWithIcons: [
      { text: "3MP (1296p) resolution", icon: Monitor },
      { text: "130° wide-angle lens", icon: Star },
      { text: "Color night vision", icon: Mic },
      { text: "IP66 weather resistance", icon: Star },
      { text: "AI-powered person detection", icon: Wifi },
      { text: "Wi-Fi (2.4GHz) connectivity", icon: Star },
      { text: "Smart spotlight with multiple modes", icon: Zap },
      { text: "Two-way audio with echo cancellation", icon: Star,  },
      { text: "Mobile app control with OTA updates", icon: Star, isFullWidth: true  },
      { text: "Up to 1TB microSD and cloud storage support", icon: Star, isFullWidth: true }
    ],
    buttonText: "Buy Now",

    hasLightBeam: true,
    beamAngle: 145, 
    beamLength: 900,
    beamWidth: 60,
    beamColor: '#ffffff', 
    beamSpread: 800,
    beamOpacity: 0.1,
    beamGlowIntensity: 3,
    hasMagnifier: true,
    magnifierZoom: 0.8,
    magnifierRadius: 60,
    magnifierImage: "/magnify/outdoor-cam.webp",
    magnifierImageWidth: 700,
    magnifierImageHeight: 700,
    magnifierFocusX: 50,
    magnifierFocusY: 52,
  },
];
