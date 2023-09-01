import { elements } from "./elements.js";

const startingTime = 3;
const step = 300;

export class Timer {
  _started = false;
  _paused = false;
  _finished = false;

  _countdown;

  constructor(startingTime = 1800, step = 300, elements) {
    if (typeof startingTime !== "number") return;

    this._startingTime = startingTime;
    this._currentTime = startingTime;

    this._step = step;

    this._elements = elements;

    this.display();
  }

  play() {
    if (!timer.started || !timer.paused || timer.finished) return;

    this._paused = false;

    this.countdown();

    this._elements.play.classList.add("hide");
    this._elements.pause.classList.remove("hide");
  }

  pause() {
    if (!this._started || this._paused || this._finished) return;

    this._paused = true;

    clearInterval(this._countdown);

    this._elements.play.classList.remove("hide");
    this._elements.pause.classList.add("hide");
  }

  stop() {
    if (!this._started) return;

    this.reset();

    this._elements.play.classList.remove("hide");
    this._elements.pause.classList.add("hide");

    this._elements.set.classList.remove("hide");
    this._elements.stop.classList.add("hide");
  }

  start() {
    if (this._started) return;

    this._started = true;

    this.countdown();

    this._elements.set.classList.add("hide");
    this._elements.stop.classList.remove("hide");

    this._elements.play.classList.add("hide");
    this._elements.pause.classList.remove("hide");
  }

  finish() {
    if (!this._started) return;

    this._finished = true;

    this._elements.play.classList.remove("hide");
    this._elements.pause.classList.add("hide");
  }

  reset() {
    this._started = false;
    this._paused = false;
    this._finished = false;

    this._currentTime = this._startingTime;

    clearInterval(this._countdown);

    this.display();
  }

  display() {
    const minutes = Math.floor(this._currentTime / 60);
    const seconds = this._currentTime - minutes * 60;

    this._elements.display.minutes.textContent = String(minutes).padStart(2, 0);
    this._elements.display.seconds.textContent = String(seconds).padStart(2, 0);
  }

  add() {
    if (this._finished) return;

    this._startingTime += this._step;
    this._currentTime += this._step;

    this.display();
  }

  remove() {
    if (this._finished) return;

    if (this._startingTime <= this._step) {
      this._startingTime = 0;
      this._currentTime = 0;
    } else {
      this._startingTime -= this._step;
      this._currentTime -= this._step;
    }

    this.display();
  }

  countdown() {
    this._countdown = setInterval(() => {
      if (this._currentTime <= 0) {
        this.finish();

        return;
      }

      --this._currentTime;

      this.display();
    }, 1000);
  }

  set startingTime(value) {
    if (typeof value !== "number") return;

    this._startingTime = value;
    this._currentTime = value;
  }

  get currentTime() {
    return this._currentTime;
  }

  get started() {
    return this._started;
  }

  get paused() {
    return this._paused;
  }

  get finished() {
    return this._finished;
  }
}

export const timer = new Timer(startingTime, step, {
  display: elements.display,
  ...elements.action,
});
