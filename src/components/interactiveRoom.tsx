'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Hotspot, { HotspotType } from './hotspot';
import { useLoading } from './loading/loadingContext';
import { LandscapeHint } from '@/components';

function useRect<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [rect, setRect] = useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setRect(entry.contentRect);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, rect] as const;
}

interface InteractiveRoomProps {
  backgroundImage: string;
  hotspots?: HotspotType[];
  className?: string;
  originalImageWidth?: number;
  originalImageHeight?: number;
}

export interface RenderedImageProps {
  left: number;
  top: number;
  width: number;
  height: number;
}

const InteractiveRoom: React.FC<InteractiveRoomProps> = ({
  backgroundImage,
  hotspots = [],
  className = '',
  originalImageWidth = 3840,
  originalImageHeight = 2160,
}) => {
  type ScrollMode = 'none' | 'horizontal' | 'both';
  const [scrollMode, setScrollMode] = useState<ScrollMode>('none');
  const [isLoaded, setIsLoaded] = useState(false);
  const [rendered, setRendered] = useState<RenderedImageProps | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const { setPageLoaded } = useLoading();

  const [containerRef, rect] = useRect<HTMLDivElement>();

  const decideScrollMode = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (vw >= 1024) {
      setScrollMode('none');
      return;
    }

    const isLandscape = vw > vh;
    if (isLandscape && originalImageHeight > vh) {
      setScrollMode('both');
    } else {
      setScrollMode('horizontal');
    }
  }, [originalImageHeight]);

  useEffect(() => {
    decideScrollMode();
    window.addEventListener('resize', decideScrollMode);
    return () => window.removeEventListener('resize', decideScrollMode);
  }, [decideScrollMode]);


  useEffect(() => {
    if (!rect) return;
    const imgAspect = originalImageWidth / originalImageHeight;

    if (scrollMode === 'horizontal') {
      const newHeight = rect.height;
      const newWidth = newHeight * imgAspect;
      setRendered({ width: newWidth, height: newHeight, left: 0, top: 0 });
    } else if (scrollMode === 'both') {
      setRendered({
        width: originalImageWidth,
        height: originalImageHeight,
        left: 0,
        top: 0,
      });
    } else {
      const containerAspect = rect.width / rect.height;
      let width, height, left, top;
      if (containerAspect > imgAspect) {
        width = rect.width;
        height = rect.width / imgAspect;
        left = 0;
        top = 0;
      } else {
        height = rect.height;
        width = rect.height * imgAspect;
        top = 0;
        left = rect.width - width;
      }
      setRendered({ width, height, left, top });
    }
  }, [rect, scrollMode, originalImageWidth, originalImageHeight]);


  useEffect(() => {
    const MIN_SPLASH_TIME = 3000;
    const imgPromise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => { setIsLoaded(true); resolve(); };
      img.onerror = (e) => { console.error('Failed to load image:', e); reject(e); };
    });
    const minTimePromise = new Promise<void>((resolve) => setTimeout(resolve, MIN_SPLASH_TIME));
    Promise.all([imgPromise, minTimePromise])
      .then(() => setPageLoaded(true))
      .catch(() => setPageLoaded(true));
  }, [backgroundImage, setPageLoaded]);

  const toggleHotspot = useCallback((id: string) => setOpenId((prev) => (prev === id ? null : id)), []);
  const closeHotspot = useCallback(() => setOpenId(null), []);


  const scrollContainerClass =
    scrollMode === 'none'
      ? 'overflow-hidden'
      : scrollMode === 'horizontal'
      ? 'overflow-x-auto overflow-y-hidden room-scroll'
      : 'overflow-auto room-scroll';

  const contentClasses = [
    'relative', 'bg-no-repeat', 'transition-opacity', 'duration-700', 'ease-out',
    isLoaded ? 'blur-0' : 'blur-sm',
  ];

  const contentStyles: React.CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
  };

  if (scrollMode === 'none') {
    contentClasses.push('w-full', 'h-full', 'bg-cover', 'bg-[right_top]');
  } else if (scrollMode === 'horizontal') {
    contentClasses.push('h-full', 'max-w-none', 'bg-contain', 'bg-left');
    if (rect) {
      const newWidth = rect.height * (originalImageWidth / originalImageHeight);
      contentStyles.width = `${newWidth}px`;
    }
  } else { // 'both' mode
    contentClasses.push('max-w-none', 'bg-cover');
    contentStyles.width = `${originalImageWidth}px`;
    contentStyles.height = `${originalImageHeight}px`;
  }

  return (
    <div className={`relative w-full min-h-screen bg-gray-900 ${className}`}>
      <LandscapeHint />
      <div className={`relative h-screen ${scrollContainerClass}`}>
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={contentClasses.join(' ')}
          style={contentStyles}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
          {rendered && (
            <AnimatePresence>
              {hotspots.map((h) => (
                <Hotspot
                  key={h.id}
                  hotspot={h}
                  imageProps={rendered}
                  backgroundImage={backgroundImage}
                  originalImageWidth={originalImageWidth}
                  originalImageHeight={originalImageHeight}
                  isOpen={openId === h.id}
                  onToggle={() => toggleHotspot(h.id)}
                  onClose={closeHotspot}
                />
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveRoom;
