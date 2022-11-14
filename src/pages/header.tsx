import React from "react";
import Search from "../components/atoms/search";
import Logo from "../components/atoms/logo";
import MenuBar from "../components/molecules/menuBar";

const Header = () => {
  return (
      <header className="header">
          <MenuBar/>
          <Logo/>
          <Search/>
      </header>
  )
}

export default Header