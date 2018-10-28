import { IWidgetPlayerData } from "../../types/index";

class PlayerWidget {
  template: HTMLTemplateElement;
  data: IWidgetPlayerData;
  widget: Node;

  constructor({ data }: { data: IWidgetPlayerData }) {
    this.template = document.getElementById("widget-player-template") as HTMLTemplateElement;
    this.data = data;
    this.widget = this.template.content.cloneNode(true);
  }

  private setInnerText(selector: string, text: string) {
    const block: HTMLElement = (<HTMLElement>this.widget).querySelector(selector);

    if (block) {
      block.innerText = text;
    }
  }

  private setCover() {
    const block = (<Element>this.widget).querySelector(".player-now__cover");

    block.setAttribute("src", this.data.albumcover);
  }

  public render(): Node {
    this.setCover();

    this.setInnerText(".player-now__title", `${this.data.artist} ${this.data.track.name}`);

    this.setInnerText(".player-progress__time", this.data.track.length);
    this.setInnerText(".player-volume__percentage", `${this.data.volume}%`);

    return this.widget;
  }
}

export default PlayerWidget;
