// 'use client'

// import React from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import Image from 'next/image';
// import { Check } from 'lucide-react';
// import type { LucideIcon } from 'lucide-react';

// export interface HotspotCardData {
//   id: string;
//   x: number;
//   y: number;
//   title: string;
//   description: string;
//   image: string;
//   cardPosition?: 'top' | 'bottom' | 'left' | 'right';
 
//   brand?: string;
//   productName?: string;
//   features?: string[];
//   featuresWithIcons?: Array<{
//     text: string;
//     icon: LucideIcon;
//   }>;
//   price?: string;
//   buttonText?: string;
//   imageWidth?: number | string;
//   imageHeight?: number | string;
//   imageClassName?: string;
// }

// interface HotspotCardProps {
//   hotspot: HotspotCardData;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const HotspotCard: React.FC<HotspotCardProps> = ({ hotspot, isOpen }) => {


//   // Default features if none provided
//   const defaultFeatures = [
//     'Full HD 1080p resolution',
//     'Two-way audio',
//     'Wi-Fi and Ethernet support',
//     'Voice assistant compatible',
//     'MicroSD card support',
//     'Night vision'
//   ];

//   const brand = hotspot.brand || 'Tp-Link';
//   const productName = hotspot.productName || hotspot.title;
//   const buttonText = hotspot.buttonText || 'Add to Cart';

//   const displayFeatures = hotspot.featuresWithIcons || 
//     (hotspot.features || defaultFeatures).map(feature => ({
//       text: feature,
//       icon: Check
//     }));

//   const getCardPosition = () => {
//     const position = hotspot.cardPosition || 'top';
//     const baseClasses = "absolute z-50";
    
//     switch (position) {
//       case 'top':
//         return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-12`;
//       case 'bottom':
//         return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-12`;
//       case 'left':
//         return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 mr-12`;
//       case 'right':
//         return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 ml-12`;
//       default:
//         return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-12`;
//     }
//   };

//   const getCardAnimation = () => {
//     const position = hotspot.cardPosition || 'top';
    
//     switch (position) {
//       case 'top':
//         return {
//           initial: { opacity: 0, y: 20, scale: 0.8 },
//           animate: { opacity: 1, y: 0, scale: 1 },
//           exit: { opacity: 0, y: 20, scale: 0.8 }
//         };
//       case 'bottom':
//         return {
//           initial: { opacity: 0, y: -20, scale: 0.8 },
//           animate: { opacity: 1, y: 0, scale: 1 },
//           exit: { opacity: 0, y: -20, scale: 0.8 }
//         };
//       case 'left':
//         return {
//           initial: { opacity: 0, x: 20, scale: 0.8 },
//           animate: { opacity: 1, x: 0, scale: 1 },
//           exit: { opacity: 0, x: 20, scale: 0.8 }
//         };
//       case 'right':
//         return {
//           initial: { opacity: 0, x: -20, scale: 0.8 },
//           animate: { opacity: 1, x: 0, scale: 1 },
//           exit: { opacity: 0, x: -20, scale: 0.8 }
//         };
//       default:
//         return {
//           initial: { opacity: 0, y: 20, scale: 0.8 },
//           animate: { opacity: 1, y: 0, scale: 1 },
//           exit: { opacity: 0, y: 20, scale: 0.8 }
//         };
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className={`${getCardPosition()}`}
//           {...getCardAnimation()}
//           transition={{
//             duration: 0.3,
//             ease: "easeInOut"
//           }}
//         >
//           <div className="relative w-96 min-h-140 rounded-3xl overflow-hidden lg:drop-shadow-2xl text-black ">
//             <div className="absolute w-full h-70 flex justify-center items-center bg-white">
//               <div className={hotspot.imageClassName ?? "w-40 h-28"}>
//                 <Image
//                   src={hotspot.image}
//                   alt={productName}
//                   width={0}
//                   height={0}
//                   sizes="100vw"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>


