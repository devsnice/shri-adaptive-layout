import { PlayerTemplate, Player } from "./player";

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

    this.elementShowAll.addEventListener("touchend", () => {
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

          VideoPlayer.addEventListener("touchend", e => {
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
