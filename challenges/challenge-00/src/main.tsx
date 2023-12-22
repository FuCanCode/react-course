import React from "react";
import ReactDOM from "react-dom/client";
import { skills, ISkill } from "./skills";
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
      {skills.map((skill) => {
        return <Skill {...skill} key={skill.skill} />;
      })}

      {/* <Skill skill="HTML5" emoji="👍" backgroundColor="orangered" />
      <Skill skill="CSS3" emoji="👍" backgroundColor="blue" />
      <Skill skill="JavaScript" emoji="💪🏾" backgroundColor="yellow" />
      <Skill skill="React" emoji="🫳" backgroundColor="lightskyblue" /> */}
    </div>
  );
}

function Skill({ skill, level, color }: ISkill) {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>{skill}</span>
      <span>
        {level === "noob" && "🫳"}
        {level === "intermediate" && "👍"}
        {level === "advanced" && "💪🏾"}
        {level === "expert" && "🧑‍💻"}
      </span>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
