class VideoControl {
  constructor({ broadcasts }) {
    this.broadcasts = broadcasts;

    this.init();
  }

  initVideo(video, url) {
    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = "https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8";
      video.addEventListener("loadedmetadata", function() {
        video.play();
      });
    }
  }

  init() {
    this.broadcasts.forEach((broadcast, index) => {
      this.initVideo(
        document.getElementById(`video-${index + 1}`),
        broadcast.url
      );
    });
  }
}

export default VideoControl;
