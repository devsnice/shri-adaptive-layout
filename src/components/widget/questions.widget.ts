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

export default QuestionsWidget;