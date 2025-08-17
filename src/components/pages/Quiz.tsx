import { Input } from "../retroui/Input";
import { Button } from "../retroui/Button";
import { createBobbingText } from "../../lib/utils.tsx";
import { useState } from "react";

interface QuizProps {
  onSubmit?: () => void;
  onBackgroundChange?: () => void;
  onComplete?: () => void;
  onYesPressed?: () => void;
}

function Quiz({ onSubmit, onBackgroundChange, onComplete, onYesPressed }: QuizProps) {
  const [showSecondYes, setShowSecondYes] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleYesClick = () => {
    // Scroll to 180vh for QuizQs
    window.scrollTo({ top: window.innerHeight * 1.8, behavior: 'smooth' });
    
    onYesPressed?.();
    onBackgroundChange?.();
    onComplete?.();
    onSubmit?.();
  };

  const handleSecondYesClick = () => {
    // Scroll to 180vh for QuizQs
    window.scrollTo({ top: window.innerHeight * 1.8, behavior: 'smooth' });
    
    onYesPressed?.();
    setIsTransitioning(true);
    
    // Fade out
    setTimeout(() => {
      setShowSecondYes(false);
      
      // Fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
    
    // Also trigger QuizQs component
    onBackgroundChange?.();
    onComplete?.();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-12">
      <div className="box-border w-1/2 h-1/2">
        <h1 className="text-5xl text-center font-bold text-black mb-8 font-old-english tracking-wider">
          {createBobbingText("Quiz Round!")}
        </h1>
        <h2 className="text-3xl text-center font-bold text-black mb-8 font-old-english tracking-wider">
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

export default Quiz;
