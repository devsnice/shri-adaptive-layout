class Player {
  constructor({ url, element }) {
    this.settings = {
      url,
      element
    };

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
        hls.attachMedia(this.settings.element);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          resolve(this.settings.element);
        });
      } else if (
        this.settings.element.canPlayType("application/vnd.apple.mpegurl")
      ) {
        this.settings.element.src =
          "https://this.settings.element-dev.github.io/streams/x36xhzz/x36xhzz.m3u8";

        this.settings.element.addEventListener("loadedmetadata", () => {
          resolve(this.settings.element);
        });
      }
    });
  }
}

class Videocontrol {
  constructor({ broadcasts }) {
    this.broadcasts = broadcasts;

    this.init();
  }

  init() {
    this.broadcasts.forEach((broadcast, index) => {
      const videoElement = document.getElementById(`video-${index + 1}`);

      const VideoPlayer = new Player({
        element: videoElement,
        url: broadcast.url
      });

      VideoPlayer.init()
        .then(video => {
          video.play();

          // Save player to broadcasts array
          this.broadcasts[index].player = VideoPlayer;
        })
        .catch(err => console.err(err));
    });
  }
}

export default Videocontrol;
