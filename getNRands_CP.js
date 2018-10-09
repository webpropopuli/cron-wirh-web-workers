// This child process adds n random numbers
// between min and max and returns a total

const getRandom = (min, max) => {
  // helper fn
  return Math.floor(Math.random() * (max - min) + min);
};

process.on("message", msg => {
  //! Read data sent from on start
  const { passes, min, max } = process.argv.slice(2); //??????????
  console.log(`Adding ${passes} random nums in background`);

  //! This is the 'work'
  let total = 0;
  console.time("TIMER: randoms");
  for (let i = 0; i < passes; total += getRandom(min, max + 1), i++);
  console.timeEnd("TIMER: randoms");

  //! Build the msg to send back and post it
  let processResult = { Result: total };
  process.send({ msg: `DONE`, data: processResult });

  process.send(`exit`); // goodbye cruel world....
});
onmessage = function(e) {};
