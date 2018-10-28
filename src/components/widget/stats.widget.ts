class StatsWidget {
  template: HTMLTemplateElement;

  constructor() {
    this.template = document.getElementById("widget-stats-template") as HTMLTemplateElement;
  }

  render() {
    return this.template.content.cloneNode(true);
  }
}

export default StatsWidget;
