import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img src="silly_avatar.jpg" className="avatar" />;
}

function Intro() {
  return (
    <div>
      <h1>Stefan della comida divisor</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vitae eos
        voluptas rerum ea laudantium sunt error repellat eaque provident.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill="HTML5" emoji="👍" backgroundColor="orangered" />
      <Skill skill="CSS3" emoji="👍" backgroundColor="blue" />
      <Skill skill="JavaScript" emoji="💪🏾" backgroundColor="yellow" />
      <Skill skill="React" emoji="🫳" backgroundColor="lightskyblue" />
    </div>
  );
}

interface ISkillProps {
  skill: string;
  emoji: string;
  backgroundColor: string;
}

function Skill(props: ISkillProps) {
  return (
    <div className="skill" style={{ backgroundColor: props.backgroundColor }}>
      {props.skill} {props.emoji}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
