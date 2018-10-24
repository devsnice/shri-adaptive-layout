import WebglVideo from "./webglVideo";
import CanvasVideo from "./canvasVideo";
import Analyse from "./audioAnalyse";

/**
 * PlayerTemplate - generate video-player from <template> tag
 */
export class PlayerTemplate {
  constructor() {
    this.template = document.getElementById("template-player");
  }

  render(id) {
    const element = this.template.content
      .querySelector(".videocontrol-list__item")
      .cloneNode(true);

    // player-{id}
    element.querySelector(".vc-player").setAttribute("id", id);

    // player-{id}-video
    element.querySelector("video").setAttribute("id", `${id}-video`);

    // player-{id}-webgl-video
    element.querySelector("input").setAttribute("id", `${id}-webgl-video`);

    return element;
  }
}

/**
 * Player is a wrapper around html5 video element and HLS standart,
 * it has special behavior for our application.
 */
export class Player {
  constructor({ url, containerElement, playerElement }) {
    this.settings = {
      url,
      webglInited: false,
      canvasInited: false,
      containerBounds: null
    };

    this.videoSettings = {
      brightness: 0,
      contrast: 0,
      isFullscreen: false
    };

    this.containerElement = containerElement;
    this.player = playerElement;
    this.video = playerElement.querySelector("video");
    this.brightnessRange = playerElement.querySelector(
      ".vc-player__brightness"
    );
    this.noiseLevelRange = playerElement.querySelector(
      ".vc-player__noise-level"
    );
    this.contrastRange = playerElement.querySelector(".vc-player__contrast");

    this.webglVideo = new WebglVideo({
      video: this.video,
      videoPlayer: this.player
    });

    this.canvasVideo = new CanvasVideo({
      video: this.video,
      videoPlayer: this.player
    });

    this.initPromise = null;

    this.init();
    this.initEvents();
  }

  setContainerBounds() {
    if (!this.settings.containerBounds) {
      this.settings.containerBounds = this.containerElement.getBoundingClientRect();
    }

    return this.settings.containerBounds;
  }

  init() {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      if (Hls.isSupported()) {
        const hls = new Hls();

        hls.loadSource(this.settings.url);
        hls.attachMedia(this.video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          resolve(this.video);
        });
      } else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
        this.video.src = this.settings.url;

        this.video.addEventListener("loadedmetadata", () => {
          resolve(this.video);
        });
      }
    });
  }

  play() {
    this.video.play();
  }

  stop() {
    this.video.pause();
  }

  openFullscreen() {
    if (this.settings.isFullscreen) return false;

    this.setContainerBounds();

    const { containerBounds } = this.settings;

    this.video.muted = false;

    const playerBounds = this.player.getBoundingClientRect();

    this.player.style.transform = `
        translateX(0px)
        translateY(0px)
    `;

    this.player.style.width = playerBounds.width + "px";
    this.player.style.height = playerBounds.height + "px";
    this.player.style.transitionProperty = "";
    this.player.style.transitionDuration = "";
    this.player.style.zIndex = "2";

    window.requestAnimationFrame(() => {
      this.player.style.transitionProperty = "transform, width, height";
      this.player.style.transitionDuration = "0.3s";

      // move element to top/left bounder of the list-container
      this.player.style.transform = `
        translateX(-${playerBounds.left - containerBounds.left}px)
        translateY(-${playerBounds.top - containerBounds.top}px)
      `;

      this.player.style.width = containerBounds.width + "px";
      this.player.style.height = containerBounds.height + "px";
    });

    this.settings.isFullscreen = true;
  }

  closeFullscreen() {
    if (!this.settings.isFullscreen) return false;

    this.video.muted = true;

    this.player.style.zIndex = "1";

    window.requestAnimationFrame(() => {
      this.player.style.width = "100%";
      this.player.style.height = "100%";

      this.player.style.transform = `
          translateX(0px)
          translateY(0px)
      `;
    });

    this.settings.isFullscreen = false;
  }

  playVideoOnWebgl() {
    this.setContainerBounds();

    if (!this.settings.webglInited) {
      this.video.classList.add("vc-player__video_state-hidden");
    }

    this.webglVideo.play({
      brightness: this.videoSettings.brightness,
      webglInited: this.settings.webglInited
    });

    this.settings.webglInited = true;
  }

  playVideoOnCanvas() {
    this.setContainerBounds();

    if (!this.settings.canvasInited) {
      this.video.classList.add("vc-player__video_state-hidden");
    }

    this.canvasVideo.play({
      canvasInited: this.settings.canvasInited,
      size: {
        width: this.settings.containerBounds.width,
        height: this.settings.containerBounds.height
      },
      brightness: this.videoSettings.brightness,
      contrast: this.videoSettings.contrast
    });

    this.settings.canvasInited = true;
  }

  changeBrightness(value) {
    this.videoSettings.brightness = value;

    // turn on webgl instead of canvas
    // this.playVideoOnWebgl();
    this.playVideoOnCanvas();
  }

  changeContrast(value) {
    this.videoSettings.contrast = value;

    this.playVideoOnCanvas();
  }

  initEvents() {
    this.brightnessRange.addEventListener("change", e => {
      this.changeBrightness(e.target.value);
    });

    this.contrastRange.addEventListener("change", e => {
      this.changeContrast(e.target.value);
    });

    this.analyser = new Analyse({
      video: this.video,
      noiseLevelRange: this.noiseLevelRange
    });
  }

  addEventListener(event, callback) {
    this.player.addEventListener(event, callback);
  }
}
