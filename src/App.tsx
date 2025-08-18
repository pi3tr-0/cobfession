import Welcome from "./components/pages/Welcome";
import Intro from "./components/pages/Intro";
import Quotes from "./components/pages/Quotes";
import Quickfire from "./components/pages/Quickfire";
import QuickfireQs from "./components/pages/QuickfireQs";
import Quiz from "./components/pages/Quiz";
import QuizQs from "./components/pages/QuizQs";
import Outro from "./components/pages/Outro";
import BgLight from "./components/bg/Bg-light";
import BgDark from "./components/bg/Bg-dark";
import { useState } from "react";

function App() {
  const [isCafeImages, setIsCafeImages] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [useDarkBg, setUseDarkBg] = useState(false);
  const [bgFadeOut, setBgFadeOut] = useState(false);
  const [showQuickfire, setShowQuickfire] = useState(false);
  const [quickfireFadeIn, setQuickfireFadeIn] = useState(false);
  const [showQuickfireQs, setShowQuickfireQs] = useState(false);
  const [quickfireQsFadeIn, setQuickfireQsFadeIn] = useState(false);
  const [quickfireTimerStarted, setQuickfireTimerStarted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizFadeIn, setQuizFadeIn] = useState(false);
  const [showQuizQs, setShowQuizQs] = useState(false);
  const [quizQsFadeIn, setQuizQsFadeIn] = useState(false);
  const [quizYesPressed, setQuizYesPressed] = useState(false);
  const [showOutro, setShowOutro] = useState(false);
  const [outroFadeIn, setOutroFadeIn] = useState(false);
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
    
    // Start background fade out
    setBgFadeOut(true);
    
    // Switch to dark background after fade out
    setTimeout(() => {
      setUseDarkBg(true);
      setBgFadeOut(false);
    }, 500); // 500ms fade out
    
    // Start fade out animation
    setFadeOut(true);
    
    // Slower scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Hide all components after fade out completes
    setTimeout(() => {
      setShowAll(false);
      setFadeOut(false);
      
      // Show Quickfire component after a short delay
      setTimeout(() => {
        setShowQuickfire(true);
        // Start fade in animation
        setTimeout(() => {
          setQuickfireFadeIn(true);
        }, 50);
      }, 100);
      
          // Show QuickfireQs component at 150vh after Quickfire
    setTimeout(() => {
      setShowQuickfireQs(true);
      // Start fade in animation
      setTimeout(() => {
        setQuickfireQsFadeIn(true);
      }, 100);
    }, 1000);
    }, 800); // Reduced from 2000ms to 800ms for faster transition
  };

  const handleQuizBackgroundChange = () => {
    // Start background fade out
    setBgFadeOut(true);
    
    // Switch to light background after fade out
    setTimeout(() => {
      setUseDarkBg(false);
      setBgFadeOut(false);
    }, 500); // 500ms fade out
  };

  const handlePlaceholderBackgroundChange = () => {
    // Start background fade out
    setBgFadeOut(true);
    
    // Switch to light background after fade out
    setTimeout(() => {
      setUseDarkBg(false);
      setBgFadeOut(false);
    }, 500); // 500ms fade out
  };

  const handleQuickfireQsComplete = () => {
    // QuickfireQs is complete - no longer show Quiz.tsx
    // Placeholder content in QuickfireQs will handle the transition
  };

  const handleQuizComplete = () => {
    // Quiz is complete but QuizQs will only show when Yes is pressed
    // This function can be used for other completion logic if needed
  };

  const handleQuizYesPressed = () => {
    setQuizYesPressed(true);
    // Show QuizQs when Quiz.tsx Yes button is pressed
    setShowQuizQs(true);
    // Start fade in animation
    setTimeout(() => {
      setQuizQsFadeIn(true);
    }, 100);
  };

  const handleQuizQsComplete = () => {
    console.log('QuizQs completed! Showing Outro...');
    // Hide Quiz and QuizQs
    setShowQuiz(false);
    setQuizFadeIn(false);
    setShowQuizQs(false);
    setQuizQsFadeIn(false);
    // Show Outro when QuizQs is completed
    setShowOutro(true);
    // Start fade in animation
    setTimeout(() => {
      setOutroFadeIn(true);
      console.log('Outro should be visible now');
    }, 100);
  };

  const handleQuickfireHide = () => {
    setShowQuickfire(false);
    setQuickfireFadeIn(false);
  };

  const handleQuickfireQsHide = () => {
    setShowQuickfireQs(false);
    setQuickfireQsFadeIn(false);
  };

  const handleQuickfireTimerStart = () => {
    setQuickfireTimerStarted(true);
  };

  const handleShowQuiz = () => {
    // Show Quiz.tsx when placeholder Yes button is pressed
    setShowQuiz(true);
    // Start fade in animation
    setTimeout(() => {
      setQuizFadeIn(true);
    }, 100);
  };

  return (
    <div className="relative">
      <div className={`transition-opacity duration-500 ease-in-out ${
        bgFadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        {useDarkBg ? <BgDark /> : <BgLight />}
      </div>
      
      {showAll && (
        <div className={`transition-opacity duration-1000 ease-in-out ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}>
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
        </div>
      )}
      
      {/* Quickfire Section - appears after dark background transition */}
      {showQuickfire && (
        <div className={`absolute inset-0 z-10 top-0 h-screen transition-opacity duration-500 ease-in-out ${
          quickfireFadeIn ? 'opacity-100' : 'opacity-0'
        }`}>
          <Quickfire onHide={handleQuickfireHide} onStartTimer={handleQuickfireTimerStart} />
        </div>
      )}
      
      {/* QuickfireQs Section - appears at 150vh with progress bar */}
      {showQuickfireQs && (
        <div className={`absolute inset-0 z-10 top-[150vh] h-screen transition-opacity duration-1000 ease-in-out ${
          quickfireQsFadeIn ? 'opacity-100' : 'opacity-0'
        }`}>
          <QuickfireQs onComplete={handleQuickfireQsComplete} onHide={handleQuickfireQsHide} startTimer={quickfireTimerStarted} onShowQuiz={handleShowQuiz} onBackgroundChange={handlePlaceholderBackgroundChange} />
        </div>
      )}
      
      {/* Quiz Section - appears at 0vh */}
      {showQuiz && (
        <div className={`absolute inset-0 z-10 top-0 h-screen transition-opacity duration-1000 ease-in-out ${
          quizFadeIn ? 'opacity-100' : 'opacity-0'
        }`}>
          <Quiz onBackgroundChange={handleQuizBackgroundChange} onComplete={handleQuizComplete} onYesPressed={handleQuizYesPressed} />
        </div>
      )}
      
      {/* QuizQs Section - appears at 230vh */}
      {showQuizQs && (
        <div className={`absolute inset-0 z-10 top-[200vh] h-screen transition-opacity duration-1000 ease-in-out ${
          quizQsFadeIn ? 'opacity-100' : 'opacity-0'
        }`}>
          <QuizQs showQuestions={quizYesPressed} onComplete={handleQuizQsComplete} />
        </div>
      )}

      {/* Outro Section - appears at 300vh */}
      {showOutro && (
        <div className={`absolute inset-0 z-10 top-[300vh] h-screen transition-opacity duration-1000 ease-in-out ${
          outroFadeIn ? 'opacity-100' : 'opacity-0'
        }`}>
          <Outro />
        </div>
      )}
      
      <div className="h-[200vh]" />
    </div>
  );
}

export default App;
