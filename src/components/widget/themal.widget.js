class ThemalWidget {
  constructor({ data }) {
    this.template = document.getElementById("widget-thermal-template");
    this.data = data;
    this.widget = this.template.content.cloneNode(true);
  }

  setInnerText(selector, text) {
    const block = this.widget.querySelector(selector);

    if (block) {
      block.innerText = text;
    }
  }

  render() {
    this.setInnerText(
      ".widget-sensor_type-temp .widget-sensor__value",
      `${this.data.temperature}C`
    );

    this.setInnerText(
      ".widget-sensor_type-humidity .widget-sensor__value",
      `${this.data.humidity}%`
    );

    return this.widget;
  }
}

export default ThemalWidget;