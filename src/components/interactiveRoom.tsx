'use client';

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';

import Hotspot, { HotspotType } from './hotspot';
import { useLoading } from './loading/loadingContext';

function useRect<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [rect, setRect] = useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ro = new ResizeObserver(([entry]) =>
      setRect(entry.contentRect)
    );
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
  const [canScroll, setCanScroll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rendered, setRendered] = useState<RenderedImageProps | null>(null);
  const [openHotspotId, setOpenId] = useState<string | null>(null);
  const { setPageLoaded } = useLoading();

  const [containerRef, rect] = useRect<HTMLDivElement>();

  useEffect(() => {
    if (!rect) return;

    const imgAspect = originalImageWidth / originalImageHeight;
    const containerAspect = rect.width / rect.height;

    let width: number, height: number, left: number, top: number;

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

  
  useEffect(() => {
    const checkScrollable = () => setCanScroll(window.innerWidth < 1520);
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

 
  const MIN_LOAD_TIME = 3000;

  useEffect(() => {
    const imgPromise = new Promise<void>((res, rej) => {
      const img = new Image();
      img.src = backgroundImage;
      img.onload  = () => { setIsLoaded(true); res(); };
      img.onerror = (e) => { console.error('Image load failed', e); rej(e); };
    });

    const minTimePromise = new Promise<void>((res) =>
      setTimeout(res, MIN_LOAD_TIME)
    );

    Promise.all([imgPromise, minTimePromise])
      .then(() => setPageLoaded(true))
      .catch(()  => setPageLoaded(true));        
  }, [backgroundImage, setPageLoaded]);


  const toggleHotspot = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? null : id)),
    [],
  );

  const closeHotspot  = useCallback(() => setOpenId(null), []);

  return (
    <div className={`relative w-full min-h-screen bg-gray-900 ${className}`}>
      <div
        className={`relative h-screen ${
          canScroll ? 'overflow-x-auto room-scroll' : 'overflow-hidden'
        }`}
      >
        <motion.div
          ref={containerRef}                
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`
            relative bg-cover bg-[center_top] bg-no-repeat
            transition-all duration-700 ease-out
            ${canScroll ? 'min-w-[1520px] w-[1520px]' : 'w-full'}
            h-full
            ${isLoaded ? 'blur-0' : 'blur-sm'}
          `}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b
                          from-black/20 via-transparent to-black/30
                          pointer-events-none" />

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
                  isOpen={openHotspotId === h.id}
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
