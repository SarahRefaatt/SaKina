
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageCoinRoll() {
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    // Auto-start the animation when component mounts
    setIsRolling(true);
    
    // Stop animation after it completes
    const timer = setTimeout(() => {
      setIsRolling(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // const restartAnimation = () => {
  //   setIsRolling(false);
  //   setTimeout(() => setIsRolling(true), 50);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        3D Coin Roll Animation
      </h1>
      
      <div className="relative w-80 h-80 flex items-center justify-center mb-12">
        {/* 3D perspective container */}
        <div className="relative w-64 h-64 perspective-1000">
          {/* The coin with front and back faces */}
          <div className={`relative w-full h-full transition-transform duration-1000 ${isRolling ? 'animate-coin-roll' : ''}`}>
            {/* Coin front */}
            <div className="absolute inset-0 rounded-full overflow-hidden backface-hidden">
              <Image
              width={160}
                    height={160}
                src="/assets/IMG.JPG" 
                alt="Coin Front" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-full border-4 border-yellow-300/50 shadow-lg" />
            </div>
            
            {/* Coin back */}
            <div className="absolute inset-0 rounded-full overflow-hidden backface-hidden rotate-y-180 bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center">
                            <Image
                            width={160}
                    height={160}
                src="/assets/IMG - Copy.JPG"

                alt="Coin Front" 
                className="w-full h-full object-cover"
              />
            </div>
            
          
          </div>
        </div>
        
        {/* Shadow */}
        <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black rounded-full blur-md transition-all duration-300 ${isRolling ? 'opacity-50 scale-110' : 'opacity-30 scale-100'}`} />
        
        {/* Reflection on ground */}
        <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-36 h-3 bg-black-400/10 rounded-full blur-sm transition-all duration-300 ${isRolling ? 'opacity-30' : 'opacity-10'}`} />
      </div>
      
     
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes coin-roll {
          0% {
            transform: rotateY(0deg) translateZ(0) rotateZ(0deg);
            animation-timing-function: cubic-bezier(0.2, 0.7, 0.3, 0.9);
          }
          15% {
            transform: rotateY(270deg) translateZ(15px) rotateZ(5deg);
            animation-timing-function: cubic-bezier(0.3, 0.8, 0.4, 0.9);
          }
          30% {
            transform: rotateY(540deg) translateZ(0) rotateZ(0deg);
            animation-timing-function: cubic-bezier(0.4, 0.8, 0.5, 0.9);
          }
          45% {
            transform: rotateY(810deg) translateZ(-10px) rotateZ(-3deg);
            animation-timing-function: cubic-bezier(0.5, 0.8, 0.6, 0.9);
          }
          60% {
            transform: rotateY(1080deg) translateZ(0) rotateZ(0deg);
            animation-timing-function: cubic-bezier(0.6, 0.8, 0.7, 0.9);
          }
          75% {
            transform: rotateY(1260deg) translateZ(5px) rotateZ(2deg);
            animation-timing-function: cubic-bezier(0.7, 0.8, 0.8, 0.9);
          }
          90% {
            transform: rotateY(1440deg) translateZ(0) rotateZ(0deg);
            animation-timing-function: cubic-bezier(0.8, 0.9, 0.9, 1);
          }
          100% {
            transform: rotateY(1620deg) translateZ(0) rotateZ(0deg);
          }
        }
        
        .animate-coin-roll {
          animation: coin-roll 2s forwards;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}