/*

//>>>> https://github.com/ducksoupdev/gulp-site-generator

 */


(function() {
    "use strict";

    var requireDir = require("require-dir");

    // require all tasks in gulp/tasks, including sub-folders
    // requireDir("./tools/gulp/tasks/", { recurse: true });
    requireDir("./tools/gulp/tasks/", { recurse: true });
})();
