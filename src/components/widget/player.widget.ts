import { IWidgetPlayerData } from "../../types/index";

class PlayerWidget {
  public template: HTMLTemplateElement;
  public data: IWidgetPlayerData;
  public widget: Node;

  constructor({ data }: { data: IWidgetPlayerData }) {
    this.template = document.getElementById("widget-player-template") as HTMLTemplateElement;
    this.data = data;
    this.widget = this.template.content.cloneNode(true);
  }

  public render(): Node {
    this.setCover();

    this.setInnerText(".player-now__title", `${this.data.artist} ${this.data.track.name}`);

    this.setInnerText(".player-progress__time", this.data.track.length);
    this.setInnerText(".player-volume__percentage", `${this.data.volume}%`);

    return this.widget;
  }

  private setInnerText(selector: string, text: string) {
    const block: HTMLElement = (this.widget as HTMLElement).querySelector(selector);

    if (block) {
      block.innerText = text;
    }
  }

  private setCover() {
    const block = (this.widget as Element).querySelector(".player-now__cover");

    block.setAttribute("src", this.data.albumcover);
  }
}

export default PlayerWidget;
