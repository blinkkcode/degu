import { func } from '../func/func';

import { XGameObject, XGameObjectConfig } from './x-game-object';
import { isContext } from 'vm';

interface XLineConfig extends XGameObjectConfig {
    strokeStyle: string;
    lineWidth: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    gradientStops?: Array<Object>;
    linearGradient?: Object;
}

/**
 * A single line in the x-engine.
 */
export class XLine extends XGameObject {
    private strokeStyle: string;
    private lineWidth: number;
    private lineJoin: string;
    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;

    /**
     * An array of gradient stops.
     * Example:
     * [
     *    {
     *      stop: 0, color: 'red'
     *     },
     *    {
     *      stop: 1, color: 'green'
     *     }
     * ]
     */
    private gradientStops: Array<Object> | null;
    /**
     * An Object defining startX, startY, endX and endY for the linear gradient.
     * TODO (uxder): Clean this up.
     */
    private linearGradient: any | null;


    constructor(config: XLineConfig) {
        super(config);

        this.strokeStyle = func.setDefault(config.strokeStyle, 'red');
        this.lineWidth = func.setDefault(config.lineWidth, 1);
        this.startX = func.setDefault(config.startX, 0);
        this.startY = func.setDefault(config.startY, 0);
        this.endX = func.setDefault(config.endX, 0);
        this.endY = func.setDefault(config.endY, 0);
        this.gradientStops = func.setDefault(config.gradientStops, null);
        this.linearGradient = func.setDefault(config.linearGradient, null);

        //Options are "round", "mitre" and "bevel".
        this.lineJoin = "round";
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.strokeStyle;

        if (this.gradientStops) {
            var grad = ctx.createLinearGradient(
                this.startX, this.startY, this.endX, this.endY)

            // Override linear gradient poitns.
            if (this.linearGradient) {
                grad = ctx.createLinearGradient(
                    this.linearGradient.startX,
                    this.linearGradient.startY,
                    this.linearGradient.endX,
                    this.linearGradient.endY)
            }

            this.gradientStops.forEach((stop: any) => {
                grad.addColorStop(stop.stop, stop.color);
            })
            ctx.strokeStyle = grad;
        }


        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        //ctx.closePath();
        ctx.stroke();
        // if (this..strokeStyle !== "none") ctx.stroke();
        // if (o.fillStyle !== "none") ctx.fill();
    }

}