//             {/* Content Section - black background */}
//             <div className="absolute bottom-0 text-white p-4 pt-4">
//               {/* Background SVG */}
//               <svg
//                 className="absolute inset-0 w-full h-full z-0"
//                 viewBox="0 0 622 498"
//                 preserveAspectRatio="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M0 57.0453V32C0 14.3269 14.3269 0 32 0H158.155C165.798 0 173.189 2.73563 178.99 7.71196L227.51 49.3333C233.311 54.3096 240.702 57.0453 248.345 57.0453H590C607.673 57.0453 622 71.3722 622 89.0453V466C622 483.673 607.673 498 590 498H32C14.3269 498 0 483.673 0 466V57.0453Z"
//                   fill="#101010"
//                 />
//               </svg>

//               {/* Content overlayed on top of SVG */}
//               <div className="relative z-10">
//                 <div className="text-sm text-gray-400 font-mono mb-1 flex items-center">
//                    <Image
//                     src={brand}
//                     alt="Brand logo"
//                     width={60}
//                     height={20}
//                     className="h-5 w-auto object-contain"
//                   />
//                 </div>
//                 <h3 className="text-xl font-bold mt-4 mb-2">{productName}</h3>
//                 <p className="text-xs text-[#EAEAEA] leading-normal mb-3">
//                   {hotspot.description}
//                 </p>
                
//                 {/* Features with custom icons */}
//                 <div className="grid grid-cols-2 gap-2 text-xs text-[#AEAEAE] mb-4">
//                   {displayFeatures.map((feature, index) => {
//                     const IconComponent = feature.icon;
//                     return (
//                       <motion.div 
//                         key={index} 
//                         className="flex items-center space-x-3"
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                       >
//                         {/* Dynamic icon based on feature */}
//                         <div className="flex-shrink-0">
//                           <IconComponent 
//                             className="w-3 h-3 text-blue-400" 
//                             strokeWidth={1.5}
//                           />
//                         </div>
//                         <span className="text-xs">{feature.text}</span>
//                       </motion.div>
//                     );
//                   })}
//                 </div>

//                 <motion.button
//                   className="w-full bg-white text-black font-semibold py-2 px-6 rounded-xl lg:hover:bg-gray-100 transition-colors duration-200"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     console.log("Add to cart clicked for:", productName);
//                   }}
//                 >
//                   {buttonText}
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default HotspotCard;

'use client'

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface HotspotCardData {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  image: string;
  cardPosition?: 'top' | 'bottom' | 'left' | 'right';
 
  brand?: string;
  productName?: string;
  features?: string[];
  featuresWithIcons?: Array<{
    text: string;
    icon: LucideIcon;
  }>;
  price?: string;
  buttonText?: string;
  imageWidth?: number | string;
  imageHeight?: number | string;
  imageClassName?: string;
}

interface HotspotCardProps {
  hotspot: HotspotCardData;
  isOpen: boolean;
  onClose: () => void;
}

