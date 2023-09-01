/**
 * Sound = {
 *  label: string
 *  src: string
 *  loop: boolean
 * }
 *
 * Sound = {
 *  label: string
 *  src: string
 *  loop: boolean
 *  audio: AudioElement
 * }
 */

export class SoundControls {
  _isMuted = false;
  _volume = 1.0;
  _currentPlayingTracks = new Set();

  constructor(_sounds = []) {
    this.sounds = new Map(
      Array.from(_sounds, (_sound, i) => {
        if (!_sound.src) return;
        else if (!_sound.label) {
          _sound.label = `sound-${++i}`;
        }

        const audio = new Audio(_sound.src);

        audio.loop = !!_sound.loop;
        audio.volume = this._volume;

        audio.onended = () => {
          this.removeCurrentPlayingTrack(_sound.label);
        };

        return [_sound.label, { ..._sound, audio }];
      })
    );
  }

  async play(label) {
    if (
      !label ||
      typeof label !== "string" ||
      this._isMuted ||
      !this.sounds.has(label) ||
      this._currentPlayingTracks.has(label)
    )
      return;

    await this.sounds.get(label).audio.play();

    this.addCurrentPlayingTrack(label);
  }

  async pause(label) {
    if (
      !label ||
      typeof label !== "string" ||
      !this.sounds.has(label) ||
      !this._currentPlayingTracks.has(label)
    )
      return;

    await this.sounds.get(label).audio.pause();

    this.removeCurrentPlayingTrack(label);
  }

  addCurrentPlayingTrack(label) {
    if (!label || typeof label !== "string") return;

    this._currentPlayingTracks.add(label);
  }

  removeCurrentPlayingTrack(label) {
    if (!label || typeof label !== "string") return;

    this._currentPlayingTracks.delete(label);
  }

  flushCurrentPlayingTracks() {
    this._currentPlayingTracks.clear();
  }

  get isMuted() {
    return this._isMuted;
  }

  async mute(value) {
    if (typeof value !== "boolean") return;

    this._isMuted = value;

    if (value) {
      await this.muteSounds();
    }
  }

  async muteSounds() {
    for (const trackLabel of this.currentPlayingTracks) {
      await this.muteSound(trackLabel);
    }
  }

  async muteSound(label) {
    await this.pause(label);
  }

  get currentPlayingTracks() {
    return Array.from(this._currentPlayingTracks.values());
  }

  get volume() {
    return this._volume;
  }

  changeVolume(value) {
    if (typeof value !== "number" || !(0 <= value && value <= 1)) return;

    this._volume = value;

    this.sounds.forEach((sound) => (sound.audio.volume = value));
  }
}

export const soundControls = new SoundControls([
  {
    label: "bonfire",
    src: "./assets/sounds/bonfire.wav",
    loop: true,
  },
  {
    label: "cafe",
    src: "./assets/sounds/cafe.wav",
    loop: true,
  },
  {
    label: "rain",
    src: "./assets/sounds/rain.wav",
    loop: true,
  },
  {
    label: "woods",
    src: "./assets/sounds/bonfire.wav",
    loop: true,
  },
]);
