import { createBobbingText } from "../../lib/utils.tsx";
import { Button } from "../retroui/Button";
import { useState } from "react";

interface QuotesProps {
  isCafeImages?: boolean;
  onH1Click?: () => void;
}

function Quotes({ isCafeImages = true, onH1Click }: QuotesProps) {
  const [clicked, setClicked] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'fadeOut' | 'fadeIn'>('idle');
  
  const text = isCafeImages 
    ? "Even the fairies are jealous of your beauty"
    : "6th track of beatopia";

  const handleClickMe = () => {
    window.open('https://genius.com/albums/Beabadoobee/Beatopia', '_blank');
  };

  const handleH1Click = () => {
    if (!clicked && transitionPhase === 'idle') {
      setTransitionPhase('fadeOut');
      
      // Fade out to white
      setTimeout(() => {
        setClicked(true);
        setTransitionPhase('fadeIn');
        // Fade in from white
        setTimeout(() => {
          setTransitionPhase('idle');
        }, 300);
      }, 300);
    }
    
    // Only scroll and apply overlay when the text has been changed
    if (clicked) {
      window.scrollTo({
        top: window.innerHeight * 3, // 300vh
        behavior: 'smooth'
      });
      // Apply overlay when changed text is pressed
      onH1Click?.();
    }
  };

  const displayText = clicked ? "Let's get to know you better!" : text;

  const getTextColor = () => {
    if (transitionPhase === 'fadeOut') return 'text-white';
    if (transitionPhase === 'fadeIn') return 'text-white';
    return 'text-black';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-48">
      <div className="w-full px-64">
        <div className="flex items-center justify-center gap-4">
          <h1 
            className={`text-5xl text-center font-bold font-old-english tracking-wider cursor-pointer hover:opacity-80 transition-all duration-300 ${getTextColor()}`}
            onClick={handleH1Click}
          >
            {createBobbingText(displayText)}
          </h1>
          {!isCafeImages && !clicked && (
            <Button 
              onClick={handleClickMe}
              className="bg-[#ffd900] hover:bg-[#ffbf00] text-black font-barrio px-6 py-2"
            >
              click me!
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quotes; 