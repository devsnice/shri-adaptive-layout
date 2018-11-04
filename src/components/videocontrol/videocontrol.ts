import { Broadcast } from "../../types/index";
import { Player, PlayerTemplate } from "./player";

/**
 * Videocontrol represents controller over our feature,
 * it initializes broadcasts and interact with user's actions
 */
class Videocontrol {
  public broadcasts: Broadcast[];
  public element: HTMLElement;
  public elementShowAll: HTMLElement;

  public state: {
    fullscreenId: number;
  };

  constructor({
    broadcasts,
    elementShowAll,
    element,
  }: {
    broadcasts: Broadcast[];
    elementShowAll: HTMLElement;
    element: HTMLElement;
  }) {
    this.broadcasts = broadcasts;
    this.element = element;
    this.elementShowAll = elementShowAll;

    this.state = {
      fullscreenId: Infinity,
    };

    this.initPlayers();
    this.initEvents();
  }

  private closeFullPlayer() {
    // play all players
    this.broadcasts.forEach((broadcast) => broadcast.player.play());

    this.broadcasts[this.state.fullscreenId].player.closeFullscreen();

    this.state.fullscreenId = null;
  }

  private openFullPlayer(id: number) {
    // stop all players except a fullscreen
    this.broadcasts
      .filter((broadcast) => broadcast.id !== id)
      .forEach((broadcast) => broadcast.player.stop());

    // open player in fullscreen
    this.broadcasts[id].player.openFullscreen();

    this.state.fullscreenId = id;
  }

  private initEvents() {
    this.elementShowAll.addEventListener("click", () => {
      this.closeFullPlayer();
    });

    this.elementShowAll.addEventListener("touchend", () => {
      this.closeFullPlayer();
    });
  }

  private initPlayers() {
    this.broadcasts.forEach((broadcast, index) => {
      const VideoTemplate: PlayerTemplate = new PlayerTemplate();
      const listVideoElement: Node = VideoTemplate.render(`player-${index + 1}`);

      this.element.appendChild(listVideoElement);

      const VideoPlayer = new Player({
        containerElement: this.element,
        playerElement: (listVideoElement as Element).querySelector(".vc-player"),
        url: broadcast.url,
      });

      VideoPlayer.init()
        .then(() => {
          VideoPlayer.play();

          // Init events
          VideoPlayer.addEventListener("click", (e) => {
            this.openFullPlayer(index);
          });

          VideoPlayer.addEventListener("touchend", (e) => {
            this.openFullPlayer(index);
          });

          // Save player to broadcasts array
          this.broadcasts[index].id = index;
          this.broadcasts[index].player = VideoPlayer;
        })
        .catch((err) => console.warn(err));
    });
  }
}

export default Videocontrol;
