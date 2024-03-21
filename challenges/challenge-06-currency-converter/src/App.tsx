import { useEffect, useState } from "react";
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
      const resp = await fetch(
        `https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`,
        { signal }
      );
      const data: ConverterResponse = await resp.json();
      const newResult = data.rates[to];
      setResult(newResult);
    };

    getConversionResult();

    return () => controller.abort();
  }, [input, from, to]);

  if (!currencies) return;

  const options = Object.keys(currencies).map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ));

  return (
    <>
      <input
        type="number"
        placeholder="How much is the Fish?"
        onChange={(e) => setInput(e.target.value)}
      />
      <select defaultValue={"EUR"} onChange={(e) => setFrom(e.target.value)}>
        {options}
      </select>
      <select defaultValue={"USD"} onChange={(e) => setTo(e.target.value)}>
        {options}
      </select>
      {input && (
        <p>
          {input} {currencies[from]} equals {result} {currencies[to]}.
        </p>
      )}
    </>
  );
}

export default App;
