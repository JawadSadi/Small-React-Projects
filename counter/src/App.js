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

  const date = new Date("march 11 2025");
  date.setDate(date.getDate() + day);

  return (
    <>
      <div className="step">
        <button
          className="btn"
          onClick={() => {
            step > 1 && setStep((s) => s - 1);
          }}
        >
          -
        </button>
        <p>Step : {step}</p>
        <button className="btn" onClick={() => setStep((s) => s + 1)}>
          +
        </button>
      </div>
      <div className="day">
        <button className="btn" onClick={() => setDay((d) => d - step)}>
          -
        </button>
        <p className="step">Count : {day}</p>
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
    </>
  );
}
