import Analyse from "./audioAnalyse";
import CanvasVideo from "./canvasVideo";

/**
 * PlayerTemplate - generate video-player from <template> tag
 */
export class PlayerTemplate {
  public template: HTMLTemplateElement;

  constructor() {
    this.template = document.getElementById("template-player") as HTMLTemplateElement;
  }

  public render(id: string): Node {
    const element: Node = this.template.content
      .querySelector(".videocontrol-list__item")
      .cloneNode(true);

    // player-{id}
    const playerElement: HTMLElement | null = (element as Element).querySelector(".vc-player");

    playerElement && playerElement.setAttribute("id", id);

    // player-{id}-video
    const videoElement: HTMLElement | null = (element as Element).querySelector("video");

    if (videoElement) {
      videoElement.setAttribute("id", `${id}-video`);
    }

    // player-{id}-webgl-video
    const inputElement: HTMLElement | null = (element as Element).querySelector("input");
    inputElement && inputElement.setAttribute("id", `${id}-webgl-video`);

    return element;
  }
}

/**
 * Player is a wrapper around html5 video element and HLS standart,
 * it has special behavior for our application.
 */
export class Player {
  public settings: {
    url: string;
    canvasInited: boolean;
    containerBounds: {
      left: number;
      top: number;
      width: number;
      height: number;
    };
    isFullscreen: boolean;
  };

  public videoSettings: {
    brightness: string;
    contrast: string;
    isFullscreen: boolean;
  };

  public containerElement: HTMLElement;
  public player: HTMLElement | null;
  public video: HTMLVideoElement | null;
  public brightnessRange: HTMLInputElement | null;
  public noiseLevelRange: HTMLInputElement | null;
  public contrastRange: HTMLInputElement | null;

  public canvasVideo: CanvasVideo;

  public initPromise: Promise<HTMLVideoElement>;
  public analyser: any;

  constructor({
    url,
    containerElement,
    playerElement
  }: {
    url: string;
    containerElement: HTMLElement;
    playerElement: HTMLElement;
  }) {
    this.settings = {
      url,
      canvasInited: false,
      containerBounds: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      isFullscreen: false
    };

    this.videoSettings = {
      brightness: "0",
      contrast: "0",
      isFullscreen: false
    };

    this.containerElement = containerElement;
    this.player = playerElement;
    this.video = playerElement.querySelector("video");
    this.brightnessRange = playerElement.querySelector(".vc-player__brightness");
    this.noiseLevelRange = playerElement.querySelector(".vc-player__noise-level");
    this.contrastRange = playerElement.querySelector(".vc-player__contrast");

    this.canvasVideo = new CanvasVideo({
      video: this.video,
      videoPlayer: this.player
    });

    this.initPromise = null;

    this.init();
    this.initEvents();
  }

  public init() {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      if (window.Hls.isSupported()) {
        const hls = new window.Hls();

        hls.loadSource(this.settings.url);
        hls.attachMedia(this.video);

        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
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

  public play() {
    this.video.play();
  }

  public stop() {
    this.video.pause();
  }

  public openFullscreen() {
    if (this.settings.isFullscreen) {
      return false;
    }

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

  public closeFullscreen() {
    if (!this.settings.isFullscreen) {
      return false;
    }

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

  public addEventListener(event: string, callback: (e: Event) => void) {
    this.player.addEventListener(event, callback);
  }

  private setContainerBounds() {
    if (!this.settings.containerBounds) {
      this.settings.containerBounds = this.containerElement.getBoundingClientRect();
    }

    return this.settings.containerBounds;
  }

  private playVideoOnCanvas() {
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

  private changeBrightness(value: string) {
    this.videoSettings.brightness = value;

    this.playVideoOnCanvas();
  }

  private changeContrast(value: string) {
    this.videoSettings.contrast = value;

    this.playVideoOnCanvas();
  }

  private initEvents() {
    this.brightnessRange.addEventListener("change", (e) => {
      this.changeBrightness((e.target as HTMLInputElement).value);
    });

    this.contrastRange.addEventListener("change", (e) => {
      this.changeContrast((e.target as HTMLInputElement).value);
    });

    this.analyser = new Analyse({
      video: this.video,
      noiseLevelRange: this.noiseLevelRange
    });
  }
}
