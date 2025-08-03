import Welcome from "./components/pages/Welcome";
import Intro from "./components/pages/Intro";
import Quotes from "./components/pages/Quotes";
import Bg from "./Bg";
import { useState } from "react";

function App() {
  const [isCafeImages, setIsCafeImages] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [grayedSections, setGrayedSections] = useState<{
    welcome: boolean;
    intro: boolean;
    quotes: boolean;
  }>({
    welcome: false,
    intro: false,
    quotes: false
  });

  const handleWelcomeSubmit = () => {
    setShowIntro(true);
    setGrayedSections(prev => ({ ...prev, welcome: true }));
  };

  const handleIntroYes = () => {
    setShowQuotes(true);
    setGrayedSections(prev => ({ ...prev, intro: true }));
  };

  const handleQuotesH1Click = () => {
    setGrayedSections(prev => ({ ...prev, quotes: true }));
  };

  return (
    <div className="relative">
      <Bg />
      
      {/* Welcome Section (0-100vh) */}
      <div className="absolute inset-0 z-10 top-0 h-screen">
        <Welcome onSubmit={handleWelcomeSubmit} />
        <div className={`absolute inset-0 bg-gray-500 pointer-events-none transition-opacity duration-750 ease-in-out ${
          grayedSections.welcome ? 'opacity-20' : 'opacity-0'
        }`} />
      </div>
      
      {/* Intro Section (100-200vh) */}
      {showIntro && (
        <div className="absolute inset-0 z-10 top-[100vh] h-screen">
          <Intro 
            onImageChange={setIsCafeImages} 
            onYesClick={handleIntroYes}
          />
          <div className={`absolute inset-0 bg-gray-500 pointer-events-none transition-opacity duration-750 ease-in-out ${
            grayedSections.intro ? 'opacity-20' : 'opacity-0'
          }`} />
        </div>
      )}
      
      {/* Quotes Section (200-300vh) */}
      {showQuotes && (
        <div className="absolute inset-0 z-10 top-[200vh] h-screen">
          <Quotes 
            isCafeImages={isCafeImages} 
            onH1Click={handleQuotesH1Click}
          />
          <div className={`absolute inset-0 bg-gray-500 pointer-events-none transition-opacity duration-750 ease-in-out ${
            grayedSections.quotes ? 'opacity-20' : 'opacity-0'
          }`} />
        </div>
      )}
      
      <div className="h-[200vh]" />
    </div>
  );
}

export default App;
