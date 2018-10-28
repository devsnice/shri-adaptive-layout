class ApplicationLayout {
  public layout: HTMLElement;

  constructor(selector: string) {
    this.layout = document.querySelector(selector);
  }

  public block() {
    this.layout.classList.add("application_state-frozen");
    this.layout.classList.add("application_state-blured");
  }

  public unblock() {
    this.layout.classList.remove("application_state-frozen");
    this.layout.classList.remove("application_state-blured");
  }
}

const Layout = new ApplicationLayout("#application");

export default Layout;
