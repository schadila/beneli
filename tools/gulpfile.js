(function() {
    "use strict";

    var requireDir = require("require-dir");

    // require all tasks in gulp/tasks, including sub-folders

    // requireDir("./gulp/tasks", { recurse: true });
    requireDir("./gulp/tasks_new", { recurse: true });
})();
