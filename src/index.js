module.exports = function () {
  var testModule = {};

  // implement code here

  var apiArgs = arguments;

  var functionsQueue = {
    queue: [],

    start: function (initialElements) {
      for (var i = 0; i < initialElements.length; i++) {
        functionsQueue.queue.push(initialElements[i]);
      }
    },

    dequeue: function () {
      return functionsQueue.queue.splice(0, 1)[0];
    },

    enqueue: function (element) {
      functionsQueue.queue.push(element);
    },

    hasElements: function () {
      return functionsQueue.queue.length > 0;
    }
  };

  testModule.start = function (parameter) {
    functionsQueue.start(apiArgs);

    var initial = functionsQueue.dequeue();
    initial.call(testModule, parameter);

    return testModule;
  };

  testModule.end = function (callback) {
    functionsQueue.enqueue(callback);
  };

  testModule.done = function (err, response) {
    if (functionsQueue.hasElements()) {
      var next = functionsQueue.dequeue();
      next.call(testModule, response);
    }
  };

  return testModule;
};
