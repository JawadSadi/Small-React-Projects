import { useState } from "react";

export default function App() {
  return (
    <div className="container">
      <Step />
    </div>
  );
}

function Step() {
  const [day, setDay] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date();
  date.setDate(date.getDate() + day);

  function handleReset() {
    setDay(0);
    setStep(1);
  }

  return (
    <>
      <div className="rangeBox">
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          className="range"
        />
      </div>
      <span>Step : {step}</span>

      <div className="day">
        <button className="btn" onClick={() => setDay((d) => d - step)}>
          -
        </button>
        <input
          type="text"
          value={day}
          onChange={(e) => {
            if (isNaN(e.target.value)) return;
            setDay(Number(e.target.value));
          }}
        />
        <button className="btn" onClick={() => setDay((d) => d + step)}>
          +
        </button>
      </div>
      <p className="text">{`
        ${
          day === 0
            ? "Today is"
            : day < 0
            ? day + " days ago was "
            : day + " days from today is"
        }
        ${date.toDateString()}`}</p>

      {day !== 0 || step !== 1 ? (
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      ) : null}
    </>
  );
}
