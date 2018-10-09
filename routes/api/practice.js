const express = require("express");
const router = express.Router();

const cp = require("child_process");

// @route GET /api/practice
router.get(`/`, (req, res) => res.json({ status: `"Yippee at api/practice` }));

//! sorter
let child = null;
router.post(`/sort`, (req, res) => {
  const sortNames = require(`../../workers/sorting/sortWorker`);
  const names = [`Fred`, `Wilma`, `Barney`, `Betty`, `Dino`];

  // Start the child process
  child = cp.fork(`sortNames.js`, names, { cwd: `./sorting` });
  console.log(`:api/practice/sort --> Sorter started`);

  // Process incoming messages
  child
    .on("exit", () => {
      clearInterval(interval);
      console.log(`PARENT--> All done`);
    })
    .on("message", msg => {
      console.log(`Sorted array received--> ${msg}`);
      this.stop();
    });

  res.json({ status: `Started sorter` });
});

//!start - catch missing parameters
router.get("/start", (req, res) => {
  return res.json({
    status: `Interval required. Try ...api/practice/start/5`
  });
});

let dogPound = []; // where barkers live

//! create and start barker
const worker = require(`../../workers/barking/barkWorker`);
router.get("/start/:interval", (req, res) => {
  let interval = parseInt(req.params.interval, 10);
  let thisDog = {
    name: `Dog${interval}`,
    worker: require(`../../workers/barking/barkWorker`)
  };

  thisDog.worker.interval = interval;
  //thisDog.worker.cronStr = `*/${interval} * * * * *`;
  thisDog.worker.dogName = `Dog${interval}`;
  thisDog.worker.start();

  //console.log(`thisDog`, thisDog.worker);
  dogPound.push(thisDog);

  res.json({ status: `${thisDog.name} started` });
});

//!stop all barkers
router.get("/stop", (req, res) => {
  if (dogPound.length === 0)
    return res.json({ status: `It's quiet - I can't hear any barking` });
  else {
    dogPound.forEach(x => {
      x.worker.stop();
    });

    dogPound = [];
    res.json({ status: `All barking has stopped. Good doggies...` });
  }
});

module.exports = router;
