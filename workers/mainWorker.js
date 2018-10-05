const CronJob = require('cron').CronJob;

const conStr = '* * * * * *'

const mainWorker = new CronJob(
    '*/3 * * * * *', 
    function ()  {
        console.log('You will see this every 3 secs');
    },      // onTick
    null,   //onComplete
    false,  // start at construction 
    'America/New_York');  // tz
    
module.exports = mainWorker