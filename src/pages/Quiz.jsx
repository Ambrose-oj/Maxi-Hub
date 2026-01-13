import { useState } from 'react';

const Quiz = () => {
  // 1. Track which question the user is on
  const [currentStep, setCurrentStep] = useState(0);

  // 2. Define the different question sets
  const quizSteps = [
    {
      question: "How do you want to feel today?",
      sub: "Feel Today?",
      moods: ['Powerful', 'Elegant', 'Mysterious', 'Fresh']
    },
    {
      question: "Which setting calls to you?",
      sub: "The Vibe?",
      moods: ['Sun-drenched Coast', 'Midnight Forest', 'Urban Skyline', 'Secret Garden']
    },
    {
      question: "Choose your core essence.",
      sub: "The Note?",
      moods: ['Deep Wood', 'Bright Citrus', 'Soft Petals', 'Warm Spice']
    }
  ];

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Logic for the final result goes here later!
      alert("Finding your signature scent...");
    }
  };

  const step = quizSteps[currentStep];

  return (
    <div className="pt-32 px-6 flex flex-col items-center min-h-screen bg-canvas animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl text-ink mb-4 italic tracking-wide">Scent Finder</h2>
        <p className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">Identify your olfactory signature</p>
      </div>

      <div className="w-full max-w-lg backdrop-blur-md bg-white/10 border border-ink/5 p-10 md:p-16 rounded-sm">
        <p className="font-serif text-2xl md:text-3xl text-center text-ink/90 mb-12 italic leading-relaxed">
          {step.question} <br /> 
          <span className="not-italic uppercase tracking-[0.2em] text-sm opacity-60">{step.sub}</span>
        </p>

        <div className="grid grid-cols-1 gap-4">
          {step.moods.map((mood) => (
            <button
              key={mood}
              onClick={handleNext} // Moves to the next set of moods!
              className="group relative overflow-hidden border border-ink/10 py-5 px-8 text-center transition-all duration-500 hover:border-accent"
            >
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 uppercase tracking-[0.3em] text-[11px] font-medium text-ink group-hover:text-white transition-colors duration-500">
                {mood}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="mt-16 flex justify-center gap-3">
          {quizSteps.map((_, index) => (
            <div 
              key={index}
              className={`h-[2px] w-8 transition-colors duration-700 ${index <= currentStep ? 'bg-accent' : 'bg-ink/10'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;


