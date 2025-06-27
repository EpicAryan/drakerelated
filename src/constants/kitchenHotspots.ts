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
    image: "https://images.ctfassets.net/m3x6aw9x53qp/4dTfm7O291u6wqv7xINl2c/72ef4aa0e8152acbb13142b56eafb5d7/Tapo_Strip_Lights.webp",
    mediaType: "image",
    redirectUrl: "https://www.flipkart.com/tp-link-tapo-l930-5-smart-wi-fi-led-5m-work-alexa-google-light-strip/p/itm53bb64849bd6a?pid=LLSGRB6DGEY35HJG&lid=LSTLLSGRB6DGEY35HJG4UQ7ZT&marketplace=FLIPKART&q=smart+strip+light+tp+link&store=igc%2Fb4q&srno=s_1_2&otracker=search&otracker1=search&fm=Search&iid=89836717-9a80-41fa-ab49-d8cf46fcdec9.LLSGRB6DGEY35HJG.SEARCH&ppt=sp&ppn=sp&ssid=j439wcacvk0000001747997724639&qH=cd037957e067b7fd",
    imageClassName: "w-auto h-40 xl:h-48 absolute top-0",
    cardPosition: 'right',
    brand: "/tapo-logo.webp",
    brandClass: "absolute h-auto w-8 sm:w-12 ",
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
    redirectUrl: "https://www.flipkart.com/qubo-smart-cam-360-q100-hero-group-3mp-1296p-wifi-cctv-2-way-talk-night-vision-security-camera/p/itm02c0cd139df73?pid=HSAGZ85BFFSNHZ2Z&lid=LSTHSAGZ85BFFSNHZ2ZN01CZ3",
    imageClassName: "w-auto h-38 sm:h-42 xl:h-46 absolute top-1",
    cardPosition: 'bottom',
    tooltipPosition: "bottom",
    brand: "/qubo-logo.webp",
    brandClass: "h-auto w-12 sm:w-14",
    productName: "Indoor Security Camera",
    featuresWithIcons: [
      { text: "3MP full HD video clarity", icon: Monitor },
      { text: "2.4GHz Wi-Fi connectivity", icon: Wifi },
      { text: "360° pan & 85° tilt coverage", icon: Moon },
      { text: "Two-way audio for instant communication", icon: Volume2 },
      { text: "Infrared night vision for dark environments", icon: Moon },
      { text: "Motion detection with smart alerts", icon: Eye },
      { text: "App control for live view & playback", icon: Monitor },
      { text: "Supports local and cloud storage", icon: Monitor },
      { text: "Voice assistant compatibility (Alexa/Google)", icon: Mic, isFullWidth: true  },
      { text: "Compact design ideal for kitchen corners", icon: Monitor, isFullWidth: true  }
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
