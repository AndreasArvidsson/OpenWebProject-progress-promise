const ProgressPromise = require("../index");

console.log("owp.progress-promise: Running tests");

function test1() {
    console.log("Test 1:");
    return new ProgressPromise((resolve, reject, progress) => {
        timeout(
            progress,
            () => {
                resolve("Done");
            },
            5
        );
    })
        .progress(progress => {
            console.log("Time left: " + progress);
        })
        .then(response => {
            console.log(`Response: ${response}\n`);
        });
}

function test2() {
    console.log("Test 2:");
    return new ProgressPromise((resolve, reject, progress) => {
        progress("Running...");
        setTimeout(() => {
            resolve("Done");
        }, 0);
    })
        .progress(progress => {
            console.log("Progress: " + progress);
        })
        .then(response => {
            console.log(`Response: ${response}\n`);
        });
}

function test3() {
    console.log("Test 3:");
    return new ProgressPromise((resolve, reject, progress) => {
        progress("Running...");
        resolve("Done");
    })
        .progress(progress => {
            console.log("Progress: " + progress);
        })
        .then(response => {
            console.log(`Response: ${response}\n`);
        });
}

function test4() {
    console.log("Test 4:");
    return new ProgressPromise((resolve, reject, progress) => {
        progress("Running...");
        reject("Done");
    })
        .progress(progress => {
            console.log("Progress: " + progress);
        })
        .catch(response => {
            console.log(`Error: ${response}\n`);
        });
}

function timeout(progress, resolve, timeLeft) {
    if (timeLeft) {
        progress(timeLeft);
        setTimeout(() => {
            timeout(progress, resolve, timeLeft - 1);
        }, 1000);
    }
    else {
        resolve();
    }
}

test1()
    .then(() => {
        return test2();
    })
    .then(() => {
        return test3();
    })
    .then(() => {
        return test4();
    })
    .then(() => {
        console.log("owp.progress-promise: Tests done");
    });