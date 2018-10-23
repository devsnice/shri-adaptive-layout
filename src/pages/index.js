import layout from "../layout/layout";
import HeaderNavigation from "../components/header/header";

import IndexPage from "./index.page";
import VideocontrolPage from "./videocontrol.page";

class InitApplication {
  constructor() {
    this.currentPage = window.location.pathname;

    this.init();
  }

  routing() {
    switch (this.currentPage) {
      case "/":
        this.page = new IndexPage();
        break;

      case "/videocontrol.html":
        this.page = new VideocontrolPage();
        break;
    }
  }

  init() {
    this.headerNavigation = new HeaderNavigation({
      selector: "#header-menu",
      layout
    });

    this.routing();
  }
}

new InitApplication();