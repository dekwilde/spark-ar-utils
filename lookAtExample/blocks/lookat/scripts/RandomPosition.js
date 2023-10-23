const Scene = require('Scene');
const Time = require('Time');
const Reactive = require('Reactive');
const Animation = require('Animation');
const Random = require('Random');
const Diagnostics = require('Diagnostics');
const Patches = require('Patches');


const find = e => Scene.root.findFirst(e);
const targetNull = find("targetNull");

let minLimitX = -0.15;
let maxLimitX = 0.15;
let minLimitY = -0.15;
let maxLimitY = 0.15;
let minLimitZ = 0;
let maxLimitZ = 0.15;


Promise.all([targetNull]).then(function (objects) {
  const [target] = objects;

  target.transform.x = getRandomPosition(minLimitX, maxLimitX);
  target.transform.y = getRandomPosition(minLimitY, maxLimitY);
  target.transform.z = getRandomPosition(minLimitZ, maxLimitZ);




  function doRandomPosition() {

    const rand1 = Math.floor(Math.random() * 3000 + 1000);
    const rand2 = Math.floor(Math.random() * 3000 + 1000);
    const newX = getRandomPosition(minLimitX, maxLimitX);
    const newY = getRandomPosition(minLimitY, maxLimitY);
    const newZ = getRandomPosition(minLimitZ, maxLimitZ);

    // Create a driver that goes from 0 to 1 over 3 seconds
    let driver = Animation.timeDriver({ durationMilliseconds: rand1, loopCount: 1 });
    driver.start();

    // Create samplers that interpolate the target's current position and rotation to the new position
    let samplerX = Animation.samplers.linear(target.transform.x.pinLastValue(), newX);
    let samplerY = Animation.samplers.linear(target.transform.y.pinLastValue(), newY);
    let samplerZ = Animation.samplers.linear(target.transform.z.pinLastValue(), newZ);

    // Bind the driver and sampler to the target's position
    target.transform.x = Animation.animate(driver, samplerX);
    target.transform.y = Animation.animate(driver, samplerY);
    target.transform.z = Animation.animate(driver, samplerZ);

    Time.setTimeout(() => {
      doRandomPosition();
    }, rand2); // every 3 seconds
  }

  function getRandomPosition(minLimit, maxLimit) {
    return Math.random() * (maxLimit - minLimit) + minLimit;
  }

  doRandomPosition();

});
