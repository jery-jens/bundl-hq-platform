const container = document.querySelector('body');
const fireworks = new Fireworks(
  container,
  {
    acceleration: 1,
    brightness:
    {
      min: 50,
      max: 73,
      decay: {
        min: 0.0015,
        max: 0.013,
      },
    },
    explosion: 10,
    intensity: 4.85,
    gravity: 0.65,
    opacity: 0.5,
  },
);

fireworks.start();
