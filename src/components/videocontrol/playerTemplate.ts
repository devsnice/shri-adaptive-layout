/**
 * PlayerTemplate - generate video-player from <template> tag
 */
export class PlayerTemplate {
  public template: HTMLTemplateElement;

  constructor() {
    this.template = document.getElementById(
      "template-player"
    ) as HTMLTemplateElement;
  }

  public render(id: string): Node {
    const element: Node = this.template.content
      .querySelector(".videocontrol-list__item")
      .cloneNode(true);

    // player-{id}
    const playerElement: HTMLElement | null = (element as Element).querySelector(
      ".vc-player"
    );

    playerElement && playerElement.setAttribute("id", id);

    // player-{id}-video
    const videoElement: HTMLElement | null = (element as Element).querySelector(
      "video"
    );

    if (videoElement) {
      videoElement.setAttribute("id", `${id}-video`);
    }

    // player-{id}-webgl-video
    const inputElement: HTMLElement | null = (element as Element).querySelector(
      "input"
    );
    inputElement && inputElement.setAttribute("id", `${id}-webgl-video`);

    return element;
  }
}
