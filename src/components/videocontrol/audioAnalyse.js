AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();

class Analyse {
  constructor({ video, noiseLevelRange }) {
    this.node = context.createScriptProcessor(2048, 1, 1);
    this.noiseLevelRange = noiseLevelRange;

    this.analyser = context.createAnalyser();

    this.bufferLength = this.analyser.frequencyBinCount;
    this.bands = new Uint8Array(this.bufferLength);

    this.startShow = false;

    video.addEventListener("canplay", () => {
      if (!this.source) {
        this.source = context.createMediaElementSource(video);

        this.source.connect(this.analyser);
        this.analyser.connect(this.node);
        this.node.connect(context.destination);
        this.source.connect(context.destination);

        this.node.onaudioprocess = e => {
          this.analyser.getByteFrequencyData(this.bands); // copy current data to this.bands

          if (!this.startShow) {
            this.show();
            this.startShow = true;
          }
        };
      }
    });
  }

  getAverageVolume(array) {
    let values = 0;

    for (let i = 0; i < array.length; i++) {
      values += array[i];
    }

    const average = values / array.length;

    // calculate in 100% scale, 1% is 2.56
    return average === 0 ? 0 : average / 2.56;
  }

  show() {
    requestAnimationFrame(() => {
      this.noiseLevelRange.value = this.getAverageVolume(this.bands);

      this.show();
    });
  }
}

export default Analyse;
