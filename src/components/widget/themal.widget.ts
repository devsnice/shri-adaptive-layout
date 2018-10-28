import { IWidgetThemalData } from "../../types/index";

class ThemalWidget {
  template: HTMLTemplateElement;
  data: IWidgetThemalData;
  widget: Node;

  constructor({ data }: { data: IWidgetThemalData }) {
    this.template = document.getElementById("widget-thermal-template") as HTMLTemplateElement;
    this.data = data;
    this.widget = this.template.content.cloneNode(true);
  }

  setInnerText(selector: string, text: string) {
    const block: HTMLElement = (<Element>this.widget).querySelector(selector);

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
