import { Progress } from "../retroui/Progress";
import { Button } from "../retroui/Button";
import { createBobbingText } from "../../lib/utils.tsx";
import { useState, useEffect, useMemo } from "react";

interface QuickfireQsProps {
  onSubmit?: () => void;
  onComplete?: () => void;
  onHide?: () => void;
  startTimer?: boolean;
  onShowQuiz?: () => void;
  onBackgroundChange?: () => void;
}

function QuickfireQs({ onSubmit, onComplete, onHide, startTimer = false, onShowQuiz, onBackgroundChange }: QuickfireQsProps) {
  // 20 questions with their options
  const questions = [
    { question: "merc or bmw", option1: "merc", option2: "bmw" },
    { question: "ferrari or porsche", option1: "ferrari", option2: "porsche" },
    { question: "blue or red", option1: "blue", option2: "red" },
    { question: "black or white", option1: "black", option2: "white" },
    { question: "nasi or bihun", option1: "nasi", option2: "bihun" },
    { question: "mamak or tom yam", option1: "mamak", option2: "tom yam" },
    { question: "night or day", option1: "night", option2: "day" },
    { question: "sunny or rain", option1: "sunny", option2: "rain" },
    { question: "nature or city", option1: "nature", option2: "city" },
    { question: "rings or bracelet", option1: "rings", option2: "bracelet" },
    { question: "late night or early morning", option1: "late night", option2: "early morning" },
    { question: "beach or forest", option1: "beach", option2: "forest" },
    { question: "hot or cold", option1: "hot", option2: "cold" },
    { question: "tea or coffee", option1: "tea", option2: "coffee" },
    { question: "teh or milo", option1: "teh", option2: "milo" },
    { question: "sedan or suv", option1: "sedan", option2: "suv" },
    { question: "formal or streetwear", option1: "formal", option2: "streetwear" },
    { question: "uk or usa", option1: "uk", option2: "usa" },
    { question: "window seat or aisle seat", option1: "window seat", option2: "aisle seat" },
    { question: "to love or not to love", option1: "to love", option2: "not to love" }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60); // 1 minute in seconds
  const [progressValue, setProgressValue] = useState(100);
  const [glowPhase, setGlowPhase] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [showSecondYes, setShowSecondYes] = useState(true);
  const [placeholderTransitioning, setPlaceholderTransitioning] = useState(false);
  const [showPlaceholderH1, setShowPlaceholderH1] = useState(false);
  const [showPlaceholderH2, setShowPlaceholderH2] = useState(false);
  const [showPlaceholderButtons, setShowPlaceholderButtons] = useState(false);
  const [placeholderFadingOut, setPlaceholderFadingOut] = useState(false);

  // Timer effect - only starts when startTimer is true
  useEffect(() => {
    if (!startTimer || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        setProgressValue((newTime / 60) * 100);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, startTimer]);

  // Glow effect for red phase
  useEffect(() => {
    if (timeRemaining > 10) return; // Only apply glow when 10 seconds or less remaining

    const glowTimer = setInterval(() => {
      setGlowPhase(prev => (prev + 1) % 100);
    }, 50); // Faster animation for smooth glow

    return () => clearInterval(glowTimer);
  }, [timeRemaining]);

  // Calculate progress bar color
  const getProgressColor = () => {
    if (timeRemaining <= 10) {
      // Red phase with glow effect (10 seconds remaining)
      const glowIntensity = Math.sin((glowPhase / 100) * Math.PI * 2) * 0.5 + 0.5;
      const redValue = Math.round(227 * glowIntensity + 206 * (1 - glowIntensity));
      const greenValue = Math.round(66 * glowIntensity + 32 * (1 - glowIntensity));
      const blueValue = Math.round(52 * glowIntensity + 41 * (1 - glowIntensity));
      return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    } else if (timeRemaining <= 15) {
      // Dark red phase (15 seconds remaining)
      return '#cc0000';
    } else if (timeRemaining <= 30) {
      // Orange phase (30 seconds remaining)
      return '#ff964f';
    } else {
      // Default green for more than 30 seconds
      return '#77dd77';
    }
  };

  const handleOption1Click = () => {
    console.log(`Selected: ${questions[currentQuestionIndex].option1}`);
    
    // Start fade out
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Final question completed - show placeholder content at 150vh
        setShowPlaceholder(true);
        window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' });
        
        // Start h1 fade in after scroll
        setTimeout(() => {
          setShowPlaceholderH1(true);
          // Start h2 fade in after h1
          setTimeout(() => {
            setShowPlaceholderH2(true);
            // Start buttons fade in after h2
            setTimeout(() => {
              setShowPlaceholderButtons(true);
            }, 1000); // 1 second delay after h2
          }, 1000); // 1 second delay between h1 and h2
        }, 800); // Wait for scroll to complete
        
        onComplete?.();
      }
      
      // Fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 180);
    }, 180);
  };

  const handleOption2Click = () => {
    console.log(`Selected: ${questions[currentQuestionIndex].option2}`);
    
    // Start fade out
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Final question completed - show placeholder content at 150vh
        setShowPlaceholder(true);
        window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' });
        
        // Start h1 fade in after scroll
        setTimeout(() => {
          setShowPlaceholderH1(true);
          // Start h2 fade in after h1
          setTimeout(() => {
            setShowPlaceholderH2(true);
            // Start buttons fade in after h2
            setTimeout(() => {
              setShowPlaceholderButtons(true);
            }, 1000); // 1 second delay after h2
          }, 1000); // 1 second delay between h1 and h2
        }, 800); // Wait for scroll to complete
        
        onComplete?.();
      }
      
      // Fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 180);
    }, 180);
  };

  // Placeholder Yes button handlers - trigger Quiz.tsx (not QuizQs)
  const handlePlaceholderYesClick = () => {
    // Start background change transition
    onBackgroundChange?.();
    
    // Start fade out animation
    setPlaceholderFadingOut(true);
    
    // Scroll up to -100vh
    window.scrollTo({ top: window.innerHeight * -1, behavior: 'smooth' });
    
    // Show Quiz.tsx after fade out
    setTimeout(() => {
      onShowQuiz?.();
      // Hide component after triggering quiz
      setTimeout(() => {
        onHide?.();
      }, 300);
    }, 1000); // Wait for fade out animation to complete
  };

  const handlePlaceholderSecondYesClick = () => {
    // Start background change transition
    onBackgroundChange?.();
    
    // Start fade out animation for everything
    setPlaceholderFadingOut(true);
    setPlaceholderTransitioning(true);
    
    // Fade out second button
    setTimeout(() => {
      setShowSecondYes(false);
      
      setTimeout(() => {
        setPlaceholderTransitioning(false);
      }, 300);
    }, 300);
    
    // Scroll up to -100vh
    window.scrollTo({ top: window.innerHeight * -1, behavior: 'smooth' });
    
    // Show Quiz.tsx after fade out
    setTimeout(() => {
      onShowQuiz?.();
      // Hide component after triggering quiz
      setTimeout(() => {
        onHide?.();
      }, 300);
    }, 1000); // Wait for fade out animation to complete
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Create consistent bobbing text with fixed sequential delays
  const createConsistentBobbingText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block animate-[float_2s_linear_infinite]"
        style={{
          animationDelay: `${index * 0.1}s`, // Fixed sequential delay
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  // Memoize bobbing text with consistent delays
  const stablePlaceholderH1 = useMemo(() => createConsistentBobbingText("How was it?"), []);
  const stablePlaceholderH2 = useMemo(() => createConsistentBobbingText("Let's remove the time pressure hahaha :3"), []);

  return (
    <>
      {/* Main QuickfireQs content */}
      <div className="flex flex-col items-center justify-center min-h-screen pb-12">
        <div className="box-border w-1/2 h-1/2 -mt-30">
          <h1 className="text-5xl text-center font-bold text-white mb-8 font-old-english tracking-wider">
            {createBobbingText("This or That?")}
          </h1>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full max-w-md mx-auto">
            <div className="mb-4 text-center">
              <span className="text-white font-barrio text-lg">
                Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={progressValue} 
                className="h-6 bg-gray-800 border-gray-600"
              />
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(to right, ${getProgressColor()} 0%, ${getProgressColor()} ${progressValue}%, transparent ${progressValue}%, transparent 100%)`,
                  boxShadow: timeRemaining <= 60 ? `0 0 20px ${getProgressColor()}` : 'none',
                  borderRadius: 'inherit'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Buttons positioned below the main content */}
        <div className={`mt-32 flex gap-12 transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          <Button 
            onClick={handleOption1Click}
            className="bg-[#77dd77] hover:bg-[#37b477] text-white font-barrio px-12 py-4 text-lg"
          >
            {currentQuestion.option1}
          </Button>
          <Button 
            onClick={handleOption2Click}
            className="bg-[#77dd77] hover:bg-[#37b477] text-white font-barrio px-12 py-4 text-lg"
          >
            {currentQuestion.option2}
          </Button>
        </div>
      </div>

      {/* Placeholder content at 300vh */}
      {showPlaceholder && (
        <div className="absolute top-[150vh] left-0 right-0 flex flex-col items-center justify-center min-h-screen pb-12">
          <div className="box-border w-1/2 h-1/2">
            <h1 className={`text-5xl text-center font-bold text-white mb-8 font-old-english tracking-wider transition-opacity duration-1000 ${
              placeholderFadingOut ? 'opacity-0' : (showPlaceholderH1 ? 'opacity-100' : 'opacity-0')
            }`}>
              {stablePlaceholderH1}
            </h1>
            <h2 className={`text-3xl text-center font-bold text-white mb-8 font-old-english tracking-wider transition-opacity duration-1000 ${
              placeholderFadingOut ? 'opacity-0' : (showPlaceholderH2 ? 'opacity-100' : 'opacity-0')
            }`}>
              {stablePlaceholderH2} 
            </h2>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={handlePlaceholderYesClick}
                className={`bg-[#77dd77] hover:bg-[#37b477] text-white font-barrio px-6 py-2 transition-opacity duration-1000 ${
                  placeholderFadingOut || placeholderTransitioning ? 'opacity-0' : (showPlaceholderButtons ? 'opacity-100' : 'opacity-0')
                }`}
              >
                Yes
              </Button>
              {showSecondYes && (
                <Button 
                  onClick={handlePlaceholderSecondYesClick}
                  className={`bg-[#77dd77] hover:bg-[#37b477] text-white font-barrio px-6 py-2 transition-opacity duration-1000 ${
                    placeholderFadingOut || placeholderTransitioning ? 'opacity-0' : (showPlaceholderButtons ? 'opacity-100' : 'opacity-0')
                  }`}
                >
                  Yes
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuickfireQs;