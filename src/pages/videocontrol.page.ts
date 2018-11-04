import Videocontrol from "../components/videocontrol/videocontrol";

import * as Types from "../types";

class VideoControlPage {
  public broadcasts: Types.Broadcast[];

  constructor() {
    this.broadcasts = [
      {
        url:
          "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8",
        player: null,
        id: undefined,
      },
      {
        url:
          "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8",
        player: null,
        id: undefined,
      },
      {
        url:
          "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8",
        player: null,
        id: undefined,
      },
      {
        url:
          "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8",
        player: null,
        id: undefined,
      },
    ];

    this.init();
  }

  private init() {
    const VideocontrolWidget = new Videocontrol({
      broadcasts: this.broadcasts,
      element: document.getElementById("vc-list"),
      elementShowAll: document.getElementById("vc-showall"),
    });
  }
}

export default VideoControlPage;
