// This webworker function adds n random numbers
// between min and max and returns a total

const getRandom = (min, max) => {
  // helper fn
  return Math.floor(Math.random() * (max - min) + min);
};

onmessage = function(e) {
  //! Read data sent from caller
  const { passes, min, max } = e.data;
  console.log(`Adding ${passes} random nums in background`);

  //! This is the 'work'
  let total = 0;
  console.time("TIMER: randoms");
  for (let i = 0; i < passes; i++) total += getRandom(min, max + 1);
  console.timeEnd("TIMER: randoms");

  //! Build the msg to send back and post it
  var workerResult = { Result: total };
  postMessage(workerResult);
  self.stop(); // goodbye cruel world....
};
