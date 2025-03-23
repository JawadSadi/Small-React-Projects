import { useEffect, useState } from "react";

export default function App() {
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("EUR");
  const [inputAmount, setInputamount] = useState(1);
  const [converted, setConverted] = useState("");
  const [isloading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function getCurrency() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${firstCurrency}&symbols=${secondCurrency}`
        );

        const data = await res.json();
        setConverted((inputAmount * data.rates[secondCurrency]).toFixed(2));
        setIsLoading(false);
      }
      if (firstCurrency === secondCurrency) return setConverted(inputAmount);
      getCurrency();
    },
    [firstCurrency, secondCurrency, inputAmount]
  );
  return (
    <>
      <div className="container">
        <input
          type="text"
          value={inputAmount}
          onChange={(e) => setInputamount(Number(e.target.value))}
        />
        <select
          value={firstCurrency}
          onChange={(e) => setFirstCurrency(e.target.value)}
          disabled={isloading}
        >
          <option value={"USD"}>USD</option>
          <option value={"EUR"}>EUR</option>
          <option value={"CAD"}>CAD</option>
          <option value={"INR"}>INR</option>
          <option value={"JPY"}>JPY</option>
        </select>
        <select
          value={secondCurrency}
          onChange={(e) => setSecondCurrency(e.target.value)}
          disabled={isloading}
        >
          <option value={"EUR"}>EUR</option>
          <option value={"USD"}>USD</option>
          <option value={"CAD"}>CAD</option>
          <option value={"INR"}>INR</option>
          <option value={"JPY"}>JPY</option>
        </select>
      </div>

      <p>
        {converted} {secondCurrency}
      </p>
    </>
  );
}
