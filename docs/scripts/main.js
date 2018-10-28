/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/header/header.ts":
/*!*****************************************!*\
  !*** ./src/components/header/header.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navigation; });
const domUtils = {
    doesNodeContainClick: (node, e) => {
        if (!node || !e)
            return false;
        // @ts-ignore
        return node.contains(e.target);
    }
};
class Navigation {
    constructor({ selector }) {
        this.menuOpened = false;
        this.headerMenu = document.querySelector(selector);
        this.headerBurgerMenu = document.querySelector("#header-burger");
        if (this.isMobile()) {
            this.initNavigation();
        }
    }
    isMobile() {
        const maxMobileWidth = 768;
        return window.innerWidth < maxMobileWidth;
    }
    initNavigation() {
        if (this.headerMenu) {
            this.headerMenu.classList.add("header-menu-list_state-mobile");
        }
        if (this.headerBurgerMenu) {
            this.headerBurgerMenu.addEventListener("click", () => {
                if (!this.menuOpened) {
                    this.openNavigation();
                }
                else {
                    this.closeNavigation();
                }
            });
        }
    }
    openNavigation() {
        if (this.headerMenu) {
            this.headerMenu.classList.add("header-menu-list_state-mobile-opened");
        }
        this.menuOpened = true;
    }
    closeNavigation() {
        if (this.headerMenu) {
            this.headerMenu.classList.remove("header-menu-list_state-mobile-opened");
        }
        this.menuOpened = false;
    }
}


/***/ }),

/***/ "./src/components/videocontrol/audioAnalyse.ts":
/*!*****************************************************!*\
  !*** ./src/components/videocontrol/audioAnalyse.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// @ts-ignore
const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
class Analyse {
    constructor({ video, noiseLevelRange }) {
        this.node = context.createScriptProcessor(2048, 1, 1);
        this.noiseLevelRange = noiseLevelRange;
        this.analyser = context.createAnalyser();
        this.bufferLength = this.analyser.frequencyBinCount;
        this.bands = new Uint8Array(this.bufferLength);
        this.startShow = false;
        video.addEventListener("canplay", () => {
            if (!this.source) {
                this.source = context.createMediaElementSource(video);
                this.source.connect(this.analyser);
                this.analyser.connect(this.node);
                this.node.connect(context.destination);
                this.source.connect(context.destination);
                this.node.onaudioprocess = (e) => {
                    this.analyser.getByteFrequencyData(this.bands); // copy current data to this.bands
                    if (!this.startShow) {
                        this.show();
                        this.startShow = true;
                    }
                };
            }
        });
    }
    getAverageVolume(array) {
        let values = 0;
        for (let i = 0; i < array.length; i++) {
            values += array[i];
        }
        const average = values / array.length;
        // calculate in 100% scale, 1% is 2.56
        return average === 0 ? 0 : average / 2.56;
    }
    show() {
        requestAnimationFrame(() => {
            this.noiseLevelRange.value = this.getAverageVolume(this.bands).toString();
            this.show();
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Analyse);


/***/ }),

/***/ "./src/components/videocontrol/canvasVideo.ts":
/*!****************************************************!*\
  !*** ./src/components/videocontrol/canvasVideo.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class CanvasVideo {
    constructor({ video, videoPlayer }) {
        this.video = video;
        this.videoPlayer = videoPlayer;
        this.stopVideo = false;
        this.canvas = null;
        this.canvasHelper = null;
    }
    applyBrightness(data, brightness) {
        for (let i = 0; i < data.length; i += 4) {
            data[i] += 255 * (+brightness / 100);
            data[i + 1] += 255 * (+brightness / 100);
            data[i + 2] += 255 * (+brightness / 100);
        }
    }
    applyContrast(data, contrast) {
        const factor = (259.0 * (+contrast + 255.0)) / (255.0 * (259.0 - +contrast));
        for (let i = 0; i < data.length; i += 4) {
            data[i] = this.truncateColor(factor * (data[i] - 128.0) + 128.0);
            data[i + 1] = this.truncateColor(factor * (data[i + 1] - 128.0) + 128.0);
            data[i + 2] = this.truncateColor(factor * (data[i + 2] - 128.0) + 128.0);
        }
    }
    truncateColor(value) {
        if (value < 0) {
            value = 0;
        }
        else if (value > 255) {
            value = 255;
        }
        return value;
    }
    filter({ video, width, height, contrast, brightness }) {
        if (!this.canvasHelper) {
            this.canvasHelper = document.createElement("canvas");
            this.canvasHelper.width = width;
            this.canvasHelper.height = height;
        }
        const contextHelper = this.canvasHelper.getContext("2d");
        if (contextHelper) {
            contextHelper.drawImage(video, 0, 0, width, height);
            const idata = contextHelper.getImageData(0, 0, width, height);
            var data = idata.data;
            this.applyBrightness(data, brightness);
            this.applyContrast(data, contrast);
            return idata;
        }
    }
    play({ canvasInited, brightness, contrast, size: { width, height } }) {
        if (!canvasInited) {
            this.canvas = document.createElement("canvas");
            this.canvas.style.width = `${width}`;
            this.canvas.style.height = `${height}`;
            this.canvas.width = width;
            this.canvas.height = height;
            this.videoPlayer.appendChild(this.canvas);
        }
        else {
            this.stopVideo = true;
        }
        if (this.canvas) {
            const context = this.canvas.getContext("2d");
            if (!context)
                return;
            const draw = () => {
                requestAnimationFrame(() => {
                    const filteredImage = this.filter({
                        video: this.video,
                        width,
                        height,
                        contrast,
                        brightness
                    });
                    context.putImageData(filteredImage, 0, 0);
                    if (this.stopVideo || this.video.paused || this.video.ended) {
                        this.stopVideo = false;
                        return false;
                    }
                    else {
                        draw();
                    }
                });
            };
            draw();
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (CanvasVideo);


/***/ }),

/***/ "./src/components/videocontrol/player.ts":
/*!***********************************************!*\
  !*** ./src/components/videocontrol/player.ts ***!
  \***********************************************/
/*! exports provided: PlayerTemplate, Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerTemplate", function() { return PlayerTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _canvasVideo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvasVideo */ "./src/components/videocontrol/canvasVideo.ts");
/* harmony import */ var _audioAnalyse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audioAnalyse */ "./src/components/videocontrol/audioAnalyse.ts");


/**
 * PlayerTemplate - generate video-player from <template> tag
 */
class PlayerTemplate {
    constructor() {
        this.template = document.getElementById("template-player");
    }
    render(id) {
        const element = this.template.content
            .querySelector(".videocontrol-list__item")
            .cloneNode(true);
        // player-{id}
        const playerElement = element.querySelector(".vc-player");
        playerElement && playerElement.setAttribute("id", id);
        // player-{id}-video
        const videoElement = element.querySelector("video");
        videoElement && videoElement.setAttribute("id", `${id}-video`);
        // player-{id}-webgl-video
        const inputElement = element.querySelector("input");
        inputElement && inputElement.setAttribute("id", `${id}-webgl-video`);
        return element;
    }
}
/**
 * Player is a wrapper around html5 video element and HLS standart,
 * it has special behavior for our application.
 */
class Player {
    constructor({ url, containerElement, playerElement }) {
        this.settings = {
            url,
            canvasInited: false,
            containerBounds: {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            },
            isFullscreen: false
        };
        this.videoSettings = {
            brightness: "0",
            contrast: "0",
            isFullscreen: false
        };
        this.containerElement = containerElement;
        this.player = playerElement;
        this.video = playerElement.querySelector("video");
        this.brightnessRange = playerElement.querySelector(".vc-player__brightness");
        this.noiseLevelRange = playerElement.querySelector(".vc-player__noise-level");
        this.contrastRange = playerElement.querySelector(".vc-player__contrast");
        this.canvasVideo = new _canvasVideo__WEBPACK_IMPORTED_MODULE_0__["default"]({
            video: this.video,
            videoPlayer: this.player
        });
        this.initPromise = null;
        this.init();
        this.initEvents();
    }
    setContainerBounds() {
        if (!this.settings.containerBounds) {
            this.settings.containerBounds = this.containerElement.getBoundingClientRect();
        }
        return this.settings.containerBounds;
    }
    init() {
        if (this.initPromise) {
            return this.initPromise;
        }
        this.initPromise = new Promise((resolve, reject) => {
            if (window.Hls.isSupported()) {
                const hls = new window.Hls();
                hls.loadSource(this.settings.url);
                hls.attachMedia(this.video);
                hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
                    resolve(this.video);
                });
            }
            else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
                this.video.src = this.settings.url;
                this.video.addEventListener("loadedmetadata", () => {
                    resolve(this.video);
                });
            }
        });
    }
    play() {
        this.video.play();
    }
    stop() {
        this.video.pause();
    }
    openFullscreen() {
        if (this.settings.isFullscreen)
            return false;
        this.setContainerBounds();
        const { containerBounds } = this.settings;
        this.video.muted = false;
        const playerBounds = this.player.getBoundingClientRect();
        this.player.style.transform = `
        translateX(0px)
        translateY(0px)
    `;
        this.player.style.width = playerBounds.width + "px";
        this.player.style.height = playerBounds.height + "px";
        this.player.style.transitionProperty = "";
        this.player.style.transitionDuration = "";
        this.player.style.zIndex = "2";
        window.requestAnimationFrame(() => {
            this.player.style.transitionProperty = "transform, width, height";
            this.player.style.transitionDuration = "0.3s";
            // move element to top/left bounder of the list-container
            this.player.style.transform = `
        translateX(-${playerBounds.left - containerBounds.left}px)
        translateY(-${playerBounds.top - containerBounds.top}px)
      `;
            this.player.style.width = containerBounds.width + "px";
            this.player.style.height = containerBounds.height + "px";
        });
        this.settings.isFullscreen = true;
    }
    closeFullscreen() {
        if (!this.settings.isFullscreen)
            return false;
        this.video.muted = true;
        this.player.style.zIndex = "1";
        window.requestAnimationFrame(() => {
            this.player.style.width = "100%";
            this.player.style.height = "100%";
            this.player.style.transform = `
          translateX(0px)
          translateY(0px)
      `;
        });
        this.settings.isFullscreen = false;
    }
    playVideoOnCanvas() {
        this.setContainerBounds();
        if (!this.settings.canvasInited) {
            this.video.classList.add("vc-player__video_state-hidden");
        }
        this.canvasVideo.play({
            canvasInited: this.settings.canvasInited,
            size: {
                width: this.settings.containerBounds.width,
                height: this.settings.containerBounds.height
            },
            brightness: this.videoSettings.brightness,
            contrast: this.videoSettings.contrast
        });
        this.settings.canvasInited = true;
    }
    changeBrightness(value) {
        this.videoSettings.brightness = value;
        this.playVideoOnCanvas();
    }
    changeContrast(value) {
        this.videoSettings.contrast = value;
        this.playVideoOnCanvas();
    }
    initEvents() {
        this.brightnessRange.addEventListener("change", e => {
            this.changeBrightness(e.target.value);
        });
        this.contrastRange.addEventListener("change", e => {
            this.changeContrast(e.target.value);
        });
        this.analyser = new _audioAnalyse__WEBPACK_IMPORTED_MODULE_1__["default"]({
            video: this.video,
            noiseLevelRange: this.noiseLevelRange
        });
    }
    addEventListener(event, callback) {
        this.player.addEventListener(event, callback);
    }
}


