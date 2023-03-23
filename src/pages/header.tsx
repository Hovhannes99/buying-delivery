import React from "react";
import Search from "../components/atoms/search";
import Logo from "../components/atoms/logo";
import MenuBar from "../components/molecules/menuBar";
import SignIn from "../components/molecules/signIn";

const Header = () => {
  return (
      <header className="header">
          <div className={"header__menu"}>
              <MenuBar/>
              <Logo/>
          </div>
          <div className={"header__search"}>
              <Search/>
              <SignIn/>
          </div>
      </header>
  )
}

export default Header