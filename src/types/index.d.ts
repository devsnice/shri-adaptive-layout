import { Player } from "../components/videocontrol/player";

declare global {
  interface Window {
    Hls: any;
  }
}

export interface IWidgetPlayerData {
  albumcover: string;
  artist: string;
  track: {
    name: string;
    length: string;
  };
  volume: number;
}

export interface IWidgetQuestionsData {
  buttons: Array<string>;
}

export interface IWidgetThemalData {
  temperature: number;
  humidity: number;
}

interface WidgetDefaultData {
  temperature: number;
  humidity: number;
}

export interface Event {
  type: string;
  title: string;
  source: string;
  time: string;
  description: string;
  icon: string;
  size: string;
  data?: WidgetDefaultData | IWidgetPlayerData | IWidgetQuestionsData | IWidgetThemalData;
}

export interface Broadcast {
  player: Player | null;
  url: string;
  id: number | undefined;
}
