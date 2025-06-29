import { HotspotType } from "@/components/hotspot";
import type { LucideIcon } from 'lucide-react';
import { 
  Wifi,  
  Eye, 
  Moon, 
  Palette,
  Grid,
  Music,
  Scissors,
  Sun,
  Hourglass,
  Video,
  Rotate3D,
  Smartphone,
  Cloud,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Mic,
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
    image: "https://images.ctfassets.net/m3x6aw9x53qp/4dTfm7O291u6wqv7xINl2c/72ef4aa0e8152acbb13142b56eafb5d7/Tapo_Strip_Lights.webp",
    mediaType: "image",
    redirectUrl: "https://www.flipkart.com/tp-link-tapo-l930-5-smart-wi-fi-led-5m-work-alexa-google-light-strip/p/itm53bb64849bd6a?pid=LLSGRB6DGEY35HJG&lid=LSTLLSGRB6DGEY35HJG4UQ7ZT&marketplace=FLIPKART&q=smart+strip+light+tp+link&store=igc%2Fb4q&srno=s_1_2&otracker=search&otracker1=search&fm=Search&iid=89836717-9a80-41fa-ab49-d8cf46fcdec9.LLSGRB6DGEY35HJG.SEARCH&ppt=sp&ppn=sp&ssid=j439wcacvk0000001747997724639&qH=cd037957e067b7fd",
    imageClassName: "w-auto h-40 xl:h-48 absolute top-0",
    cardPosition: 'right',
    brand: "/tapo-logo.webp",
    // brandClass: "absolute h-auto w-8 sm:w-12 ",
    brandClass: "h-auto w-9 sm:w-12 absolute right-4 -translate-y-2.5 lg:-translate-y-2.75 xl:-translate-y-2",
    brandLogoWidth: 200,
    brandLogoHeight: 48, 
    productName: "Strip Light",
    featuresWithIcons: [
      { text: "16 million colors", icon: Palette },
      { text: "Music sync", icon: Music },
      { text: "2100 mcd brightness", icon: Sun },
      { text: "50 separate color zones", icon: Grid },
      { text: "Cuttable and flexible with 3M adhesive", icon: Scissors },
      { text: "Up to 50,000 hours lifespan", icon: Hourglass },
      { text: "PU coating for durability", icon: ShieldCheck  },
      { text: "No hub required", icon: Zap  },
      { text: "Voice control via Alexa, Google Assistant, and Siri Shortcuts", icon: Mic },
    ],
    cardOffsetY: -120,
    buttonText: "Buy Now",
    hasMagnifier: false,
    magnifierZoom: 1,
    magnifierRadius: 50,
  },
  {
    id: "2",
    x: 67.3,
    y: 2.2,
     title: "Indoor Camera",
    description: "This smart 3MP Wi-Fi camera keeps your home secure with clear footage, motion detection, and auto-tracking. AI alerts you to unusual activity, and cloud storage lets you review recordings anytime.",
    image:"https://videos.ctfassets.net/m3x6aw9x53qp/5UJ1I4PX2M0AjyleczmkNm/f39b246a32625675a9bf64b8a5bf4760/Qubo_Indoor_Camera.webm",
    mediaType: "video",
    mediaBackgroundColor: 'bg-transparent',
    redirectUrl: "https://www.flipkart.com/qubo-smart-cam-360-q100-hero-group-3mp-1296p-wifi-cctv-2-way-talk-night-vision-security-camera/p/itm02c0cd139df73?pid=HSAGZ85BFFSNHZ2Z&lid=LSTHSAGZ85BFFSNHZ2ZN01CZ3",
    // imageClassName: "w-auto h-38 sm:h-42 xl:h-46 absolute top-1",
    imageClassName: "w-auto h-48 sm:h-48 lg:h-44 xl:h-52 absolute ",
    cardPosition: 'bottom',
    tooltipPosition: "bottom",
    brand: "/qubo-logo.webp",
    // brandClass: "h-auto w-12 sm:w-14",
    brandClass: "h-auto w-12 sm:w-14 xl:w-16 absolute right-4 translate-y-0.5 lg:translate-y-0.75 xl:translate-y-1",
    brandLogoWidth: 200,
    brandLogoHeight: 48, 
    productName: "Indoor Security Camera",
    featuresWithIcons: [
      { text: "3MP full HD video clarity", icon: Video },
      { text: "2.4GHz Wi-Fi connectivity", icon: Wifi },
      { text: "360° pan & 85° tilt coverage", icon: Rotate3D },
      { text: "Two-way audio for instant communication", icon: Volume2 },
      { text: "Infrared night vision for dark environments", icon: Moon },
      { text: "Motion detection with smart alerts", icon: Eye },
      { text: "App control for live view & playback", icon: Smartphone },
      { text: "Supports local and cloud storage", icon: Cloud },
      { text: "Voice assistant compatibility (Alexa/Google)", icon: Mic },
      { text: "Compact design ideal for kitchen corners", icon: LayoutDashboard },
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
    magnifierZoom: 1.4,
    magnifierRadius: 50,
    magnifierImage: "/magnify/kitchen-indoorcam.webp",
    magnifierImageWidth: 200,
    magnifierImageHeight: 200,
    magnifierFocusX: 55,
    magnifierFocusY: 45,
    
  },
];
