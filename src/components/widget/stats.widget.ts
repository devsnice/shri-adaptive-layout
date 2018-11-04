class StatsWidget {
  public template: HTMLTemplateElement;

  constructor() {
    this.template = document.getElementById("widget-stats-template") as HTMLTemplateElement;
  }

  public render(): Node {
    return this.template.content.cloneNode(true);
  }
}

export default StatsWidget;
