import WebglVideo from "./webglVideo";
import Analyse from "./audioAnalyse";

/**
 * PlayerTemplate - generate video-player from <template> tag
 */
class PlayerTemplate {
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
class Player {
  constructor({ id, url, playerElement }) {
    this.settings = {
      url,
      webglInited: false
    };

    this.player = playerElement;
    this.video = playerElement.querySelector("video");
    this.brightnessRange = playerElement.querySelector(
      ".vc-player__brightness"
    );
    this.noiseLevelRange = playerElement.querySelector(
      ".vc-player__noise-level"
    );

    this.webglVideo = new WebglVideo({
      video: this.video,
      videoPlayer: this.player
    });

    this.initPromise = null;

    this.init();
    this.initEvents();
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
        this.video.src =
          "https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8";

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

  openFullscreen({ listBounds }) {
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
        translateX(-${playerBounds.left - listBounds.left}px)
        translateY(-${playerBounds.top - listBounds.top}px)
      `;

      this.player.style.width = listBounds.width + "px";
      this.player.style.height = listBounds.height + "px";
    });
  }

  closeFullscreen() {
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
  }

  changeBrightness(value) {
    if (!this.settings.webglInited) {
      this.video.classList.add("vc-player__video_state-hidden");
    }

    this.webglVideo.show({
      brightness: value,
      webglInited: this.settings.webglInited
    });

    this.settings.webglInited = true;
  }

  initEvents() {
    this.brightnessRange.addEventListener("change", e => {
      this.changeBrightness(e.target.value);
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

/**
 * Videocontrol represents controller over our feature,
 * it initializes broadcasts and interact with user's actions
 */
class Videocontrol {
  constructor({ broadcasts, elementShowAll, element }) {
    this.broadcasts = broadcasts;
    this.element = element;
    this.elementShowAll = elementShowAll;

    this.state = {
      fullscreenId: null
    };

    this.initPlayers();
    this.initEvents();
  }

  closeFullPlayer() {
    // play all players
    this.broadcasts.forEach(broadcast => broadcast.player.play());

    this.broadcasts[this.state.fullscreenId].player.closeFullscreen();

    this.state.fullscreenId = null;
  }

  openFullPlayer(id) {
    // stop all players except a fullscreen
    this.broadcasts
      .filter(broadcast => broadcast.id !== id)
      .forEach(broadcast => broadcast.player.stop());

    const listBounds = this.element.getBoundingClientRect();

    // open player in fullscreen
    this.broadcasts[id].player.openFullscreen({ listBounds });

    this.state.fullscreenId = id;
  }

  initEvents() {
    this.elementShowAll.addEventListener("click", () => {
      this.closeFullPlayer();
    });

    this.elementShowAll.addEventListener("tap", () => {
      this.closeFullPlayer();
    });
  }

  initPlayers() {
    this.broadcasts.forEach((broadcast, index) => {
      const VideoTemplate = new PlayerTemplate();
      const listVideoElement = VideoTemplate.render(`player-${index + 1}`);

      this.element.appendChild(listVideoElement);

      const VideoPlayer = new Player({
        playerElement: listVideoElement.querySelector(".vc-player"),
        url: broadcast.url
      });

      VideoPlayer.init()
        .then(() => {
          VideoPlayer.play();

          // Init events
          VideoPlayer.addEventListener("click", e => {
            this.openFullPlayer(index);
          });

          VideoPlayer.addEventListener("tap", e => {
            this.openFullPlayer(index);
          });

          // Save player to broadcasts array
          this.broadcasts[index].id = index;
          this.broadcasts[index].player = VideoPlayer;
        })
        .catch(err => console.err(err));
    });
  }
}

export default Videocontrol;
