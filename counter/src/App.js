import { useReducer } from "react";

const initialState = { day: 0, step: 1 };

export default function App() {
  return (
    <div className="container">
      <Step />
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, day: state.day - state.step };
    case "inc":
      return { ...state, day: state.day + state.step };
    case "setDay":
      return { ...state, day: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

function Step() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { day, step } = state;

  const date = new Date();
  date.setDate(date.getDate() + day);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineDay = function (e) {
    dispatch({ type: "setDay", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <>
      <div className="rangeBox">
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => defineStep(e)}
          className="range"
        />
      </div>
      <span>Step : {step}</span>

      <div className="day">
        <button className="btn" onClick={dec}>
          -
        </button>
        <input type="text" value={day} onChange={(e) => defineDay(e)} />
        <button className="btn" onClick={inc}>
          +
        </button>
      </div>
      <p className="text">{`
        ${
          day === 0
            ? "Today is"
            : day < 0
            ? -1 * day + " days ago was "
            : day + " days from today is"
        }
        ${date.toDateString()}`}</p>

      {day !== 0 || step !== 1 ? (
        <button className="btn" onClick={reset}>
          Reset
        </button>
      ) : null}
    </>
  );
}
