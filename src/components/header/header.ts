const domUtils = {
  doesNodeContainClick: (node: HTMLElement, e: Event): boolean => {
    if (!node || !e) { return false; }

    // @ts-ignore
    return node.contains(e.target);
  },
};

export default class Navigation {
  public menuOpened: boolean;
  public headerMenu: HTMLElement | null;
  public headerBurgerMenu: HTMLElement | null;

  constructor({ selector }: { selector: string }) {
    this.menuOpened = false;
    this.headerMenu = document.querySelector(selector);
    this.headerBurgerMenu = document.querySelector("#header-burger");

    if (this.isMobile()) {
      this.initNavigation();
    }
  }

  public openNavigation() {
    if (this.headerMenu) {
      this.headerMenu.classList.add("header-menu-list_state-mobile-opened");
    }

    this.menuOpened = true;
  }

  public closeNavigation() {
    if (this.headerMenu) {
      this.headerMenu.classList.remove("header-menu-list_state-mobile-opened");
    }

    this.menuOpened = false;
  }

  private isMobile() {
    const maxMobileWidth = 768;

    return window.innerWidth < maxMobileWidth;
  }

  private initNavigation() {
    if (this.headerMenu) {
      this.headerMenu.classList.add("header-menu-list_state-mobile");
    }

    if (this.headerBurgerMenu) {
      this.headerBurgerMenu.addEventListener("click", () => {
        if (!this.menuOpened) {
          this.openNavigation();
        } else {
          this.closeNavigation();
        }
      });
    }
  }
}
