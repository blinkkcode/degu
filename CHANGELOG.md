# Changelog

## [1.7.0](https://www.github.com/blinkk/degu/compare/v1.6.0...v1.7.0) (2021-07-18)


### Features

* add lottie-progress-player ([4ca259f](https://www.github.com/blinkk/degu/commit/4ca259fbb739689e3106d60ec52db8865ad25de0))

## [1.6.0](https://www.github.com/blinkk/degu/compare/v1.5.0...v1.6.0) (2021-07-14)


### Features

* add active/inactive callbacks to inview-progress. ([78e2736](https://www.github.com/blinkk/degu/commit/78e27361282477a6f94077064105cab26896be58))
* add manualProgressUpdates to css-parallaxer ([19ec1d8](https://www.github.com/blinkk/degu/commit/19ec1d822fce9a3d50036aa1c84052e121ef7ac3))
* add mathf ([eff57d9](https://www.github.com/blinkk/degu/commit/eff57d970a1e934431f729a2974f823a9c8b789e))
* add progressWatcher option to css-parallaxer ([b20153f](https://www.github.com/blinkk/degu/commit/b20153fb782f0e13787f262b557e335859a9d0c6))
* add scroll-progress ([1f296ac](https://www.github.com/blinkk/degu/commit/1f296ac1b58705b0b9f880ab39c3553d5d02e651))

## [1.5.0](https://www.github.com/blinkk/degu/compare/v1.4.1...v1.5.0) (2021-07-11)


### Features

* add IN_ONCE event to inview ([89bb3f3](https://www.github.com/blinkk/degu/commit/89bb3f360d8190c00c7897cdd712f01b2949de57))


### Bug Fixes

* handle loading errors in ScriptLoader ([#117](https://www.github.com/blinkk/degu/issues/117)) ([6e13cfe](https://www.github.com/blinkk/degu/commit/6e13cfed196d421d1e62765cf8047800e2d1c1b4))

### [1.4.1](https://www.github.com/blinkk/degu/compare/v1.4.0...v1.4.1) (2021-07-08)


### Bug Fixes

* Remove lazy-video inview playback option ([8bafe71](https://www.github.com/blinkk/degu/commit/8bafe71c32620b2a4476062b041f11e934cbdf6b))

## [1.4.0](https://www.github.com/blinkk/degu/compare/v1.3.1...v1.4.0) (2021-07-08)


### Features

* support custom attrs in ScriptLoader ([#114](https://www.github.com/blinkk/degu/issues/114)) ([bba69ee](https://www.github.com/blinkk/degu/commit/bba69eea25443d8df1693d1b92c2ba54f6167542))

### [1.3.1](https://www.github.com/blinkk/degu/compare/v1.3.0...v1.3.1) (2021-07-02)


### Bug Fixes

* Remove rounding from webgl-image-sequence to closely match browser sizing algo. ([83f2bfc](https://www.github.com/blinkk/degu/commit/83f2bfc6c4cea5e0c790fc90fefa3f77533f170e))

## [1.3.0](https://www.github.com/blinkk/degu/compare/v1.2.0...v1.3.0) (2021-07-02)


### Features

* Add events to CachedMouseTracker ([bd997c2](https://www.github.com/blinkk/degu/commit/bd997c2463d1fc275c3f70400b5bec1acc80ce59))


### Bug Fixes

* Correct DraggableSlide translation jumps ([bd778e8](https://www.github.com/blinkk/degu/commit/bd778e82a07d4e8766177d346684e0e9c0dd4250))

## [1.2.0](https://www.github.com/blinkk/degu/compare/v1.1.0...v1.2.0) (2021-07-01)


### Features

* add a simple element component registry ([#109](https://www.github.com/blinkk/degu/issues/109)) ([3da5d17](https://www.github.com/blinkk/degu/commit/3da5d170a27461707561d6a88388fd94e93bc45b))
* add events to css-parallaxer ([3ad474a](https://www.github.com/blinkk/degu/commit/3ad474a9ed5b923c241bd4e3ae844005dbcb4ce9))
* add FPS controls to video-progress ([979b4cb](https://www.github.com/blinkk/degu/commit/979b4cbbc40ba01a509d57996334fa0fa19835b4))
* add getFocusableElements() function ([#107](https://www.github.com/blinkk/degu/issues/107)) ([15a8963](https://www.github.com/blinkk/degu/commit/15a8963dcfc5e20eafc3e259ef7e56c7589c20d2))
* add inviewProgress support to viewport-css-parallax. ([80014e9](https://www.github.com/blinkk/degu/commit/80014e93ca56386c7f3d24fa3b26ad02fe6111a4))


### Bug Fixes

* debounce return type ([#111](https://www.github.com/blinkk/degu/issues/111)) ([5811909](https://www.github.com/blinkk/degu/commit/5811909a94a552aa5333b047717d73715e2afcae))

## [1.1.0](https://www.github.com/blinkk/degu/compare/v1.0.2...v1.1.0) (2021-06-06)


### Features

* add inview events ([c6ac873](https://www.github.com/blinkk/degu/commit/c6ac873036dbfb0f6a92830db66ba9f0a3e0a007))

### [1.0.2](https://www.github.com/blinkk/degu/compare/v1.0.1...v1.0.2) (2021-05-24)


### Miscellaneous Chores

* release 1.0.2 ([9c56661](https://www.github.com/blinkk/degu/commit/9c56661459979c55454a8eaea01d73a2f5d2d543))

### [1.0.1](https://www.github.com/blinkkcode/degu/compare/v1.0.0...v1.0.1) (2021-05-19)


### Miscellaneous Chores

* release 1.0.1 ([3209847](https://www.github.com/blinkkcode/degu/commit/32098474f207aae3216386785d279645c97bb13c))

## 1.0.0 (2021-05-18)


### ⚠ BREAKING CHANGES

* refactor utility classes to be treeshakable
* break out dom static methods
* rename Callback and add keyboard navigation watcher

### Features

* add keyboard navigation watcher ([33eb2f7](https://www.github.com/blinkkcode/degu/commit/33eb2f7f8f67d306372391f4e41101b0c7d361b5))
* add load attribute on video ([c02cafb](https://www.github.com/blinkkcode/degu/commit/c02cafb3b6b452bdd5282abb61e525773653b22b))
* add youtube modal ([#79](https://www.github.com/blinkkcode/degu/issues/79)) ([99bcb12](https://www.github.com/blinkkcode/degu/commit/99bcb1234b22488af646d087544e0d8b6996eb5b))
* Cull unneeded updates on Inview ([3ea11bd](https://www.github.com/blinkkcode/degu/commit/3ea11bd8a70571ff308a6cf0c583edbe5395d754))
* rename Callback and add keyboard navigation watcher ([33eb2f7](https://www.github.com/blinkkcode/degu/commit/33eb2f7f8f67d306372391f4e41101b0c7d361b5))


### Bug Fixes

* circular dependencies ([034d1a0](https://www.github.com/blinkkcode/degu/commit/034d1a00e5804618882acd553a5b97c54776bbd3))
* fix syntax error ([aea02a3](https://www.github.com/blinkkcode/degu/commit/aea02a3fbfa86eb4c73bbb1e2143bce757714de8))
* fix syntax error ([c9a1a17](https://www.github.com/blinkkcode/degu/commit/c9a1a178830370fcc57b9aa2ef0898832eb33a4a))
* new line in package.json ([64fc4ef](https://www.github.com/blinkkcode/degu/commit/64fc4ef8195eb8d183c916574cbf62da0137e226))
* rename "master" to "main" ([d0c47ab](https://www.github.com/blinkkcode/degu/commit/d0c47ab6f88a53eeb405bc0956ce7ed46f4b6928))


### Code Refactoring

* break out dom static methods ([b42ceb1](https://www.github.com/blinkkcode/degu/commit/b42ceb116220b258003769af42e9f23f51374b53))
* refactor utility classes to be treeshakable ([cedf721](https://www.github.com/blinkkcode/degu/commit/cedf721af3fc052a569ca8b4eb41152f9d038f5e))
