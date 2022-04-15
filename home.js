const container = document.querySelector('.fireworks');
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
    gravity: 0.65,
    opacity: 0.5,
    speed: 2,
    trace: 3,
  },
);

fireworks.start();
