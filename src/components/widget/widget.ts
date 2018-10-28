import StatsWidget from "./stats.widget";
import CameraWidget from "./camera.widget";
import QuestionsWidget from "./questions.widget";
import ThemalWidget from "./themal.widget";
import PlayerWidget from "./player.widget";

import * as Types from "../../types";

const WIDGET_TYPES = {
  STATS: "STATS",
  CAMERA: "CAMERA",
  THERMAL: "THERMAL",
  PLAYER: "PLAYER",
  QUESTIONS: "QUESTIONS",
  DEFAULT: "DEFAULT"
};

class Widget {
  event: Types.Event;
  container: HTMLElement;
  template: HTMLTemplateElement;
  widget: HTMLElement;

  constructor({ event, container }: { event: Types.Event; container: HTMLElement }) {
    this.event = event;
    this.container = container;
    this.template = document.getElementById("widget-template") as HTMLTemplateElement;

    // @ts-ignore
    this.widget = this.template.content.querySelector(".widget").cloneNode(true);

    this.render();
  }

  setDescription() {
    if (this.event.description && this.widget) {
      const contentText = this.widget.querySelector(".widget-content__text");
      const textElement: HTMLElement | null = this.widget.querySelector(".widget-content__text");

      if (contentText) {
        contentText.classList.add(`widget-content__text_width-${this.event.size}`);
      }

      if (textElement) {
        textElement.innerText = this.event.description;
      }
    }
  }

  setHeaderData() {
    const titleElement: HTMLElement | null = this.widget.querySelector(
      ".widget-header-about__title"
    );
    const typeElement: HTMLElement | null = this.widget.querySelector(".widget-header__type");
    const dateElement: HTMLElement | null = this.widget.querySelector(".widget-header__date");
    const iconUseElement: HTMLElement | null = this.widget.querySelector(
      ".widget-header-about__icon > use"
    );
    const iconElement: HTMLElement | null = this.widget.querySelector(".widget-header-about__icon");

    if (titleElement) {
      titleElement.innerText = this.event.title;
    }

    if (typeElement) {
      typeElement.innerText = this.event.source;
    }

    if (dateElement) {
      dateElement.innerText = this.event.time;
    }

    if (iconUseElement) {
      iconUseElement.setAttribute("xlink:href", `#${this.event.icon}`);
    }

    if (iconElement) {
      iconElement.classList.add(`icon_${this.event.icon}`);
    }
  }

  getDataTemplateType() {
    const { data, icon } = this.event;

    // @ts-ignore
    if (data.type === "graph") {
      return WIDGET_TYPES.STATS;
    }

    if (icon === "cam") {
      return WIDGET_TYPES.CAMERA;
    }

    // @ts-ignore
    if (data.temperature) {
      return WIDGET_TYPES.THERMAL;
    }

    // @ts-ignore
    if (data.albumcover) {
      return WIDGET_TYPES.PLAYER;
    }

    // @ts-ignore
    if (data.buttons) {
      return WIDGET_TYPES.QUESTIONS;
    }

    return WIDGET_TYPES.DEFAULT;
  }

  renderDataTemplate() {
    const templateDataType = this.getDataTemplateType();
    let dataContentBlock = null;

    switch (templateDataType) {
      case WIDGET_TYPES.STATS:
        const statsWidget = new StatsWidget();

        dataContentBlock = statsWidget.render();

        break;

      case WIDGET_TYPES.CAMERA:
        const cameraWidget = new CameraWidget();

        dataContentBlock = cameraWidget.render();

        break;

      case WIDGET_TYPES.PLAYER:
        // @ts-ignore
        const playerWidget = new PlayerWidget({
          // @ts-ignore
          data: this.event.data
        });

        dataContentBlock = playerWidget.render();

        break;

      case WIDGET_TYPES.QUESTIONS:
        // @ts-ignore
        const questionsWidget = new QuestionsWidget({
          // @ts-ignore
          data: this.event.data
        });

        dataContentBlock = questionsWidget.render();

        break;

      case WIDGET_TYPES.THERMAL:
        // @ts-ignore
        const thermalWidget = new ThemalWidget({
          // @ts-ignore
          data: this.event.data
        });

        dataContentBlock = thermalWidget.render();

        break;
    }

    if (dataContentBlock) {
      const widgetContent: HTMLElement | null = this.widget.querySelector(".widget-content");

      widgetContent && widgetContent.appendChild(dataContentBlock);
    }
  }

  render() {
    this.widget.classList.add(`widget_size-${this.event.size}`);
    this.widget.classList.add(`widget_type-${this.event.type}`);

    this.setHeaderData();
    this.setDescription();
    this.renderDataTemplate();

    this.container.appendChild(this.widget);
  }
}

export default Widget;
