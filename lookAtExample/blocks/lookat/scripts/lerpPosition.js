const S = require("Scene");
const R = require("Reactive");
const Time = require("Time");

// Finds an element in the scene
// - Parameters:
//      e: The object to find
const find = e => S.root.findFirst(e);

const followNull = find("followNull");
const targetNull = find("targetNull");

// Lerp function without using Animation module
// - Parameters:
//      a: Current position
//      b: Target position
//      t: The amount to interpolate between a and b (from 0 to 1)
const lerp = (a, b, t) => {
  return a + (b - a) * t;
};

Promise.all([targetNull, followNull]).then(function (objects) {
  const [target, follow] = objects;

  let previousPosition = { x: 0, y: 0, z: 0 };
  const delayFactor = 0.05;

  // Update the position of the follow object with a delay
  Time.ms.monitor().subscribe(() => {
    const targetPosition = target.transform;
    const currentPosition = follow.transform;

    const newX = lerp(currentPosition.x.pinLastValue(), targetPosition.x.pinLastValue(), delayFactor);
    const newY = lerp(currentPosition.y.pinLastValue(), targetPosition.y.pinLastValue(), delayFactor);
    const newZ = lerp(currentPosition.z.pinLastValue(), targetPosition.z.pinLastValue(), delayFactor);

    follow.transform.x = newX;
    follow.transform.y = newY;
    follow.transform.z = newZ;

    previousPosition = { x: newX, y: newY, z: newZ };
  });
});
