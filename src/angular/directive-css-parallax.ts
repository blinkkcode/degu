import { elementVisibility, ElementVisibilityObject } from '../dom/element-visibility';
import { cssUnit, CssUnitObject } from '../string/css-unit';
import { func } from '../func/func';
import { interpolateSettings } from '../interpolate/multi-interpolate';
import { DomWatcher } from '../dom/dom-watcher';
import { CssVarInterpolate } from '../interpolate/css-var-interpolate';
import { Raf } from '../raf/raf';
import { dom } from '../dom/dom';
import { mathf } from '../mathf/mathf';

export interface CssParallaxSettings {
    debug: boolean,
    top: string,
    bottom: string,
    // http://yano-js.surge.sh/classes/mathf.mathf-1.html#damp
    lerp: number,
    clamp: boolean
}

export interface CssParallaxConfig {
    settings: CssParallaxSettings,
}


export class CssParallaxController {
    private element: HTMLElement;
    private domWatcher: DomWatcher;
    private rafEv: ElementVisibilityObject;
    private raf: Raf;
    private interpolator: CssVarInterpolate;

    /**
     * The css parallax settings.
     */
    private parallaxData: CssParallaxConfig;
    private settingsData: CssParallaxSettings;
    private interpolationsData: Array<interpolateSettings>;


    private currentProgress: number = 0;


    /**
     * The top offset for progress
     */
    private topOffset: number;
    /**
     * The top offset for progress
     */
    private bottomOffset: number;

    static get $inject() {
        return ['$element', '$scope', '$attrs'];
    }

    constructor($element: ng.IRootElementService, $scope: ng.IScope, $attrs: ng.IAttributes) {
        this.element = $element[0];
        this.raf = new Raf(this.onRaf.bind(this));
        this.parallaxData = JSON.parse(this.element.getAttribute('css-parallax'));

        this.domWatcher = new DomWatcher();
        this.domWatcher.add({
            element: window,
            on: 'smartResize',
            callback: () => this.onWindowResize(),
        });


        this.settingsData = {
            ...{
                debug: false,
                clamp: true,
                top: '0px',
                bottom: '0px',
                lerp: 1,
                damp: 0
            },
            ...this.parallaxData['settings'] || {}
        };

        this.interpolationsData = this.parallaxData['interpolations'] || [];

        this.calculateProgressOffsets();

        this.interpolator = new CssVarInterpolate(
            this.element,
            {
                interpolations: this.interpolationsData,
            }
        );
        this.interpolator.useBatchUpdate(true);

        // Start and stop raf when the element comes into view.
        this.rafEv = elementVisibility.inview(this.element, {},
            (element: any, changes: any) => {
                changes.isIntersecting ? this.raf.start() : this.raf.stop();
            });

        $scope.$on('$destroy', () => {
            this.dispose();
        });
    }




    /**
     * Takes a css string declaration such as '100px', '100vh' or '100%'
     * and converts that into a relative pixel number.
     * @param cssUnitObject
     */
    protected getPixelValue(cssValue: string): number {
        const unit = cssUnit.parse(cssValue);
        let base = 1;
        if (unit.unit == '%') {
            base = this.element.offsetHeight;
            return base * (unit.value as number / 100);
        }
        if (unit.unit == 'vh') {
            base = window.innerHeight;
            return base * (unit.value as number / 100);
        }

        return base * (unit.value as number);
    }


    /**
     * Calculates the current progress and returns a value between 0-1.
     */
    protected updateProgress(): number {
        this.currentProgress =
            mathf.lerp(
                this.currentProgress,
                dom.getElementScrolledPercent(this.element, this.topOffset, this.bottomOffset, true),
                this.settingsData.lerp
            );

        if (this.settingsData.clamp) {
            this.currentProgress = mathf.clamp01(this.currentProgress);
        }


        if (this.settingsData.debug) {
            console.log(this.currentProgress, this.topOffset, this.bottomOffset);
        }

        return this.currentProgress;
    }


    protected onRaf(): void {
        this.updateProgress();
        this.interpolator.update(this.currentProgress);
    }


    protected calculateProgressOffsets() {
        this.topOffset = func.setDefault(
            this.getPixelValue(this.settingsData.top), 0
        )
        this.bottomOffset = func.setDefault(
            this.getPixelValue(this.settingsData.bottom), 0
        )
    }


    protected onWindowResize() {
        this.calculateProgressOffsets();
    }


    protected dispose(): void {
        this.rafEv.dispose();
        this.raf.dispose();
        this.domWatcher.dispose();
    }
}



/**
 *
 * A directive to run css var interpolations from yaml or json.
 *
 * In yaml:
 *
 * ```
 * partial: myPartial
 * css_parallax:
 *   setting:
 *     debug: false (boolean, optional) True outputs progress in the dev console.
 *     top: '0px' (string) A css number to offset where the progress begins.  Accepts %, px, vh.
 *     bottom: '0px' (string) A css number to offset the progress ends.  Accepts %, px, vh.
 *     lerp: 0.18 Optional lerp.  Defaults to 1 assuming no asymptotic averaging.
 *     clamp: false (boolean)  Defaults to true where by progress is clamped to 0 and 1.
 *
 *   interpolations:
 *     - id: '--x'
 *       progress:
 *       - from: 0.5
 *         to: 1
 *         start: '0px'
 *         end: '20px'
 *     - id: '--opacity'
 *       progress:
 *       - from: 0
 *         to: 0.5
 *         start: 0
 *         end: 1
 *       - from: 0.5
 *         to: 1
 *         start: 0
 *         end: 1
 * ```
 *
 *
 * In your app:
 *
 * ```ts
 *   import { cssParallaxDirective } from 'yano-js/lib/angular/directive-css-parallax';
 *
 *   const app = angular.module('myApp', []);
 *   app.directive('cssParallax', cssParallaxDirective);
 * ```
 *
 *
 * In the module, you want to use this:
 *
 * ```
 * <div {% if partial.css_parallax %} css-parallax="{{partial.css_parallax|jsonify}}{% endif %"></div>
 * ```
 *
 *
 *
 */
export const cssParallaxDirective = function () {
    return {
        restrict: 'A',
        controller: CssParallaxController
    }
}
