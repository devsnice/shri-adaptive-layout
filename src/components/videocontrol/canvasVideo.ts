class CanvasVideo {
  video: HTMLVideoElement;
  videoPlayer: HTMLElement;
  stopVideo: boolean;

  canvas: HTMLCanvasElement | null;
  canvasHelper: HTMLCanvasElement | null;

  constructor({ video, videoPlayer }: { video: HTMLVideoElement; videoPlayer: HTMLElement }) {
    this.video = video;
    this.videoPlayer = videoPlayer;
    this.stopVideo = false;

    this.canvas = null;
    this.canvasHelper = null;
  }

  private applyBrightness(data: Uint8ClampedArray, brightness: string) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] += 255 * (+brightness / 100);
      data[i + 1] += 255 * (+brightness / 100);
      data[i + 2] += 255 * (+brightness / 100);
    }
  }

  private applyContrast(data: Uint8ClampedArray, contrast: string) {
    const factor = (259.0 * (+contrast + 255.0)) / (255.0 * (259.0 - +contrast));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = this.truncateColor(factor * (data[i] - 128.0) + 128.0);
      data[i + 1] = this.truncateColor(factor * (data[i + 1] - 128.0) + 128.0);
      data[i + 2] = this.truncateColor(factor * (data[i + 2] - 128.0) + 128.0);
    }
  }

  private truncateColor(value: number): number {
    if (value < 0) {
      value = 0;
    } else if (value > 255) {
      value = 255;
    }

    return value;
  }

  private filter({
    video,
    width,
    height,
    contrast,
    brightness
  }: {
    video: HTMLVideoElement;
    width: number;
    height: number;
    contrast: string;
    brightness: string;
  }) {
    if (!this.canvasHelper) {
      this.canvasHelper = document.createElement("canvas");

      this.canvasHelper.width = width;
      this.canvasHelper.height = height;
    }

    const contextHelper = this.canvasHelper.getContext("2d");

    if (contextHelper) {
      contextHelper.drawImage(video, 0, 0, width, height);

      const idata = contextHelper.getImageData(0, 0, width, height);

      var data = idata.data;

      this.applyBrightness(data, brightness);
      this.applyContrast(data, contrast);

      return idata;
    }
  }

  public play({
    canvasInited,
    brightness,
    contrast,
    size: { width, height }
  }: {
    canvasInited: boolean;
    brightness: string;
    contrast: string;
    size: { width: number; height: number };
  }) {
    if (!canvasInited) {
      this.canvas = document.createElement("canvas");

      this.canvas.style.width = `${width}`;
      this.canvas.style.height = `${height}`;

      this.canvas.width = width;
      this.canvas.height = height;

      this.videoPlayer.appendChild(this.canvas);
    } else {
      this.stopVideo = true;
    }

    if (this.canvas) {
      const context = this.canvas.getContext("2d");

      if (!context) return;

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
}

export default CanvasVideo;
