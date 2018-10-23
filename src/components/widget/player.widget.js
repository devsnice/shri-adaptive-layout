class PlayerWidget {
  constructor({ data }) {
    this.template = document.getElementById("widget-player-template");
    this.data = data;
    this.widget = this.template.content.cloneNode(true);
  }

  setInnerText(selector, text) {
    const block = this.widget.querySelector(selector);

    if (block) {
      block.innerText = text;
    }
  }

  setCover() {
    const block = this.widget.querySelector(".player-now__cover");

    block.setAttribute("src", this.data.albumcover);
  }

  render() {
    this.setCover();

    this.setInnerText(
      ".player-now__title",
      `${this.data.artist} ${this.data.track.name}`
    );

    this.setInnerText(".player-progress__time", this.data.track.length);
    this.setInnerText(".player-volume__percentage", `${this.data.volume}%`);

    return this.widget;
  }
}

export default PlayerWidget;