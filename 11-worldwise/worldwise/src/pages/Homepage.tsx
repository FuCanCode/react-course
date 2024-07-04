import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <div>WorldWise</div>
      <ul>
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="pricing">Pricing</Link>
        </li>
      </ul>
    </>
  );
}

export default Homepage;
