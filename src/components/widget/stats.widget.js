class StatsWidget {
  constructor() {
    this.template = document.getElementById("widget-stats-template");
  }

  render() {
    return this.template.content.cloneNode(true);
  }
}

export default StatsWidget;