/***/ }),

/***/ "./src/components/videocontrol/videocontrol.ts":
/*!*****************************************************!*\
  !*** ./src/components/videocontrol/videocontrol.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/components/videocontrol/player.ts");

/**
 * Videocontrol represents controller over our feature,
 * it initializes broadcasts and interact with user's actions
 */
class Videocontrol {
    constructor({ broadcasts, elementShowAll, element }) {
        this.broadcasts = broadcasts;
        this.element = element;
        this.elementShowAll = elementShowAll;
        this.state = {
            fullscreenId: Infinity
        };
        this.initPlayers();
        this.initEvents();
    }
    closeFullPlayer() {
        // play all players
        this.broadcasts.forEach(broadcast => broadcast.player.play());
        this.broadcasts[this.state.fullscreenId].player.closeFullscreen();
        this.state.fullscreenId = null;
    }
    openFullPlayer(id) {
        // stop all players except a fullscreen
        this.broadcasts
            .filter(broadcast => broadcast.id !== id)
            .forEach(broadcast => broadcast.player.stop());
        // open player in fullscreen
        this.broadcasts[id].player.openFullscreen();
        this.state.fullscreenId = id;
    }
    initEvents() {
        this.elementShowAll.addEventListener("click", () => {
            this.closeFullPlayer();
        });
        this.elementShowAll.addEventListener("touchend", () => {
            this.closeFullPlayer();
        });
    }
    initPlayers() {
        this.broadcasts.forEach((broadcast, index) => {
            const VideoTemplate = new _player__WEBPACK_IMPORTED_MODULE_0__["PlayerTemplate"]();
            const listVideoElement = VideoTemplate.render(`player-${index + 1}`);
            this.element.appendChild(listVideoElement);
            const VideoPlayer = new _player__WEBPACK_IMPORTED_MODULE_0__["Player"]({
                containerElement: this.element,
                playerElement: listVideoElement.querySelector(".vc-player"),
                url: broadcast.url
            });
            VideoPlayer.init()
                .then(() => {
                VideoPlayer.play();
                // Init events
                VideoPlayer.addEventListener("click", e => {
                    this.openFullPlayer(index);
                });
                VideoPlayer.addEventListener("touchend", e => {
                    this.openFullPlayer(index);
                });
                // Save player to broadcasts array
                this.broadcasts[index].id = index;
                this.broadcasts[index].player = VideoPlayer;
            })
                .catch(err => console.warn(err));
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Videocontrol);


/***/ }),

/***/ "./src/components/widget/camera.widget.ts":
/*!************************************************!*\
  !*** ./src/components/widget/camera.widget.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class CameraWidget {
    constructor() {
        this.template = document.getElementById("widget-camera-template");
    }
    render() {
        return this.template.content.cloneNode(true);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (CameraWidget);


/***/ }),

/***/ "./src/components/widget/player.widget.ts":
/*!************************************************!*\
  !*** ./src/components/widget/player.widget.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class PlayerWidget {
    constructor({ data }) {
        this.template = document.getElementById("widget-player-template");
        this.data = data;
        this.widget = this.template.content.cloneNode(true);
    }
    setInnerText(selector, text) {
        const block = this.widget.querySelector(selector);
        if (block) {
            block.innerText = text;
        }
    }
    setCover() {
        const block = this.widget.querySelector(".player-now__cover");
        block.setAttribute("src", this.data.albumcover);
    }
    render() {
        this.setCover();
        this.setInnerText(".player-now__title", `${this.data.artist} ${this.data.track.name}`);
        this.setInnerText(".player-progress__time", this.data.track.length);
        this.setInnerText(".player-volume__percentage", `${this.data.volume}%`);
        return this.widget;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (PlayerWidget);


/***/ }),

/***/ "./src/components/widget/questions.widget.ts":
/*!***************************************************!*\
  !*** ./src/components/widget/questions.widget.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class QuestionsWidget {
    constructor({ data }) {
        this.template = document.getElementById("widget-questions-template");
        this.data = data;
        this.widget = this.template.content.cloneNode(true);
    }
    setInnerText(selector, text) {
        const block = this.widget.querySelector(selector);
        if (block) {
            block.innerText = text;
        }
    }
    render() {
        this.setInnerText(".button_type-yellow", this.data.buttons[0]);
        this.setInnerText(".button_type-grey", this.data.buttons[1]);
        return this.widget;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (QuestionsWidget);


/***/ }),

/***/ "./src/components/widget/stats.widget.ts":
/*!***********************************************!*\
  !*** ./src/components/widget/stats.widget.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class StatsWidget {
    constructor() {
        this.template = document.getElementById("widget-stats-template");
    }
    render() {
        return this.template.content.cloneNode(true);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (StatsWidget);


/***/ }),

/***/ "./src/components/widget/themal.widget.ts":
/*!************************************************!*\
  !*** ./src/components/widget/themal.widget.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class ThemalWidget {
    constructor({ data }) {
        this.template = document.getElementById("widget-thermal-template");
        this.data = data;
        this.widget = this.template.content.cloneNode(true);
    }
    setInnerText(selector, text) {
        const block = this.widget.querySelector(selector);
        if (block) {
            block.innerText = text;
        }
    }
    render() {
        this.setInnerText(".widget-sensor_type-temp .widget-sensor__value", `${this.data.temperature}C`);
        this.setInnerText(".widget-sensor_type-humidity .widget-sensor__value", `${this.data.humidity}%`);
        return this.widget;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ThemalWidget);


/***/ }),

/***/ "./src/components/widget/widget.ts":
/*!*****************************************!*\
  !*** ./src/components/widget/widget.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stats_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stats.widget */ "./src/components/widget/stats.widget.ts");
/* harmony import */ var _camera_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camera.widget */ "./src/components/widget/camera.widget.ts");
/* harmony import */ var _questions_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./questions.widget */ "./src/components/widget/questions.widget.ts");
/* harmony import */ var _themal_widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./themal.widget */ "./src/components/widget/themal.widget.ts");
/* harmony import */ var _player_widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player.widget */ "./src/components/widget/player.widget.ts");





