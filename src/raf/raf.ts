import { time } from '../time/time';



/**
 * A class that creates a RAF loop and calls a specific callback.  Setting the
 * frame rate will throttle the animation.
 *
 * Example usage;
 * ```ts
 * var raf = new Raf((frame, lastUpdateTime, stop)=> {
 *   console.log('this runs on request animation frame');
 *   // The current FPS.
 *   console.log(raf.getCurrentFps());
 * });
 * raf.start();
 *
 * // Later to stop raf.
 * raf.stop();
 *
 * // Set the FPS
 * raf.setFps(30);
 * raf.start();
 *
 *
 * // Add or remove listeners
 * var onRaf = ()=> {
 *   console.log('hello')
 * }
 * raf.watch(onRaf);
 * raf.unwatch(onRaf);
 *
 * // Clock functions: Delta and elapsed time.
 * var raf2 = new Raf((frame, lastUpdateTime, stop)=> {
 *   // Gets the time when raf started.
 *   const startTime = raf.getStartTime();
 *   // Gets the delta between the last update
 *   const delta = raf.getDelta();
 *   // Time elapsed
 *   const elapsedTime = raf.getElapsedTime();
 * }).start();
 *
 * ```
 *
 * RunWhen option.
 * You can pass a run condition to limit raf only when the condition resolve
 * to true.  This is useful to cull unncessary requests.
 * An example is to use elementVisility to only run RAF when an element is
 * in view and stop raf when it goes out of view.
 *
 *
 * ```ts
 *
 * // Runs only when the window is small.
 * var raf = new Raf(()=> {
 *   console.log('this runs when scren size is less than 1000');
 * });
 * raf.runWhen(()=> { window.innerWidth < 1000});
 * raf.start();
 *
 *
 *
 * // Runs only when myElement is in view.
 * let ev = elementVisibility.inview(myElement);
 * var raf = new Raf(() => {
 *    console.log('a raf that runs when element is in view.');
 * });
 * raf.runWhen(() => {
 *    return ev.state().inview;
 * });
 *
 * // This normally works fine but elementVisibility has a split second to
 * // boot up.
 * raf.start();
 *
 * // if you want to be sure to only run RAF when ev is ready do this:
 * ev.readyPromise.then(()=> {
 *   raf.start();
 * })
 *
 *
 * ```
 *
 * @noInheritDoc
 * @class
 */
export class Raf {

    private raf_: any;
    private frame: number | null;
    private lastUpdateTime: number;
    private delta: number;
    private fps: number;
    private currentFps: number;
    private isPlaying: boolean;
    private callbacks: Array<Function>;
    private runCondition: Function | null;
    private isRunningRaf: boolean;
    private elaspedTime: number;
    private startTime: number;

    /**
     * @param {Function} rafLoop  Optional function to be called on each
     *     request animation frame.
     * @constructor
     */
    constructor(rafLoop: Function | null) {

        /**
         * The internal reference to request animation frame.
         * @type {private}
         */
        this.raf_ = null;

        /**
         * The current animation frame.
         * @type {number}
         * @public
         */
        this.frame = null;

        /**
         * The last updated time.
         * @type {number}
         * @public
         */
        this.lastUpdateTime = 0;

        /**
         * The frame rate. Defaults to 0 in which case RAF is not throttled.
         * @type {number}
         */
        this.fps = 0;

        /**
         * The current frame rate.
         * @type {number}
         */
        this.currentFps = 0;

        /**
         * Whether raf is looping.
         * @type {boolean}
         */
        this.isPlaying = false;

        /**
         * Whether we are already running raf.
         */
        this.isRunningRaf = false;

        /**
         * A collection of callbacks to be called on raf.
         * @type {Array<Function>}
         */
        this.callbacks = [];

        /**
         * An optional condition in which if set and resolved to false,
         * the raf loop gets cull.ed
         * @type {Function}
         */
        this.runCondition = null;

        /**
         * The delta time in ms between the last frame update.
         */
        this.delta = 0;

        /**
         * The elapsed time instantiation.  This serves as a clock.
         * Note this is based on seconds not ms.
         */
        this.elaspedTime = 0;

        /**
         * The last known start time of raf.
         */
        this.startTime = 0;

        if (rafLoop) {
            this.watch(rafLoop);
        }
    }

    /**
     * Adds a raf listener
     * @param
     */
    watch(callback: any) {
        this.callbacks.push(callback);
    }

    /**
     * Removes a progress listener.
     * @param {Function}
     */
    unwatch(callbackToRemove: any) {
        this.callbacks = this.callbacks.filter((callback) => {
            return callback == callbackToRemove;
        })
    }


    /**
     * Sets a function to execute on each raf loop.  If the condition resolves
     * to true, the raf loop callbacks will be executed.  If false, the raf
     * loop is culled.
     * @param callbackCondition
     */
    runWhen(callbackCondition: Function) {
        this.runCondition = callbackCondition;
    }


    /**
     * Sets the fps .
     */
    setFps(fps: number) {
        this.fps = fps;
    }

    /**
     * Starts the RAF animation loop.
     * @param {boolean} Whether to force a start.
     */
    start(force: boolean = false) {
        if (!force && this.isPlaying) {
            return;
        }
        this.startTime = ( typeof performance === 'undefined' ? Date : performance ).now();
        this.animationLoop_();
        this.isPlaying = true;
    }

    /**
     * Stops the RAF animation loop.
     */
    stop() {
        this.isPlaying = false;
        window.cancelAnimationFrame(this.raf_);
        this.isRunningRaf = false;
    }

    dispose() {
        this.stop();
    }

    /**
     * Gets the delta in ms between the last executed raf update.
     * @param inSeconds Whether to acquire the delta time in seconds.  Defaults
     *   to ms.
     */
    getDelta(inSeconds:boolean) {
        if(inSeconds) {
          return this.delta / 1000;
        } else {
          return this.delta;
        }
    }

    /**
     * Gets the elasped time since raf started.
     */
    getElapsedTime() {
        return this.elaspedTime;
    }


    /**
     * Gets the time (Date) when raf started.
     */
    getStartTime() {
        return this.startTime;
    }


    /**
     * Gets the current frame rate that raf is running at.  Useful for debugging.
     */
    getCurrentFps() {
        return this.currentFps;
    }


    /**
     * The internal animation loop.
     */
    private animationLoop_() {
        if (this.isRunningRaf) {
            return;
        }

        this.raf_ = window.requestAnimationFrame((frame: number) => {
            this.frame = frame;
            this.isRunningRaf = false;
            this.animationLoop_();
        });

        this.isRunningRaf = true;

        if (this.lastUpdateTime) {
            const current = time.now();
            const elapsed = current - this.lastUpdateTime;
            this.delta = elapsed;
            this.elaspedTime += elapsed / 1000;
            const fps = this.fps == 0 ? 0 : 1000 / this.fps;
            this.currentFps = 1000 / elapsed;
            if (elapsed > fps) {
                this.callbacks.forEach((callback) => {
                    const callCallback = () => {
                        callback(this.frame, this.lastUpdateTime, elapsed, () => {
                            this.stop();
                        });
                    }
                    if (this.runCondition) {
                        this.runCondition() && callCallback();
                    } else {
                        callCallback();
                    }
                });

                this.lastUpdateTime = time.now();
            }
        }

        if (!this.lastUpdateTime) {
            this.lastUpdateTime = time.now();
        }

    }
}
