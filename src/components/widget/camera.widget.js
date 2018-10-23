class CameraWidget {
  constructor() {
    this.template = document.getElementById("widget-camera-template");
  }

  render() {
    return this.template.content.cloneNode(true);
  }
}

export default CameraWidget;