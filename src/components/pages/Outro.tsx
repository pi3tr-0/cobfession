import { useState, useEffect } from "react";
import { Card } from "../retroui/Card";

interface OutroProps {
  onComplete?: () => void;
}

function Outro({ onComplete }: OutroProps) {
  // Array of 26 texts that will rotate every 4.23 seconds
  const rotatingTexts = [
    "And in those 31 days, I’ve learned so much about u",
    "i’ve learned of the things that made u who u are today", 
    "i’ve learned how eye-contacts with u makes u go crazy just like how ur smirk makes me go crazy",
    "i’ve learned how much you love your family and respect your parents",
    "i’ve learned how much you’ve been hurt before and how much i still don’t know about u",
    "i acknowledge the challenges that will come with being in a relationship, ",
    "moreover one separated by the atlantic ocean, ",
    "but i sanggup redah lautan api 4 u so apa la sangat 5.5k km ",
    "(idono how to swim but if it means i get to see u i'll do it anyways)",
    "i love our transparency, ",
    "i love the trust that we have in each other, ",
    "i love our maturity, ",
    "i love how we share all our braincells, ",
    "i love the countless moments we end up doing the same thing, ",
    "i love how you don't bombard me with love when you didn't mean it. ",
    "i love how natural everything feels with you. ",
    "i love how i have no reason to not love you.",
    "if 27 days is enough to make me feel all this, ",
    "i'd be dumb to let this all go. ",
    "i know for a fact that the years i'd live with you will be accompanied by blood, sweat, and tears ",
    "but i also know that these years will make me feel complete. ",
    "i know that the life i live with you will be fulfilling, exciting, memorable, happy and content. ",
    "im excited to live the rest of my life with you",
    "exploring the world, having each other's back and most importantly being a part of each other's world.",
    "i'm ready to be a part of your world. ",
    "are you ready to be a part of mine? ",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => {
        // If we're at the last text, don't change or fade
        if (prevIndex === rotatingTexts.length - 1) {
          return prevIndex;
        }
        
        // Start fade out for all other texts
        setIsTransitioning(true);
        
        setTimeout(() => {
          // Change text after fade out
          setCurrentTextIndex(prevIndex + 1);
          
          // Fade back in (unless it's the last text)
          setTimeout(() => {
            setIsTransitioning(false);
          }, 200);
        }, 200);
        
        return prevIndex;
      });
    }, 4230); // 4.23 seconds

    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      {/* Video Card */}
      <div className="w-[400px] h-[600px] p-6 bg-gray-200 border-2 border-black rounded-lg">
        <video 
          className="w-full h-full object-cover rounded-lg relative z-10"
          controls
          autoPlay
          src="/vid/vid.mp4"
          onError={(e) => console.log('Video error:', e)}
          onLoadStart={() => console.log('Video loading started')}
          onLoadedData={() => console.log('Video loaded successfully')}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Rotating Text */}
      <h2 className={`text-2xl text-center font-bold text-black font-barrio transition-opacity duration-200 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}>
        {rotatingTexts[currentTextIndex]}
      </h2>
    </div>
  );
}

export default Outro;