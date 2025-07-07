import type { LucideIcon } from 'lucide-react';


export interface Position {
  x: number;
  y: number;
}


export type CardPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipPosition = 'top' | 'bottom';
export type MediaType = 'image' | 'video';


export interface FeatureWithIcon {
  text: string;
  icon: LucideIcon;
  isFullWidth?: boolean;
}


export interface LightBeamConfig {
  hasLightBeam?: boolean;
  beamAngle?: number;
  beamLength?: number;
  beamWidth?: number;
  beamColor?: string;
  beamSpread?: number;
  beamOpacity?: number;
  beamGlowIntensity?: number;
}


export interface MagnifierConfig {
  hasMagnifier?: boolean;
  magnifierZoom?: number;
  magnifierRadius?: number;
  magnifierImage?: string;
  magnifierImageWidth?: number;
  magnifierImageHeight?: number;
  magnifierFocusX?: number;
  magnifierFocusY?: number;
}


export interface BrandInfo {
  brand?: string;
  brandClass?: string;
  brandLogoWidth?: number;
  brandLogoHeight?: number;
  productName?: string;
  price?: string;
}


export interface MediaConfig {
  image: string;
  mediaType?: MediaType;
  imageWidth?: number | string;
  imageHeight?: number | string;
  imageClassName?: string;
  mediaBackgroundColor?: string;
}


export interface BaseHotspot extends Position {
  id: string;
  title: string;
  description: string;
}

export interface HotspotType extends 
  BaseHotspot,
  LightBeamConfig,
  MagnifierConfig,
  BrandInfo,
  MediaConfig {
  cardPosition?: CardPosition;
  tooltipPosition?: TooltipPosition;
  features?: string[];
  featuresWithIcons?: FeatureWithIcon[];
  buttonText?: string;
  cardOffsetY?: number;
  redirectUrl?: string;
}


export interface NavigationType extends Position {
  id: string;
  x: number;
  y: number;
  direction: 'left' | 'right';
  label: string;
  imageUrl: string;
  onClick?: () => void;
}


export interface RenderedImageProps {
  left: number;
  top: number;
  width: number;
  height: number;
}


export interface HotspotProps {
  hotspot: HotspotType;
  imageProps: RenderedImageProps;
  backgroundImage: string;
  originalImageWidth?: number;
  originalImageHeight?: number;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export interface HotspotCardProps {
  hotspot: HotspotType;
  isOpen: boolean;
  onClose: () => void;
}
