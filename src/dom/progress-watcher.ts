
import { is } from '../is/is';
import { mathf } from '../mathf/mathf';

export interface ProgressWatcherItem {
    range: number | Array<number>;
    callback: Function;
    runWhen?: Function;
}



/**
 * A class that provides callbacks for progress points.
 *
 * ```
 * const progressWatcher = new ProgressWatcher();
 *
 *
 * // Triggers continously while runs from 0.2, 0.4
 *  this.progressWatcher.add({
 *    range: [0.2, 0.4],
 *    callback: (progress: number, direction: number)=> {
 *          console.log(progress, direction);
 *    }
 *  })
 *
 * // Triggers only when 0.2 is crossed in upwards or downwards direction.
 *  this.progressWatcher.add({
 *    range: 0.2,
 *    callback: (progress: number, direction: number)=> {
 *        // If going up
 *        if(direction == -1) {
 *           ....
 *        }
 *
 *        // If going down
 *        if(direction == 1) {
 *           ....
 *        }
 *    }
 *  })
 *
 *
 *  // RunWhen.  Add a condition to run.
 *  this.progressWatcher.add({
 *    range: [0.2, 0.4],
 *    callback: (progress: number, direction: number)=> {
 *          console.log(progress, direction);
 *    },
 *    runWhen: ()=> { return window.innerWidth < 1000 }
 *  })
 *
 *
 * // Remove watchFor
 * progressWatcher.remove(callback);
 *
 *
 * progressWatcher.update(0.2)
 *
 *
 * // If using with css parallaxer, you might do something
 * // like this.
 *  onRaf() {
 *       this.progressWatcher.setProgress(
 *           this.cssParallaxer.getProgress()
 *       );
 &  }
 *
 * ```
 *
 */
export class ProgressWatcher {

    private watchers: Array<ProgressWatcherItem> = [];
    private currentProgress: number = 0;
    private direction: number = 0;

    constructor() { }


    /**
     * Sets a callback for a specific range.
     * @param {number|Array<number>} A specific progress to watch for or
     *     an array like [0.1, 0.4] specifying the range to be watched.
     * @param {Function}
     */
    public add(progressWatchItem: ProgressWatcherItem): void {
        this.watchers.push(progressWatchItem)
    }


    /**
     * Removes a given set callback.
     * @param callback
     */
    public remove(callback: Function): void {
        this.watchers = this.watchers.filter(
            (watcher: ProgressWatcherItem) => {
                return watcher.callback !== callback;
            });
    }


    /**
     * Updates the progress value.
     */
    public setProgress(progress: number): void {
        const previousProgress = this.currentProgress;
        this.currentProgress = progress;
        const direction = mathf.direction(previousProgress, this.currentProgress);
        if(direction == -1 || direction == 1) {
            this.direction = direction;
        }

        // Loop through watchers.
        this.watchers.forEach((watcher: ProgressWatcherItem) => {
            let isBetween = false;
            if (is.array(watcher.range)) {
                isBetween = mathf.isBetween(this.currentProgress,
                    watcher.range[0], watcher.range[1]);
            } else {
                // If we are only watching for a specific value, we used the
                // previous progress to see if we passed it.
                isBetween = mathf.isBetween(<number>watcher.range,
                    this.currentProgress, previousProgress);
            }

            if (isBetween) {
                if(watcher.runWhen && watcher.runWhen()) {
                  watcher.callback(this.currentProgress, this.direction);
                } else {
                  watcher.callback(this.currentProgress, this.direction);
                }
            }
        })
    }



    /**
     * Removes all watchers.
     */
    public clear() {
        this.watchers = [];
    }


    /**
     * Disposes progress watcher.
     */
    public dispose() {
        this.watchers = null;
    }
}