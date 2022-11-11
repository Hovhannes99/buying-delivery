import React from "react";
import Search from "../components/atoms/search";
import Logo from "../components/atoms/logo";

const Header = () => {
  return (
      <header className="header">
          <Logo/>
          <Search/>
      </header>
  )
}

export default Header