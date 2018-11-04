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

export interface IWidgetDefaultData {
  type: string;
}

export interface Event {
  id: string;
  type: string;
  title: string;
  source: string;
  time: string;
  description: string;
  icon: string;
  size: string;
  data?: IWidgetDefaultData | IWidgetPlayerData | IWidgetQuestionsData | IWidgetThemalData;
  userRead?: boolean;
}

export interface Broadcast {
  player: Player | null;
  url: string;
  id: number | undefined;
}
