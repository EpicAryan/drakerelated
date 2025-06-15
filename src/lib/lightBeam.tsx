'use client'

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
  width = 8, 
  color = '#ffffff',
  opacity = 0.6,
  spread = 20,
  animationDuration = 0.3,
  glowIntensity = 10,
}) => {

  const baseActualHalfWidth = width / 8; 
  const tipTotalWidthFromProps = width + spread; 
  const tipActualHalfWidth = tipTotalWidthFromProps / 2;
  const maxPathHeight = tipTotalWidthFromProps; 

  const createBeamPath = (currentPathLength: number) => {
    return `
      M 0,${-baseActualHalfWidth}
      L ${currentPathLength},${-tipActualHalfWidth}
      L ${currentPathLength},${tipActualHalfWidth}
      L 0,${baseActualHalfWidth}
      Z
    `;
  };

  const gradientId = `beam-gradient-${Math.random().toString(36).substr(2, 9)}`;
  const glowId = `beam-glow-${Math.random().toString(36).substr(2, 9)}`;


 
  const svgInternalPadding = Math.max(15, glowIntensity * 2); 


  const beamSourceInSvgX = svgInternalPadding;
  const beamSourceInSvgY = (maxPathHeight / 2) + svgInternalPadding; 

  const svgElementWidth = length + 2 * svgInternalPadding;
  const svgElementHeight = maxPathHeight + 2 * svgInternalPadding;

  const divTransformOrigin = `${beamSourceInSvgX}px ${beamSourceInSvgY}px`;

  const pathTransformInSvg = `translate(${beamSourceInSvgX}, ${beamSourceInSvgY})`;

  const divStyle: React.CSSProperties = {
    width: `${svgElementWidth}px`,   
    height: `${svgElementHeight}px`,
    transform: `translate(-${beamSourceInSvgX}px, -${beamSourceInSvgY}px) rotate(${angle}deg)`,
    transformOrigin: divTransformOrigin,
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
          transition={{ duration: animationDuration, ease: 'easeInOut' }}
          style={divStyle} 
        >
          <svg
            width={svgElementWidth}
            height={svgElementHeight}
            viewBox={`0 0 ${svgElementWidth} ${svgElementHeight}`}
            style={{
              overflow: 'visible',
              filter: `drop-shadow(0 0 ${glowIntensity}px ${color})`,
            }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} stopOpacity={opacity} />
                <stop offset="70%" stopColor={color} stopOpacity={opacity * 0.6} />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
              <filter id={glowId}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <motion.path
              fill={`url(#${gradientId})`}
              filter={`url(#${glowId})`}
              transform={pathTransformInSvg}
              initial={{ d: createBeamPath(0), opacity: 0 }}
              animate={{ d: createBeamPath(length), opacity: 1 }}
              exit={{ d: createBeamPath(0), opacity: 0 }}
              transition={{ duration: animationDuration, ease: 'easeInOut' }}
            />
            
            <motion.path
              fill={`url(#${gradientId})`}
              transform={pathTransformInSvg}
              initial={{ d: createBeamPath(0), opacity: 0 }}
              animate={{ d: createBeamPath(length), opacity: 0.4 }}
              exit={{ d: createBeamPath(0), opacity: 0 }}
              transition={{ duration: animationDuration, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightBeam;
