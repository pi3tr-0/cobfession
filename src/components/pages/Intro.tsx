import { createBobbingText } from "../../lib/utils.tsx";
import { Card } from "../retroui/Card";
import { Button } from "../retroui/Button";
import { useState } from "react";

interface IntroProps {
  onImageChange?: (isCafe: boolean) => void;
  onYesClick?: () => void;
}

function Intro({ onImageChange, onYesClick }: IntroProps) {
  const [showNoButton, setShowNoButton] = useState(true);
  const [image1Src, setImage1Src] = useState("/img/cafe1.jpeg");
  const [image2Src, setImage2Src] = useState("/img/cafe2.jpeg");
  const [headingText, setHeadingText] = useState("Is this you?");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleYesClick = () => {
    window.scrollTo({
      top: window.innerHeight * 2.1, // 200vh
      behavior: 'smooth'
    });
    onYesClick?.();
  };

  const handleNoClick = () => {
    setIsTransitioning(true);
    
    // Fade out
    setTimeout(() => {
      setImage1Src("/img/tgt1.JPG");
      setImage2Src("/img/tgt2.JPG");
      setHeadingText("Then this must be you");
      setShowNoButton(false);
      onImageChange?.(false);
      
      // Fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-48">
      <div className="w-full px-64">
        <div className="flex items-center justify-center gap-16 mb-8">
          <Card 
            src={image1Src} 
            alt="Image 1" 
            className={`w-[200px] h-64 flex-shrink-0 transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`} 
          />
          <div className="flex flex-col items-center justify-center min-w-[400px]">
            <h1 className={`text-5xl text-center font-bold text-black font-old-english tracking-wider whitespace-nowrap mb-8 transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}>
              {createBobbingText(headingText)}
            </h1>
            <div className="flex gap-4">
              <Button 
                onClick={handleYesClick}
                className={`bg-[#77dd77] hover:bg-[#37b477] text-black font-barrio px-6 py-2 transition-opacity duration-300 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
              >
                Yes
              </Button>
              {showNoButton && (
                <Button 
                  onClick={handleNoClick}
                  className={`bg-[#e34234] hover:bg-[#ce2029] text-white font-barrio px-6 py-2 transition-opacity duration-300 ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  No
                </Button>
              )}
            </div>
          </div>
          <Card 
            src={image2Src} 
            alt="Image 2" 
            className={`w-[200px] h-64 flex-shrink-0 transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`} 
          />
        </div>
      </div>
    </div>
  );
}

export default Intro;