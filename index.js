module.exports = class ProgressPromise extends Promise {

    constructor(executor) {
        let resolveSuper, rejectSuper;
        super((resolve, reject) => {
            resolveSuper = resolve;
            rejectSuper = reject;
        });

        this.progress = this.progress.bind(this);
        this._resolve = this._resolve.bind(this);
        this._reject = this._reject.bind(this);
        this._progress = this._progress.bind(this);

        this._resolveSuper = resolveSuper;
        this._rejectSuper = rejectSuper;
        this._progressCallbacks = [];
        this._isPending = true;

        executor(this._resolve, this._reject, this._progress);
    }

    progress(callback) {
        if (this._isPending) {
            this._progressCallbacks.push(callback);
            if (this._progressValue !== undefined) {
                callback(this._progressValue);
            }
        }
        return this;
    }

    _resolve(value) {
        this._isPending = false;
        return this._resolveSuper(value);
    }

    _reject(value) {
        this._isPending = false;
        return this._rejectSuper(value);
    }

    _progress(value) {
        if (this._isPending) {
            this._progressValue = value;
            this._progressCallbacks.forEach(callback => {
                callback(value);
            });
        }
    }

};