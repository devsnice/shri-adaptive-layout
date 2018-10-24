class CanvasVideo {
  constructor({ video, videoPlayer }) {
    this.video = video;
    this.videoPlayer = videoPlayer;
    this.stopVideo = false;

    this.canvas = null;
    this.canvasHelper = null;
  }

  applyBrightness(data, brightness) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] += 255 * (brightness / 100);
      data[i + 1] += 255 * (brightness / 100);
      data[i + 2] += 255 * (brightness / 100);
    }
  }

  applyContrast(data, contrast) {
    const factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = this.truncateColor(factor * (data[i] - 128.0) + 128.0);
      data[i + 1] = this.truncateColor(factor * (data[i + 1] - 128.0) + 128.0);
      data[i + 2] = this.truncateColor(factor * (data[i + 2] - 128.0) + 128.0);
    }
  }

  truncateColor(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 255) {
      value = 255;
    }

    return value;
  }

  filter({ video, width, height, contrast, brightness }) {
    if (!this.canvasHelper) {
      this.canvasHelper = document.createElement("canvas");

      this.canvasHelper.width = width;
      this.canvasHelper.height = height;
    }

    const contextHelper = this.canvasHelper.getContext("2d");

    contextHelper.drawImage(video, 0, 0, width, height);

    const idata = contextHelper.getImageData(0, 0, width, height);

    var data = idata.data;

    this.applyBrightness(data, brightness);
    this.applyContrast(data, contrast);

    return idata;
  }

  play({ canvasInited, brightness, contrast, size: { width, height } }) {
    if (!canvasInited) {
      this.canvas = document.createElement("canvas");

      this.canvas.style.width = width;
      this.canvas.style.height = height;

      this.canvas.width = width;
      this.canvas.height = height;

      this.videoPlayer.appendChild(this.canvas);
    } else {
      this.stopVideo = true;
    }

    const context = this.canvas.getContext("2d");

    const draw = () => {
      requestAnimationFrame(() => {
        const filteredImage = this.filter({
          video: this.video,
          width,
          height,
          contrast,
          brightness
        });

        context.putImageData(filteredImage, 0, 0);

        if (this.stopVideo || this.video.paused || this.video.ended) {
          this.stopVideo = false;

          return false;
        } else {
          draw();
        }
      });
    };

    draw();
  }
}

export default CanvasVideo;