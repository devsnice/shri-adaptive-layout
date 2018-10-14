class CanvasVideo {
  constructor({ video, videoPlayer }) {
    this.video = video;
    this.videoPlayer = videoPlayer;
    this.stopVideo = false;

    this.canvas = null;
  }

  play({ canvasInited, brightness, size: { width, height } }) {
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
        context.drawImage(this.video, 0, 0, width, height);

        if (!this.stopVideo) {
          draw();
        } else {
          this.stopVideo = false;
        }
      });
    };

    draw();
  }
}

export default CanvasVideo;
