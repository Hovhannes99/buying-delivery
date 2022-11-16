import React from "react";
import Search from "../components/atoms/search";
import Logo from "../components/atoms/logo";
import MenuBar from "../components/molecules/menuBar";
import SignIn from "../components/molecules/signIn";
import WelcomeAnimation from "../components/atoms/animations/welcomeAnimation";

const Header = () => {
  return (
      <header className="header">
          <div className={"header__menu"}>
              <MenuBar/>
              <Logo/>
          </div>
          <WelcomeAnimation/>
          <div className={"header__search"}>
              <Search/>
              <SignIn/>
          </div>
      </header>
  )
}

export default Header