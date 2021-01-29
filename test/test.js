var flows = require("../src/index");
var tap = require("tap");
var request = require("request");
var fs = require("fs");

tap.test("Test flows", function (t) {
  var bodyFromUrl;

  flows(
    function (url) {
      request(
        url,
        function (err, resp, body) {
          this.done(null, body);
        }.bind(this)
      );
    },
    function (body) {
      bodyFromUrl = body;
      t.ok(body.length > 1000);
      fs.writeFile("./body.out", body, this.done);
    },
    function () {
      fs.readFile("./body.out", "utf8", this.done);
    },
    function (body) {
      console.log("ENTERED");
      t.equals(bodyFromUrl, body);
      this.done(null, "All done");
    }
  )
    .start("https://www.google.com")
    .end(function (message) {
      t.equals(message, "All done");
      t.end();
    });
});
