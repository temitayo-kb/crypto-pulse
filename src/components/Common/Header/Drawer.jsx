import * as React from "react";
import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <MenuRoundedIcon className="link" />
      </IconButton>
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <div className="drawer-div">
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
            <p
              className={`link ${location.pathname === "/dashboard" ? "link-active" : ""}`}
            >
              Dashboard
            </p>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
