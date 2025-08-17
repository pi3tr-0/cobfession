import { Input } from "../retroui/Input";
import { Button } from "../retroui/Button";
import { createBobbingText } from "../../lib/utils.tsx";
import { useState } from "react";

interface QuizQsProps {
  onSubmit?: () => void;
  showQuestions?: boolean;
}

function QuizQs({ onSubmit, showQuestions = false }: QuizQsProps) {
  // Questions with different types
  const questions = [
    { question: "are u straight?", type: "choice", option1: "Yes", option2: "No" },
    { question: "are u straight according to abang grab? ", type: "choice", option1: "Yes", option2: "No" },
    { question: "are u clingy? ", type: "choice", option1: "Yes", option2: "No" },
    { question: "how tall are you?", type: "text", placeholder: "Enter your answer..." },
    { question: "do you think you're funny?", type: "text", placeholder: "Enter your answer..." },
    { question: "and for the ladies? perhaps a salad?", type: "text", placeholder: "Enter your answer..." },
    { question: "hottie hottie __", type: "text", placeholder: "Enter your answer..." },
    { question: "who's better at badminton?", type: "choice", option1: "Me", option2: "You" },
    { question: "jibby heart rate?", type: "text", placeholder: "Enter your answer..." },
    { question: "bukan kelantan kan?", type: "choice", option1: "Yes", option2: "No" },
    { question: "did andie lose a guy in 10 days?", type: "choice", option1: "Yes", option2: "No" },
    { question: "how many dates have we been on? (not enough)", type: "text", placeholder: "Enter your answer..." },
    { question: "ur fav date? why?", type: "text", placeholder: "Enter your answer..." },
    { question: "how long has it been since our first date?", type: "text", placeholder: "Enter your answer..." },
  ];

  // Placeholder texts for each question (appears after answering each question)
  const placeholderTexts = [
    "Interesting choice...",
    "Hmm, let me think about that...",
    "That's quite revealing...",
    "Good to know!",
    "I see what you did there...",
    "Classic response!",
    "Now we're getting somewhere...",
    "Competitive, I like it!",
    "That's very specific...",
    "Geography matters!",
    "Movie references, nice!",
    "Quality over quantity!",
    "Sweet memories...",
    "Time flies when you're having fun!"
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showPlaceholderText, setShowPlaceholderText] = useState(false);

  const handleSubmit = () => {
    console.log(`Question ${currentQuestionIndex + 1} answer: ${answer}`);
    
    // Start fade out
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        // Show placeholder text instead of next question
        setShowPlaceholderText(true);
        setAnswer(""); // Clear answer for next question
      } else {
        // Final question completed - scroll to 300vh
        window.scrollTo({
          top: window.innerHeight * 3, // 300vh
          behavior: 'smooth'
        });
      }
      
      // Fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  const handleChoiceClick = (selectedOption: string) => {
    console.log(`Question ${currentQuestionIndex + 1} answer: ${selectedOption}`);
    
    // Start fade out
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        // Show placeholder text instead of next question
        setShowPlaceholderText(true);
        setAnswer(""); // Clear answer for next question
      } else {
        // Final question completed - scroll to 300vh
        window.scrollTo({
          top: window.innerHeight * 3, // 300vh
          behavior: 'smooth'
        });
      }
      
      // Fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  const handlePlaceholderClick = () => {
    // Start fade out
    setIsTransitioning(true);
    
    setTimeout(() => {
      // Hide placeholder and show next question
      setShowPlaceholderText(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
      // Fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-12">
      <div className="box-border w-1/2 h-1/2 -mt-95">

        
        {/* Show content only if showQuestions is true */}
        {showQuestions && (
          <div className={`mt-32 flex flex-col items-center gap-6 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}>
            {showPlaceholderText ? (
              // Placeholder text between questions
              <h1 
                className="text-2xl text-center font-bold text-black font-barrio cursor-pointer hover:text-gray-700 transition-colors"
                onClick={handlePlaceholderClick}
              >
                {placeholderTexts[currentQuestionIndex]}
              </h1>
            ) : (
              // Regular question content
              <>
                <h1 className="text-2xl text-center font-bold text-black font-barrio">
                  {currentQuestion.question}
                </h1>
                
                {currentQuestion.type === "choice" ? (
                  // Choice buttons
                  <div className="flex gap-12">
                    <Button 
                      onClick={() => handleChoiceClick(currentQuestion.option1 || "")}
                      className="bg-[#77dd77] hover:bg-[#37b477] text-white font-barrio px-12 py-4 text-lg"
                    >
                      {currentQuestion.option1}
                    </Button>
                    <Button 
                      onClick={() => handleChoiceClick(currentQuestion.option2 || "")}
                      className="bg-[#77dd77] hover:bg-[#37b477] text-white font-barrio px-12 py-4 text-lg"
                    >
                      {currentQuestion.option2}
                    </Button>
                  </div>
                ) : (
                  // Text input
                  <div className="flex gap-4 items-center">
                    <Input
                      type="text"
                      placeholder={currentQuestion.placeholder}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-64 px-4 py-2 text-lg font-barrio"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmit();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSubmit}
                      className="bg-[#77dd77] hover:bg-[#37b477] text-white font-barrio px-8 py-2 text-lg"
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizQs;
