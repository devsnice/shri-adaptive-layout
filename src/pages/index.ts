import HeaderNavigation from "../components/header/header";

import IndexPage from "./index.page";
import VideocontrolPage from "./videocontrol.page";

class InitApplication {
  public page: any;
  public headerNavigation: any;
  public currentPage: string;

  constructor() {
    this.currentPage = window.location.pathname;

    this.init();
  }

  private routing() {
    switch (this.currentPage) {
      case "/":
        this.page = new IndexPage();
        break;

      case "/videocontrol.html":
        this.page = new VideocontrolPage();
        break;
    }
  }

  private init() {
    this.headerNavigation = new HeaderNavigation({
      selector: "#header-menu",
    });

    this.routing();
  }
}

new InitApplication();
