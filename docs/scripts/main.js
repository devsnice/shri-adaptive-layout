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
            .catch(err => alert(err));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvYXVkaW9BbmFseXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvY29udHJvbC9jYW52YXNWaWRlby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvcGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvY29udHJvbC92aWRlb2NvbnRyb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L2NhbWVyYS53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3BsYXllci53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3F1ZXN0aW9ucy53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3N0YXRzLndpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy93aWRnZXQvdGhlbWFsLndpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy93aWRnZXQvd2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9pbmRleC5wYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvdmlkZW9jb250cm9sLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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QUM7UUFFSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBRUQsSUFBSSxlQUFlLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDckM2QztBQUluRSxNQUFNLGdCQUFnQjtJQUdwQjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDaEI7Z0JBQ0UsR0FBRyxFQUNELGdHQUFnRztnQkFDbEcsTUFBTSxFQUFFLElBQUk7Z0JBQ1osRUFBRSxFQUFFLFNBQVM7YUFDZDtZQUNEO2dCQUNFLEdBQUcsRUFDRCw4RkFBOEY7Z0JBQ2hHLE1BQU0sRUFBRSxJQUFJO2dCQUNaLEVBQUUsRUFBRSxTQUFTO2FBQ2Q7WUFDRDtnQkFDRSxHQUFHLEVBQ0QsOEZBQThGO2dCQUNoRyxNQUFNLEVBQUUsSUFBSTtnQkFDWixFQUFFLEVBQUUsU0FBUzthQUNkO1lBQ0Q7Z0JBQ0UsR0FBRyxFQUNELCtGQUErRjtnQkFDakcsTUFBTSxFQUFFLElBQUk7Z0JBQ1osRUFBRSxFQUFFLFNBQVM7YUFDZDtTQUNGLENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsSUFBSTtRQUNGLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSw2RUFBWSxDQUFDO1lBQzFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixPQUFPLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDM0MsY0FBYyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO1NBQ3RELENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUVELCtEQUFlLGdCQUFnQixFQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wYWdlcy9pbmRleC50c1wiKTtcbiIsImNvbnN0IGRvbVV0aWxzID0ge1xuICBkb2VzTm9kZUNvbnRhaW5DbGljazogKG5vZGU6IEhUTUxFbGVtZW50LCBlOiBFdmVudCk6IGJvb2xlYW4gPT4ge1xuICAgIGlmICghbm9kZSB8fCAhZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiBub2RlLmNvbnRhaW5zKGUudGFyZ2V0KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdGlvbiB7XG4gIG1lbnVPcGVuZWQ6IGJvb2xlYW47XG4gIGhlYWRlck1lbnU6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgaGVhZGVyQnVyZ2VyTWVudTogSFRNTEVsZW1lbnQgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHsgc2VsZWN0b3IgfTogeyBzZWxlY3Rvcjogc3RyaW5nIH0pIHtcbiAgICB0aGlzLm1lbnVPcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLmhlYWRlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB0aGlzLmhlYWRlckJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlci1idXJnZXJcIik7XG5cbiAgICBpZiAodGhpcy5pc01vYmlsZSgpKSB7XG4gICAgICB0aGlzLmluaXROYXZpZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNb2JpbGUoKSB7XG4gICAgY29uc3QgbWF4TW9iaWxlV2lkdGggPSA3Njg7XG5cbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPCBtYXhNb2JpbGVXaWR0aDtcbiAgfVxuXG4gIGluaXROYXZpZ2F0aW9uKCkge1xuICAgIGlmICh0aGlzLmhlYWRlck1lbnUpIHtcbiAgICAgIHRoaXMuaGVhZGVyTWVudS5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyLW1lbnUtbGlzdF9zdGF0ZS1tb2JpbGVcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVhZGVyQnVyZ2VyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJCdXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5tZW51T3BlbmVkKSB7XG4gICAgICAgICAgdGhpcy5vcGVuTmF2aWdhdGlvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VOYXZpZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5OYXZpZ2F0aW9uKCkge1xuICAgIGlmICh0aGlzLmhlYWRlck1lbnUpIHtcbiAgICAgIHRoaXMuaGVhZGVyTWVudS5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyLW1lbnUtbGlzdF9zdGF0ZS1tb2JpbGUtb3BlbmVkXCIpO1xuICAgIH1cblxuICAgIHRoaXMubWVudU9wZW5lZCA9IHRydWU7XG4gIH1cblxuICBjbG9zZU5hdmlnYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJoZWFkZXItbWVudS1saXN0X3N0YXRlLW1vYmlsZS1vcGVuZWRcIik7XG4gICAgfVxuXG4gICAgdGhpcy5tZW51T3BlbmVkID0gZmFsc2U7XG4gIH1cbn1cbiIsIi8vIEB0cy1pZ25vcmVcbmNvbnN0IEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcblxuY29uc3QgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuY2xhc3MgQW5hbHlzZSB7XG4gIHN0YXJ0U2hvdzogYm9vbGVhbjtcbiAgYnVmZmVyTGVuZ3RoOiBudW1iZXI7XG4gIGJhbmRzOiBVaW50OEFycmF5O1xuXG4gIG5vZGU6IGFueTtcbiAgbm9pc2VMZXZlbFJhbmdlOiBIVE1MSW5wdXRFbGVtZW50O1xuICBhbmFseXNlcjogYW55O1xuICBzb3VyY2U6IGFueTtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgdmlkZW8sXG4gICAgbm9pc2VMZXZlbFJhbmdlXG4gIH06IHtcbiAgICB2aWRlbzogSFRNTFZpZGVvRWxlbWVudDtcbiAgICBub2lzZUxldmVsUmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIH0pIHtcbiAgICB0aGlzLm5vZGUgPSBjb250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcigyMDQ4LCAxLCAxKTtcbiAgICB0aGlzLm5vaXNlTGV2ZWxSYW5nZSA9IG5vaXNlTGV2ZWxSYW5nZTtcblxuICAgIHRoaXMuYW5hbHlzZXIgPSBjb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XG5cbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IHRoaXMuYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQ7XG4gICAgdGhpcy5iYW5kcyA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcblxuICAgIHRoaXMuc3RhcnRTaG93ID0gZmFsc2U7XG5cbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc291cmNlKSB7XG4gICAgICAgIHRoaXMuc291cmNlID0gY29udGV4dC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UodmlkZW8pO1xuXG4gICAgICAgIHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5hbmFseXNlcik7XG4gICAgICAgIHRoaXMuYW5hbHlzZXIuY29ubmVjdCh0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5zb3VyY2UuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKTtcblxuICAgICAgICB0aGlzLm5vZGUub25hdWRpb3Byb2Nlc3MgPSAoZTogRXZlbnRUYXJnZXQpID0+IHtcbiAgICAgICAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMuYmFuZHMpOyAvLyBjb3B5IGN1cnJlbnQgZGF0YSB0byB0aGlzLmJhbmRzXG5cbiAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRTaG93KSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTaG93ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRBdmVyYWdlVm9sdW1lKGFycmF5OiBVaW50OEFycmF5KTogbnVtYmVyIHtcbiAgICBsZXQgdmFsdWVzID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlcyArPSBhcnJheVtpXTtcbiAgICB9XG5cbiAgICBjb25zdCBhdmVyYWdlID0gdmFsdWVzIC8gYXJyYXkubGVuZ3RoO1xuXG4gICAgLy8gY2FsY3VsYXRlIGluIDEwMCUgc2NhbGUsIDElIGlzIDIuNTZcbiAgICByZXR1cm4gYXZlcmFnZSA9PT0gMCA/IDAgOiBhdmVyYWdlIC8gMi41NjtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubm9pc2VMZXZlbFJhbmdlLnZhbHVlID0gdGhpcy5nZXRBdmVyYWdlVm9sdW1lKHRoaXMuYmFuZHMpLnRvU3RyaW5nKCk7XG5cbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFuYWx5c2U7XG4iLCJjbGFzcyBDYW52YXNWaWRlbyB7XG4gIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50O1xuICB2aWRlb1BsYXllcjogSFRNTEVsZW1lbnQ7XG4gIHN0b3BWaWRlbzogYm9vbGVhbjtcblxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbDtcbiAgY2FudmFzSGVscGVyOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoeyB2aWRlbywgdmlkZW9QbGF5ZXIgfTogeyB2aWRlbzogSFRNTFZpZGVvRWxlbWVudDsgdmlkZW9QbGF5ZXI6IEhUTUxFbGVtZW50IH0pIHtcbiAgICB0aGlzLnZpZGVvID0gdmlkZW87XG4gICAgdGhpcy52aWRlb1BsYXllciA9IHZpZGVvUGxheWVyO1xuICAgIHRoaXMuc3RvcFZpZGVvID0gZmFsc2U7XG5cbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgdGhpcy5jYW52YXNIZWxwZXIgPSBudWxsO1xuICB9XG5cbiAgYXBwbHlCcmlnaHRuZXNzKGRhdGE6IFVpbnQ4Q2xhbXBlZEFycmF5LCBicmlnaHRuZXNzOiBzdHJpbmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIGRhdGFbaV0gKz0gMjU1ICogKCticmlnaHRuZXNzIC8gMTAwKTtcbiAgICAgIGRhdGFbaSArIDFdICs9IDI1NSAqICgrYnJpZ2h0bmVzcyAvIDEwMCk7XG4gICAgICBkYXRhW2kgKyAyXSArPSAyNTUgKiAoK2JyaWdodG5lc3MgLyAxMDApO1xuICAgIH1cbiAgfVxuXG4gIGFwcGx5Q29udHJhc3QoZGF0YTogVWludDhDbGFtcGVkQXJyYXksIGNvbnRyYXN0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBmYWN0b3IgPSAoMjU5LjAgKiAoK2NvbnRyYXN0ICsgMjU1LjApKSAvICgyNTUuMCAqICgyNTkuMCAtICtjb250cmFzdCkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBkYXRhW2ldID0gdGhpcy50cnVuY2F0ZUNvbG9yKGZhY3RvciAqIChkYXRhW2ldIC0gMTI4LjApICsgMTI4LjApO1xuICAgICAgZGF0YVtpICsgMV0gPSB0aGlzLnRydW5jYXRlQ29sb3IoZmFjdG9yICogKGRhdGFbaSArIDFdIC0gMTI4LjApICsgMTI4LjApO1xuICAgICAgZGF0YVtpICsgMl0gPSB0aGlzLnRydW5jYXRlQ29sb3IoZmFjdG9yICogKGRhdGFbaSArIDJdIC0gMTI4LjApICsgMTI4LjApO1xuICAgIH1cbiAgfVxuXG4gIHRydW5jYXRlQ29sb3IodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgIHZhbHVlID0gMDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID4gMjU1KSB7XG4gICAgICB2YWx1ZSA9IDI1NTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBmaWx0ZXIoe1xuICAgIHZpZGVvLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBjb250cmFzdCxcbiAgICBicmlnaHRuZXNzXG4gIH06IHtcbiAgICB2aWRlbzogSFRNTFZpZGVvRWxlbWVudDtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGNvbnRyYXN0OiBzdHJpbmc7XG4gICAgYnJpZ2h0bmVzczogc3RyaW5nO1xuICB9KSB7XG4gICAgaWYgKCF0aGlzLmNhbnZhc0hlbHBlcikge1xuICAgICAgdGhpcy5jYW52YXNIZWxwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXG4gICAgICB0aGlzLmNhbnZhc0hlbHBlci53aWR0aCA9IHdpZHRoO1xuICAgICAgdGhpcy5jYW52YXNIZWxwZXIuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRleHRIZWxwZXIgPSB0aGlzLmNhbnZhc0hlbHBlci5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBpZiAoY29udGV4dEhlbHBlcikge1xuICAgICAgY29udGV4dEhlbHBlci5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICBjb25zdCBpZGF0YSA9IGNvbnRleHRIZWxwZXIuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICB2YXIgZGF0YSA9IGlkYXRhLmRhdGE7XG5cbiAgICAgIHRoaXMuYXBwbHlCcmlnaHRuZXNzKGRhdGEsIGJyaWdodG5lc3MpO1xuICAgICAgdGhpcy5hcHBseUNvbnRyYXN0KGRhdGEsIGNvbnRyYXN0KTtcblxuICAgICAgcmV0dXJuIGlkYXRhO1xuICAgIH1cbiAgfVxuXG4gIHBsYXkoe1xuICAgIGNhbnZhc0luaXRlZCxcbiAgICBicmlnaHRuZXNzLFxuICAgIGNvbnRyYXN0LFxuICAgIHNpemU6IHsgd2lkdGgsIGhlaWdodCB9XG4gIH06IHtcbiAgICBjYW52YXNJbml0ZWQ6IGJvb2xlYW47XG4gICAgYnJpZ2h0bmVzczogc3RyaW5nO1xuICAgIGNvbnRyYXN0OiBzdHJpbmc7XG4gICAgc2l6ZTogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9O1xuICB9KSB7XG4gICAgaWYgKCFjYW52YXNJbml0ZWQpIHtcbiAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgICAgdGhpcy5jYW52YXMuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1gO1xuICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fWA7XG5cbiAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgIHRoaXMudmlkZW9QbGF5ZXIuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BWaWRlbyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2FudmFzKSB7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBpZiAoIWNvbnRleHQpIHJldHVybjtcblxuICAgICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZEltYWdlID0gdGhpcy5maWx0ZXIoe1xuICAgICAgICAgICAgdmlkZW86IHRoaXMudmlkZW8sXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIGNvbnRyYXN0LFxuICAgICAgICAgICAgYnJpZ2h0bmVzc1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29udGV4dC5wdXRJbWFnZURhdGEoZmlsdGVyZWRJbWFnZSwgMCwgMCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5zdG9wVmlkZW8gfHwgdGhpcy52aWRlby5wYXVzZWQgfHwgdGhpcy52aWRlby5lbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wVmlkZW8gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmF3KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGRyYXcoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FudmFzVmlkZW87XG4iLCJpbXBvcnQgQ2FudmFzVmlkZW8gZnJvbSBcIi4vY2FudmFzVmlkZW9cIjtcbmltcG9ydCBBbmFseXNlIGZyb20gXCIuL2F1ZGlvQW5hbHlzZVwiO1xuXG4vKipcbiAqIFBsYXllclRlbXBsYXRlIC0gZ2VuZXJhdGUgdmlkZW8tcGxheWVyIGZyb20gPHRlbXBsYXRlPiB0YWdcbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXllclRlbXBsYXRlIHtcbiAgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcGxhdGUtcGxheWVyXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICByZW5kZXIoaWQ6IHN0cmluZyk6IE5vZGUge1xuICAgIGNvbnN0IGVsZW1lbnQ6IE5vZGUgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnZpZGVvY29udHJvbC1saXN0X19pdGVtXCIpXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgLy8gcGxheWVyLXtpZH1cbiAgICBjb25zdCBwbGF5ZXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSAoPEVsZW1lbnQ+ZWxlbWVudCkucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJcIik7XG5cbiAgICBwbGF5ZXJFbGVtZW50ICYmIHBsYXllckVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xuXG4gICAgLy8gcGxheWVyLXtpZH0tdmlkZW9cbiAgICBjb25zdCB2aWRlb0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9ICg8RWxlbWVudD5lbGVtZW50KS5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIik7XG5cbiAgICB2aWRlb0VsZW1lbnQgJiYgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2lkfS12aWRlb2ApO1xuXG4gICAgLy8gcGxheWVyLXtpZH0td2ViZ2wtdmlkZW9cbiAgICBjb25zdCBpbnB1dEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9ICg8RWxlbWVudD5lbGVtZW50KS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgaW5wdXRFbGVtZW50ICYmIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpZH0td2ViZ2wtdmlkZW9gKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59XG5cbi8qKlxuICogUGxheWVyIGlzIGEgd3JhcHBlciBhcm91bmQgaHRtbDUgdmlkZW8gZWxlbWVudCBhbmQgSExTIHN0YW5kYXJ0LFxuICogaXQgaGFzIHNwZWNpYWwgYmVoYXZpb3IgZm9yIG91ciBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gIHNldHRpbmdzOiB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgY2FudmFzSW5pdGVkOiBib29sZWFuO1xuICAgIGNvbnRhaW5lckJvdW5kczoge1xuICAgICAgbGVmdDogbnVtYmVyO1xuICAgICAgdG9wOiBudW1iZXI7XG4gICAgICB3aWR0aDogbnVtYmVyO1xuICAgICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgfTtcbiAgICBpc0Z1bGxzY3JlZW46IGJvb2xlYW47XG4gIH07XG5cbiAgdmlkZW9TZXR0aW5nczoge1xuICAgIGJyaWdodG5lc3M6IHN0cmluZztcbiAgICBjb250cmFzdDogc3RyaW5nO1xuICAgIGlzRnVsbHNjcmVlbjogYm9vbGVhbjtcbiAgfTtcblxuICBjb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcGxheWVyOiBIVE1MRWxlbWVudCB8IG51bGw7XG4gIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50IHwgbnVsbDtcbiAgYnJpZ2h0bmVzc1JhbmdlOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbiAgbm9pc2VMZXZlbFJhbmdlOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbiAgY29udHJhc3RSYW5nZTogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5cbiAgY2FudmFzVmlkZW86IENhbnZhc1ZpZGVvO1xuXG4gIGluaXRQcm9taXNlOiBQcm9taXNlPEhUTUxWaWRlb0VsZW1lbnQ+O1xuICBhbmFseXNlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICB1cmwsXG4gICAgY29udGFpbmVyRWxlbWVudCxcbiAgICBwbGF5ZXJFbGVtZW50XG4gIH06IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBjb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwbGF5ZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgfSkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICB1cmwsXG4gICAgICBjYW52YXNJbml0ZWQ6IGZhbHNlLFxuICAgICAgY29udGFpbmVyQm91bmRzOiB7XG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMFxuICAgICAgfSxcbiAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy52aWRlb1NldHRpbmdzID0ge1xuICAgICAgYnJpZ2h0bmVzczogXCIwXCIsXG4gICAgICBjb250cmFzdDogXCIwXCIsXG4gICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lckVsZW1lbnQ7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXJFbGVtZW50O1xuICAgIHRoaXMudmlkZW8gPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcbiAgICB0aGlzLmJyaWdodG5lc3NSYW5nZSA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJfX2JyaWdodG5lc3NcIik7XG4gICAgdGhpcy5ub2lzZUxldmVsUmFuZ2UgPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmMtcGxheWVyX19ub2lzZS1sZXZlbFwiKTtcbiAgICB0aGlzLmNvbnRyYXN0UmFuZ2UgPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmMtcGxheWVyX19jb250cmFzdFwiKTtcblxuICAgIHRoaXMuY2FudmFzVmlkZW8gPSBuZXcgQ2FudmFzVmlkZW8oe1xuICAgICAgdmlkZW86IHRoaXMudmlkZW8sXG4gICAgICB2aWRlb1BsYXllcjogdGhpcy5wbGF5ZXJcbiAgICB9KTtcblxuICAgIHRoaXMuaW5pdFByb21pc2UgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gIH1cblxuICBzZXRDb250YWluZXJCb3VuZHMoKSB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcykge1xuICAgICAgdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHMgPSB0aGlzLmNvbnRhaW5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuY29udGFpbmVyQm91bmRzO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAodGhpcy5pbml0UHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb21pc2U7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuSGxzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgY29uc3QgaGxzID0gbmV3IHdpbmRvdy5IbHMoKTtcblxuICAgICAgICBobHMubG9hZFNvdXJjZSh0aGlzLnNldHRpbmdzLnVybCk7XG4gICAgICAgIGhscy5hdHRhY2hNZWRpYSh0aGlzLnZpZGVvKTtcblxuICAgICAgICBobHMub24od2luZG93Lkhscy5FdmVudHMuTUFOSUZFU1RfUEFSU0VELCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLnZpZGVvKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmlkZW8uY2FuUGxheVR5cGUoXCJhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybFwiKSkge1xuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IHRoaXMuc2V0dGluZ3MudXJsO1xuXG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMudmlkZW8pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy52aWRlby5wbGF5KCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMudmlkZW8ucGF1c2UoKTtcbiAgfVxuXG4gIG9wZW5GdWxsc2NyZWVuKCkge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmlzRnVsbHNjcmVlbikgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGhpcy5zZXRDb250YWluZXJCb3VuZHMoKTtcblxuICAgIGNvbnN0IHsgY29udGFpbmVyQm91bmRzIH0gPSB0aGlzLnNldHRpbmdzO1xuXG4gICAgdGhpcy52aWRlby5tdXRlZCA9IGZhbHNlO1xuXG4gICAgY29uc3QgcGxheWVyQm91bmRzID0gdGhpcy5wbGF5ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgXG4gICAgICAgIHRyYW5zbGF0ZVgoMHB4KVxuICAgICAgICB0cmFuc2xhdGVZKDBweClcbiAgICBgO1xuXG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUud2lkdGggPSBwbGF5ZXJCb3VuZHMud2lkdGggKyBcInB4XCI7XG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUuaGVpZ2h0ID0gcGxheWVyQm91bmRzLmhlaWdodCArIFwicHhcIjtcbiAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcIlwiO1xuICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IFwiXCI7XG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUuekluZGV4ID0gXCIyXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IFwidHJhbnNmb3JtLCB3aWR0aCwgaGVpZ2h0XCI7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBcIjAuM3NcIjtcblxuICAgICAgLy8gbW92ZSBlbGVtZW50IHRvIHRvcC9sZWZ0IGJvdW5kZXIgb2YgdGhlIGxpc3QtY29udGFpbmVyXG4gICAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgXG4gICAgICAgIHRyYW5zbGF0ZVgoLSR7cGxheWVyQm91bmRzLmxlZnQgLSBjb250YWluZXJCb3VuZHMubGVmdH1weClcbiAgICAgICAgdHJhbnNsYXRlWSgtJHtwbGF5ZXJCb3VuZHMudG9wIC0gY29udGFpbmVyQm91bmRzLnRvcH1weClcbiAgICAgIGA7XG5cbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLndpZHRoID0gY29udGFpbmVyQm91bmRzLndpZHRoICsgXCJweFwiO1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUuaGVpZ2h0ID0gY29udGFpbmVyQm91bmRzLmhlaWdodCArIFwicHhcIjtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dGluZ3MuaXNGdWxsc2NyZWVuID0gdHJ1ZTtcbiAgfVxuXG4gIGNsb3NlRnVsbHNjcmVlbigpIHtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuaXNGdWxsc2NyZWVuKSByZXR1cm4gZmFsc2U7XG5cbiAgICB0aGlzLnZpZGVvLm11dGVkID0gdHJ1ZTtcblxuICAgIHRoaXMucGxheWVyLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGBcbiAgICAgICAgICB0cmFuc2xhdGVYKDBweClcbiAgICAgICAgICB0cmFuc2xhdGVZKDBweClcbiAgICAgIGA7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldHRpbmdzLmlzRnVsbHNjcmVlbiA9IGZhbHNlO1xuICB9XG5cbiAgcGxheVZpZGVvT25DYW52YXMoKSB7XG4gICAgdGhpcy5zZXRDb250YWluZXJCb3VuZHMoKTtcblxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5jYW52YXNJbml0ZWQpIHtcbiAgICAgIHRoaXMudmlkZW8uY2xhc3NMaXN0LmFkZChcInZjLXBsYXllcl9fdmlkZW9fc3RhdGUtaGlkZGVuXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2FudmFzVmlkZW8ucGxheSh7XG4gICAgICBjYW52YXNJbml0ZWQ6IHRoaXMuc2V0dGluZ3MuY2FudmFzSW5pdGVkLFxuICAgICAgc2l6ZToge1xuICAgICAgICB3aWR0aDogdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHMuaGVpZ2h0XG4gICAgICB9LFxuICAgICAgYnJpZ2h0bmVzczogdGhpcy52aWRlb1NldHRpbmdzLmJyaWdodG5lc3MsXG4gICAgICBjb250cmFzdDogdGhpcy52aWRlb1NldHRpbmdzLmNvbnRyYXN0XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldHRpbmdzLmNhbnZhc0luaXRlZCA9IHRydWU7XG4gIH1cblxuICBjaGFuZ2VCcmlnaHRuZXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZGVvU2V0dGluZ3MuYnJpZ2h0bmVzcyA9IHZhbHVlO1xuXG4gICAgdGhpcy5wbGF5VmlkZW9PbkNhbnZhcygpO1xuICB9XG5cbiAgY2hhbmdlQ29udHJhc3QodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmlkZW9TZXR0aW5ncy5jb250cmFzdCA9IHZhbHVlO1xuXG4gICAgdGhpcy5wbGF5VmlkZW9PbkNhbnZhcygpO1xuICB9XG5cbiAgaW5pdEV2ZW50cygpIHtcbiAgICB0aGlzLmJyaWdodG5lc3NSYW5nZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGUgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VCcmlnaHRuZXNzKCg8SFRNTElucHV0RWxlbWVudD5lLnRhcmdldCkudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jb250cmFzdFJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUNvbnRyYXN0KCg8SFRNTElucHV0RWxlbWVudD5lLnRhcmdldCkudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hbmFseXNlciA9IG5ldyBBbmFseXNlKHtcbiAgICAgIHZpZGVvOiB0aGlzLnZpZGVvLFxuICAgICAgbm9pc2VMZXZlbFJhbmdlOiB0aGlzLm5vaXNlTGV2ZWxSYW5nZVxuICAgIH0pO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBjYWxsYmFjazogKGU6IEV2ZW50KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5wbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQbGF5ZXJUZW1wbGF0ZSwgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBCcm9hZGNhc3QgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcblxuLyoqXG4gKiBWaWRlb2NvbnRyb2wgcmVwcmVzZW50cyBjb250cm9sbGVyIG92ZXIgb3VyIGZlYXR1cmUsXG4gKiBpdCBpbml0aWFsaXplcyBicm9hZGNhc3RzIGFuZCBpbnRlcmFjdCB3aXRoIHVzZXIncyBhY3Rpb25zXG4gKi9cbmNsYXNzIFZpZGVvY29udHJvbCB7XG4gIGJyb2FkY2FzdHM6IEFycmF5PEJyb2FkY2FzdD47XG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBlbGVtZW50U2hvd0FsbDogSFRNTEVsZW1lbnQ7XG5cbiAgc3RhdGU6IHtcbiAgICBmdWxsc2NyZWVuSWQ6IG51bWJlcjtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgYnJvYWRjYXN0cyxcbiAgICBlbGVtZW50U2hvd0FsbCxcbiAgICBlbGVtZW50XG4gIH06IHtcbiAgICBicm9hZGNhc3RzOiBBcnJheTxCcm9hZGNhc3Q+O1xuICAgIGVsZW1lbnRTaG93QWxsOiBIVE1MRWxlbWVudDtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgfSkge1xuICAgIHRoaXMuYnJvYWRjYXN0cyA9IGJyb2FkY2FzdHM7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmVsZW1lbnRTaG93QWxsID0gZWxlbWVudFNob3dBbGw7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZnVsbHNjcmVlbklkOiBJbmZpbml0eVxuICAgIH07XG5cbiAgICB0aGlzLmluaXRQbGF5ZXJzKCk7XG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gIH1cblxuICBjbG9zZUZ1bGxQbGF5ZXIoKSB7XG4gICAgLy8gcGxheSBhbGwgcGxheWVyc1xuICAgIHRoaXMuYnJvYWRjYXN0cy5mb3JFYWNoKGJyb2FkY2FzdCA9PiBicm9hZGNhc3QucGxheWVyLnBsYXkoKSk7XG5cbiAgICB0aGlzLmJyb2FkY2FzdHNbdGhpcy5zdGF0ZS5mdWxsc2NyZWVuSWRdLnBsYXllci5jbG9zZUZ1bGxzY3JlZW4oKTtcblxuICAgIHRoaXMuc3RhdGUuZnVsbHNjcmVlbklkID0gbnVsbDtcbiAgfVxuXG4gIG9wZW5GdWxsUGxheWVyKGlkOiBudW1iZXIpIHtcbiAgICAvLyBzdG9wIGFsbCBwbGF5ZXJzIGV4Y2VwdCBhIGZ1bGxzY3JlZW5cbiAgICB0aGlzLmJyb2FkY2FzdHNcbiAgICAgIC5maWx0ZXIoYnJvYWRjYXN0ID0+IGJyb2FkY2FzdC5pZCAhPT0gaWQpXG4gICAgICAuZm9yRWFjaChicm9hZGNhc3QgPT4gYnJvYWRjYXN0LnBsYXllci5zdG9wKCkpO1xuXG4gICAgLy8gb3BlbiBwbGF5ZXIgaW4gZnVsbHNjcmVlblxuICAgIHRoaXMuYnJvYWRjYXN0c1tpZF0ucGxheWVyLm9wZW5GdWxsc2NyZWVuKCk7XG5cbiAgICB0aGlzLnN0YXRlLmZ1bGxzY3JlZW5JZCA9IGlkO1xuICB9XG5cbiAgaW5pdEV2ZW50cygpIHtcbiAgICB0aGlzLmVsZW1lbnRTaG93QWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlRnVsbFBsYXllcigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50U2hvd0FsbC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZUZ1bGxQbGF5ZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRQbGF5ZXJzKCkge1xuICAgIHRoaXMuYnJvYWRjYXN0cy5mb3JFYWNoKChicm9hZGNhc3QsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBWaWRlb1RlbXBsYXRlOiBQbGF5ZXJUZW1wbGF0ZSA9IG5ldyBQbGF5ZXJUZW1wbGF0ZSgpO1xuICAgICAgY29uc3QgbGlzdFZpZGVvRWxlbWVudDogTm9kZSA9IFZpZGVvVGVtcGxhdGUucmVuZGVyKGBwbGF5ZXItJHtpbmRleCArIDF9YCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChsaXN0VmlkZW9FbGVtZW50KTtcblxuICAgICAgY29uc3QgVmlkZW9QbGF5ZXIgPSBuZXcgUGxheWVyKHtcbiAgICAgICAgY29udGFpbmVyRWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICBwbGF5ZXJFbGVtZW50OiAoPEVsZW1lbnQ+bGlzdFZpZGVvRWxlbWVudCkucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJcIiksXG4gICAgICAgIHVybDogYnJvYWRjYXN0LnVybFxuICAgICAgfSk7XG5cbiAgICAgIFZpZGVvUGxheWVyLmluaXQoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgVmlkZW9QbGF5ZXIucGxheSgpO1xuXG4gICAgICAgICAgLy8gSW5pdCBldmVudHNcbiAgICAgICAgICBWaWRlb1BsYXllci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9wZW5GdWxsUGxheWVyKGluZGV4KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIFZpZGVvUGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBlID0+IHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZ1bGxQbGF5ZXIoaW5kZXgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gU2F2ZSBwbGF5ZXIgdG8gYnJvYWRjYXN0cyBhcnJheVxuICAgICAgICAgIHRoaXMuYnJvYWRjYXN0c1tpbmRleF0uaWQgPSBpbmRleDtcbiAgICAgICAgICB0aGlzLmJyb2FkY2FzdHNbaW5kZXhdLnBsYXllciA9IFZpZGVvUGxheWVyO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUud2FybihlcnIpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWaWRlb2NvbnRyb2w7XG4iLCJjbGFzcyBDYW1lcmFXaWRnZXQge1xuICB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtY2FtZXJhLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FtZXJhV2lkZ2V0O1xuIiwiaW1wb3J0IHsgSVdpZGdldFBsYXllckRhdGEgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcblxuY2xhc3MgUGxheWVyV2lkZ2V0IHtcbiAgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIGRhdGE6IElXaWRnZXRQbGF5ZXJEYXRhO1xuICB3aWRnZXQ6IE5vZGU7XG5cbiAgY29uc3RydWN0b3IoeyBkYXRhIH06IHsgZGF0YTogSVdpZGdldFBsYXllckRhdGEgfSkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1wbGF5ZXItdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuXG4gIHNldElubmVyVGV4dChzZWxlY3Rvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBibG9jazogSFRNTEVsZW1lbnQgPSAoPEhUTUxFbGVtZW50PnRoaXMud2lkZ2V0KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmIChibG9jaykge1xuICAgICAgYmxvY2suaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cblxuICBzZXRDb3ZlcigpIHtcbiAgICBjb25zdCBibG9jayA9ICg8RWxlbWVudD50aGlzLndpZGdldCkucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbm93X19jb3ZlclwiKTtcblxuICAgIGJsb2NrLnNldEF0dHJpYnV0ZShcInNyY1wiLCB0aGlzLmRhdGEuYWxidW1jb3Zlcik7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5zZXRDb3ZlcigpO1xuXG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIucGxheWVyLW5vd19fdGl0bGVcIiwgYCR7dGhpcy5kYXRhLmFydGlzdH0gJHt0aGlzLmRhdGEudHJhY2submFtZX1gKTtcblxuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLnBsYXllci1wcm9ncmVzc19fdGltZVwiLCB0aGlzLmRhdGEudHJhY2subGVuZ3RoKTtcbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5wbGF5ZXItdm9sdW1lX19wZXJjZW50YWdlXCIsIGAke3RoaXMuZGF0YS52b2x1bWV9JWApO1xuXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcldpZGdldDtcbiIsImltcG9ydCB7IElXaWRnZXRRdWVzdGlvbnNEYXRhIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2luZGV4XCI7XG5cbmNsYXNzIFF1ZXN0aW9uc1dpZGdldCB7XG4gIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICBkYXRhOiBJV2lkZ2V0UXVlc3Rpb25zRGF0YTtcbiAgd2lkZ2V0OiBOb2RlO1xuXG4gIGNvbnN0cnVjdG9yKHsgZGF0YSB9OiB7IGRhdGE6IElXaWRnZXRRdWVzdGlvbnNEYXRhIH0pIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtcXVlc3Rpb25zLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cblxuICBzZXRJbm5lclRleHQoc2VsZWN0b3I6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3QgYmxvY2s6IEhUTUxFbGVtZW50ID0gKDxFbGVtZW50PnRoaXMud2lkZ2V0KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmIChibG9jaykge1xuICAgICAgYmxvY2suaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIuYnV0dG9uX3R5cGUteWVsbG93XCIsIHRoaXMuZGF0YS5idXR0b25zWzBdKTtcbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5idXR0b25fdHlwZS1ncmV5XCIsIHRoaXMuZGF0YS5idXR0b25zWzFdKTtcblxuICAgIHJldHVybiB0aGlzLndpZGdldDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBRdWVzdGlvbnNXaWRnZXQ7XG4iLCJjbGFzcyBTdGF0c1dpZGdldCB7XG4gIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1zdGF0cy10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRzV2lkZ2V0O1xuIiwiaW1wb3J0IHsgSVdpZGdldFRoZW1hbERhdGEgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcblxuY2xhc3MgVGhlbWFsV2lkZ2V0IHtcbiAgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIGRhdGE6IElXaWRnZXRUaGVtYWxEYXRhO1xuICB3aWRnZXQ6IE5vZGU7XG5cbiAgY29uc3RydWN0b3IoeyBkYXRhIH06IHsgZGF0YTogSVdpZGdldFRoZW1hbERhdGEgfSkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC10aGVybWFsLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cblxuICBzZXRJbm5lclRleHQoc2VsZWN0b3I6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3QgYmxvY2s6IEhUTUxFbGVtZW50ID0gKDxFbGVtZW50PnRoaXMud2lkZ2V0KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmIChibG9jaykge1xuICAgICAgYmxvY2suaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5zZXRJbm5lclRleHQoXG4gICAgICBcIi53aWRnZXQtc2Vuc29yX3R5cGUtdGVtcCAud2lkZ2V0LXNlbnNvcl9fdmFsdWVcIixcbiAgICAgIGAke3RoaXMuZGF0YS50ZW1wZXJhdHVyZX1DYFxuICAgICk7XG5cbiAgICB0aGlzLnNldElubmVyVGV4dChcbiAgICAgIFwiLndpZGdldC1zZW5zb3JfdHlwZS1odW1pZGl0eSAud2lkZ2V0LXNlbnNvcl9fdmFsdWVcIixcbiAgICAgIGAke3RoaXMuZGF0YS5odW1pZGl0eX0lYFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy53aWRnZXQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGhlbWFsV2lkZ2V0O1xuIiwiaW1wb3J0IFN0YXRzV2lkZ2V0IGZyb20gXCIuL3N0YXRzLndpZGdldFwiO1xuaW1wb3J0IENhbWVyYVdpZGdldCBmcm9tIFwiLi9jYW1lcmEud2lkZ2V0XCI7XG5pbXBvcnQgUXVlc3Rpb25zV2lkZ2V0IGZyb20gXCIuL3F1ZXN0aW9ucy53aWRnZXRcIjtcbmltcG9ydCBUaGVtYWxXaWRnZXQgZnJvbSBcIi4vdGhlbWFsLndpZGdldFwiO1xuaW1wb3J0IFBsYXllcldpZGdldCBmcm9tIFwiLi9wbGF5ZXIud2lkZ2V0XCI7XG5cbmltcG9ydCAqIGFzIFR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCBXSURHRVRfVFlQRVMgPSB7XG4gIFNUQVRTOiBcIlNUQVRTXCIsXG4gIENBTUVSQTogXCJDQU1FUkFcIixcbiAgVEhFUk1BTDogXCJUSEVSTUFMXCIsXG4gIFBMQVlFUjogXCJQTEFZRVJcIixcbiAgUVVFU1RJT05TOiBcIlFVRVNUSU9OU1wiLFxuICBERUZBVUxUOiBcIkRFRkFVTFRcIlxufTtcblxuY2xhc3MgV2lkZ2V0IHtcbiAgZXZlbnQ6IFR5cGVzLkV2ZW50O1xuICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuICB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgd2lkZ2V0OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcih7IGV2ZW50LCBjb250YWluZXIgfTogeyBldmVudDogVHlwZXMuRXZlbnQ7IGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfSkge1xuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLndpZGdldCA9IHRoaXMudGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldFwiKS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgc2V0RGVzY3JpcHRpb24oKSB7XG4gICAgaWYgKHRoaXMuZXZlbnQuZGVzY3JpcHRpb24gJiYgdGhpcy53aWRnZXQpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRUZXh0ID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtY29udGVudF9fdGV4dFwiKTtcbiAgICAgIGNvbnN0IHRleHRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1jb250ZW50X190ZXh0XCIpO1xuXG4gICAgICBpZiAoY29udGVudFRleHQpIHtcbiAgICAgICAgY29udGVudFRleHQuY2xhc3NMaXN0LmFkZChgd2lkZ2V0LWNvbnRlbnRfX3RleHRfd2lkdGgtJHt0aGlzLmV2ZW50LnNpemV9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0ZXh0RWxlbWVudCkge1xuICAgICAgICB0ZXh0RWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmV2ZW50LmRlc2NyaXB0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldEhlYWRlckRhdGEoKSB7XG4gICAgY29uc3QgdGl0bGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIud2lkZ2V0LWhlYWRlci1hYm91dF9fdGl0bGVcIlxuICAgICk7XG4gICAgY29uc3QgdHlwZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWhlYWRlcl9fdHlwZVwiKTtcbiAgICBjb25zdCBkYXRlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtaGVhZGVyX19kYXRlXCIpO1xuICAgIGNvbnN0IGljb25Vc2VFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIud2lkZ2V0LWhlYWRlci1hYm91dF9faWNvbiA+IHVzZVwiXG4gICAgKTtcbiAgICBjb25zdCBpY29uRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtaGVhZGVyLWFib3V0X19pY29uXCIpO1xuXG4gICAgaWYgKHRpdGxlRWxlbWVudCkge1xuICAgICAgdGl0bGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQudGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVFbGVtZW50KSB7XG4gICAgICB0eXBlRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmV2ZW50LnNvdXJjZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0ZUVsZW1lbnQpIHtcbiAgICAgIGRhdGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQudGltZTtcbiAgICB9XG5cbiAgICBpZiAoaWNvblVzZUVsZW1lbnQpIHtcbiAgICAgIGljb25Vc2VFbGVtZW50LnNldEF0dHJpYnV0ZShcInhsaW5rOmhyZWZcIiwgYCMke3RoaXMuZXZlbnQuaWNvbn1gKTtcbiAgICB9XG5cbiAgICBpZiAoaWNvbkVsZW1lbnQpIHtcbiAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoYGljb25fJHt0aGlzLmV2ZW50Lmljb259YCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGF0YVRlbXBsYXRlVHlwZSgpIHtcbiAgICBjb25zdCB7IGRhdGEsIGljb24gfSA9IHRoaXMuZXZlbnQ7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKGRhdGEudHlwZSA9PT0gXCJncmFwaFwiKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLlNUQVRTO1xuICAgIH1cblxuICAgIGlmIChpY29uID09PSBcImNhbVwiKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLkNBTUVSQTtcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKGRhdGEudGVtcGVyYXR1cmUpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuVEhFUk1BTDtcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKGRhdGEuYWxidW1jb3Zlcikge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5QTEFZRVI7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmIChkYXRhLmJ1dHRvbnMpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuUVVFU1RJT05TO1xuICAgIH1cblxuICAgIHJldHVybiBXSURHRVRfVFlQRVMuREVGQVVMVDtcbiAgfVxuXG4gIHJlbmRlckRhdGFUZW1wbGF0ZSgpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZURhdGFUeXBlID0gdGhpcy5nZXREYXRhVGVtcGxhdGVUeXBlKCk7XG4gICAgbGV0IGRhdGFDb250ZW50QmxvY2sgPSBudWxsO1xuXG4gICAgc3dpdGNoICh0ZW1wbGF0ZURhdGFUeXBlKSB7XG4gICAgICBjYXNlIFdJREdFVF9UWVBFUy5TVEFUUzpcbiAgICAgICAgY29uc3Qgc3RhdHNXaWRnZXQgPSBuZXcgU3RhdHNXaWRnZXQoKTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gc3RhdHNXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLkNBTUVSQTpcbiAgICAgICAgY29uc3QgY2FtZXJhV2lkZ2V0ID0gbmV3IENhbWVyYVdpZGdldCgpO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBjYW1lcmFXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlBMQVlFUjpcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBwbGF5ZXJXaWRnZXQgPSBuZXcgUGxheWVyV2lkZ2V0KHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZGF0YTogdGhpcy5ldmVudC5kYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBwbGF5ZXJXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlFVRVNUSU9OUzpcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBxdWVzdGlvbnNXaWRnZXQgPSBuZXcgUXVlc3Rpb25zV2lkZ2V0KHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZGF0YTogdGhpcy5ldmVudC5kYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBxdWVzdGlvbnNXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlRIRVJNQUw6XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgdGhlcm1hbFdpZGdldCA9IG5ldyBUaGVtYWxXaWRnZXQoe1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBkYXRhOiB0aGlzLmV2ZW50LmRhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IHRoZXJtYWxXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFDb250ZW50QmxvY2spIHtcbiAgICAgIGNvbnN0IHdpZGdldENvbnRlbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWNvbnRlbnRcIik7XG5cbiAgICAgIHdpZGdldENvbnRlbnQgJiYgd2lkZ2V0Q29udGVudC5hcHBlbmRDaGlsZChkYXRhQ29udGVudEJsb2NrKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy53aWRnZXQuY2xhc3NMaXN0LmFkZChgd2lkZ2V0X3NpemUtJHt0aGlzLmV2ZW50LnNpemV9YCk7XG4gICAgdGhpcy53aWRnZXQuY2xhc3NMaXN0LmFkZChgd2lkZ2V0X3R5cGUtJHt0aGlzLmV2ZW50LnR5cGV9YCk7XG5cbiAgICB0aGlzLnNldEhlYWRlckRhdGEoKTtcbiAgICB0aGlzLnNldERlc2NyaXB0aW9uKCk7XG4gICAgdGhpcy5yZW5kZXJEYXRhVGVtcGxhdGUoKTtcblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMud2lkZ2V0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXaWRnZXQ7XG4iLCJpbXBvcnQgV2lkZ2V0IGZyb20gXCIuLi9jb21wb25lbnRzL3dpZGdldC93aWRnZXRcIjtcblxuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmNsYXNzIEluZGV4UGFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcmVuZGVyRGFzaGJvYXJkV2lkZ2V0cyhldmVudHM6IEFycmF5PFR5cGVzLkV2ZW50Pikge1xuICAgIGNvbnN0IGRhc2hib2FyZFdpZGdldHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXNoYm9hcmQtbGlzdFwiKTtcblxuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgIG5ldyBXaWRnZXQoe1xuICAgICAgICBldmVudCxcbiAgICAgICAgY29udGFpbmVyOiBkYXNoYm9hcmRXaWRnZXRzTGlzdFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBsb2FkRXZlbnRzKCkge1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZXZlbnRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHR5cGU6IFwiY3JpdGljYWw6aW5mb1wiLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxpbWl0OiAyMFxuICAgICAgfSksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQpXG4gICAgICAuY2F0Y2goZXJyID0+IGFsZXJ0KGVycikpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmxvYWRFdmVudHMoKS50aGVuKGV2ZW50cyA9PiB7XG4gICAgICB0aGlzLnJlbmRlckRhc2hib2FyZFdpZGdldHMoZXZlbnRzKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmRleFBhZ2U7XG4iLCJpbXBvcnQgSGVhZGVyTmF2aWdhdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyXCI7XG5cbmltcG9ydCBJbmRleFBhZ2UgZnJvbSBcIi4vaW5kZXgucGFnZVwiO1xuaW1wb3J0IFZpZGVvY29udHJvbFBhZ2UgZnJvbSBcIi4vdmlkZW9jb250cm9sLnBhZ2VcIjtcblxuY2xhc3MgSW5pdEFwcGxpY2F0aW9uIHtcbiAgcGFnZTogYW55O1xuICBoZWFkZXJOYXZpZ2F0aW9uOiBhbnk7XG4gIGN1cnJlbnRQYWdlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcm91dGluZygpIHtcbiAgICBzd2l0Y2ggKHRoaXMuY3VycmVudFBhZ2UpIHtcbiAgICAgIGNhc2UgXCIvXCI6XG4gICAgICAgIHRoaXMucGFnZSA9IG5ldyBJbmRleFBhZ2UoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCIvdmlkZW9jb250cm9sLmh0bWxcIjpcbiAgICAgICAgdGhpcy5wYWdlID0gbmV3IFZpZGVvY29udHJvbFBhZ2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmhlYWRlck5hdmlnYXRpb24gPSBuZXcgSGVhZGVyTmF2aWdhdGlvbih7XG4gICAgICBzZWxlY3RvcjogXCIjaGVhZGVyLW1lbnVcIlxuICAgIH0pO1xuXG4gICAgdGhpcy5yb3V0aW5nKCk7XG4gIH1cbn1cblxubmV3IEluaXRBcHBsaWNhdGlvbigpO1xuIiwiaW1wb3J0IFZpZGVvY29udHJvbCBmcm9tIFwiLi4vY29tcG9uZW50cy92aWRlb2NvbnRyb2wvdmlkZW9jb250cm9sXCI7XG5cbmltcG9ydCAqIGFzIFR5cGVzIGZyb20gXCIuLi90eXBlc1wiO1xuXG5jbGFzcyBWaWRlb0NvbnRyb2xQYWdlIHtcbiAgYnJvYWRjYXN0czogQXJyYXk8VHlwZXMuQnJvYWRjYXN0PjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJyb2FkY2FzdHMgPSBbXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRnNvc2VkJTJGbWFzdGVyLm0zdThcIixcbiAgICAgICAgcGxheWVyOiBudWxsLFxuICAgICAgICBpZDogdW5kZWZpbmVkXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB1cmw6XG4gICAgICAgICAgXCJodHRwOi8vbG9jYWxob3N0OjkxOTEvbWFzdGVyP3VybD1odHRwJTNBJTJGJTJGbG9jYWxob3N0JTNBMzEwMiUyRnN0cmVhbXMlMkZjYXQlMkZtYXN0ZXIubTN1OFwiLFxuICAgICAgICBwbGF5ZXI6IG51bGwsXG4gICAgICAgIGlkOiB1bmRlZmluZWRcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmRvZyUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdXJsOlxuICAgICAgICAgIFwiaHR0cDovL2xvY2FsaG9zdDo5MTkxL21hc3Rlcj91cmw9aHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTMxMDIlMkZzdHJlYW1zJTJGaGFsbCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIF07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3QgVmlkZW9jb250cm9sV2lkZ2V0ID0gbmV3IFZpZGVvY29udHJvbCh7XG4gICAgICBicm9hZGNhc3RzOiB0aGlzLmJyb2FkY2FzdHMsXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZjLWxpc3RcIiksXG4gICAgICBlbGVtZW50U2hvd0FsbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2Yy1zaG93YWxsXCIpXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW9Db250cm9sUGFnZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=