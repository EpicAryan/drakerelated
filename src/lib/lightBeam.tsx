'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';      

export interface LightBeamProps {
  isVisible: boolean;
  angle?: number;
  length?: number;
  width?: number;
  color?: string;
  opacity?: number;
  spread?: number;
  animationDuration?: number;
  glowIntensity?: number;
}

const LightBeam: React.FC<LightBeamProps> = ({
  isVisible,
  angle = 45,
  length = 200,
  width  = 8,
  color  = '#ffffff',
  opacity = 0.6,
  spread  = 20,
  animationDuration = 0.2,
  glowIntensity     = 10,
}) => {

  const baseHalf   = width / 8;
  const tipHalf    = (width + spread) / 2;
  const maxHeight  = width + spread;

  const beamPath = `
    M 0,${-baseHalf}
    L ${length},${-tipHalf}
    L ${length},${tipHalf}
    L 0,${baseHalf}
    Z
  `;

  const gradientId = React.useId();
  const glowId     = React.useId();
  const maskId     = React.useId();      

  const pad          = Math.max(15, glowIntensity * 2);
  const srcX         = pad;
  const srcY         = maxHeight / 2 + pad;
  const svgW         = length + pad * 2;
  const svgH         = maxHeight + pad * 2;
  const divOrigin    = `${srcX}px ${srcY}px`;
  const pathTranslate= `translate(${srcX}, ${srcY})`;

  const divStyle: React.CSSProperties = {
    width:  svgW,
    height: svgH,
    transform: `translate(-${srcX}px, -${srcY}px) rotate(${angle}deg)`,
    transformOrigin: divOrigin,
    pointerEvents: 'none',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute left-1/2 top-1/2 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animationDuration * 0.5, ease: 'easeInOut' }}
          style={divStyle}
        >
          <svg
            width={svgW}
            height={svgH}
            viewBox={`0 0 ${svgW} ${svgH}`}
            style={{ overflow: 'visible', filter: `drop-shadow(0 0 ${glowIntensity}px ${color})` }}
          >
            <defs>
              {/* beam gradient */}
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor={color} stopOpacity={opacity} />
                <stop offset="70%"  stopColor={color} stopOpacity={opacity * 0.6} />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>

              {/* soft glow */}
              <filter id={glowId}>
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <mask id={maskId}>
                <motion.rect
                  x="0"
                  y={-maxHeight}          
                  height={maxHeight * 2}
                  fill="white"
                  initial={{ width: 0 }}
                  animate={{ width: length }}
                  exit={{ width: 0 }}
                  transition={{ duration: animationDuration, ease: 'easeInOut' }}
                />
              </mask>
            </defs>

            <motion.path
              d={beamPath}
              fill={`url(#${gradientId})`}
              filter={`url(#${glowId})`}
              transform={pathTranslate}
              mask={`url(#${maskId})`}      
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            />

            <motion.path
              d={beamPath}
              fill={`url(#${gradientId})`}
              transform={pathTranslate}
              mask={`url(#${maskId})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightBeam;
