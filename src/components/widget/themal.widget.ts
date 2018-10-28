import { IWidgetThemalData } from "../../types/index";

class ThemalWidget {
  public template: HTMLTemplateElement;
  public data: IWidgetThemalData;
  public widget: Node;

  constructor({ data }: { data: IWidgetThemalData }) {
    this.template = document.getElementById("widget-thermal-template") as HTMLTemplateElement;
    this.data = data;
    this.widget = this.template.content.cloneNode(true);
  }

  public render(): Node {
    this.setInnerText(
      ".widget-sensor_type-temp .widget-sensor__value",
      `${this.data.temperature}C`,
    );

    this.setInnerText(
      ".widget-sensor_type-humidity .widget-sensor__value",
      `${this.data.humidity}%`,
    );

    return this.widget;
  }

  private setInnerText(selector: string, text: string) {
    const block: HTMLElement = (this.widget as Element).querySelector(selector);

    if (block) {
      block.innerText = text;
    }
  }
}

export default ThemalWidget;
