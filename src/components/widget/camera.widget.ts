class CameraWidget {
  template: HTMLTemplateElement;

  constructor() {
    this.template = document.getElementById("widget-camera-template") as HTMLTemplateElement;
  }

  render() {
    return this.template.content.cloneNode(true);
  }
}

export default CameraWidget;
