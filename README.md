# OpenWebProject rm
Promise with support for progress updates

## Installation
```
npm install owp.progress-promise --save
```

## Usage
```javascript
new ProgressPromise(function(resolve, reject, progress) { }) => Promise
```

```javascript
const ProgressPromise = require("owp.progress-promise");

const promise = new ProgressPromise((resolve, reject, progress) => {
    progress("Running...");

    setTimeout(() => {
        resolve("Done");
    }, 1000);
});

promise.progress(progress => {
    console.log("Progress: " + progress);
})
.then(response => {
    console.log(`Response: ${response}\n`);
});
```