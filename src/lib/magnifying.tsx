// import React from 'react';
// import { motion, AnimatePresence } from 'motion/react'; 

// interface MagnifyingGlassProps {
//   isVisible: boolean;
//   x: number; 
//   y: number; 
//   backgroundImage: string;
//   imageProps: { 
//     left: number;
//     top: number;
//     width: number;
//     height: number;
//   };
//   zoomLevel?: number;
//   radius?: number;
//   borderWidth?: number;
//   originalImageWidth?: number;  
//   originalImageHeight?: number; 
// }

// const MagnifyingGlass: React.FC<MagnifyingGlassProps> = ({
//   isVisible,
//   x,
//   y,
//   backgroundImage,
//   imageProps,
//   zoomLevel = 2.5,
//   radius = 120,
//   borderWidth = 4,
//   originalImageWidth,  
//   originalImageHeight, 
// }) => {
//   if (!isVisible) return null;

//   const magnifierSize = radius * 2;

//   const baseMagnificationWidth = (originalImageWidth && originalImageWidth > 0)
//                                ? originalImageWidth
//                                : imageProps.width; 
//   const baseMagnificationHeight = (originalImageHeight && originalImageHeight > 0)
//                                 ? originalImageHeight
//                                 : imageProps.height; 

//   const hotspotXOnBase = (x / 100) * baseMagnificationWidth;
//   const hotspotYOnBase = (y / 100) * baseMagnificationHeight;

//   const renderedHotspotX = (x / 100) * imageProps.width;
//   const renderedHotspotY = (y / 100) * imageProps.height;
  
//   const magnifierLeft = imageProps.left + renderedHotspotX - radius;
//   const magnifierTop = imageProps.top + renderedHotspotY - radius;
  
//   const backgroundX = radius - (hotspotXOnBase * zoomLevel);
//   const backgroundY = radius - (hotspotYOnBase * zoomLevel);
  
//   const zoomedTotalBackgroundWidth = baseMagnificationWidth * zoomLevel;
//   const zoomedTotalBackgroundHeight = baseMagnificationHeight * zoomLevel;

  

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="hidden md:block absolute pointer-events-none z-40"
//         style={{
//           left: `${magnifierLeft}px`,
//           top: `${magnifierTop}px`,
//           width: `${magnifierSize}px`,
//           height: `${magnifierSize}px`,
//         }}
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.8 }}
//         transition={{
//           duration: 0.3,
//           ease: "easeInOut"
//         }}
//       >
//         {/* Magnifying glass circle */}
//         <div
//           className="relative overflow-hidden rounded-full shadow-2xl"
//           style={{
//             width: `${magnifierSize}px`,
//             height: `${magnifierSize}px`,
//             border: `${borderWidth}px solid rgba(255, 255, 255, 0.8)`,
//             boxShadow: `
//               0 0 20px rgba(0, 0, 0, 0.3),
//               inset 0 0 20px rgba(255, 255, 255, 0.1),
//               0 0 40px rgba(59, 130, 246, 0.2)
//             `,
//           }}
//         >
//           {/* Zoomed background image */}
//           <div
//             className="absolute inset-0 bg-no-repeat" 
//             style={{
//               backgroundImage: `url(${backgroundImage})`,
//               backgroundSize: `${zoomedTotalBackgroundWidth}px ${zoomedTotalBackgroundHeight}px`,
//               backgroundPosition: `${backgroundX}px ${backgroundY}px`,
//               filter: 'contrast(110%) brightness(105%)', 
//               imageRendering: 'auto', 
//             }}
//           />
          
//           {/* Subtle overlay for better contrast */}
//           <div 
//             className="absolute inset-0"
//             style={{
//               background: `
//                 radial-gradient(circle at center, 
//                   transparent 60%, 
//                   rgba(0, 0, 0, 0.1) 90%,
//                   rgba(0, 0, 0, 0.2) 100%
//                 )
//               `,
//             }}
//           />
          
