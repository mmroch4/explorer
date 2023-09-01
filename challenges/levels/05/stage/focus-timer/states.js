import { soundControls } from "./sound-controls.js";
import { timer } from "./timer.js";

export const states = {
  currentTime: timer.currentTime,
  started: timer.started,
  paused: timer.paused,
  finished: this.finished,
  isMuted: soundControls.isMuted,
};
