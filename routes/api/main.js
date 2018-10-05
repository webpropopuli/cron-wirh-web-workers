const express = require("express");
const router = express.Router();

// @route GET /api/main
router.get(`/`, (req, res) => res.json({ status: `"Yippee at api/main` }));

//! random adder
const addRandoms = require(`../../workers/randWorker`);
router.get(`/rand/:num`, (req, res) => {
  addRandoms(parseInt(req.params.num));
  res.json({ status: `Dispatched random adder worker` });
});

//! start/stop
const worker = require(`../../workers/mainWorker`);
router.get("/start", (req, res) => {
  if (worker.running) return res.json({ status: `worker already running` });
  else {
    worker.start();
    res.json({ status: `worker started` });
  }
});

router.get("/stop", (req, res) => {
  if (!worker.running)
    return res.json({ status: `Can't stop non-running worker` });
  else {
    worker.stop();
    res.json({ status: `worker stopped` });
  }
});
module.exports = router;
