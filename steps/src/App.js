import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function previous() {
    step > 1 && setStep((s) => s - 1);
    // step === 1 && setStep(step + 2);
  }

  function next() {
    step < 3 && setStep((s) => s + 1);
    // step === 3 && setStep(step - 2);
  }

  return (
    <>
      <div className="close" onClick={() => setIsOpen((open) => !open)}>
        &times;
      </div>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button bgColor={"#7D22FDFF"} color={"#fff"} onClick={previous}>
              <span>👈</span> Previous
            </Button>
            <Button bgColor={"#7D22FDFF"} color={"#fff"} onClick={next}>
              <span>👉</span> Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>{`Step ${step}`}</h3> {children}
    </div>
  );
}

function Button({ bgColor, color, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
