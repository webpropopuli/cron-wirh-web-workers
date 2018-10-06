const CronJob = require("cron").CronJob;
const CronTime = require("cron").CronTime;
//const cronStr = "*/4 * * * * *";
//ct = new CronTime("*/3 * * * * *");

const barkWorker = new CronJob(
  "*/5 * * * * *", //this.cronStr,
  function() {
    //ct = new CronTime("*/2 * * * * *");

    //console.log(ct.source);
    //this.setTime(ct);
    //this.running = true;
    //console.log(this);
    console.log(`${this.dogName} says 'woof'`);
  }, // onTick
  function() {
    console.log(`${this.dogName} is sleeping now`);
  }, //onComplete
  false, // start at construction
  "America/New_York"
);

module.exports = barkWorker;
