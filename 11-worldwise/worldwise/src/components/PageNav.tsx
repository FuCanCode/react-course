import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

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
    <nav className={styles.nav}>
      <ul>
        {navLinks.map((l) => (
          <li key={l.displayName}>
            <NavLink
              /* className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              } */
              className={styles.navLink}
              to={l.path}
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
