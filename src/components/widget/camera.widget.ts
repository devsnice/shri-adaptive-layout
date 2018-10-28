class CameraWidget {
  template: HTMLTemplateElement;

  constructor() {
    this.template = document.getElementById("widget-camera-template") as HTMLTemplateElement;
  }

  public render(): Node {
    return this.template.content.cloneNode(true);
  }
}

export default CameraWidget;
