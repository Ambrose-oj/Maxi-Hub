import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../../data/Products.jsx'; 

const Quiz = () => {
  const { addToCart } = useCart();

  // Track which question the user is on
  const [currentStep, setCurrentStep] = useState(0);
  
  // Track user's selected answers
  const [answers, setAnswers] = useState([]);
  
  // Recommendation result
  const [recommendation, setRecommendation] = useState(null);
  
  // Loading state for dramatic reveal
  const [isFinding, setIsFinding] = useState(false);

  // Define the different question sets
  const quizSteps = [
    {
      question: "How do you want to feel today?",
      sub: "Feel Today?",
      moods: ["Powerful", "Elegant", "Mysterious", "Fresh"]
    },
    {
      question: "Which setting calls to you?",
      sub: "The Vibe?",
      moods: ["Sun-drenched Coast", "Midnight Forest", "Urban Skyline", "Secret Garden"]
    },
    {
      question: "Choose your core essence.",
      sub: "The Note?",
      moods: ["Deep Wood", "Bright Citrus", "Soft Petals", "Warm Spice"]
    }
  ];

  const handleNext = (selectedMood) => {
    const newAnswers = [...answers, selectedMood];
    setAnswers(newAnswers);

    if (currentStep < quizSteps.length - 1) {
      // Move to next question
      setCurrentStep(currentStep + 1);
    } else {
      // Quiz complete → find recommendation
      setIsFinding(true);

      setTimeout(() => {
        let match = null;

        // Primary mood = first answer
        const primaryMood = newAnswers[0]?.toLowerCase();

        // 1. Exact match on primary mood
        match = products.find(p => 
          p.mood?.toLowerCase() === primaryMood
        );

        // 2. If no exact match, look for any answer in mood
        if (!match) {
          for (const ans of newAnswers) {
            match = products.find(p => 
              p.mood?.toLowerCase().includes(ans.toLowerCase())
            );
            if (match) break;
          }
        }

        // 3. Final fallback: truly random product
        if (!match && products.length > 0) {
          match = products[Math.floor(Math.random() * products.length)];
        }

        setRecommendation(match);
        setIsFinding(false);
      }, 2000); // 2-second "thinking" delay
    }
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRecommendation(null);
    setIsFinding(false);
  };

  const step = quizSteps[currentStep];

  return (
    <div className="pt-32 pb-12 px-6 flex flex-col items-center min-h-screen bg-canvas animate-fade-in">
      {/* Result Screen */}
      {recommendation ? (
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl text-ink italic tracking-wide mb-8">
            Your Signature Scent
          </h2>
          <p className="text-xl italic text-ink/80 mb-12">
            Based on your choices, this is the perfect fragrance for you today.
          </p>

          <div className="bg-white/10 backdrop-blur rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={recommendation.image}
              alt={recommendation.name}
              className="w-full h-96 object-cover"
            />
            <div className="p-10">
              <h3 className="font-serif text-2xl tracking-[0.2em] text-ink mb-4">
                {recommendation.name}
              </h3>
              <p className="text-2xl font-medium text-accent tracking-wider mb-4">
                NGN {recommendation.price}
              </p>
              <p className="text-sm uppercase tracking-[0.4em] text-ink/60 mb-8">
                {recommendation.mood}
              </p>
              <button
                onClick={() => addToCart(recommendation)}
                className="m-auto text-[10px] uppercase tracking-[0.2em] px-6 py-2 hover:bg-ink active:bg-ink hover:text-white active:text-white transition-all border border-ink/20 py-3"
              >
                Add to bag
              </button>
            </div>
          </div>

          <button
            onClick={restartQuiz}
            className="mt-12 text-sm uppercase tracking-[0.2em] text-ink/60 hover:text-ink active:text-ink transition"
          >
            Retake Quiz →
          </button>
        </div>
      ) : (
        <>
          {/* Quiz Questions */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-ink mb-4 italic tracking-wide">
              Scent Finder
            </h2>
            <p className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">
              Identify your olfactory signature
            </p>
          </div>

          <div className="w-full max-w-lg backdrop-blur-md bg-white/10 border border-ink/5 p-10 md:p-16 rounded-sm">
              <p className="font-serif text-2xl md:text-3xl text-center text-ink/90 mb-12 italic leading-relaxed">
                {step.question} <br /> 
                <span className="not-italic uppercase tracking-[0.2em] text-sm opacity-60">{step.sub}</span>
              </p>

            <div className="grid grid-cols-1 gap-4 mt-12">
              {step.moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleNext(mood)} 
                  className="group relative overflow-hidden border border-ink/10 py-5 px-8 text-center transition-all duration-500 hover:border-accent active:border-accent"
                >
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 uppercase tracking-[0.3em] text-[11px] font-medium text-ink group-hover:text-white group-active:text-white transition-colors duration-500">
                    {mood}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-12 flex justify-center gap-3">
            {quizSteps.map((_, index) => (
              <div
                key={index}
                className={`h-[2px] w-8 transition-colors duration-700 ${
                  index <= currentStep ? 'bg-accent' : 'bg-ink/10'
                }`}
              />
            ))}
          </div>

          {/* Loading Message */}
          {isFinding && (
            <div className="fixed inset-0 bg-canvas/90 backdrop-blur flex items-center justify-center z-50">
              <p className="font-serif text-2xl text-ink italic">
                Finding your signature scent...
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;






// OLD SCENT FINDER IDEA

// import { useState } from 'react';

// const Quiz = () => {
//   // 1. Track which question the user is on
//   const [currentStep, setCurrentStep] = useState(0);

//   // 2. Define the different question sets
//   const quizSteps = [
//     {
//       question: "How do you want to feel today?",
//       sub: "Feel Today?",
//       moods: ['Powerful', 'Elegant', 'Mysterious', 'Fresh']
//     },
//     {
//       question: "Which setting calls to you?",
//       sub: "The Vibe?",
//       moods: ['Sun-drenched Coast', 'Midnight Forest', 'Urban Skyline', 'Secret Garden']
//     },
//     {
//       question: "Choose your core essence.",
//       sub: "The Note?",
//       moods: ['Deep Wood', 'Bright Citrus', 'Soft Petals', 'Warm Spice']
//     }
//   ];

//   const handleNext = () => {
//     if (currentStep < quizSteps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       // Logic for the final result goes here later!
//       alert("Finding your signature scent...");
//     }
//   };

//   const step = quizSteps[currentStep];

//   return (
//     <div className="pt-32 px-6 flex flex-col items-center min-h-screen bg-canvas animate-fade-in">
//       <div className="text-center mb-16">
//         <h2 className="font-serif text-4xl md:text-5xl text-ink mb-4 italic tracking-wide">Scent Finder</h2>
//         <p className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">Identify your olfactory signature</p>
//       </div>

//       <div className="w-full max-w-lg backdrop-blur-md bg-white/10 border border-ink/5 p-10 md:p-16 rounded-sm">
//         <p className="font-serif text-2xl md:text-3xl text-center text-ink/90 mb-12 italic leading-relaxed">
//           {step.question} <br /> 
//           <span className="not-italic uppercase tracking-[0.2em] text-sm opacity-60">{step.sub}</span>
//         </p>

//         <div className="grid grid-cols-1 gap-4">
//           {step.moods.map((mood) => (
//             <button
//               key={mood}
//               onClick={handleNext} // Moves to the next set of moods!
//               className="group relative overflow-hidden border border-ink/10 py-5 px-8 text-center transition-all duration-500 hover:border-accent"
//             >
//               <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
//               <span className="relative z-10 uppercase tracking-[0.3em] text-[11px] font-medium text-ink group-hover:text-white transition-colors duration-500">
//                 {mood}
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* Dynamic Progress Indicator */}
//         <div className="mt-16 flex justify-center gap-3">
//           {quizSteps.map((_, index) => (
//             <div 
//               key={index}
//               className={`h-[2px] w-8 transition-colors duration-700 ${index <= currentStep ? 'bg-accent' : 'bg-ink/10'}`} 
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;


