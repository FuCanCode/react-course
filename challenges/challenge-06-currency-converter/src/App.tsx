import { useEffect, useRef, useState } from "react";
import "./App.css";

type ConverterResponse = {
  rates: Record<string, number>;
};

function App() {
  const [currencies, setCurrencies] = useState<null | Record<string, string>>(
    null
  );
  const [input, setInput] = useState("");
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);

  useEffect(() => {
    const getCurrencies = async function () {
      const resp = await fetch("https://api.frankfurter.app/currencies");
      const currenciesData: Record<string, string> = await resp.json();
      setCurrencies(currenciesData);
    };
    getCurrencies();
  }, []);

  useEffect(() => {
    if (!input) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const getConversionResult = async function () {
      setIsLoading(true);
      const resp = await fetch(
        `https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`,
        { signal }
      );
      const data: ConverterResponse = await resp.json();

      const newResult = data.rates[to];
      setResult(newResult);

      setIsLoading(false);
    };

    if (from === to) return setResult(Number(input));
    getConversionResult();

    return () => controller.abort();
  }, [input, from, to]);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();

    return () => {
      inputRef.current == null;
    };
  }, [from, to]);

  if (!currencies) return;

  const options = Object.keys(currencies).map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ));

  return (
    <>
      <input
        ref={inputRef}
        type="number"
        placeholder="How much is the Fish?"
        onChange={(e) => setInput(e.target.value)}
      />
      <select
        disabled={isLoading}
        defaultValue={"EUR"}
        onChange={(e) => setFrom(e.target.value)}
      >
        {options}
      </select>
      <select
        disabled={isLoading}
        defaultValue={"USD"}
        onChange={(e) => setTo(e.target.value)}
      >
        {options}
      </select>
      {input.length && !isLoading && (
        <p>
          {input} {currencies[from]} equals {Number(result).toFixed(2)}{" "}
          {currencies[to]}.
        </p>
      )}
    </>
  );
}

export default App;
