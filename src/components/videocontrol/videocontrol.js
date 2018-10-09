/**
 * PlayerTemplate - generate video-player from <template> tag
 */
class PlayerTemplate {
  constructor() {
    this.template = document.getElementById("template-player");
  }

  render(id) {
    const element = this.template.content
      .querySelector(".vc-player")
      .cloneNode(true);

    // player-{id}
    element.setAttribute("id", id);

    // player-{id}-video
    element.querySelector("video").setAttribute("id", `${id}-video`);

    return element;
  }
}

/**
 * Player is a wrapper around html5 video element and HLS standart,
 * it has special behavior for our application.
 */
class Player {
  constructor({ url, playerElement }) {
    this.settings = {
      url
    };

    this.player = playerElement;
    this.video = playerElement.querySelector("video");

    this.initPromise = null;

    this.init();
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

  openFullscreen() {
    this.player.style.width = "100%";
    this.player.style.height = "100%";
  }

  addEventListener(event, callback) {
    this.video.addEventListener(event, callback);
  }
}

/**
 * Videocontrol represents controller over our feature,
 * it initializes broadcasts and interact with user's actions
 */
class Videocontrol {
  constructor({ broadcasts, element }) {
    this.broadcasts = broadcasts;
    this.element = element;

    this.init();
  }

  openFullPlayer(id) {
    // stop all players except a fullscreen
    this.broadcasts
      .filter(broadcast => broadcast.id !== id)
      .forEach(broadcast => broadcast.player.stop());

    // open player in fullscreen
    this.broadcasts[id].player.openFullscreen();
  }

  init() {
    this.broadcasts.forEach((broadcast, index) => {
      const VideoTemplate = new PlayerTemplate();
      const videoElement = VideoTemplate.render(`player-${index + 1}`);

      this.element.appendChild(videoElement);

      const VideoPlayer = new Player({
        playerElement: videoElement,
        url: broadcast.url
      });

      VideoPlayer.init()
        .then(() => {
          VideoPlayer.play();

          // Init events
          VideoPlayer.addEventListener("click", e => {
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
