// var timers = require("timers"),
//   parseString = require("xml2js").parseString,
//   async = require("async"),
//   http = require("http"),
//   ___backgroundTimer;

process.on("message", function(msg) {
  console.log(`@@@@@@@@@@@@@@@@@@@@@77`);
  var ___wxArray = [];

  this._longRunningTask = function(data) {
    alert(`@@@@@in long running task@@`);
  };

  this._getFeed = function(url, type, callback) {
    alert(`@@@@@@@@@@@@@@@@@@@@@0`);
    var result = null;
    var timeout = 30000;

    http.get(url, function(response) {
      alert(`@@@@@@@@@@@@@@@@@@@@@8`);
      console.log("_getFeed()  " + url);

      var final = "";

      //response.setEncoding("utf8");
      response.setTimeout(timeout, function(err) {
        console.log("request timed out");
        callback(null, "Request timed out");
      });
      response.on("error", function(err) {
        console.log("_getFeed ERROR " + err);
        callback("ERROR", err);
      });

      response.on("data", function(data) {
        //console.log(data);
        final = final + data;
      });

      response.on("end", function() {
        callback(final);
      });
    });
  };

  /**
   * Asynchronous background task for loading weather station data
   * @param data An array of functions that include the GET requests
   */
  this._async = function(/* Array */ data) {
    alert(`@@@@@@@@@@@@@@@@@@@@@12`);
    try {
      async.parallel(data, function(err, results) {
        console.log("Station data retrieved! COUNT = " + results.length);

        try {
          var data = {
            content: results
          };
          process.send(data);
        } catch (err) {
          console.log("retriever.js: " + err.message + "\n" + err.stack);
        }
      });
    } catch (err) {
      console.log("_async() " + err.message + ", " + err.stack);
    }
  };

  this._startTimer = function() {
    alert(`@@@@@@@@@@@@@@@@@@@@@4`);
    var count = 0;

    ___backgroundTimer = timers.setInterval(
      function() {
        try {
          var date = new Date();
          console.log("retriever.js: datetime tick: " + date.toUTCString());
          this._longRunningTask(msg.content);
          this._async(___wxArray);
        } catch (err) {
          count++;
          if (count == 3) {
            console.log(
              "retriever.js: shutdown timer...too many errors. " + err.message
            );
            clearInterval(___backgroundTimer);
            process.disconnect();
          } else {
            console.log("timer.js: " + err.message + "\n" + err.stack);
          }
        }
      }.bind(this),
      msg.interval
    );
  };

  this._init = () => {
    console.log(`@@@@@@@@@@@@@@@@@@@@@2`);
    {
      this._longRunningTask(msg.content);
      this._async(___wxArray);
      this._startTimer();
    }
  };
});

process.on("uncaughtException", function(err) {
  console.log(`@@@@@@@@@@@@@@@@@@@@@3`);
  console.log(
    "retriever.js: " +
      err.message +
      "\n" +
      err.stack +
      "\n Stopping background timer"
  );
  clearInterval(___backgroundTimer);
});
