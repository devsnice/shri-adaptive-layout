import { IWidgetQuestionsData } from "../../types/index";

class QuestionsWidget {
  public template: HTMLTemplateElement;
  public data: IWidgetQuestionsData;
  public widget: Node;

  constructor({ data }: { data: IWidgetQuestionsData }) {
    this.template = document.getElementById("widget-questions-template") as HTMLTemplateElement;
    this.data = data;
    this.widget = this.template.content.cloneNode(true);
  }

  public render(): Node {
    this.setInnerText(".button_type-yellow", this.data.buttons[0]);
    this.setInnerText(".button_type-grey", this.data.buttons[1]);

    return this.widget;
  }

  private setInnerText(selector: string, text: string) {
    const block: HTMLElement = (this.widget as Element).querySelector(selector);

    if (block) {
      block.innerText = text;
    }
  }
}

export default QuestionsWidget;
