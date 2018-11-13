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
      case "/shri-adaptive-layout/":
      case "/shri-adaptive-layout/index.html":
        this.page = new IndexPage();
        break;

      case "/videocontrol.html":
      case "/shri-adaptive-layout/videocontrol.html":
        this.page = new VideocontrolPage();
        break;
    }
  }

  private init() {
    this.headerNavigation = new HeaderNavigation({
      selector: "#header-menu"
    });

    this.routing();
  }
}

new InitApplication();
