import React, { useState } from "react";

const Navbar = () => {
  const [activeNav, setActiveNav] = useState("#");

  return (
    <nav className="nav-container">
      <main className="nav-center">
        {/* logo */}
        <div className="logo">
          <a href="#">
            <img
              src="./pics/dexanimate.avif"
              alt="bingo Logo"
              className="bingo-logo"
            />
          </a>
        </div>

        {/* links */}
        <div className="nav-links">
          <a
            href="#"
            onClick={() => setActiveNav("#")}
            className={activeNav === "#" ? "active" : ""}
          >
            Home
          </a>

          <a
            href="#about"
            onClick={() => setActiveNav("#about")}
            className={activeNav === "#about" ? "active" : ""}
          >
            About
          </a>

          <a
            href="#rewards"
            onClick={() => setActiveNav("#rewards")}
            className={activeNav === "#rewards" ? "active" : ""}
          >
            Rewards
          </a>

          <a
            href="#dex"
            onClick={() => setActiveNav("#dex")}
            className={activeNav === "#dex" ? "active" : ""}
          >
            Dex
          </a>

          <a
            href="#marketplace"
            onClick={() => setActiveNav("#marketplace")}
            className={activeNav === "#marketplace" ? "active" : ""}
          >
            Nft's
          </a>

          <a
            href="#community"
            onClick={() => setActiveNav("#community")}
            className={activeNav === "#community" ? "active" : ""}
          >
            Community
          </a>
        </div>

        {/* nav buy button */}
        <a href="#dex" className="btn buy">
          buy bingo token
        </a>
      </main>
    </nav>
  );
};

export default Navbar;
