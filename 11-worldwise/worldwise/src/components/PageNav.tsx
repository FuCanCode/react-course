import { NavLink } from "react-router-dom";

function PageNav() {
  const navLinks = [
    {
      path: "/",
      displayName: "Home",
    },
    {
      path: "/product",
      displayName: "Product",
    },
    {
      path: "/pricing",
      displayName: "Pricing",
    },
  ];

  return (
    <nav>
      <ul>
        {navLinks.map((l) => (
          <li key={l.displayName}>
            <NavLink
              to={l.path}
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "blue" : "" };
              }}
            >
              {l.displayName}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PageNav;
