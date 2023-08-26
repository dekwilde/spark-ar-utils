const Scene = require('Scene');
const Time = require('Time');
const Reactive = require('Reactive');
const Animation = require('Animation');
const Random = require('Random');
const Diagnostics = require('Diagnostics');

const minLimit = -0.5;
const maxLimit = 0.5;

// Encontre o objeto 'targetTracker0' primeiro
const targetTracker0Promise = Scene.root.findFirst('targetTracker0');

// Em seguida, encontre o objeto 'Pivot' a partir do 'targetTracker0'
targetTracker0Promise.then(targetTracker0 => {

  targetTracker0.findFirst('Pivot').then(pivot => {

    pivot.transform.x = getRandomPosition();
    pivot.transform.y = getRandomPosition();
    pivot.transform.z = getRandomPosition();

    Time.setInterval(() => {
      const newX = getRandomPosition();
      const newY = getRandomPosition();
      const newZ = getRandomPosition();

      // Create a driver that goes from 0 to 1 over 3 seconds
      let driver = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1 });
      driver.start();

      // Create samplers that interpolate the pivot's current position and rotation to the new position
      let samplerX = Animation.samplers.linear(pivot.transform.x.pinLastValue(), newX);
      let samplerY = Animation.samplers.linear(pivot.transform.y.pinLastValue(), newY);
      let samplerZ = Animation.samplers.linear(pivot.transform.z.pinLastValue(), newZ);

      // Bind the driver and sampler to the pivot's position
      pivot.transform.x = Animation.animate(driver, samplerX);
      pivot.transform.y = Animation.animate(driver, samplerY);
      pivot.transform.z = Animation.animate(driver, samplerZ);

    }, 3000); // every 3 seconds

    function getRandomPosition() {
      return Math.random() * (maxLimit - minLimit) + minLimit;
    }
  });
});
