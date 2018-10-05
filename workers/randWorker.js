const addRandoms = passes => {
  let total = 0;

  // start Worker
  var Worker = require("solid-worker");
  let worker = new Worker("getNRandoms.js");

  // send number of passes to worker (also send min and max)
  worker.postMessage({ passes: passes, min: 0, max: 100 });

  // create listener
  worker.onmessage = function(ev) {
    total = ev.data.Result;
    console.log(`[caller] Random total is: ${total}`);
  };
};

module.exports = addRandoms;
