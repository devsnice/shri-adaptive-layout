
import Videocontrol from "../components/videocontrol/videocontrol";

class VideoControlPage {
  constructor() {
    this.broadcasts = [
      {
        url:
          "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8"
      },
      {
        url:
          "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8"
      },
      {
        url:
          "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8"
      },
      {
        url:
          "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8"
      }
    ];

    this.init();
  }

  init() {
    const VideocontrolWidget = new Videocontrol({
      broadcasts: this.broadcasts,
      element: document.getElementById("vc-list"),
      elementShowAll: document.getElementById("vc-showall")
    });
  }
}

export default VideoControlPage;