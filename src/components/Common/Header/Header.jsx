import "./Header.css";
import TemporaryDrawer from "./Drawer";
import Button from "../Button/Button";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <div className="header">
      <h1>
        CryptoTracker <span style={{ color: "var(--blue)" }}></span>
      </h1>
      <div className="links">
        <Link to="/">
          <p
            className={`link ${location.pathname === "/" ? "link-active" : ""}`}
          >
            Home
          </p>
        </Link>
        <Link to="/compare">
          <p
            className={`link ${location.pathname === "/compare" ? "link-active" : ""}`}
          >
            Compare
          </p>
        </Link>
        <Link to="/watchlist">
          <p
            className={`link ${location.pathname === "/watchlist" ? "link-active" : ""}`}
          >
            Watchlist
          </p>
        </Link>
        <Link to="/dashboard">
          <Button text={"Dashboard"} />
        </Link>
      </div>
      <div className="mobile-drawer">
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