const WIDGET_TYPES = {
    STATS: "STATS",
    CAMERA: "CAMERA",
    THERMAL: "THERMAL",
    PLAYER: "PLAYER",
    QUESTIONS: "QUESTIONS",
    DEFAULT: "DEFAULT"
};
class Widget {
    constructor({ event, container }) {
        this.event = event;
        this.container = container;
        this.template = document.getElementById("widget-template");
        // @ts-ignore
        this.widget = this.template.content.querySelector(".widget").cloneNode(true);
        this.render();
    }
    setDescription() {
        if (this.event.description && this.widget) {
            const contentText = this.widget.querySelector(".widget-content__text");
            const textElement = this.widget.querySelector(".widget-content__text");
            if (contentText) {
                contentText.classList.add(`widget-content__text_width-${this.event.size}`);
            }
            if (textElement) {
                textElement.innerText = this.event.description;
            }
        }
    }
    setHeaderData() {
        const titleElement = this.widget.querySelector(".widget-header-about__title");
        const typeElement = this.widget.querySelector(".widget-header__type");
        const dateElement = this.widget.querySelector(".widget-header__date");
        const iconUseElement = this.widget.querySelector(".widget-header-about__icon > use");
        const iconElement = this.widget.querySelector(".widget-header-about__icon");
        if (titleElement) {
            titleElement.innerText = this.event.title;
        }
        if (typeElement) {
            typeElement.innerText = this.event.source;
        }
        if (dateElement) {
            dateElement.innerText = this.event.time;
        }
        if (iconUseElement) {
            iconUseElement.setAttribute("xlink:href", `#${this.event.icon}`);
        }
        if (iconElement) {
            iconElement.classList.add(`icon_${this.event.icon}`);
        }
    }
    getDataTemplateType() {
        const { data, icon } = this.event;
        // @ts-ignore
        if (data.type === "graph") {
            return WIDGET_TYPES.STATS;
        }
        if (icon === "cam") {
            return WIDGET_TYPES.CAMERA;
        }
        // @ts-ignore
        if (data.temperature) {
            return WIDGET_TYPES.THERMAL;
        }
        // @ts-ignore
        if (data.albumcover) {
            return WIDGET_TYPES.PLAYER;
        }
        // @ts-ignore
        if (data.buttons) {
            return WIDGET_TYPES.QUESTIONS;
        }
        return WIDGET_TYPES.DEFAULT;
    }
    renderDataTemplate() {
        const templateDataType = this.getDataTemplateType();
        let dataContentBlock = null;
        switch (templateDataType) {
            case WIDGET_TYPES.STATS:
                const statsWidget = new _stats_widget__WEBPACK_IMPORTED_MODULE_0__["default"]();
                dataContentBlock = statsWidget.render();
                break;
            case WIDGET_TYPES.CAMERA:
                const cameraWidget = new _camera_widget__WEBPACK_IMPORTED_MODULE_1__["default"]();
                dataContentBlock = cameraWidget.render();
                break;
            case WIDGET_TYPES.PLAYER:
                // @ts-ignore
                const playerWidget = new _player_widget__WEBPACK_IMPORTED_MODULE_4__["default"]({
                    // @ts-ignore
                    data: this.event.data
                });
                dataContentBlock = playerWidget.render();
                break;
            case WIDGET_TYPES.QUESTIONS:
                // @ts-ignore
                const questionsWidget = new _questions_widget__WEBPACK_IMPORTED_MODULE_2__["default"]({
                    // @ts-ignore
                    data: this.event.data
                });
                dataContentBlock = questionsWidget.render();
                break;
            case WIDGET_TYPES.THERMAL:
                // @ts-ignore
                const thermalWidget = new _themal_widget__WEBPACK_IMPORTED_MODULE_3__["default"]({
                    // @ts-ignore
                    data: this.event.data
                });
                dataContentBlock = thermalWidget.render();
                break;
        }
        if (dataContentBlock) {
            const widgetContent = this.widget.querySelector(".widget-content");
            widgetContent && widgetContent.appendChild(dataContentBlock);
        }
    }
    render() {
        this.widget.classList.add(`widget_size-${this.event.size}`);
        this.widget.classList.add(`widget_type-${this.event.type}`);
        this.setHeaderData();
        this.setDescription();
        this.renderDataTemplate();
        this.container.appendChild(this.widget);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Widget);


/***/ }),

/***/ "./src/pages/index.page.ts":
/*!*********************************!*\
  !*** ./src/pages/index.page.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_widget_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/widget/widget */ "./src/components/widget/widget.ts");

class IndexPage {
    constructor() {
        this.init();
    }
    renderDashboardWidgets(events) {
        const dashboardWidgetsList = document.getElementById("dashboard-list");
        events.forEach(event => {
            new _components_widget_widget__WEBPACK_IMPORTED_MODULE_0__["default"]({
                event,
                container: dashboardWidgetsList
            });
        });
    }
    loadEvents() {
        return fetch("http://localhost:8000/api/events", {
            method: "POST",
            body: JSON.stringify({
                type: "critical:info",
                offset: 0,
                limit: 20
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(result => result)
            .catch(err => console.error(err));
    }
    init() {
        this.loadEvents().then(events => {
            this.renderDashboardWidgets(events);
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (IndexPage);


/***/ }),

/***/ "./src/pages/index.ts":
/*!****************************!*\
  !*** ./src/pages/index.ts ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/header/header */ "./src/components/header/header.ts");
/* harmony import */ var _index_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.page */ "./src/pages/index.page.ts");
/* harmony import */ var _videocontrol_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./videocontrol.page */ "./src/pages/videocontrol.page.ts");



class InitApplication {
    constructor() {
        this.currentPage = window.location.pathname;
        this.init();
    }
    routing() {
        switch (this.currentPage) {
            case "/":
                this.page = new _index_page__WEBPACK_IMPORTED_MODULE_1__["default"]();
                break;
            case "/videocontrol.html":
                this.page = new _videocontrol_page__WEBPACK_IMPORTED_MODULE_2__["default"]();
                break;
        }
    }
    init() {
        this.headerNavigation = new _components_header_header__WEBPACK_IMPORTED_MODULE_0__["default"]({
            selector: "#header-menu"
        });
        this.routing();
    }
}
new InitApplication();


/***/ }),

/***/ "./src/pages/videocontrol.page.ts":
/*!****************************************!*\
  !*** ./src/pages/videocontrol.page.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_videocontrol_videocontrol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/videocontrol/videocontrol */ "./src/components/videocontrol/videocontrol.ts");

