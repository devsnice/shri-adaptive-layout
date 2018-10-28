import { IWidgetQuestionsData } from "../../types/index";

class QuestionsWidget {
  template: HTMLTemplateElement;
  data: IWidgetQuestionsData;
  widget: Node;

  constructor({ data }: { data: IWidgetQuestionsData }) {
    this.template = document.getElementById("widget-questions-template") as HTMLTemplateElement;
    this.data = data;
    this.widget = this.template.content.cloneNode(true);
  }

  private setInnerText(selector: string, text: string) {
    const block: HTMLElement = (<Element>this.widget).querySelector(selector);

    if (block) {
      block.innerText = text;
    }
  }

  public render(): Node {
    this.setInnerText(".button_type-yellow", this.data.buttons[0]);
    this.setInnerText(".button_type-grey", this.data.buttons[1]);

    return this.widget;
  }
}

export default QuestionsWidget;
