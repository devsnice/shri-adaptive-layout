function loadEvents() {
  return fetch("./scripts/events.json")
    .then(response => response.json())
    .then(result => result.events)
    .catch(err => alert(err));
}

const WIDGET_TYPES = {
  STATS: "STATS",
  CAMERA: "CAMERA",
  THERMAL: "THERMAL",
  PLAYER: "PLAYER",
  QUESTIONS: "QUESTIONS",
  DEFAULT: "DEFAULT"
};

class StatsWidget {
  constructor() {
    this.template = document.getElementById("widget-stats-template");
  }

  render() {
    return this.template.content.cloneNode(true);
  }
}

class CameraWidget {
  constructor() {
    this.template = document.getElementById("widget-camera-template");
  }

  render() {
    return this.template.content.cloneNode(true);
  }
}

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

class QuestionsWidget {
  constructor({ data }) {
    this.template = document.getElementById("widget-questions-template");
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
    this.setInnerText(".button_type-yellow", this.data.buttons[0]);
    this.setInnerText(".button_type-grey", this.data.buttons[1]);

    return this.widget;
  }
}

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

class Widget {
  constructor({ event, container }) {
    this.event = event;
    this.container = container;
    this.template = document.getElementById("widget-template");
    this.widget = null;

    this.render();
  }

  setDescription() {
    if (this.event.description) {
      this.widget
        .querySelector(".widget-content__text")
        .classList.add(`widget-content__text_width-${this.event.size}`);

      this.widget.querySelector(
        ".widget-content__text"
      ).innerText = this.event.description;
    }
  }

  setHeaderData() {
    this.widget.querySelector(
      ".widget-header-about__title"
    ).innerText = this.event.title;

    this.widget.querySelector(
      ".widget-header__type"
    ).innerText = this.event.source;

    this.widget.querySelector(
      ".widget-header__date"
    ).innerText = this.event.time;

    this.widget
      .querySelector(".widget-header-about__icon > use")
      .setAttribute("xlink:href", `#${this.event.icon}`);

    this.widget
      .querySelector(".widget-header-about__icon")
      .classList.add(`icon_${this.event.icon}`);
  }

  getDataTemplateType() {
    const { data = {}, icon } = this.event;

    if (data.type === "graph") {
      return WIDGET_TYPES.STATS;
    }

    if (icon === "cam") {
      return WIDGET_TYPES.CAMERA;
    }

    if (data.temperature) {
      return WIDGET_TYPES.THERMAL;
    }

    if (data.albumcover) {
      return WIDGET_TYPES.PLAYER;
    }

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
        const statsWidget = new StatsWidget({
          data: this.event.data
        });

        dataContentBlock = statsWidget.render();

        break;

      case WIDGET_TYPES.CAMERA:
        const cameraWidget = new CameraWidget({
          data: this.event.data
        });

        dataContentBlock = cameraWidget.render();

        break;

      case WIDGET_TYPES.PLAYER:
        const playerWidget = new PlayerWidget({
          data: this.event.data
        });

        dataContentBlock = playerWidget.render();

        break;

      case WIDGET_TYPES.QUESTIONS:
        const questionsWidget = new QuestionsWidget({
          data: this.event.data
        });

        dataContentBlock = questionsWidget.render();

        break;

      case WIDGET_TYPES.THERMAL:
        const thermalWidget = new ThemalWidget({
          data: this.event.data
        });

        dataContentBlock = thermalWidget.render();

        break;
    }

    if (dataContentBlock) {
      this.widget
        .querySelector(".widget-content")
        .appendChild(dataContentBlock);
    }
  }

  render() {
    this.widget = this.template.content
      .querySelector(".widget")
      .cloneNode(true);

    this.widget.classList.add(`widget_size-${this.event.size}`);
    this.widget.classList.add(`widget_type-${this.event.type}`);

    this.setHeaderData();
    this.setDescription();
    this.renderDataTemplate();

    this.container.appendChild(this.widget);
  }
}

function renderDashboardWidgets(events) {
  const dashboardWidgetsList = document.getElementById("dashboard-list");

  events.forEach(event => {
    new Widget({
      event,
      container: dashboardWidgetsList
    });
  });
}

loadEvents().then(events => {
  renderDashboardWidgets(events);
});