//           {/* Glass reflection effect */}
//           <div 
//             className="absolute inset-0 opacity-20"
//             style={{
//               background: `
//                 linear-gradient(135deg, 
//                   rgba(255, 255, 255, 0.6) 0%, 
//                   transparent 30%, 
//                   transparent 70%, 
//                   rgba(255, 255, 255, 0.3) 100%
//                 )
//               `,
//             }}
//           />
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default MagnifyingGlass;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MagnifyingGlassProps {
  isVisible: boolean;
  x: number;
  y: number;
  backgroundImage: string;
  magnifierImage?: string;
  imageProps: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  zoomLevel?: number;
  radius?: number;
  borderWidth?: number;
  originalImageWidth?: number;
  originalImageHeight?: number;
  magnifierImageWidth?: number;
  magnifierImageHeight?: number;
  // highlight-start
  magnifierFocusX?: number; // Add new prop
  magnifierFocusY?: number; // Add new prop
  // highlight-end
}

const MagnifyingGlass: React.FC<MagnifyingGlassProps> = ({
  isVisible,
  x,
  y,
  backgroundImage,
  magnifierImage,
  imageProps,
  zoomLevel = 2.5,
  radius = 120,
  borderWidth = 4,
  originalImageWidth,
  originalImageHeight,
  magnifierImageWidth,
  magnifierImageHeight,
  // highlight-start
  magnifierFocusX,
  magnifierFocusY,
  // highlight-end
}) => {
  if (!isVisible) return null;

  const magnifierSize = radius * 2;

  // This positioning logic for the magnifier circle itself remains unchanged.
  // It always follows the hotspot's (x, y).
  const renderedHotspotX = (x / 100) * imageProps.width;
  const renderedHotspotY = (y / 100) * imageProps.height;
  const magnifierLeft = imageProps.left + renderedHotspotX - radius;
  const magnifierTop = imageProps.top + renderedHotspotY - radius;

  // 1. Determine the coordinates to focus on for the zoom effect.
  // Use the specific focus props if they exist, otherwise fall back to the hotspot's main x/y.
  const focusX = magnifierFocusX ?? x;
  const focusY = magnifierFocusY ?? y;

  // 2. Determine which image and dimensions to use.
  const sourceImage = magnifierImage || backgroundImage;
  const baseMagnificationWidth = (magnifierImage && magnifierImageWidth)
    ? magnifierImageWidth
    : (originalImageWidth || imageProps.width);
  const baseMagnificationHeight = (magnifierImage && magnifierImageHeight)
    ? magnifierImageHeight
    : (originalImageHeight || imageProps.height);

  // 3. Perform the zoom calculation using the determined FOCUS coordinates.
  const hotspotXOnBase = (focusX / 100) * baseMagnificationWidth;
  const hotspotYOnBase = (focusY / 100) * baseMagnificationHeight;

  const backgroundX = radius - (hotspotXOnBase * zoomLevel);
  const backgroundY = radius - (hotspotYOnBase * zoomLevel);
  
  const zoomedTotalBackgroundWidth = baseMagnificationWidth * zoomLevel;
  const zoomedTotalBackgroundHeight = baseMagnificationHeight * zoomLevel;

  const zoomedContentStyle: React.CSSProperties = {
    backgroundImage: `url(${sourceImage})`,
    backgroundSize: `${zoomedTotalBackgroundWidth}px ${zoomedTotalBackgroundHeight}px`,
    backgroundPosition: `${backgroundX}px ${backgroundY}px`,
  };

  return (
    <AnimatePresence>
      <motion.div
        className="hidden md:block absolute pointer-events-none z-40"
        style={{
          left: `${magnifierLeft}px`,
          top: `${magnifierTop}px`,
          width: `${magnifierSize}px`,
          height: `${magnifierSize}px`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      >
        <div
          className="relative overflow-hidden rounded-full shadow-2xl"
          style={{
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            border: `${borderWidth}px solid rgba(255, 255, 255, 0.8)`,
            boxShadow: `
              0 0 20px rgba(0, 0, 0, 0.3),
              inset 0 0 20px rgba(255, 255, 255, 0.1),
              0 0 40px rgba(59, 130, 246, 0.2)
            `,
          }}
        >
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              ...zoomedContentStyle,
              filter: 'contrast(110%) brightness(105%)',
              imageRendering: 'auto',
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at center, 
                  transparent 60%, 
                  rgba(0, 0, 0, 0.1) 90%,
                  rgba(0, 0, 0, 0.2) 100%
                )
              `,
            }}
          />

          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.6) 0%, 
                  transparent 30%, 
                  transparent 70%, 
                  rgba(255, 255, 255, 0.3) 100%
                )
              `,
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MagnifyingGlass;
