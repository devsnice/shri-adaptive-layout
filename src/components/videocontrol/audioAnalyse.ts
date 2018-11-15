// @ts-ignore
const AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();

const NOISE_PER_PERCENT = 100 / 256;

class Analyse {
  public startShow: boolean;
  public bufferLength: number;
  public bands: Uint8Array;

  public node: any;
  public noiseLevelRange: HTMLInputElement;
  public analyser: any;
  public source: any;

  constructor({
    video,
    noiseLevelRange
  }: {
    video: HTMLVideoElement;
    noiseLevelRange: HTMLInputElement;
  }) {
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

        this.node.onaudioprocess = (e: EventTarget) => {
          this.analyser.getByteFrequencyData(this.bands); // copy current data to this.bands

          if (!this.startShow) {
            this.show();
            this.startShow = true;
          }
        };
      }
    });
  }

  public show() {
    requestAnimationFrame(() => {
      this.noiseLevelRange.value = this.getAverageVolume(this.bands).toString();

      this.show();
    });
  }

  private getAverageVolume(array: Uint8Array): number {
    let values = 0;

    for (let i = 0; i < array.length; i++) {
      values += array[i];
    }

    const average = values / array.length;

    return average === 0 ? 0 : average / NOISE_PER_PERCENT;
  }
}

export default Analyse;
