import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";

export default function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];

  const next = function () {
    if (step < 3) setStep((curStep) => (curStep += 1));
  };

  const previous = function () {
    if (step > 1) setStep((curStep) => (curStep -= 1));
  };

  return (
    <>
      <button
        className="close"
        onClick={() => setIsOpen((curState) => !curState)}
      >
        {isOpen ? <>&times;</> : <>&#9776;</>}
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`step-1 ${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`step-2 ${step > 1 ? "active" : ""}`}>2</div>
            <div className={`step-3 ${step === 3 ? "active" : ""}`}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button handleClick={previous}>Das davor!</Button>
            <Button handleClick={next}>Dis näschte!</Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage(props: { children: string; step: number }) {
  return (
    <div className="message">
      <h3>Step {props.step}: </h3>
      {props.children}
    </div>
  );
}

function Button(props: { handleClick: () => void; children: string }) {
  return (
    <button
      style={{ backgroundColor: "#7950f2", color: "#fff" }}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
}