const HotspotCard: React.FC<HotspotCardProps> = ({ hotspot, isOpen }) => {

  // Default features if none provided
  const defaultFeatures = [
    'Full HD 1080p resolution',
    'Two-way audio',
    'Wi-Fi and Ethernet support',
    'Voice assistant compatible',
    'MicroSD card support',
    'Night vision'
  ];

  const brand = hotspot.brand || 'Tp-Link';
  const productName = hotspot.productName || hotspot.title;
  const buttonText = hotspot.buttonText || 'Add to Cart';

  const displayFeatures = hotspot.featuresWithIcons || 
    (hotspot.features || defaultFeatures).map(feature => ({
      text: feature,
      icon: Check
    }));

  const getCardPosition = () => {
    const position = hotspot.cardPosition || 'top';
    const baseClasses = "absolute z-50";
    
    switch (position) {
      case 'top':
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-6 sm:mb-12`;
      case 'bottom':
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-6 sm:mt-12`;
      case 'left':
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 mr-6 sm:mr-12`;
      case 'right':
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 ml-6 sm:ml-12`;
      default:
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-6 sm:mb-12`;
    }
  };

  const getCardAnimation = () => {
    const position = hotspot.cardPosition || 'top';
    
    switch (position) {
      case 'top':
        return {
          initial: { opacity: 0, y: 20, scale: 0.8 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 20, scale: 0.8 }
        };
      case 'bottom':
        return {
          initial: { opacity: 0, y: -20, scale: 0.8 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -20, scale: 0.8 }
        };
      case 'left':
        return {
          initial: { opacity: 0, x: 20, scale: 0.8 },
          animate: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: 20, scale: 0.8 }
        };
      case 'right':
        return {
          initial: { opacity: 0, x: -20, scale: 0.8 },
          animate: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: -20, scale: 0.8 }
        };
      default:
        return {
          initial: { opacity: 0, y: 20, scale: 0.8 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 20, scale: 0.8 }
        };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${getCardPosition()}`}
          {...getCardAnimation()}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <div className="relative w-72 sm:w-96 h-120 sm:h-140 rounded-3xl overflow-hidden lg:drop-shadow-2xl text-black max-w-[90vw]">
            <div className="absolute w-full h-64 sm:h-70 flex justify-center items-center bg-white">
              <div className={hotspot.imageClassName ?? "w-32 h-24 sm:w-40 sm:h-28"}>
                <Image
                  src={hotspot.image}
                  alt={productName}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Section - black background */}
            <div className="absolute bottom-0 text-white p-3 sm:p-4 pt-4">
              {/* Background SVG - responsive viewBox */}
              <svg
                className="absolute inset-0 w-full h-full z-0"
                viewBox="0 0 622 498"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 57.0453V32C0 14.3269 14.3269 0 32 0H158.155C165.798 0 173.189 2.73563 178.99 7.71196L227.51 49.3333C233.311 54.3096 240.702 57.0453 248.345 57.0453H590C607.673 57.0453 622 71.3722 622 89.0453V466C622 483.673 607.673 498 590 498H32C14.3269 498 0 483.673 0 466V57.0453Z"
                  fill="#101010"
                />
              </svg>

              {/* Content overlayed on top of SVG */}
              <div className="relative z-10">
                <div className="text-sm text-gray-400 font-mono mb-1 flex items-center">
                   <Image
                    src={brand}
                    alt="Brand logo"
                    width={60}
                    height={20}
                    className="h-4 sm:h-5 w-auto object-contain"
                  />
                </div>
                <h3 className="text-base sm:text-xl font-bold mt-3 sm:mt-4 sm:mb-2">{productName}</h3>
                <p className="text-[10px] sm:text-xs text-[#EAEAEA] leading-normal mb-3">
                  {hotspot.description}
                </p>
                
                {/* Features - responsive grid with scrollable single column on mobile */}
                <div className="mb-4">
                  {/* Desktop: 2 columns */}
                  <div className="hidden sm:grid grid-cols-2 gap-2 text-xs text-[#AEAEAE]">
                    {displayFeatures.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <motion.div 
                          key={index} 
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex-shrink-0">
                            <IconComponent 
                              className="w-3 h-3 text-blue-400" 
                              strokeWidth={1.5}
                            />
                          </div>
                          <span className="text-xs">{feature.text}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Mobile: Scrollable single column showing 4.5 items */}
                  <div className="sm:hidden">
                    <div 
                      className="overflow-y-auto scrollbar-hide space-y-[1px] text-[10px] text-[#AEAEAE]"
                      style={{ maxHeight: '112px' }} // Roughly 4.5 items (24px per item)
                    >
                      {displayFeatures.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                          <motion.div 
                            key={index} 
                            className="flex items-center space-x-3 min-h-[24px]"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex-shrink-0">
                              <IconComponent 
                                className="w-3 h-3 text-blue-400" 
                                strokeWidth={1.5}
                              />
                            </div>
                            <span className="text-xs">{feature.text}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* Scroll indicator for mobile */}
                    {displayFeatures.length > 4 && (
                        <div className="flex justify-center mt-2">
                          <div className="animate-bounce text-gray-400 text-[10px]">▼</div>
                        </div>
                    )}
                  </div>
                </div>

                <motion.button
                  className="w-full bg-white text-black font-semibold py-2 px-4 sm:px-6 rounded-xl lg:hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Add to cart clicked for:", productName);
                  }}
                >
                  {buttonText}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Custom scrollbar styles */}
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;  /* Internet Explorer 10+ */
              scrollbar-width: none;  /* Firefox */
            }
            .scrollbar-hide::-webkit-scrollbar { 
              display: none;  /* Safari and Chrome */
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HotspotCard;
