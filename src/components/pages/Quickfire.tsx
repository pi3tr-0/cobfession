import { Input } from "../retroui/Input";
import { Button } from "../retroui/Button";
import { createBobbingText } from "../../lib/utils.tsx";
import { useState } from "react";

interface WelcomeProps {
  onSubmit?: () => void;
  onHide?: () => void;
  onStartTimer?: () => void;
}

function Welcome({ onSubmit, onHide, onStartTimer }: WelcomeProps) {
  const [showSecondYes, setShowSecondYes] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleYesClick = () => {
    window.scrollTo({
      top: window.innerHeight * 1.5, // 150vh
      behavior: 'smooth'
    });
    // Start the timer after scroll begins
    onStartTimer?.();
    // Hide component after scroll
    setTimeout(() => {
      onHide?.();
    }, 800); // Wait for scroll to complete
    onSubmit?.();
  };

  const handleSecondYesClick = () => {
    setIsTransitioning(true);
    
    // Fade out
    setTimeout(() => {
      setShowSecondYes(false);
      
      // Fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
    
    // Also trigger scroll to QuickfireQs
    window.scrollTo({
      top: window.innerHeight * 1.5, // 150vh
      behavior: 'smooth'
    });
    
    // Start the timer after scroll begins
    onStartTimer?.();
    
    // Hide component after scroll
    setTimeout(() => {
      onHide?.();
    }, 800); // Wait for scroll to complete
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-12">
      <div className="box-border w-1/2 h-1/2">
        <h1 className="text-5xl text-center font-bold text-white mb-8 font-old-english tracking-wider">
          {createBobbingText("Quickfire Round!")}
        </h1>
        <h2 className="text-3xl text-center font-bold text-white mb-8 font-old-english tracking-wider">
            {createBobbingText("Are you ready?")}
        </h2>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={handleYesClick}
            className={`bg-[#77dd77] hover:bg-[#37b477] text-white font-barrio px-6 py-2 transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            Yes
          </Button>
          {showSecondYes && (
            <Button 
              onClick={handleSecondYesClick}
              className={`bg-[#77dd77] hover:bg-[#37b477] text-white font-barrio px-6 py-2 transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Yes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;