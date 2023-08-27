const S = require("Scene");
const R = require("Reactive");
const Time = require("Time");


const find = e => S.root.findFirst(e);
const targetNull = find("targetNull");


Promise.all([targetNull]).then(function (objects) {
  const [target] = objects;
  // Random animation
  const scl = R.val(0.1);
  target.transform.x = R.sin(Time.ms.mul(R.val(0.001))).mul(scl);
  target.transform.y = R.cos(Time.ms.mul(R.val(0.0007))).mul(scl);
  target.transform.z = R.sin(Time.ms.mul(R.val(0.0005))).mul(scl);

});