class VideoControlPage {
    constructor() {
        this.broadcasts = [
            {
                url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8",
                player: null,
                id: undefined
            },
            {
                url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8",
                player: null,
                id: undefined
            },
            {
                url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8",
                player: null,
                id: undefined
            },
            {
                url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8",
                player: null,
                id: undefined
            }
        ];
        this.init();
    }
    init() {
        const VideocontrolWidget = new _components_videocontrol_videocontrol__WEBPACK_IMPORTED_MODULE_0__["default"]({
            broadcasts: this.broadcasts,
            element: document.getElementById("vc-list"),
            elementShowAll: document.getElementById("vc-showall")
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (VideoControlPage);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvYXVkaW9BbmFseXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvY29udHJvbC9jYW52YXNWaWRlby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvcGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvY29udHJvbC92aWRlb2NvbnRyb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L2NhbWVyYS53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3BsYXllci53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3F1ZXN0aW9ucy53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3N0YXRzLndpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy93aWRnZXQvdGhlbWFsLndpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy93aWRnZXQvd2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9pbmRleC5wYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvdmlkZW9jb250cm9sLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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O1NBQ3pCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFFRCxJQUFJLGVBQWUsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNyQzZDO0FBSW5FLE1BQU0sZ0JBQWdCO0lBR3BCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQjtnQkFDRSxHQUFHLEVBQ0QsZ0dBQWdHO2dCQUNsRyxNQUFNLEVBQUUsSUFBSTtnQkFDWixFQUFFLEVBQUUsU0FBUzthQUNkO1lBQ0Q7Z0JBQ0UsR0FBRyxFQUNELDhGQUE4RjtnQkFDaEcsTUFBTSxFQUFFLElBQUk7Z0JBQ1osRUFBRSxFQUFFLFNBQVM7YUFDZDtZQUNEO2dCQUNFLEdBQUcsRUFDRCw4RkFBOEY7Z0JBQ2hHLE1BQU0sRUFBRSxJQUFJO2dCQUNaLEVBQUUsRUFBRSxTQUFTO2FBQ2Q7WUFDRDtnQkFDRSxHQUFHLEVBQ0QsK0ZBQStGO2dCQUNqRyxNQUFNLEVBQUUsSUFBSTtnQkFDWixFQUFFLEVBQUUsU0FBUzthQUNkO1NBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFTyxJQUFJO1FBQ1YsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLDZFQUFZLENBQUM7WUFDMUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLE9BQU8sRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUMzQyxjQUFjLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUM7U0FDdEQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBRUQsK0RBQWUsZ0JBQWdCLEVBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2VzL2luZGV4LnRzXCIpO1xuIiwiY29uc3QgZG9tVXRpbHMgPSB7XG4gIGRvZXNOb2RlQ29udGFpbkNsaWNrOiAobm9kZTogSFRNTEVsZW1lbnQsIGU6IEV2ZW50KTogYm9vbGVhbiA9PiB7XG4gICAgaWYgKCFub2RlIHx8ICFlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmV0dXJuIG5vZGUuY29udGFpbnMoZS50YXJnZXQpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0aW9uIHtcbiAgbWVudU9wZW5lZDogYm9vbGVhbjtcbiAgaGVhZGVyTWVudTogSFRNTEVsZW1lbnQgfCBudWxsO1xuICBoZWFkZXJCdXJnZXJNZW51OiBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoeyBzZWxlY3RvciB9OiB7IHNlbGVjdG9yOiBzdHJpbmcgfSkge1xuICAgIHRoaXMubWVudU9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMuaGVhZGVyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIHRoaXMuaGVhZGVyQnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyLWJ1cmdlclwiKTtcblxuICAgIGlmICh0aGlzLmlzTW9iaWxlKCkpIHtcbiAgICAgIHRoaXMuaW5pdE5hdmlnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzTW9iaWxlKCkge1xuICAgIGNvbnN0IG1heE1vYmlsZVdpZHRoID0gNzY4O1xuXG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIDwgbWF4TW9iaWxlV2lkdGg7XG4gIH1cblxuICBwcml2YXRlIGluaXROYXZpZ2F0aW9uKCkge1xuICAgIGlmICh0aGlzLmhlYWRlck1lbnUpIHtcbiAgICAgIHRoaXMuaGVhZGVyTWVudS5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyLW1lbnUtbGlzdF9zdGF0ZS1tb2JpbGVcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVhZGVyQnVyZ2VyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJCdXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5tZW51T3BlbmVkKSB7XG4gICAgICAgICAgdGhpcy5vcGVuTmF2aWdhdGlvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VOYXZpZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvcGVuTmF2aWdhdGlvbigpIHtcbiAgICBpZiAodGhpcy5oZWFkZXJNZW51KSB7XG4gICAgICB0aGlzLmhlYWRlck1lbnUuY2xhc3NMaXN0LmFkZChcImhlYWRlci1tZW51LWxpc3Rfc3RhdGUtbW9iaWxlLW9wZW5lZFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnVPcGVuZWQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNsb3NlTmF2aWdhdGlvbigpIHtcbiAgICBpZiAodGhpcy5oZWFkZXJNZW51KSB7XG4gICAgICB0aGlzLmhlYWRlck1lbnUuY2xhc3NMaXN0LnJlbW92ZShcImhlYWRlci1tZW51LWxpc3Rfc3RhdGUtbW9iaWxlLW9wZW5lZFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnVPcGVuZWQgPSBmYWxzZTtcbiAgfVxufVxuIiwiLy8gQHRzLWlnbm9yZVxuY29uc3QgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXG5jb25zdCBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXG5jbGFzcyBBbmFseXNlIHtcbiAgc3RhcnRTaG93OiBib29sZWFuO1xuICBidWZmZXJMZW5ndGg6IG51bWJlcjtcbiAgYmFuZHM6IFVpbnQ4QXJyYXk7XG5cbiAgbm9kZTogYW55O1xuICBub2lzZUxldmVsUmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGFuYWx5c2VyOiBhbnk7XG4gIHNvdXJjZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICB2aWRlbyxcbiAgICBub2lzZUxldmVsUmFuZ2VcbiAgfToge1xuICAgIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50O1xuICAgIG5vaXNlTGV2ZWxSYW5nZTogSFRNTElucHV0RWxlbWVudDtcbiAgfSkge1xuICAgIHRoaXMubm9kZSA9IGNvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKDIwNDgsIDEsIDEpO1xuICAgIHRoaXMubm9pc2VMZXZlbFJhbmdlID0gbm9pc2VMZXZlbFJhbmdlO1xuXG4gICAgdGhpcy5hbmFseXNlciA9IGNvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcblxuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcbiAgICB0aGlzLmJhbmRzID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXJMZW5ndGgpO1xuXG4gICAgdGhpcy5zdGFydFNob3cgPSBmYWxzZTtcblxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zb3VyY2UpIHtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBjb250ZXh0LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZSh2aWRlbyk7XG5cbiAgICAgICAgdGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcbiAgICAgICAgdGhpcy5hbmFseXNlci5jb25uZWN0KHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgICB0aGlzLnNvdXJjZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbmF1ZGlvcHJvY2VzcyA9IChlOiBFdmVudFRhcmdldCkgPT4ge1xuICAgICAgICAgIHRoaXMuYW5hbHlzZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEodGhpcy5iYW5kcyk7IC8vIGNvcHkgY3VycmVudCBkYXRhIHRvIHRoaXMuYmFuZHNcblxuICAgICAgICAgIGlmICghdGhpcy5zdGFydFNob3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5zdGFydFNob3cgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldEF2ZXJhZ2VWb2x1bWUoYXJyYXk6IFVpbnQ4QXJyYXkpOiBudW1iZXIge1xuICAgIGxldCB2YWx1ZXMgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWVzICs9IGFycmF5W2ldO1xuICAgIH1cblxuICAgIGNvbnN0IGF2ZXJhZ2UgPSB2YWx1ZXMgLyBhcnJheS5sZW5ndGg7XG5cbiAgICAvLyBjYWxjdWxhdGUgaW4gMTAwJSBzY2FsZSwgMSUgaXMgMi41NlxuICAgIHJldHVybiBhdmVyYWdlID09PSAwID8gMCA6IGF2ZXJhZ2UgLyAyLjU2O1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5ub2lzZUxldmVsUmFuZ2UudmFsdWUgPSB0aGlzLmdldEF2ZXJhZ2VWb2x1bWUodGhpcy5iYW5kcykudG9TdHJpbmcoKTtcblxuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5hbHlzZTtcbiIsImNsYXNzIENhbnZhc1ZpZGVvIHtcbiAgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQ7XG4gIHZpZGVvUGxheWVyOiBIVE1MRWxlbWVudDtcbiAgc3RvcFZpZGVvOiBib29sZWFuO1xuXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsO1xuICBjYW52YXNIZWxwZXI6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih7IHZpZGVvLCB2aWRlb1BsYXllciB9OiB7IHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50OyB2aWRlb1BsYXllcjogSFRNTEVsZW1lbnQgfSkge1xuICAgIHRoaXMudmlkZW8gPSB2aWRlbztcbiAgICB0aGlzLnZpZGVvUGxheWVyID0gdmlkZW9QbGF5ZXI7XG4gICAgdGhpcy5zdG9wVmlkZW8gPSBmYWxzZTtcblxuICAgIHRoaXMuY2FudmFzID0gbnVsbDtcbiAgICB0aGlzLmNhbnZhc0hlbHBlciA9IG51bGw7XG4gIH1cblxuICBhcHBseUJyaWdodG5lc3MoZGF0YTogVWludDhDbGFtcGVkQXJyYXksIGJyaWdodG5lc3M6IHN0cmluZykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgZGF0YVtpXSArPSAyNTUgKiAoK2JyaWdodG5lc3MgLyAxMDApO1xuICAgICAgZGF0YVtpICsgMV0gKz0gMjU1ICogKCticmlnaHRuZXNzIC8gMTAwKTtcbiAgICAgIGRhdGFbaSArIDJdICs9IDI1NSAqICgrYnJpZ2h0bmVzcyAvIDEwMCk7XG4gICAgfVxuICB9XG5cbiAgYXBwbHlDb250cmFzdChkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgY29udHJhc3Q6IHN0cmluZykge1xuICAgIGNvbnN0IGZhY3RvciA9ICgyNTkuMCAqICgrY29udHJhc3QgKyAyNTUuMCkpIC8gKDI1NS4wICogKDI1OS4wIC0gK2NvbnRyYXN0KSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIGRhdGFbaV0gPSB0aGlzLnRydW5jYXRlQ29sb3IoZmFjdG9yICogKGRhdGFbaV0gLSAxMjguMCkgKyAxMjguMCk7XG4gICAgICBkYXRhW2kgKyAxXSA9IHRoaXMudHJ1bmNhdGVDb2xvcihmYWN0b3IgKiAoZGF0YVtpICsgMV0gLSAxMjguMCkgKyAxMjguMCk7XG4gICAgICBkYXRhW2kgKyAyXSA9IHRoaXMudHJ1bmNhdGVDb2xvcihmYWN0b3IgKiAoZGF0YVtpICsgMl0gLSAxMjguMCkgKyAxMjguMCk7XG4gICAgfVxuICB9XG5cbiAgdHJ1bmNhdGVDb2xvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgdmFsdWUgPSAwO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPiAyNTUpIHtcbiAgICAgIHZhbHVlID0gMjU1O1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGZpbHRlcih7XG4gICAgdmlkZW8sXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIGNvbnRyYXN0LFxuICAgIGJyaWdodG5lc3NcbiAgfToge1xuICAgIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50O1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgY29udHJhc3Q6IHN0cmluZztcbiAgICBicmlnaHRuZXNzOiBzdHJpbmc7XG4gIH0pIHtcbiAgICBpZiAoIXRoaXMuY2FudmFzSGVscGVyKSB7XG4gICAgICB0aGlzLmNhbnZhc0hlbHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cbiAgICAgIHRoaXMuY2FudmFzSGVscGVyLndpZHRoID0gd2lkdGg7XG4gICAgICB0aGlzLmNhbnZhc0hlbHBlci5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGV4dEhlbHBlciA9IHRoaXMuY2FudmFzSGVscGVyLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGlmIChjb250ZXh0SGVscGVyKSB7XG4gICAgICBjb250ZXh0SGVscGVyLmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgIGNvbnN0IGlkYXRhID0gY29udGV4dEhlbHBlci5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgIHZhciBkYXRhID0gaWRhdGEuZGF0YTtcblxuICAgICAgdGhpcy5hcHBseUJyaWdodG5lc3MoZGF0YSwgYnJpZ2h0bmVzcyk7XG4gICAgICB0aGlzLmFwcGx5Q29udHJhc3QoZGF0YSwgY29udHJhc3QpO1xuXG4gICAgICByZXR1cm4gaWRhdGE7XG4gICAgfVxuICB9XG5cbiAgcGxheSh7XG4gICAgY2FudmFzSW5pdGVkLFxuICAgIGJyaWdodG5lc3MsXG4gICAgY29udHJhc3QsXG4gICAgc2l6ZTogeyB3aWR0aCwgaGVpZ2h0IH1cbiAgfToge1xuICAgIGNhbnZhc0luaXRlZDogYm9vbGVhbjtcbiAgICBicmlnaHRuZXNzOiBzdHJpbmc7XG4gICAgY29udHJhc3Q6IHN0cmluZztcbiAgICBzaXplOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH07XG4gIH0pIHtcbiAgICBpZiAoIWNhbnZhc0luaXRlZCkge1xuICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofWA7XG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9YDtcblxuICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgdGhpcy52aWRlb1BsYXllci5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFZpZGVvID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jYW52YXMpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGlmICghY29udGV4dCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkSW1hZ2UgPSB0aGlzLmZpbHRlcih7XG4gICAgICAgICAgICB2aWRlbzogdGhpcy52aWRlbyxcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgY29udHJhc3QsXG4gICAgICAgICAgICBicmlnaHRuZXNzXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb250ZXh0LnB1dEltYWdlRGF0YShmaWx0ZXJlZEltYWdlLCAwLCAwKTtcblxuICAgICAgICAgIGlmICh0aGlzLnN0b3BWaWRlbyB8fCB0aGlzLnZpZGVvLnBhdXNlZCB8fCB0aGlzLnZpZGVvLmVuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BWaWRlbyA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRyYXcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgZHJhdygpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW52YXNWaWRlbztcbiIsImltcG9ydCBDYW52YXNWaWRlbyBmcm9tIFwiLi9jYW52YXNWaWRlb1wiO1xuaW1wb3J0IEFuYWx5c2UgZnJvbSBcIi4vYXVkaW9BbmFseXNlXCI7XG5cbi8qKlxuICogUGxheWVyVGVtcGxhdGUgLSBnZW5lcmF0ZSB2aWRlby1wbGF5ZXIgZnJvbSA8dGVtcGxhdGU+IHRhZ1xuICovXG5leHBvcnQgY2xhc3MgUGxheWVyVGVtcGxhdGUge1xuICB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wbGF0ZS1wbGF5ZXJcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgfVxuXG4gIHJlbmRlcihpZDogc3RyaW5nKTogTm9kZSB7XG4gICAgY29uc3QgZWxlbWVudDogTm9kZSA9IHRoaXMudGVtcGxhdGUuY29udGVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudmlkZW9jb250cm9sLWxpc3RfX2l0ZW1cIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAvLyBwbGF5ZXIte2lkfVxuICAgIGNvbnN0IHBsYXllckVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9ICg8RWxlbWVudD5lbGVtZW50KS5xdWVyeVNlbGVjdG9yKFwiLnZjLXBsYXllclwiKTtcblxuICAgIHBsYXllckVsZW1lbnQgJiYgcGxheWVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpZCk7XG5cbiAgICAvLyBwbGF5ZXIte2lkfS12aWRlb1xuICAgIGNvbnN0IHZpZGVvRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gKDxFbGVtZW50PmVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcblxuICAgIHZpZGVvRWxlbWVudCAmJiB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aWR9LXZpZGVvYCk7XG5cbiAgICAvLyBwbGF5ZXIte2lkfS13ZWJnbC12aWRlb1xuICAgIGNvbnN0IGlucHV0RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gKDxFbGVtZW50PmVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICBpbnB1dEVsZW1lbnQgJiYgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2lkfS13ZWJnbC12aWRlb2ApO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBQbGF5ZXIgaXMgYSB3cmFwcGVyIGFyb3VuZCBodG1sNSB2aWRlbyBlbGVtZW50IGFuZCBITFMgc3RhbmRhcnQsXG4gKiBpdCBoYXMgc3BlY2lhbCBiZWhhdmlvciBmb3Igb3VyIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgc2V0dGluZ3M6IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBjYW52YXNJbml0ZWQ6IGJvb2xlYW47XG4gICAgY29udGFpbmVyQm91bmRzOiB7XG4gICAgICBsZWZ0OiBudW1iZXI7XG4gICAgICB0b3A6IG51bWJlcjtcbiAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICB9O1xuICAgIGlzRnVsbHNjcmVlbjogYm9vbGVhbjtcbiAgfTtcblxuICB2aWRlb1NldHRpbmdzOiB7XG4gICAgYnJpZ2h0bmVzczogc3RyaW5nO1xuICAgIGNvbnRyYXN0OiBzdHJpbmc7XG4gICAgaXNGdWxsc2NyZWVuOiBib29sZWFuO1xuICB9O1xuXG4gIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwbGF5ZXI6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsO1xuICBicmlnaHRuZXNzUmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xuICBub2lzZUxldmVsUmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xuICBjb250cmFzdFJhbmdlOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcblxuICBjYW52YXNWaWRlbzogQ2FudmFzVmlkZW87XG5cbiAgaW5pdFByb21pc2U6IFByb21pc2U8SFRNTFZpZGVvRWxlbWVudD47XG4gIGFuYWx5c2VyOiBhbnk7XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHVybCxcbiAgICBjb250YWluZXJFbGVtZW50LFxuICAgIHBsYXllckVsZW1lbnRcbiAgfToge1xuICAgIHVybDogc3RyaW5nO1xuICAgIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHBsYXllckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB9KSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIHVybCxcbiAgICAgIGNhbnZhc0luaXRlZDogZmFsc2UsXG4gICAgICBjb250YWluZXJCb3VuZHM6IHtcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiAwXG4gICAgICB9LFxuICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLnZpZGVvU2V0dGluZ3MgPSB7XG4gICAgICBicmlnaHRuZXNzOiBcIjBcIixcbiAgICAgIGNvbnRyYXN0OiBcIjBcIixcbiAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyRWxlbWVudDtcbiAgICB0aGlzLnBsYXllciA9IHBsYXllckVsZW1lbnQ7XG4gICAgdGhpcy52aWRlbyA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpO1xuICAgIHRoaXMuYnJpZ2h0bmVzc1JhbmdlID0gcGxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnZjLXBsYXllcl9fYnJpZ2h0bmVzc1wiKTtcbiAgICB0aGlzLm5vaXNlTGV2ZWxSYW5nZSA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJfX25vaXNlLWxldmVsXCIpO1xuICAgIHRoaXMuY29udHJhc3RSYW5nZSA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJfX2NvbnRyYXN0XCIpO1xuXG4gICAgdGhpcy5jYW52YXNWaWRlbyA9IG5ldyBDYW52YXNWaWRlbyh7XG4gICAgICB2aWRlbzogdGhpcy52aWRlbyxcbiAgICAgIHZpZGVvUGxheWVyOiB0aGlzLnBsYXllclxuICAgIH0pO1xuXG4gICAgdGhpcy5pbml0UHJvbWlzZSA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgfVxuXG4gIHNldENvbnRhaW5lckJvdW5kcygpIHtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuY29udGFpbmVyQm91bmRzKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcyA9IHRoaXMuY29udGFpbmVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHM7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGlmICh0aGlzLmluaXRQcm9taXNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0UHJvbWlzZTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5IbHMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICBjb25zdCBobHMgPSBuZXcgd2luZG93LkhscygpO1xuXG4gICAgICAgIGhscy5sb2FkU291cmNlKHRoaXMuc2V0dGluZ3MudXJsKTtcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKHRoaXMudmlkZW8pO1xuXG4gICAgICAgIGhscy5vbih3aW5kb3cuSGxzLkV2ZW50cy5NQU5JRkVTVF9QQVJTRUQsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMudmlkZW8pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52aWRlby5jYW5QbGF5VHlwZShcImFwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsXCIpKSB7XG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gdGhpcy5zZXR0aW5ncy51cmw7XG5cbiAgICAgICAgdGhpcy52aWRlby5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIiwgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodGhpcy52aWRlbyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnZpZGVvLnBsYXkoKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy52aWRlby5wYXVzZSgpO1xuICB9XG5cbiAgb3BlbkZ1bGxzY3JlZW4oKSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuaXNGdWxsc2NyZWVuKSByZXR1cm4gZmFsc2U7XG5cbiAgICB0aGlzLnNldENvbnRhaW5lckJvdW5kcygpO1xuXG4gICAgY29uc3QgeyBjb250YWluZXJCb3VuZHMgfSA9IHRoaXMuc2V0dGluZ3M7XG5cbiAgICB0aGlzLnZpZGVvLm11dGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBwbGF5ZXJCb3VuZHMgPSB0aGlzLnBsYXllci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGBcbiAgICAgICAgdHJhbnNsYXRlWCgwcHgpXG4gICAgICAgIHRyYW5zbGF0ZVkoMHB4KVxuICAgIGA7XG5cbiAgICB0aGlzLnBsYXllci5zdHlsZS53aWR0aCA9IHBsYXllckJvdW5kcy53aWR0aCArIFwicHhcIjtcbiAgICB0aGlzLnBsYXllci5zdHlsZS5oZWlnaHQgPSBwbGF5ZXJCb3VuZHMuaGVpZ2h0ICsgXCJweFwiO1xuICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IFwiXCI7XG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gXCJcIjtcbiAgICB0aGlzLnBsYXllci5zdHlsZS56SW5kZXggPSBcIjJcIjtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gXCJ0cmFuc2Zvcm0sIHdpZHRoLCBoZWlnaHRcIjtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IFwiMC4zc1wiO1xuXG4gICAgICAvLyBtb3ZlIGVsZW1lbnQgdG8gdG9wL2xlZnQgYm91bmRlciBvZiB0aGUgbGlzdC1jb250YWluZXJcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGBcbiAgICAgICAgdHJhbnNsYXRlWCgtJHtwbGF5ZXJCb3VuZHMubGVmdCAtIGNvbnRhaW5lckJvdW5kcy5sZWZ0fXB4KVxuICAgICAgICB0cmFuc2xhdGVZKC0ke3BsYXllckJvdW5kcy50b3AgLSBjb250YWluZXJCb3VuZHMudG9wfXB4KVxuICAgICAgYDtcblxuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUud2lkdGggPSBjb250YWluZXJCb3VuZHMud2lkdGggKyBcInB4XCI7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS5oZWlnaHQgPSBjb250YWluZXJCb3VuZHMuaGVpZ2h0ICsgXCJweFwiO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXR0aW5ncy5pc0Z1bGxzY3JlZW4gPSB0cnVlO1xuICB9XG5cbiAgY2xvc2VGdWxsc2NyZWVuKCkge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5pc0Z1bGxzY3JlZW4pIHJldHVybiBmYWxzZTtcblxuICAgIHRoaXMudmlkZW8ubXV0ZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUuekluZGV4ID0gXCIxXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblxuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gYFxuICAgICAgICAgIHRyYW5zbGF0ZVgoMHB4KVxuICAgICAgICAgIHRyYW5zbGF0ZVkoMHB4KVxuICAgICAgYDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dGluZ3MuaXNGdWxsc2NyZWVuID0gZmFsc2U7XG4gIH1cblxuICBwbGF5VmlkZW9PbkNhbnZhcygpIHtcbiAgICB0aGlzLnNldENvbnRhaW5lckJvdW5kcygpO1xuXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmNhbnZhc0luaXRlZCkge1xuICAgICAgdGhpcy52aWRlby5jbGFzc0xpc3QuYWRkKFwidmMtcGxheWVyX192aWRlb19zdGF0ZS1oaWRkZW5cIik7XG4gICAgfVxuXG4gICAgdGhpcy5jYW52YXNWaWRlby5wbGF5KHtcbiAgICAgIGNhbnZhc0luaXRlZDogdGhpcy5zZXR0aW5ncy5jYW52YXNJbml0ZWQsXG4gICAgICBzaXplOiB7XG4gICAgICAgIHdpZHRoOiB0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcy5oZWlnaHRcbiAgICAgIH0sXG4gICAgICBicmlnaHRuZXNzOiB0aGlzLnZpZGVvU2V0dGluZ3MuYnJpZ2h0bmVzcyxcbiAgICAgIGNvbnRyYXN0OiB0aGlzLnZpZGVvU2V0dGluZ3MuY29udHJhc3RcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dGluZ3MuY2FudmFzSW5pdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGNoYW5nZUJyaWdodG5lc3ModmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmlkZW9TZXR0aW5ncy5icmlnaHRuZXNzID0gdmFsdWU7XG5cbiAgICB0aGlzLnBsYXlWaWRlb09uQ2FudmFzKCk7XG4gIH1cblxuICBjaGFuZ2VDb250cmFzdCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52aWRlb1NldHRpbmdzLmNvbnRyYXN0ID0gdmFsdWU7XG5cbiAgICB0aGlzLnBsYXlWaWRlb09uQ2FudmFzKCk7XG4gIH1cblxuICBpbml0RXZlbnRzKCkge1xuICAgIHRoaXMuYnJpZ2h0bmVzc1JhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUJyaWdodG5lc3MoKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KS52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbnRyYXN0UmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBlID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQ29udHJhc3QoKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KS52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFuYWx5c2VyID0gbmV3IEFuYWx5c2Uoe1xuICAgICAgdmlkZW86IHRoaXMudmlkZW8sXG4gICAgICBub2lzZUxldmVsUmFuZ2U6IHRoaXMubm9pc2VMZXZlbFJhbmdlXG4gICAgfSk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoZTogRXZlbnQpID0+IHZvaWQpIHtcbiAgICB0aGlzLnBsYXllci5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjayk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBsYXllclRlbXBsYXRlLCBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IEJyb2FkY2FzdCB9IGZyb20gXCIuLi8uLi90eXBlcy9pbmRleFwiO1xuXG4vKipcbiAqIFZpZGVvY29udHJvbCByZXByZXNlbnRzIGNvbnRyb2xsZXIgb3ZlciBvdXIgZmVhdHVyZSxcbiAqIGl0IGluaXRpYWxpemVzIGJyb2FkY2FzdHMgYW5kIGludGVyYWN0IHdpdGggdXNlcidzIGFjdGlvbnNcbiAqL1xuY2xhc3MgVmlkZW9jb250cm9sIHtcbiAgYnJvYWRjYXN0czogQXJyYXk8QnJvYWRjYXN0PjtcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIGVsZW1lbnRTaG93QWxsOiBIVE1MRWxlbWVudDtcblxuICBzdGF0ZToge1xuICAgIGZ1bGxzY3JlZW5JZDogbnVtYmVyO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBicm9hZGNhc3RzLFxuICAgIGVsZW1lbnRTaG93QWxsLFxuICAgIGVsZW1lbnRcbiAgfToge1xuICAgIGJyb2FkY2FzdHM6IEFycmF5PEJyb2FkY2FzdD47XG4gICAgZWxlbWVudFNob3dBbGw6IEhUTUxFbGVtZW50O1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB9KSB7XG4gICAgdGhpcy5icm9hZGNhc3RzID0gYnJvYWRjYXN0cztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuZWxlbWVudFNob3dBbGwgPSBlbGVtZW50U2hvd0FsbDtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmdWxsc2NyZWVuSWQ6IEluZmluaXR5XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdFBsYXllcnMoKTtcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgfVxuXG4gIGNsb3NlRnVsbFBsYXllcigpIHtcbiAgICAvLyBwbGF5IGFsbCBwbGF5ZXJzXG4gICAgdGhpcy5icm9hZGNhc3RzLmZvckVhY2goYnJvYWRjYXN0ID0+IGJyb2FkY2FzdC5wbGF5ZXIucGxheSgpKTtcblxuICAgIHRoaXMuYnJvYWRjYXN0c1t0aGlzLnN0YXRlLmZ1bGxzY3JlZW5JZF0ucGxheWVyLmNsb3NlRnVsbHNjcmVlbigpO1xuXG4gICAgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuSWQgPSBudWxsO1xuICB9XG5cbiAgb3BlbkZ1bGxQbGF5ZXIoaWQ6IG51bWJlcikge1xuICAgIC8vIHN0b3AgYWxsIHBsYXllcnMgZXhjZXB0IGEgZnVsbHNjcmVlblxuICAgIHRoaXMuYnJvYWRjYXN0c1xuICAgICAgLmZpbHRlcihicm9hZGNhc3QgPT4gYnJvYWRjYXN0LmlkICE9PSBpZClcbiAgICAgIC5mb3JFYWNoKGJyb2FkY2FzdCA9PiBicm9hZGNhc3QucGxheWVyLnN0b3AoKSk7XG5cbiAgICAvLyBvcGVuIHBsYXllciBpbiBmdWxsc2NyZWVuXG4gICAgdGhpcy5icm9hZGNhc3RzW2lkXS5wbGF5ZXIub3BlbkZ1bGxzY3JlZW4oKTtcblxuICAgIHRoaXMuc3RhdGUuZnVsbHNjcmVlbklkID0gaWQ7XG4gIH1cblxuICBpbml0RXZlbnRzKCkge1xuICAgIHRoaXMuZWxlbWVudFNob3dBbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2VGdWxsUGxheWVyKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnRTaG93QWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlRnVsbFBsYXllcigpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdFBsYXllcnMoKSB7XG4gICAgdGhpcy5icm9hZGNhc3RzLmZvckVhY2goKGJyb2FkY2FzdCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IFZpZGVvVGVtcGxhdGU6IFBsYXllclRlbXBsYXRlID0gbmV3IFBsYXllclRlbXBsYXRlKCk7XG4gICAgICBjb25zdCBsaXN0VmlkZW9FbGVtZW50OiBOb2RlID0gVmlkZW9UZW1wbGF0ZS5yZW5kZXIoYHBsYXllci0ke2luZGV4ICsgMX1gKTtcblxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGxpc3RWaWRlb0VsZW1lbnQpO1xuXG4gICAgICBjb25zdCBWaWRlb1BsYXllciA9IG5ldyBQbGF5ZXIoe1xuICAgICAgICBjb250YWluZXJFbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIHBsYXllckVsZW1lbnQ6ICg8RWxlbWVudD5saXN0VmlkZW9FbGVtZW50KS5xdWVyeVNlbGVjdG9yKFwiLnZjLXBsYXllclwiKSxcbiAgICAgICAgdXJsOiBicm9hZGNhc3QudXJsXG4gICAgICB9KTtcblxuICAgICAgVmlkZW9QbGF5ZXIuaW5pdCgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBWaWRlb1BsYXllci5wbGF5KCk7XG5cbiAgICAgICAgICAvLyBJbml0IGV2ZW50c1xuICAgICAgICAgIFZpZGVvUGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZ1bGxQbGF5ZXIoaW5kZXgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgVmlkZW9QbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcGVuRnVsbFBsYXllcihpbmRleCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBTYXZlIHBsYXllciB0byBicm9hZGNhc3RzIGFycmF5XG4gICAgICAgICAgdGhpcy5icm9hZGNhc3RzW2luZGV4XS5pZCA9IGluZGV4O1xuICAgICAgICAgIHRoaXMuYnJvYWRjYXN0c1tpbmRleF0ucGxheWVyID0gVmlkZW9QbGF5ZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS53YXJuKGVycikpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZGVvY29udHJvbDtcbiIsImNsYXNzIENhbWVyYVdpZGdldCB7XG4gIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1jYW1lcmEtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW1lcmFXaWRnZXQ7XG4iLCJpbXBvcnQgeyBJV2lkZ2V0UGxheWVyRGF0YSB9IGZyb20gXCIuLi8uLi90eXBlcy9pbmRleFwiO1xuXG5jbGFzcyBQbGF5ZXJXaWRnZXQge1xuICB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgZGF0YTogSVdpZGdldFBsYXllckRhdGE7XG4gIHdpZGdldDogTm9kZTtcblxuICBjb25zdHJ1Y3Rvcih7IGRhdGEgfTogeyBkYXRhOiBJV2lkZ2V0UGxheWVyRGF0YSB9KSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXBsYXllci10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG5cbiAgc2V0SW5uZXJUZXh0KHNlbGVjdG9yOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IGJsb2NrOiBIVE1MRWxlbWVudCA9ICg8SFRNTEVsZW1lbnQ+dGhpcy53aWRnZXQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYgKGJsb2NrKSB7XG4gICAgICBibG9jay5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIHNldENvdmVyKCkge1xuICAgIGNvbnN0IGJsb2NrID0gKDxFbGVtZW50PnRoaXMud2lkZ2V0KS5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ub3dfX2NvdmVyXCIpO1xuXG4gICAgYmxvY2suc2V0QXR0cmlidXRlKFwic3JjXCIsIHRoaXMuZGF0YS5hbGJ1bWNvdmVyKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLnNldENvdmVyKCk7XG5cbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5wbGF5ZXItbm93X190aXRsZVwiLCBgJHt0aGlzLmRhdGEuYXJ0aXN0fSAke3RoaXMuZGF0YS50cmFjay5uYW1lfWApO1xuXG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIucGxheWVyLXByb2dyZXNzX190aW1lXCIsIHRoaXMuZGF0YS50cmFjay5sZW5ndGgpO1xuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLnBsYXllci12b2x1bWVfX3BlcmNlbnRhZ2VcIiwgYCR7dGhpcy5kYXRhLnZvbHVtZX0lYCk7XG5cbiAgICByZXR1cm4gdGhpcy53aWRnZXQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyV2lkZ2V0O1xuIiwiaW1wb3J0IHsgSVdpZGdldFF1ZXN0aW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcblxuY2xhc3MgUXVlc3Rpb25zV2lkZ2V0IHtcbiAgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIGRhdGE6IElXaWRnZXRRdWVzdGlvbnNEYXRhO1xuICB3aWRnZXQ6IE5vZGU7XG5cbiAgY29uc3RydWN0b3IoeyBkYXRhIH06IHsgZGF0YTogSVdpZGdldFF1ZXN0aW9uc0RhdGEgfSkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1xdWVzdGlvbnMtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuXG4gIHNldElubmVyVGV4dChzZWxlY3Rvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBibG9jazogSFRNTEVsZW1lbnQgPSAoPEVsZW1lbnQ+dGhpcy53aWRnZXQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYgKGJsb2NrKSB7XG4gICAgICBibG9jay5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5idXR0b25fdHlwZS15ZWxsb3dcIiwgdGhpcy5kYXRhLmJ1dHRvbnNbMF0pO1xuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLmJ1dHRvbl90eXBlLWdyZXlcIiwgdGhpcy5kYXRhLmJ1dHRvbnNbMV0pO1xuXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFF1ZXN0aW9uc1dpZGdldDtcbiIsImNsYXNzIFN0YXRzV2lkZ2V0IHtcbiAgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXN0YXRzLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHNXaWRnZXQ7XG4iLCJpbXBvcnQgeyBJV2lkZ2V0VGhlbWFsRGF0YSB9IGZyb20gXCIuLi8uLi90eXBlcy9pbmRleFwiO1xuXG5jbGFzcyBUaGVtYWxXaWRnZXQge1xuICB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgZGF0YTogSVdpZGdldFRoZW1hbERhdGE7XG4gIHdpZGdldDogTm9kZTtcblxuICBjb25zdHJ1Y3Rvcih7IGRhdGEgfTogeyBkYXRhOiBJV2lkZ2V0VGhlbWFsRGF0YSB9KSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXRoZXJtYWwtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuXG4gIHNldElubmVyVGV4dChzZWxlY3Rvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBibG9jazogSFRNTEVsZW1lbnQgPSAoPEVsZW1lbnQ+dGhpcy53aWRnZXQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYgKGJsb2NrKSB7XG4gICAgICBibG9jay5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLnNldElubmVyVGV4dChcbiAgICAgIFwiLndpZGdldC1zZW5zb3JfdHlwZS10ZW1wIC53aWRnZXQtc2Vuc29yX192YWx1ZVwiLFxuICAgICAgYCR7dGhpcy5kYXRhLnRlbXBlcmF0dXJlfUNgXG4gICAgKTtcblxuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFxuICAgICAgXCIud2lkZ2V0LXNlbnNvcl90eXBlLWh1bWlkaXR5IC53aWRnZXQtc2Vuc29yX192YWx1ZVwiLFxuICAgICAgYCR7dGhpcy5kYXRhLmh1bWlkaXR5fSVgXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLndpZGdldDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaGVtYWxXaWRnZXQ7XG4iLCJpbXBvcnQgU3RhdHNXaWRnZXQgZnJvbSBcIi4vc3RhdHMud2lkZ2V0XCI7XG5pbXBvcnQgQ2FtZXJhV2lkZ2V0IGZyb20gXCIuL2NhbWVyYS53aWRnZXRcIjtcbmltcG9ydCBRdWVzdGlvbnNXaWRnZXQgZnJvbSBcIi4vcXVlc3Rpb25zLndpZGdldFwiO1xuaW1wb3J0IFRoZW1hbFdpZGdldCBmcm9tIFwiLi90aGVtYWwud2lkZ2V0XCI7XG5pbXBvcnQgUGxheWVyV2lkZ2V0IGZyb20gXCIuL3BsYXllci53aWRnZXRcIjtcblxuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmNvbnN0IFdJREdFVF9UWVBFUyA9IHtcbiAgU1RBVFM6IFwiU1RBVFNcIixcbiAgQ0FNRVJBOiBcIkNBTUVSQVwiLFxuICBUSEVSTUFMOiBcIlRIRVJNQUxcIixcbiAgUExBWUVSOiBcIlBMQVlFUlwiLFxuICBRVUVTVElPTlM6IFwiUVVFU1RJT05TXCIsXG4gIERFRkFVTFQ6IFwiREVGQVVMVFwiXG59O1xuXG5jbGFzcyBXaWRnZXQge1xuICBldmVudDogVHlwZXMuRXZlbnQ7XG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICB3aWRnZXQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHsgZXZlbnQsIGNvbnRhaW5lciB9OiB7IGV2ZW50OiBUeXBlcy5FdmVudDsgY29udGFpbmVyOiBIVE1MRWxlbWVudCB9KSB7XG4gICAgdGhpcy5ldmVudCA9IGV2ZW50O1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0XCIpLmNsb25lTm9kZSh0cnVlKTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBzZXREZXNjcmlwdGlvbigpIHtcbiAgICBpZiAodGhpcy5ldmVudC5kZXNjcmlwdGlvbiAmJiB0aGlzLndpZGdldCkge1xuICAgICAgY29uc3QgY29udGVudFRleHQgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1jb250ZW50X190ZXh0XCIpO1xuICAgICAgY29uc3QgdGV4dEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWNvbnRlbnRfX3RleHRcIik7XG5cbiAgICAgIGlmIChjb250ZW50VGV4dCkge1xuICAgICAgICBjb250ZW50VGV4dC5jbGFzc0xpc3QuYWRkKGB3aWRnZXQtY29udGVudF9fdGV4dF93aWR0aC0ke3RoaXMuZXZlbnQuc2l6ZX1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRleHRFbGVtZW50KSB7XG4gICAgICAgIHRleHRFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQuZGVzY3JpcHRpb247XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0SGVhZGVyRGF0YSgpIHtcbiAgICBjb25zdCB0aXRsZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi53aWRnZXQtaGVhZGVyLWFib3V0X190aXRsZVwiXG4gICAgKTtcbiAgICBjb25zdCB0eXBlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtaGVhZGVyX190eXBlXCIpO1xuICAgIGNvbnN0IGRhdGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1oZWFkZXJfX2RhdGVcIik7XG4gICAgY29uc3QgaWNvblVzZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi53aWRnZXQtaGVhZGVyLWFib3V0X19pY29uID4gdXNlXCJcbiAgICApO1xuICAgIGNvbnN0IGljb25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1oZWFkZXItYWJvdXRfX2ljb25cIik7XG5cbiAgICBpZiAodGl0bGVFbGVtZW50KSB7XG4gICAgICB0aXRsZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5ldmVudC50aXRsZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZUVsZW1lbnQpIHtcbiAgICAgIHR5cGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQuc291cmNlO1xuICAgIH1cblxuICAgIGlmIChkYXRlRWxlbWVudCkge1xuICAgICAgZGF0ZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5ldmVudC50aW1lO1xuICAgIH1cblxuICAgIGlmIChpY29uVXNlRWxlbWVudCkge1xuICAgICAgaWNvblVzZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwieGxpbms6aHJlZlwiLCBgIyR7dGhpcy5ldmVudC5pY29ufWApO1xuICAgIH1cblxuICAgIGlmIChpY29uRWxlbWVudCkge1xuICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChgaWNvbl8ke3RoaXMuZXZlbnQuaWNvbn1gKTtcbiAgICB9XG4gIH1cblxuICBnZXREYXRhVGVtcGxhdGVUeXBlKCkge1xuICAgIGNvbnN0IHsgZGF0YSwgaWNvbiB9ID0gdGhpcy5ldmVudDtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAoZGF0YS50eXBlID09PSBcImdyYXBoXCIpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuU1RBVFM7XG4gICAgfVxuXG4gICAgaWYgKGljb24gPT09IFwiY2FtXCIpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuQ0FNRVJBO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAoZGF0YS50ZW1wZXJhdHVyZSkge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5USEVSTUFMO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAoZGF0YS5hbGJ1bWNvdmVyKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLlBMQVlFUjtcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKGRhdGEuYnV0dG9ucykge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5RVUVTVElPTlM7XG4gICAgfVxuXG4gICAgcmV0dXJuIFdJREdFVF9UWVBFUy5ERUZBVUxUO1xuICB9XG5cbiAgcmVuZGVyRGF0YVRlbXBsYXRlKCkge1xuICAgIGNvbnN0IHRlbXBsYXRlRGF0YVR5cGUgPSB0aGlzLmdldERhdGFUZW1wbGF0ZVR5cGUoKTtcbiAgICBsZXQgZGF0YUNvbnRlbnRCbG9jayA9IG51bGw7XG5cbiAgICBzd2l0Y2ggKHRlbXBsYXRlRGF0YVR5cGUpIHtcbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlNUQVRTOlxuICAgICAgICBjb25zdCBzdGF0c1dpZGdldCA9IG5ldyBTdGF0c1dpZGdldCgpO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBzdGF0c1dpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuQ0FNRVJBOlxuICAgICAgICBjb25zdCBjYW1lcmFXaWRnZXQgPSBuZXcgQ2FtZXJhV2lkZ2V0KCk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IGNhbWVyYVdpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuUExBWUVSOlxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IHBsYXllcldpZGdldCA9IG5ldyBQbGF5ZXJXaWRnZXQoe1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBkYXRhOiB0aGlzLmV2ZW50LmRhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IHBsYXllcldpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuUVVFU1RJT05TOlxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uc1dpZGdldCA9IG5ldyBRdWVzdGlvbnNXaWRnZXQoe1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBkYXRhOiB0aGlzLmV2ZW50LmRhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IHF1ZXN0aW9uc1dpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuVEhFUk1BTDpcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCB0aGVybWFsV2lkZ2V0ID0gbmV3IFRoZW1hbFdpZGdldCh7XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGRhdGE6IHRoaXMuZXZlbnQuZGF0YVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gdGhlcm1hbFdpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoZGF0YUNvbnRlbnRCbG9jaykge1xuICAgICAgY29uc3Qgd2lkZ2V0Q29udGVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtY29udGVudFwiKTtcblxuICAgICAgd2lkZ2V0Q29udGVudCAmJiB3aWRnZXRDb250ZW50LmFwcGVuZENoaWxkKGRhdGFDb250ZW50QmxvY2spO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLndpZGdldC5jbGFzc0xpc3QuYWRkKGB3aWRnZXRfc2l6ZS0ke3RoaXMuZXZlbnQuc2l6ZX1gKTtcbiAgICB0aGlzLndpZGdldC5jbGFzc0xpc3QuYWRkKGB3aWRnZXRfdHlwZS0ke3RoaXMuZXZlbnQudHlwZX1gKTtcblxuICAgIHRoaXMuc2V0SGVhZGVyRGF0YSgpO1xuICAgIHRoaXMuc2V0RGVzY3JpcHRpb24oKTtcbiAgICB0aGlzLnJlbmRlckRhdGFUZW1wbGF0ZSgpO1xuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy53aWRnZXQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdpZGdldDtcbiIsImltcG9ydCBXaWRnZXQgZnJvbSBcIi4uL2NvbXBvbmVudHMvd2lkZ2V0L3dpZGdldFwiO1xuXG5pbXBvcnQgKiBhcyBUeXBlcyBmcm9tIFwiLi4vdHlwZXNcIjtcblxuY2xhc3MgSW5kZXhQYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckRhc2hib2FyZFdpZGdldHMoZXZlbnRzOiBBcnJheTxUeXBlcy5FdmVudD4pIHtcbiAgICBjb25zdCBkYXNoYm9hcmRXaWRnZXRzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFzaGJvYXJkLWxpc3RcIik7XG5cbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICBuZXcgV2lkZ2V0KHtcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIGNvbnRhaW5lcjogZGFzaGJvYXJkV2lkZ2V0c0xpc3RcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRXZlbnRzKCkge1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZXZlbnRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHR5cGU6IFwiY3JpdGljYWw6aW5mb1wiLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxpbWl0OiAyMFxuICAgICAgfSksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQpXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgdGhpcy5sb2FkRXZlbnRzKCkudGhlbihldmVudHMgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJEYXNoYm9hcmRXaWRnZXRzKGV2ZW50cyk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5kZXhQYWdlO1xuIiwiaW1wb3J0IEhlYWRlck5hdmlnYXRpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlclwiO1xuXG5pbXBvcnQgSW5kZXhQYWdlIGZyb20gXCIuL2luZGV4LnBhZ2VcIjtcbmltcG9ydCBWaWRlb2NvbnRyb2xQYWdlIGZyb20gXCIuL3ZpZGVvY29udHJvbC5wYWdlXCI7XG5cbmNsYXNzIEluaXRBcHBsaWNhdGlvbiB7XG4gIHBhZ2U6IGFueTtcbiAgaGVhZGVyTmF2aWdhdGlvbjogYW55O1xuICBjdXJyZW50UGFnZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcm91dGluZygpIHtcbiAgICBzd2l0Y2ggKHRoaXMuY3VycmVudFBhZ2UpIHtcbiAgICAgIGNhc2UgXCIvXCI6XG4gICAgICAgIHRoaXMucGFnZSA9IG5ldyBJbmRleFBhZ2UoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCIvdmlkZW9jb250cm9sLmh0bWxcIjpcbiAgICAgICAgdGhpcy5wYWdlID0gbmV3IFZpZGVvY29udHJvbFBhZ2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuaGVhZGVyTmF2aWdhdGlvbiA9IG5ldyBIZWFkZXJOYXZpZ2F0aW9uKHtcbiAgICAgIHNlbGVjdG9yOiBcIiNoZWFkZXItbWVudVwiXG4gICAgfSk7XG5cbiAgICB0aGlzLnJvdXRpbmcoKTtcbiAgfVxufVxuXG5uZXcgSW5pdEFwcGxpY2F0aW9uKCk7XG4iLCJpbXBvcnQgVmlkZW9jb250cm9sIGZyb20gXCIuLi9jb21wb25lbnRzL3ZpZGVvY29udHJvbC92aWRlb2NvbnRyb2xcIjtcblxuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmNsYXNzIFZpZGVvQ29udHJvbFBhZ2Uge1xuICBicm9hZGNhc3RzOiBBcnJheTxUeXBlcy5Ccm9hZGNhc3Q+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYnJvYWRjYXN0cyA9IFtcbiAgICAgIHtcbiAgICAgICAgdXJsOlxuICAgICAgICAgIFwiaHR0cDovL2xvY2FsaG9zdDo5MTkxL21hc3Rlcj91cmw9aHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTMxMDIlMkZzdHJlYW1zJTJGc29zZWQlMkZtYXN0ZXIubTN1OFwiLFxuICAgICAgICBwbGF5ZXI6IG51bGwsXG4gICAgICAgIGlkOiB1bmRlZmluZWRcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmNhdCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdXJsOlxuICAgICAgICAgIFwiaHR0cDovL2xvY2FsaG9zdDo5MTkxL21hc3Rlcj91cmw9aHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTMxMDIlMkZzdHJlYW1zJTJGZG9nJTJGbWFzdGVyLm0zdThcIixcbiAgICAgICAgcGxheWVyOiBudWxsLFxuICAgICAgICBpZDogdW5kZWZpbmVkXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB1cmw6XG4gICAgICAgICAgXCJodHRwOi8vbG9jYWxob3N0OjkxOTEvbWFzdGVyP3VybD1odHRwJTNBJTJGJTJGbG9jYWxob3N0JTNBMzEwMiUyRnN0cmVhbXMlMkZoYWxsJTJGbWFzdGVyLm0zdThcIixcbiAgICAgICAgcGxheWVyOiBudWxsLFxuICAgICAgICBpZDogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgXTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIGNvbnN0IFZpZGVvY29udHJvbFdpZGdldCA9IG5ldyBWaWRlb2NvbnRyb2woe1xuICAgICAgYnJvYWRjYXN0czogdGhpcy5icm9hZGNhc3RzLFxuICAgICAgZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2Yy1saXN0XCIpLFxuICAgICAgZWxlbWVudFNob3dBbGw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmMtc2hvd2FsbFwiKVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZGVvQ29udHJvbFBhZ2U7XG4iXSwic291cmNlUm9vdCI6IiJ9