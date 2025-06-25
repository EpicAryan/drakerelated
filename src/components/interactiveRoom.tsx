'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import Hotspot, { HotspotType } from './hotspot';
import { useLoading } from './loading/loadingContext';
import { LandscapeHint } from '@/components';


function useRect<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [rect, setRect] = React.useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setRect(entry.contentRect));
    ro.observe(ref.current);
    return () => ro.disconnect();
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

interface RenderedImageProps {
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
  const [isLoaded,   setIsLoaded]   = useState(false);
  const [rendered,   setRendered]   = useState<RenderedImageProps | null>(null);
  const [openId,     setOpenId]     = useState<string | null>(null);
  const { setPageLoaded }          = useLoading();


  const [containerRef, rect] = useRect<HTMLDivElement>();

  useEffect(() => {
    if (!rect) return;
    const imgAspect  = originalImageWidth / originalImageHeight;
    const containerAspect = rect.width / rect.height;

    let width, height, left, top;
    if (containerAspect > imgAspect) {
      width  = rect.width;
      height = rect.width / imgAspect;
      left   = 0;
      top    = 0;
    } else {
      height = rect.height;
      width  = rect.height * imgAspect;
      top    = 0;
      left   = (rect.width - width) / 2;
    }
    setRendered({ width, height, left, top });
  }, [rect, originalImageWidth, originalImageHeight]);


  const decideScrollMode = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (vw >= 1520) {
      setScrollMode('none');
      return;
    }


    const aspectHeight = 1520 * (originalImageHeight / originalImageWidth);

    const allowVertical = vw < 768 || vh < 610;

    if (aspectHeight > vh && allowVertical) {
      setScrollMode('both');           
    } else {
      setScrollMode('horizontal');     
    }
  }, [originalImageWidth, originalImageHeight]);

  useEffect(() => {
    decideScrollMode();
    window.addEventListener('resize', decideScrollMode);
    return () => window.removeEventListener('resize', decideScrollMode);
  }, [decideScrollMode]);

  /* splash + loading */
  useEffect(() => {
    const MIN = 3000;
    const imgPromise = new Promise<void>((res, rej) => {
      const img = new Image();
      img.src = backgroundImage;
      img.onload  = () => { setIsLoaded(true); res(); };
      img.onerror = (e) => { console.error('load failed', e); rej(e); };
    });
    const minPromise = new Promise<void>(res => setTimeout(res, MIN));

    Promise.all([imgPromise, minPromise])
      .then(() => setPageLoaded(true))
      .catch(()  => setPageLoaded(true));
  }, [backgroundImage, setPageLoaded]);

  /* hotspot helpers */
  const toggleHotspot = useCallback(
    (id: string) => setOpenId(prev => (prev === id ? null : id)),
    []
  );
  const closeHotspot = useCallback(() => setOpenId(null), []);


  const scrollClass =
    scrollMode === 'none'
      ? 'overflow-hidden'
      : scrollMode === 'horizontal'
        ? 'overflow-x-auto overflow-y-hidden room-scroll'
        : 'overflow-auto room-scroll'; 

  return (
    <div className={`relative w-full min-h-screen bg-gray-900 ${className}`}>
      <LandscapeHint/>
      <div className={`relative h-screen ${scrollClass}`}>
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`
            relative bg-cover bg-[center_top] bg-no-repeat
            transition-all duration-700 ease-out
            ${scrollMode === 'none' ? 'w-full h-full'
              : 'min-w-[1520px] w-[1520px]'}
            ${scrollMode === 'both' ? '' : 'h-full'}
            ${isLoaded ? 'blur-0' : 'blur-sm'}
          `}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            ...(scrollMode === 'both'
              ? { aspectRatio: `${originalImageWidth} / ${originalImageHeight}` }
              : {}),
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b
                          from-black/20 via-transparent to-black/30
                          pointer-events-none" />

          {rendered && (
            <AnimatePresence>
              {hotspots.map(h => (
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
