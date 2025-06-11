'use client'

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface LightBeamProps {
  isVisible: boolean;
  angle?: number; // Angle in degrees (0 = right, 90 = down, 180 = left, 270 = up)
  length?: number; // Length of the beam in pixels
  width?: number; // Width of the beam at the base
  color?: string; // Color of the beam
  opacity?: number; // Opacity of the beam
  spread?: number; // How much the beam spreads (cone effect)
  animationDuration?: number; // Duration of the fade in/out animation
  glowIntensity?: number; // Intensity of the glow effect
}

const LightBeam: React.FC<LightBeamProps> = ({
  isVisible,
  angle = 45,
  length = 200,
  width = 8,
  color = '#ffffff',
  opacity = 0.6,
  spread = 20,
  animationDuration = 0.3,
  glowIntensity = 10,
}) => {
  // Calculate beam dimensions
  const beamEndWidth = width + spread;
  
  // Create SVG path for the beam cone
  const createBeamPath = () => {
    const halfWidth = width / 8;
    const halfEndWidth = beamEndWidth / 2;
    
    return `
      M 0,${-halfWidth}
      L ${length},${-halfEndWidth}
      L ${length},${halfEndWidth}
      L 0,${halfWidth}
      Z
    `;
  };

  // Create gradient for the beam effect
  const gradientId = `beam-gradient-${Math.random().toString(36).substr(2, 9)}`;
  const glowId = `beam-glow-${Math.random().toString(36).substr(2, 9)}`;


  const offset = 8;
  const rad = (angle * Math.PI) / 180;
  const offsetX = Math.cos(rad) * offset;
  const offsetY = Math.sin(rad) * offset;
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animationDuration, ease: 'easeInOut' }}
          className="absolute pointer-events-none"
         style={{
            transformOrigin: '0 50%',
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${angle}deg)`
          }}
        >
          <svg
            width={length + 20}
            height={beamEndWidth + 40}
            style={{
              overflow: 'visible',
              filter: `drop-shadow(0 0 ${glowIntensity}px ${color})`,
            }}
            className="absolute"
            viewBox={`0 0 ${length + 20} ${beamEndWidth + 40}`}
          >
            <defs>
              {/* Gradient for beam fade effect */}
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} stopOpacity={opacity} />
                <stop offset="70%" stopColor={color} stopOpacity={opacity * 0.6} />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
              
              {/* Glow filter */}
              <filter id={glowId}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Main beam */}
            <motion.path
              d={createBeamPath()}
              fill={`url(#${gradientId})`}
              filter={`url(#${glowId})`}
              transform={`translate(20, ${(beamEndWidth + 40) / 2})`}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ 
                duration: animationDuration, 
                ease: 'easeInOut'
              }}
            />
            
            {/* Additional glow layer for intensity */}
            <motion.path
              d={createBeamPath()}
              fill={`url(#${gradientId})`}
              opacity={0.4}
              transform={`translate(20, ${(beamEndWidth + 40) / 2})`}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.4 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ 
                duration: animationDuration, 
                ease: 'easeInOut'
              }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightBeam;
