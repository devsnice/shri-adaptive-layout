class CanvasVideo {
  constructor({ video, videoPlayer }) {
    this.video = video;
    this.videoPlayer = videoPlayer;
    this.stopVideo = false;

    this.canvas = null;
  }

  play({ canvasInited, brightness }) {
    if (!canvasInited) {
      this.canvas = document.createElement("canvas");

      this.canvas.style.width = "auto";
      this.canvas.style.height = "100%";

      this.canvas.width = 1320;
      this.canvas.height = 700;

      this.videoPlayer.appendChild(this.canvas);
    } else {
      this.stopVideo = true;
    }

    const context = this.canvas.getContext("2d");

    const draw = () => {
      requestAnimationFrame(() => {
        context.drawImage(this.video, 0, 0, 1320, 700);

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
