const themingElements = {
  light: document.body.querySelector('button[data-theme="light"]'),
  dark: document.body.querySelector('button[data-theme="dark"]'),
};

const soundElements = {
  on: document.body.querySelector('button[data-sound="on"]'),
  off: document.body.querySelector('button[data-sound="off"]'),
};

const soundTypesElements = {
  rain: document.body.querySelector('div[data-sound-type="rain"]'),
  woods: document.body.querySelector('div[data-sound-type="woods"]'),
  cafe: document.body.querySelector('div[data-sound-type="cafe"]'),
  fire: document.body.querySelector('div[data-sound-type="fire"]'),
};

const actionElements = {
  play: document.body.querySelector('button[data-action="play"]'),
  pause: document.body.querySelector('button[data-action="pause"]'),
  set: document.body.querySelector('button[data-action="set"]'),
  stop: document.body.querySelector('button[data-action="stop"]'),
  add: document.body.querySelector('button[data-action="add"]'),
  remove: document.body.querySelector('button[data-action="remove"]'),
};

export const elements = {
  body: document.body,
  display: {
    minutes: document.body.querySelector("#display span#minutes"),
    seconds: document.body.querySelector("#display span#seconds"),
  },
  theming: { ...themingElements },
  sound: { ...soundElements },
  soundTypes: { ...soundTypesElements },
  action: { ...actionElements },
};
