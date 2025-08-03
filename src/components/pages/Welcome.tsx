import { Input } from "../retroui/Input";
import { Button } from "../retroui/Button";
import { createBobbingText } from "../../lib/utils.tsx";

interface WelcomeProps {
  onSubmit?: () => void;
}

function Welcome({ onSubmit }: WelcomeProps) {
  const handleSubmit = () => {
    window.scrollTo({
      top: window.innerHeight * 1.1, // 110vh
      behavior: 'smooth'
    });
    onSubmit?.();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-12">
      <div className="box-border w-1/2 h-1/2">
        <h1 className="text-5xl text-center font-bold text-black mb-8 font-old-english tracking-wider">
          {createBobbingText("Welcome!")}
        </h1>
        <div className="flex gap-2 justify-center">
          <Input 
            type="text" 
            placeholder="Enter your name..." 
            className="w-32"
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;