import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// import StarRating from "./StarRating";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {/* <StarRating /> */}
    {/* <StarRating starsAmount={7} size={30} color="rebeccapurple" /> */}
  </React.StrictMode>
);
