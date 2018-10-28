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
        if (!node || !e) {
            return false;
        }
        // @ts-ignore
        return node.contains(e.target);
    },
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
    constructor({ video, noiseLevelRange, }) {
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
    show() {
        requestAnimationFrame(() => {
            this.noiseLevelRange.value = this.getAverageVolume(this.bands).toString();
            this.show();
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
    play({ canvasInited, brightness, contrast, size: { width, height }, }) {
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
            if (!context) {
                return;
            }
            const draw = () => {
                requestAnimationFrame(() => {
                    const filteredImage = this.filter({
                        video: this.video,
                        width,
                        height,
                        contrast,
                        brightness,
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
    filter({ video, width, height, contrast, brightness, }) {
        if (!this.canvasHelper) {
            this.canvasHelper = document.createElement("canvas");
            this.canvasHelper.width = width;
            this.canvasHelper.height = height;
        }
        const contextHelper = this.canvasHelper.getContext("2d");
        if (contextHelper) {
            contextHelper.drawImage(video, 0, 0, width, height);
            const idata = contextHelper.getImageData(0, 0, width, height);
            const data = idata.data;
            this.applyBrightness(data, brightness);
            this.applyContrast(data, contrast);
            return idata;
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
/* harmony import */ var _audioAnalyse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audioAnalyse */ "./src/components/videocontrol/audioAnalyse.ts");
/* harmony import */ var _canvasVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvasVideo */ "./src/components/videocontrol/canvasVideo.ts");


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
        if (videoElement) {
            videoElement.setAttribute("id", `${id}-video`);
        }
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
        this.canvasVideo = new _canvasVideo__WEBPACK_IMPORTED_MODULE_1__["default"]({
            video: this.video,
            videoPlayer: this.player
        });
        this.initPromise = null;
        this.init();
        this.initEvents();
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
        if (this.settings.isFullscreen) {
            return false;
        }
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
        if (!this.settings.isFullscreen) {
            return false;
        }
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
    addEventListener(event, callback) {
        this.player.addEventListener(event, callback);
    }
    setContainerBounds() {
        if (!this.settings.containerBounds) {
            this.settings.containerBounds = this.containerElement.getBoundingClientRect();
        }
        return this.settings.containerBounds;
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
        this.brightnessRange.addEventListener("change", (e) => {
            this.changeBrightness(e.target.value);
        });
        this.contrastRange.addEventListener("change", (e) => {
            this.changeContrast(e.target.value);
        });
        this.analyser = new _audioAnalyse__WEBPACK_IMPORTED_MODULE_0__["default"]({
            video: this.video,
            noiseLevelRange: this.noiseLevelRange
        });
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
    constructor({ broadcasts, elementShowAll, element, }) {
        this.broadcasts = broadcasts;
        this.element = element;
        this.elementShowAll = elementShowAll;
        this.state = {
            fullscreenId: Infinity,
        };
        this.initPlayers();
        this.initEvents();
    }
    closeFullPlayer() {
        // play all players
        this.broadcasts.forEach((broadcast) => broadcast.player.play());
        this.broadcasts[this.state.fullscreenId].player.closeFullscreen();
        this.state.fullscreenId = null;
    }
    openFullPlayer(id) {
        // stop all players except a fullscreen
        this.broadcasts
            .filter((broadcast) => broadcast.id !== id)
            .forEach((broadcast) => broadcast.player.stop());
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
                url: broadcast.url,
            });
            VideoPlayer.init()
                .then(() => {
                VideoPlayer.play();
                // Init events
                VideoPlayer.addEventListener("click", (e) => {
                    this.openFullPlayer(index);
                });
                VideoPlayer.addEventListener("touchend", (e) => {
                    this.openFullPlayer(index);
                });
                // Save player to broadcasts array
                this.broadcasts[index].id = index;
                this.broadcasts[index].player = VideoPlayer;
            })
                .catch((err) => console.warn(err));
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
    render() {
        this.setCover();
        this.setInnerText(".player-now__title", `${this.data.artist} ${this.data.track.name}`);
        this.setInnerText(".player-progress__time", this.data.track.length);
        this.setInnerText(".player-volume__percentage", `${this.data.volume}%`);
        return this.widget;
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
    render() {
        this.setInnerText(".button_type-yellow", this.data.buttons[0]);
        this.setInnerText(".button_type-grey", this.data.buttons[1]);
        return this.widget;
    }
    setInnerText(selector, text) {
        const block = this.widget.querySelector(selector);
        if (block) {
            block.innerText = text;
        }
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
    render() {
        this.setInnerText(".widget-sensor_type-temp .widget-sensor__value", `${this.data.temperature}C`);
        this.setInnerText(".widget-sensor_type-humidity .widget-sensor__value", `${this.data.humidity}%`);
        return this.widget;
    }
    setInnerText(selector, text) {
        const block = this.widget.querySelector(selector);
        if (block) {
            block.innerText = text;
        }
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
/* harmony import */ var _camera_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera.widget */ "./src/components/widget/camera.widget.ts");
/* harmony import */ var _player_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.widget */ "./src/components/widget/player.widget.ts");
/* harmony import */ var _questions_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./questions.widget */ "./src/components/widget/questions.widget.ts");
/* harmony import */ var _stats_widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stats.widget */ "./src/components/widget/stats.widget.ts");
/* harmony import */ var _themal_widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./themal.widget */ "./src/components/widget/themal.widget.ts");





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
    render() {
        this.widget.classList.add(`widget_size-${this.event.size}`);
        this.widget.classList.add(`widget_type-${this.event.type}`);
        this.setHeaderData();
        this.setDescription();
        this.renderDataTemplate();
        this.container.appendChild(this.widget);
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
        const { data = { type: "empty" }, icon } = this.event;
        if (icon === "cam") {
            return WIDGET_TYPES.CAMERA;
        }
        if (data.temperature) {
            return WIDGET_TYPES.THERMAL;
        }
        if (data.albumcover) {
            return WIDGET_TYPES.PLAYER;
        }
        if (data.buttons) {
            return WIDGET_TYPES.QUESTIONS;
        }
        if (data.type === "graph") {
            return WIDGET_TYPES.STATS;
        }
        return WIDGET_TYPES.DEFAULT;
    }
    renderDataTemplate() {
        const templateDataType = this.getDataTemplateType();
        let dataContentBlock = null;
        switch (templateDataType) {
            case WIDGET_TYPES.STATS:
                const statsWidget = new _stats_widget__WEBPACK_IMPORTED_MODULE_3__["default"]();
                dataContentBlock = statsWidget.render();
                break;
            case WIDGET_TYPES.CAMERA:
                const cameraWidget = new _camera_widget__WEBPACK_IMPORTED_MODULE_0__["default"]();
                dataContentBlock = cameraWidget.render();
                break;
            case WIDGET_TYPES.PLAYER:
                /**
                 * TODO: Не понимаю, как здесь можно обойтись без assignment
                 */
                const playerWidget = new _player_widget__WEBPACK_IMPORTED_MODULE_1__["default"]({
                    data: this.event.data
                });
                dataContentBlock = playerWidget.render();
                break;
            case WIDGET_TYPES.QUESTIONS:
                const questionsWidget = new _questions_widget__WEBPACK_IMPORTED_MODULE_2__["default"]({
                    data: this.event.data
                });
                dataContentBlock = questionsWidget.render();
                break;
            case WIDGET_TYPES.THERMAL:
                const thermalWidget = new _themal_widget__WEBPACK_IMPORTED_MODULE_4__["default"]({
                    data: this.event.data
                });
                dataContentBlock = thermalWidget.render();
                break;
        }
        if (dataContentBlock) {
            const widgetContent = this.widget.querySelector(".widget-content");
            if (widgetContent) {
                widgetContent.appendChild(dataContentBlock);
            }
        }
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
        events.forEach((event) => {
            new _components_widget_widget__WEBPACK_IMPORTED_MODULE_0__["default"]({
                event,
                container: dashboardWidgetsList,
            });
        });
    }
    loadEvents() {
        return fetch("http://localhost:8000/api/events", {
            method: "POST",
            body: JSON.stringify({
                type: "critical:info",
                offset: 0,
                limit: 20,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => result)
            .catch((err) => console.error(err));
    }
    init() {
        this.loadEvents().then((events) => {
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
            selector: "#header-menu",
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
                id: undefined,
            },
            {
                url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8",
                player: null,
                id: undefined,
            },
            {
                url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8",
                player: null,
                id: undefined,
            },
            {
                url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8",
                player: null,
                id: undefined,
            },
        ];
        this.init();
    }
    init() {
        const VideocontrolWidget = new _components_videocontrol_videocontrol__WEBPACK_IMPORTED_MODULE_0__["default"]({
            broadcasts: this.broadcasts,
            element: document.getElementById("vc-list"),
            elementShowAll: document.getElementById("vc-showall"),
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (VideoControlPage);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvYXVkaW9BbmFseXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvY29udHJvbC9jYW52YXNWaWRlby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvcGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvY29udHJvbC92aWRlb2NvbnRyb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L2NhbWVyYS53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3BsYXllci53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3F1ZXN0aW9ucy53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3N0YXRzLndpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy93aWRnZXQvdGhlbWFsLndpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy93aWRnZXQvd2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9pbmRleC5wYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvdmlkZW9jb250cm9sLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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dHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2VzL2luZGV4LnRzXCIpO1xuIiwiY29uc3QgZG9tVXRpbHMgPSB7XG4gIGRvZXNOb2RlQ29udGFpbkNsaWNrOiAobm9kZTogSFRNTEVsZW1lbnQsIGU6IEV2ZW50KTogYm9vbGVhbiA9PiB7XG4gICAgaWYgKCFub2RlIHx8ICFlKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiBub2RlLmNvbnRhaW5zKGUudGFyZ2V0KTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmlnYXRpb24ge1xuICBwdWJsaWMgbWVudU9wZW5lZDogYm9vbGVhbjtcbiAgcHVibGljIGhlYWRlck1lbnU6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcHVibGljIGhlYWRlckJ1cmdlck1lbnU6IEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih7IHNlbGVjdG9yIH06IHsgc2VsZWN0b3I6IHN0cmluZyB9KSB7XG4gICAgdGhpcy5tZW51T3BlbmVkID0gZmFsc2U7XG4gICAgdGhpcy5oZWFkZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgdGhpcy5oZWFkZXJCdXJnZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFkZXItYnVyZ2VyXCIpO1xuXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUoKSkge1xuICAgICAgdGhpcy5pbml0TmF2aWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvcGVuTmF2aWdhdGlvbigpIHtcbiAgICBpZiAodGhpcy5oZWFkZXJNZW51KSB7XG4gICAgICB0aGlzLmhlYWRlck1lbnUuY2xhc3NMaXN0LmFkZChcImhlYWRlci1tZW51LWxpc3Rfc3RhdGUtbW9iaWxlLW9wZW5lZFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnVPcGVuZWQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNsb3NlTmF2aWdhdGlvbigpIHtcbiAgICBpZiAodGhpcy5oZWFkZXJNZW51KSB7XG4gICAgICB0aGlzLmhlYWRlck1lbnUuY2xhc3NMaXN0LnJlbW92ZShcImhlYWRlci1tZW51LWxpc3Rfc3RhdGUtbW9iaWxlLW9wZW5lZFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnVPcGVuZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNNb2JpbGUoKSB7XG4gICAgY29uc3QgbWF4TW9iaWxlV2lkdGggPSA3Njg7XG5cbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPCBtYXhNb2JpbGVXaWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdE5hdmlnYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJNZW51LmNsYXNzTGlzdC5hZGQoXCJoZWFkZXItbWVudS1saXN0X3N0YXRlLW1vYmlsZVwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWFkZXJCdXJnZXJNZW51KSB7XG4gICAgICB0aGlzLmhlYWRlckJ1cmdlck1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLm1lbnVPcGVuZWQpIHtcbiAgICAgICAgICB0aGlzLm9wZW5OYXZpZ2F0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbG9zZU5hdmlnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCIvLyBAdHMtaWdub3JlXG5jb25zdCBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG5cbmNvbnN0IGNvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG5cbmNsYXNzIEFuYWx5c2Uge1xuICBwdWJsaWMgc3RhcnRTaG93OiBib29sZWFuO1xuICBwdWJsaWMgYnVmZmVyTGVuZ3RoOiBudW1iZXI7XG4gIHB1YmxpYyBiYW5kczogVWludDhBcnJheTtcblxuICBwdWJsaWMgbm9kZTogYW55O1xuICBwdWJsaWMgbm9pc2VMZXZlbFJhbmdlOiBIVE1MSW5wdXRFbGVtZW50O1xuICBwdWJsaWMgYW5hbHlzZXI6IGFueTtcbiAgcHVibGljIHNvdXJjZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICB2aWRlbyxcbiAgICBub2lzZUxldmVsUmFuZ2UsXG4gIH06IHtcbiAgICB2aWRlbzogSFRNTFZpZGVvRWxlbWVudDtcbiAgICBub2lzZUxldmVsUmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIH0pIHtcbiAgICB0aGlzLm5vZGUgPSBjb250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcigyMDQ4LCAxLCAxKTtcbiAgICB0aGlzLm5vaXNlTGV2ZWxSYW5nZSA9IG5vaXNlTGV2ZWxSYW5nZTtcblxuICAgIHRoaXMuYW5hbHlzZXIgPSBjb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XG5cbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IHRoaXMuYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQ7XG4gICAgdGhpcy5iYW5kcyA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcblxuICAgIHRoaXMuc3RhcnRTaG93ID0gZmFsc2U7XG5cbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc291cmNlKSB7XG4gICAgICAgIHRoaXMuc291cmNlID0gY29udGV4dC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UodmlkZW8pO1xuXG4gICAgICAgIHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5hbmFseXNlcik7XG4gICAgICAgIHRoaXMuYW5hbHlzZXIuY29ubmVjdCh0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5zb3VyY2UuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKTtcblxuICAgICAgICB0aGlzLm5vZGUub25hdWRpb3Byb2Nlc3MgPSAoZTogRXZlbnRUYXJnZXQpID0+IHtcbiAgICAgICAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMuYmFuZHMpOyAvLyBjb3B5IGN1cnJlbnQgZGF0YSB0byB0aGlzLmJhbmRzXG5cbiAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRTaG93KSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTaG93ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2hvdygpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5ub2lzZUxldmVsUmFuZ2UudmFsdWUgPSB0aGlzLmdldEF2ZXJhZ2VWb2x1bWUodGhpcy5iYW5kcykudG9TdHJpbmcoKTtcblxuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldEF2ZXJhZ2VWb2x1bWUoYXJyYXk6IFVpbnQ4QXJyYXkpOiBudW1iZXIge1xuICAgIGxldCB2YWx1ZXMgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWVzICs9IGFycmF5W2ldO1xuICAgIH1cblxuICAgIGNvbnN0IGF2ZXJhZ2UgPSB2YWx1ZXMgLyBhcnJheS5sZW5ndGg7XG5cbiAgICAvLyBjYWxjdWxhdGUgaW4gMTAwJSBzY2FsZSwgMSUgaXMgMi41NlxuICAgIHJldHVybiBhdmVyYWdlID09PSAwID8gMCA6IGF2ZXJhZ2UgLyAyLjU2O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFuYWx5c2U7XG4iLCJjbGFzcyBDYW52YXNWaWRlbyB7XG4gIHB1YmxpYyB2aWRlbzogSFRNTFZpZGVvRWxlbWVudDtcbiAgcHVibGljIHZpZGVvUGxheWVyOiBIVE1MRWxlbWVudDtcbiAgcHVibGljIHN0b3BWaWRlbzogYm9vbGVhbjtcblxuICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw7XG4gIHB1YmxpYyBjYW52YXNIZWxwZXI6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih7IHZpZGVvLCB2aWRlb1BsYXllciB9OiB7IHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50OyB2aWRlb1BsYXllcjogSFRNTEVsZW1lbnQgfSkge1xuICAgIHRoaXMudmlkZW8gPSB2aWRlbztcbiAgICB0aGlzLnZpZGVvUGxheWVyID0gdmlkZW9QbGF5ZXI7XG4gICAgdGhpcy5zdG9wVmlkZW8gPSBmYWxzZTtcblxuICAgIHRoaXMuY2FudmFzID0gbnVsbDtcbiAgICB0aGlzLmNhbnZhc0hlbHBlciA9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgcGxheSh7XG4gICAgY2FudmFzSW5pdGVkLFxuICAgIGJyaWdodG5lc3MsXG4gICAgY29udHJhc3QsXG4gICAgc2l6ZTogeyB3aWR0aCwgaGVpZ2h0IH0sXG4gIH06IHtcbiAgICBjYW52YXNJbml0ZWQ6IGJvb2xlYW47XG4gICAgYnJpZ2h0bmVzczogc3RyaW5nO1xuICAgIGNvbnRyYXN0OiBzdHJpbmc7XG4gICAgc2l6ZTogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9O1xuICB9KSB7XG4gICAgaWYgKCFjYW52YXNJbml0ZWQpIHtcbiAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgICAgdGhpcy5jYW52YXMuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1gO1xuICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fWA7XG5cbiAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgIHRoaXMudmlkZW9QbGF5ZXIuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BWaWRlbyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2FudmFzKSB7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICBpZiAoIWNvbnRleHQpIHsgcmV0dXJuOyB9XG5cbiAgICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsdGVyZWRJbWFnZSA9IHRoaXMuZmlsdGVyKHtcbiAgICAgICAgICAgIHZpZGVvOiB0aGlzLnZpZGVvLFxuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICBjb250cmFzdCxcbiAgICAgICAgICAgIGJyaWdodG5lc3MsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb250ZXh0LnB1dEltYWdlRGF0YShmaWx0ZXJlZEltYWdlLCAwLCAwKTtcblxuICAgICAgICAgIGlmICh0aGlzLnN0b3BWaWRlbyB8fCB0aGlzLnZpZGVvLnBhdXNlZCB8fCB0aGlzLnZpZGVvLmVuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BWaWRlbyA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRyYXcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgZHJhdygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlCcmlnaHRuZXNzKGRhdGE6IFVpbnQ4Q2xhbXBlZEFycmF5LCBicmlnaHRuZXNzOiBzdHJpbmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIGRhdGFbaV0gKz0gMjU1ICogKCticmlnaHRuZXNzIC8gMTAwKTtcbiAgICAgIGRhdGFbaSArIDFdICs9IDI1NSAqICgrYnJpZ2h0bmVzcyAvIDEwMCk7XG4gICAgICBkYXRhW2kgKyAyXSArPSAyNTUgKiAoK2JyaWdodG5lc3MgLyAxMDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb250cmFzdChkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgY29udHJhc3Q6IHN0cmluZykge1xuICAgIGNvbnN0IGZhY3RvciA9ICgyNTkuMCAqICgrY29udHJhc3QgKyAyNTUuMCkpIC8gKDI1NS4wICogKDI1OS4wIC0gK2NvbnRyYXN0KSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIGRhdGFbaV0gPSB0aGlzLnRydW5jYXRlQ29sb3IoZmFjdG9yICogKGRhdGFbaV0gLSAxMjguMCkgKyAxMjguMCk7XG4gICAgICBkYXRhW2kgKyAxXSA9IHRoaXMudHJ1bmNhdGVDb2xvcihmYWN0b3IgKiAoZGF0YVtpICsgMV0gLSAxMjguMCkgKyAxMjguMCk7XG4gICAgICBkYXRhW2kgKyAyXSA9IHRoaXMudHJ1bmNhdGVDb2xvcihmYWN0b3IgKiAoZGF0YVtpICsgMl0gLSAxMjguMCkgKyAxMjguMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cnVuY2F0ZUNvbG9yKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgIHZhbHVlID0gMDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID4gMjU1KSB7XG4gICAgICB2YWx1ZSA9IDI1NTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGZpbHRlcih7XG4gICAgdmlkZW8sXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIGNvbnRyYXN0LFxuICAgIGJyaWdodG5lc3MsXG4gIH06IHtcbiAgICB2aWRlbzogSFRNTFZpZGVvRWxlbWVudDtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGNvbnRyYXN0OiBzdHJpbmc7XG4gICAgYnJpZ2h0bmVzczogc3RyaW5nO1xuICB9KSB7XG4gICAgaWYgKCF0aGlzLmNhbnZhc0hlbHBlcikge1xuICAgICAgdGhpcy5jYW52YXNIZWxwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXG4gICAgICB0aGlzLmNhbnZhc0hlbHBlci53aWR0aCA9IHdpZHRoO1xuICAgICAgdGhpcy5jYW52YXNIZWxwZXIuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRleHRIZWxwZXIgPSB0aGlzLmNhbnZhc0hlbHBlci5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBpZiAoY29udGV4dEhlbHBlcikge1xuICAgICAgY29udGV4dEhlbHBlci5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICBjb25zdCBpZGF0YSA9IGNvbnRleHRIZWxwZXIuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICBjb25zdCBkYXRhID0gaWRhdGEuZGF0YTtcblxuICAgICAgdGhpcy5hcHBseUJyaWdodG5lc3MoZGF0YSwgYnJpZ2h0bmVzcyk7XG4gICAgICB0aGlzLmFwcGx5Q29udHJhc3QoZGF0YSwgY29udHJhc3QpO1xuXG4gICAgICByZXR1cm4gaWRhdGE7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbnZhc1ZpZGVvO1xuIiwiaW1wb3J0IEFuYWx5c2UgZnJvbSBcIi4vYXVkaW9BbmFseXNlXCI7XG5pbXBvcnQgQ2FudmFzVmlkZW8gZnJvbSBcIi4vY2FudmFzVmlkZW9cIjtcblxuLyoqXG4gKiBQbGF5ZXJUZW1wbGF0ZSAtIGdlbmVyYXRlIHZpZGVvLXBsYXllciBmcm9tIDx0ZW1wbGF0ZT4gdGFnXG4gKi9cbmV4cG9ydCBjbGFzcyBQbGF5ZXJUZW1wbGF0ZSB7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wbGF0ZS1wbGF5ZXJcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoaWQ6IHN0cmluZyk6IE5vZGUge1xuICAgIGNvbnN0IGVsZW1lbnQ6IE5vZGUgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnZpZGVvY29udHJvbC1saXN0X19pdGVtXCIpXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgLy8gcGxheWVyLXtpZH1cbiAgICBjb25zdCBwbGF5ZXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSAoZWxlbWVudCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKFwiLnZjLXBsYXllclwiKTtcblxuICAgIHBsYXllckVsZW1lbnQgJiYgcGxheWVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpZCk7XG5cbiAgICAvLyBwbGF5ZXIte2lkfS12aWRlb1xuICAgIGNvbnN0IHZpZGVvRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gKGVsZW1lbnQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpO1xuXG4gICAgaWYgKHZpZGVvRWxlbWVudCkge1xuICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2lkfS12aWRlb2ApO1xuICAgIH1cblxuICAgIC8vIHBsYXllci17aWR9LXdlYmdsLXZpZGVvXG4gICAgY29uc3QgaW5wdXRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSAoZWxlbWVudCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgaW5wdXRFbGVtZW50ICYmIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpZH0td2ViZ2wtdmlkZW9gKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59XG5cbi8qKlxuICogUGxheWVyIGlzIGEgd3JhcHBlciBhcm91bmQgaHRtbDUgdmlkZW8gZWxlbWVudCBhbmQgSExTIHN0YW5kYXJ0LFxuICogaXQgaGFzIHNwZWNpYWwgYmVoYXZpb3IgZm9yIG91ciBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gIHB1YmxpYyBzZXR0aW5nczoge1xuICAgIHVybDogc3RyaW5nO1xuICAgIGNhbnZhc0luaXRlZDogYm9vbGVhbjtcbiAgICBjb250YWluZXJCb3VuZHM6IHtcbiAgICAgIGxlZnQ6IG51bWJlcjtcbiAgICAgIHRvcDogbnVtYmVyO1xuICAgICAgd2lkdGg6IG51bWJlcjtcbiAgICAgIGhlaWdodDogbnVtYmVyO1xuICAgIH07XG4gICAgaXNGdWxsc2NyZWVuOiBib29sZWFuO1xuICB9O1xuXG4gIHB1YmxpYyB2aWRlb1NldHRpbmdzOiB7XG4gICAgYnJpZ2h0bmVzczogc3RyaW5nO1xuICAgIGNvbnRyYXN0OiBzdHJpbmc7XG4gICAgaXNGdWxsc2NyZWVuOiBib29sZWFuO1xuICB9O1xuXG4gIHB1YmxpYyBjb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHVibGljIHBsYXllcjogSFRNTEVsZW1lbnQgfCBudWxsO1xuICBwdWJsaWMgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsO1xuICBwdWJsaWMgYnJpZ2h0bmVzc1JhbmdlOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbiAgcHVibGljIG5vaXNlTGV2ZWxSYW5nZTogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG4gIHB1YmxpYyBjb250cmFzdFJhbmdlOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcblxuICBwdWJsaWMgY2FudmFzVmlkZW86IENhbnZhc1ZpZGVvO1xuXG4gIHB1YmxpYyBpbml0UHJvbWlzZTogUHJvbWlzZTxIVE1MVmlkZW9FbGVtZW50PjtcbiAgcHVibGljIGFuYWx5c2VyOiBhbnk7XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHVybCxcbiAgICBjb250YWluZXJFbGVtZW50LFxuICAgIHBsYXllckVsZW1lbnRcbiAgfToge1xuICAgIHVybDogc3RyaW5nO1xuICAgIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHBsYXllckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB9KSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIHVybCxcbiAgICAgIGNhbnZhc0luaXRlZDogZmFsc2UsXG4gICAgICBjb250YWluZXJCb3VuZHM6IHtcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiAwXG4gICAgICB9LFxuICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLnZpZGVvU2V0dGluZ3MgPSB7XG4gICAgICBicmlnaHRuZXNzOiBcIjBcIixcbiAgICAgIGNvbnRyYXN0OiBcIjBcIixcbiAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyRWxlbWVudDtcbiAgICB0aGlzLnBsYXllciA9IHBsYXllckVsZW1lbnQ7XG4gICAgdGhpcy52aWRlbyA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpO1xuICAgIHRoaXMuYnJpZ2h0bmVzc1JhbmdlID0gcGxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnZjLXBsYXllcl9fYnJpZ2h0bmVzc1wiKTtcbiAgICB0aGlzLm5vaXNlTGV2ZWxSYW5nZSA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJfX25vaXNlLWxldmVsXCIpO1xuICAgIHRoaXMuY29udHJhc3RSYW5nZSA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJfX2NvbnRyYXN0XCIpO1xuXG4gICAgdGhpcy5jYW52YXNWaWRlbyA9IG5ldyBDYW52YXNWaWRlbyh7XG4gICAgICB2aWRlbzogdGhpcy52aWRlbyxcbiAgICAgIHZpZGVvUGxheWVyOiB0aGlzLnBsYXllclxuICAgIH0pO1xuXG4gICAgdGhpcy5pbml0UHJvbWlzZSA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0KCkge1xuICAgIGlmICh0aGlzLmluaXRQcm9taXNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0UHJvbWlzZTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5IbHMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICBjb25zdCBobHMgPSBuZXcgd2luZG93LkhscygpO1xuXG4gICAgICAgIGhscy5sb2FkU291cmNlKHRoaXMuc2V0dGluZ3MudXJsKTtcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKHRoaXMudmlkZW8pO1xuXG4gICAgICAgIGhscy5vbih3aW5kb3cuSGxzLkV2ZW50cy5NQU5JRkVTVF9QQVJTRUQsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMudmlkZW8pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52aWRlby5jYW5QbGF5VHlwZShcImFwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsXCIpKSB7XG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gdGhpcy5zZXR0aW5ncy51cmw7XG5cbiAgICAgICAgdGhpcy52aWRlby5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIiwgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodGhpcy52aWRlbyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBsYXkoKSB7XG4gICAgdGhpcy52aWRlby5wbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpIHtcbiAgICB0aGlzLnZpZGVvLnBhdXNlKCk7XG4gIH1cblxuICBwdWJsaWMgb3BlbkZ1bGxzY3JlZW4oKSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuaXNGdWxsc2NyZWVuKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRDb250YWluZXJCb3VuZHMoKTtcblxuICAgIGNvbnN0IHsgY29udGFpbmVyQm91bmRzIH0gPSB0aGlzLnNldHRpbmdzO1xuXG4gICAgdGhpcy52aWRlby5tdXRlZCA9IGZhbHNlO1xuXG4gICAgY29uc3QgcGxheWVyQm91bmRzID0gdGhpcy5wbGF5ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgXG4gICAgICAgIHRyYW5zbGF0ZVgoMHB4KVxuICAgICAgICB0cmFuc2xhdGVZKDBweClcbiAgICBgO1xuXG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUud2lkdGggPSBwbGF5ZXJCb3VuZHMud2lkdGggKyBcInB4XCI7XG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUuaGVpZ2h0ID0gcGxheWVyQm91bmRzLmhlaWdodCArIFwicHhcIjtcbiAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcIlwiO1xuICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IFwiXCI7XG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUuekluZGV4ID0gXCIyXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IFwidHJhbnNmb3JtLCB3aWR0aCwgaGVpZ2h0XCI7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBcIjAuM3NcIjtcblxuICAgICAgLy8gbW92ZSBlbGVtZW50IHRvIHRvcC9sZWZ0IGJvdW5kZXIgb2YgdGhlIGxpc3QtY29udGFpbmVyXG4gICAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgXG4gICAgICAgIHRyYW5zbGF0ZVgoLSR7cGxheWVyQm91bmRzLmxlZnQgLSBjb250YWluZXJCb3VuZHMubGVmdH1weClcbiAgICAgICAgdHJhbnNsYXRlWSgtJHtwbGF5ZXJCb3VuZHMudG9wIC0gY29udGFpbmVyQm91bmRzLnRvcH1weClcbiAgICAgIGA7XG5cbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLndpZHRoID0gY29udGFpbmVyQm91bmRzLndpZHRoICsgXCJweFwiO1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUuaGVpZ2h0ID0gY29udGFpbmVyQm91bmRzLmhlaWdodCArIFwicHhcIjtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dGluZ3MuaXNGdWxsc2NyZWVuID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZUZ1bGxzY3JlZW4oKSB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmlzRnVsbHNjcmVlbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMudmlkZW8ubXV0ZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUuekluZGV4ID0gXCIxXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblxuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gYFxuICAgICAgICAgIHRyYW5zbGF0ZVgoMHB4KVxuICAgICAgICAgIHRyYW5zbGF0ZVkoMHB4KVxuICAgICAgYDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dGluZ3MuaXNGdWxsc2NyZWVuID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBjYWxsYmFjazogKGU6IEV2ZW50KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5wbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb250YWluZXJCb3VuZHMoKSB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcykge1xuICAgICAgdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHMgPSB0aGlzLmNvbnRhaW5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuY29udGFpbmVyQm91bmRzO1xuICB9XG5cbiAgcHJpdmF0ZSBwbGF5VmlkZW9PbkNhbnZhcygpIHtcbiAgICB0aGlzLnNldENvbnRhaW5lckJvdW5kcygpO1xuXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmNhbnZhc0luaXRlZCkge1xuICAgICAgdGhpcy52aWRlby5jbGFzc0xpc3QuYWRkKFwidmMtcGxheWVyX192aWRlb19zdGF0ZS1oaWRkZW5cIik7XG4gICAgfVxuXG4gICAgdGhpcy5jYW52YXNWaWRlby5wbGF5KHtcbiAgICAgIGNhbnZhc0luaXRlZDogdGhpcy5zZXR0aW5ncy5jYW52YXNJbml0ZWQsXG4gICAgICBzaXplOiB7XG4gICAgICAgIHdpZHRoOiB0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcy5oZWlnaHRcbiAgICAgIH0sXG4gICAgICBicmlnaHRuZXNzOiB0aGlzLnZpZGVvU2V0dGluZ3MuYnJpZ2h0bmVzcyxcbiAgICAgIGNvbnRyYXN0OiB0aGlzLnZpZGVvU2V0dGluZ3MuY29udHJhc3RcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dGluZ3MuY2FudmFzSW5pdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlQnJpZ2h0bmVzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52aWRlb1NldHRpbmdzLmJyaWdodG5lc3MgPSB2YWx1ZTtcblxuICAgIHRoaXMucGxheVZpZGVvT25DYW52YXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlQ29udHJhc3QodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmlkZW9TZXR0aW5ncy5jb250cmFzdCA9IHZhbHVlO1xuXG4gICAgdGhpcy5wbGF5VmlkZW9PbkNhbnZhcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RXZlbnRzKCkge1xuICAgIHRoaXMuYnJpZ2h0bmVzc1JhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQnJpZ2h0bmVzcygoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jb250cmFzdFJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQ29udHJhc3QoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYW5hbHlzZXIgPSBuZXcgQW5hbHlzZSh7XG4gICAgICB2aWRlbzogdGhpcy52aWRlbyxcbiAgICAgIG5vaXNlTGV2ZWxSYW5nZTogdGhpcy5ub2lzZUxldmVsUmFuZ2VcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQnJvYWRjYXN0IH0gZnJvbSBcIi4uLy4uL3R5cGVzL2luZGV4XCI7XG5pbXBvcnQgeyBQbGF5ZXIsIFBsYXllclRlbXBsYXRlIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5cbi8qKlxuICogVmlkZW9jb250cm9sIHJlcHJlc2VudHMgY29udHJvbGxlciBvdmVyIG91ciBmZWF0dXJlLFxuICogaXQgaW5pdGlhbGl6ZXMgYnJvYWRjYXN0cyBhbmQgaW50ZXJhY3Qgd2l0aCB1c2VyJ3MgYWN0aW9uc1xuICovXG5jbGFzcyBWaWRlb2NvbnRyb2wge1xuICBwdWJsaWMgYnJvYWRjYXN0czogQnJvYWRjYXN0W107XG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHVibGljIGVsZW1lbnRTaG93QWxsOiBIVE1MRWxlbWVudDtcblxuICBwdWJsaWMgc3RhdGU6IHtcbiAgICBmdWxsc2NyZWVuSWQ6IG51bWJlcjtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgYnJvYWRjYXN0cyxcbiAgICBlbGVtZW50U2hvd0FsbCxcbiAgICBlbGVtZW50LFxuICB9OiB7XG4gICAgYnJvYWRjYXN0czogQnJvYWRjYXN0W107XG4gICAgZWxlbWVudFNob3dBbGw6IEhUTUxFbGVtZW50O1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB9KSB7XG4gICAgdGhpcy5icm9hZGNhc3RzID0gYnJvYWRjYXN0cztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuZWxlbWVudFNob3dBbGwgPSBlbGVtZW50U2hvd0FsbDtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmdWxsc2NyZWVuSWQ6IEluZmluaXR5LFxuICAgIH07XG5cbiAgICB0aGlzLmluaXRQbGF5ZXJzKCk7XG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlRnVsbFBsYXllcigpIHtcbiAgICAvLyBwbGF5IGFsbCBwbGF5ZXJzXG4gICAgdGhpcy5icm9hZGNhc3RzLmZvckVhY2goKGJyb2FkY2FzdCkgPT4gYnJvYWRjYXN0LnBsYXllci5wbGF5KCkpO1xuXG4gICAgdGhpcy5icm9hZGNhc3RzW3RoaXMuc3RhdGUuZnVsbHNjcmVlbklkXS5wbGF5ZXIuY2xvc2VGdWxsc2NyZWVuKCk7XG5cbiAgICB0aGlzLnN0YXRlLmZ1bGxzY3JlZW5JZCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIG9wZW5GdWxsUGxheWVyKGlkOiBudW1iZXIpIHtcbiAgICAvLyBzdG9wIGFsbCBwbGF5ZXJzIGV4Y2VwdCBhIGZ1bGxzY3JlZW5cbiAgICB0aGlzLmJyb2FkY2FzdHNcbiAgICAgIC5maWx0ZXIoKGJyb2FkY2FzdCkgPT4gYnJvYWRjYXN0LmlkICE9PSBpZClcbiAgICAgIC5mb3JFYWNoKChicm9hZGNhc3QpID0+IGJyb2FkY2FzdC5wbGF5ZXIuc3RvcCgpKTtcblxuICAgIC8vIG9wZW4gcGxheWVyIGluIGZ1bGxzY3JlZW5cbiAgICB0aGlzLmJyb2FkY2FzdHNbaWRdLnBsYXllci5vcGVuRnVsbHNjcmVlbigpO1xuXG4gICAgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuSWQgPSBpZDtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEV2ZW50cygpIHtcbiAgICB0aGlzLmVsZW1lbnRTaG93QWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlRnVsbFBsYXllcigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50U2hvd0FsbC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZUZ1bGxQbGF5ZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFBsYXllcnMoKSB7XG4gICAgdGhpcy5icm9hZGNhc3RzLmZvckVhY2goKGJyb2FkY2FzdCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IFZpZGVvVGVtcGxhdGU6IFBsYXllclRlbXBsYXRlID0gbmV3IFBsYXllclRlbXBsYXRlKCk7XG4gICAgICBjb25zdCBsaXN0VmlkZW9FbGVtZW50OiBOb2RlID0gVmlkZW9UZW1wbGF0ZS5yZW5kZXIoYHBsYXllci0ke2luZGV4ICsgMX1gKTtcblxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGxpc3RWaWRlb0VsZW1lbnQpO1xuXG4gICAgICBjb25zdCBWaWRlb1BsYXllciA9IG5ldyBQbGF5ZXIoe1xuICAgICAgICBjb250YWluZXJFbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIHBsYXllckVsZW1lbnQ6IChsaXN0VmlkZW9FbGVtZW50IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXCIudmMtcGxheWVyXCIpLFxuICAgICAgICB1cmw6IGJyb2FkY2FzdC51cmwsXG4gICAgICB9KTtcblxuICAgICAgVmlkZW9QbGF5ZXIuaW5pdCgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBWaWRlb1BsYXllci5wbGF5KCk7XG5cbiAgICAgICAgICAvLyBJbml0IGV2ZW50c1xuICAgICAgICAgIFZpZGVvUGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcGVuRnVsbFBsYXllcihpbmRleCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBWaWRlb1BsYXllci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZ1bGxQbGF5ZXIoaW5kZXgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gU2F2ZSBwbGF5ZXIgdG8gYnJvYWRjYXN0cyBhcnJheVxuICAgICAgICAgIHRoaXMuYnJvYWRjYXN0c1tpbmRleF0uaWQgPSBpbmRleDtcbiAgICAgICAgICB0aGlzLmJyb2FkY2FzdHNbaW5kZXhdLnBsYXllciA9IFZpZGVvUGxheWVyO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS53YXJuKGVycikpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZGVvY29udHJvbDtcbiIsImNsYXNzIENhbWVyYVdpZGdldCB7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtY2FtZXJhLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IE5vZGUge1xuICAgIHJldHVybiB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbWVyYVdpZGdldDtcbiIsImltcG9ydCB7IElXaWRnZXRQbGF5ZXJEYXRhIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2luZGV4XCI7XG5cbmNsYXNzIFBsYXllcldpZGdldCB7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgcHVibGljIGRhdGE6IElXaWRnZXRQbGF5ZXJEYXRhO1xuICBwdWJsaWMgd2lkZ2V0OiBOb2RlO1xuXG4gIGNvbnN0cnVjdG9yKHsgZGF0YSB9OiB7IGRhdGE6IElXaWRnZXRQbGF5ZXJEYXRhIH0pIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtcGxheWVyLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IE5vZGUge1xuICAgIHRoaXMuc2V0Q292ZXIoKTtcblxuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLnBsYXllci1ub3dfX3RpdGxlXCIsIGAke3RoaXMuZGF0YS5hcnRpc3R9ICR7dGhpcy5kYXRhLnRyYWNrLm5hbWV9YCk7XG5cbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5wbGF5ZXItcHJvZ3Jlc3NfX3RpbWVcIiwgdGhpcy5kYXRhLnRyYWNrLmxlbmd0aCk7XG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIucGxheWVyLXZvbHVtZV9fcGVyY2VudGFnZVwiLCBgJHt0aGlzLmRhdGEudm9sdW1lfSVgKTtcblxuICAgIHJldHVybiB0aGlzLndpZGdldDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJUZXh0KHNlbGVjdG9yOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IGJsb2NrOiBIVE1MRWxlbWVudCA9ICh0aGlzLndpZGdldCBhcyBIVE1MRWxlbWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoYmxvY2spIHtcbiAgICAgIGJsb2NrLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb3ZlcigpIHtcbiAgICBjb25zdCBibG9jayA9ICh0aGlzLndpZGdldCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ub3dfX2NvdmVyXCIpO1xuXG4gICAgYmxvY2suc2V0QXR0cmlidXRlKFwic3JjXCIsIHRoaXMuZGF0YS5hbGJ1bWNvdmVyKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXJXaWRnZXQ7XG4iLCJpbXBvcnQgeyBJV2lkZ2V0UXVlc3Rpb25zRGF0YSB9IGZyb20gXCIuLi8uLi90eXBlcy9pbmRleFwiO1xuXG5jbGFzcyBRdWVzdGlvbnNXaWRnZXQge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIHB1YmxpYyBkYXRhOiBJV2lkZ2V0UXVlc3Rpb25zRGF0YTtcbiAgcHVibGljIHdpZGdldDogTm9kZTtcblxuICBjb25zdHJ1Y3Rvcih7IGRhdGEgfTogeyBkYXRhOiBJV2lkZ2V0UXVlc3Rpb25zRGF0YSB9KSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXF1ZXN0aW9ucy10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBOb2RlIHtcbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5idXR0b25fdHlwZS15ZWxsb3dcIiwgdGhpcy5kYXRhLmJ1dHRvbnNbMF0pO1xuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLmJ1dHRvbl90eXBlLWdyZXlcIiwgdGhpcy5kYXRhLmJ1dHRvbnNbMV0pO1xuXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbm5lclRleHQoc2VsZWN0b3I6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3QgYmxvY2s6IEhUTUxFbGVtZW50ID0gKHRoaXMud2lkZ2V0IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYgKGJsb2NrKSB7XG4gICAgICBibG9jay5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBRdWVzdGlvbnNXaWRnZXQ7XG4iLCJjbGFzcyBTdGF0c1dpZGdldCB7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtc3RhdHMtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHNXaWRnZXQ7XG4iLCJpbXBvcnQgeyBJV2lkZ2V0VGhlbWFsRGF0YSB9IGZyb20gXCIuLi8uLi90eXBlcy9pbmRleFwiO1xuXG5jbGFzcyBUaGVtYWxXaWRnZXQge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIHB1YmxpYyBkYXRhOiBJV2lkZ2V0VGhlbWFsRGF0YTtcbiAgcHVibGljIHdpZGdldDogTm9kZTtcblxuICBjb25zdHJ1Y3Rvcih7IGRhdGEgfTogeyBkYXRhOiBJV2lkZ2V0VGhlbWFsRGF0YSB9KSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXRoZXJtYWwtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogTm9kZSB7XG4gICAgdGhpcy5zZXRJbm5lclRleHQoXG4gICAgICBcIi53aWRnZXQtc2Vuc29yX3R5cGUtdGVtcCAud2lkZ2V0LXNlbnNvcl9fdmFsdWVcIixcbiAgICAgIGAke3RoaXMuZGF0YS50ZW1wZXJhdHVyZX1DYCxcbiAgICApO1xuXG4gICAgdGhpcy5zZXRJbm5lclRleHQoXG4gICAgICBcIi53aWRnZXQtc2Vuc29yX3R5cGUtaHVtaWRpdHkgLndpZGdldC1zZW5zb3JfX3ZhbHVlXCIsXG4gICAgICBgJHt0aGlzLmRhdGEuaHVtaWRpdHl9JWAsXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLndpZGdldDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJUZXh0KHNlbGVjdG9yOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IGJsb2NrOiBIVE1MRWxlbWVudCA9ICh0aGlzLndpZGdldCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmIChibG9jaykge1xuICAgICAgYmxvY2suaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGhlbWFsV2lkZ2V0O1xuIiwiaW1wb3J0IENhbWVyYVdpZGdldCBmcm9tIFwiLi9jYW1lcmEud2lkZ2V0XCI7XG5pbXBvcnQgUGxheWVyV2lkZ2V0IGZyb20gXCIuL3BsYXllci53aWRnZXRcIjtcbmltcG9ydCBRdWVzdGlvbnNXaWRnZXQgZnJvbSBcIi4vcXVlc3Rpb25zLndpZGdldFwiO1xuaW1wb3J0IFN0YXRzV2lkZ2V0IGZyb20gXCIuL3N0YXRzLndpZGdldFwiO1xuaW1wb3J0IFRoZW1hbFdpZGdldCBmcm9tIFwiLi90aGVtYWwud2lkZ2V0XCI7XG5cbmltcG9ydCAqIGFzIFR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCBXSURHRVRfVFlQRVMgPSB7XG4gIFNUQVRTOiBcIlNUQVRTXCIsXG4gIENBTUVSQTogXCJDQU1FUkFcIixcbiAgVEhFUk1BTDogXCJUSEVSTUFMXCIsXG4gIFBMQVlFUjogXCJQTEFZRVJcIixcbiAgUVVFU1RJT05TOiBcIlFVRVNUSU9OU1wiLFxuICBERUZBVUxUOiBcIkRFRkFVTFRcIlxufTtcblxuY2xhc3MgV2lkZ2V0IHtcbiAgcHVibGljIGV2ZW50OiBUeXBlcy5FdmVudDtcbiAgcHVibGljIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgcHVibGljIHdpZGdldDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoeyBldmVudCwgY29udGFpbmVyIH06IHsgZXZlbnQ6IFR5cGVzLkV2ZW50OyBjb250YWluZXI6IEhUTUxFbGVtZW50IH0pIHtcbiAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi53aWRnZXRcIikuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgdGhpcy53aWRnZXQuY2xhc3NMaXN0LmFkZChgd2lkZ2V0X3NpemUtJHt0aGlzLmV2ZW50LnNpemV9YCk7XG4gICAgdGhpcy53aWRnZXQuY2xhc3NMaXN0LmFkZChgd2lkZ2V0X3R5cGUtJHt0aGlzLmV2ZW50LnR5cGV9YCk7XG5cbiAgICB0aGlzLnNldEhlYWRlckRhdGEoKTtcbiAgICB0aGlzLnNldERlc2NyaXB0aW9uKCk7XG4gICAgdGhpcy5yZW5kZXJEYXRhVGVtcGxhdGUoKTtcblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMud2lkZ2V0KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RGVzY3JpcHRpb24oKSB7XG4gICAgaWYgKHRoaXMuZXZlbnQuZGVzY3JpcHRpb24gJiYgdGhpcy53aWRnZXQpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRUZXh0ID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtY29udGVudF9fdGV4dFwiKTtcbiAgICAgIGNvbnN0IHRleHRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1jb250ZW50X190ZXh0XCIpO1xuXG4gICAgICBpZiAoY29udGVudFRleHQpIHtcbiAgICAgICAgY29udGVudFRleHQuY2xhc3NMaXN0LmFkZChgd2lkZ2V0LWNvbnRlbnRfX3RleHRfd2lkdGgtJHt0aGlzLmV2ZW50LnNpemV9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0ZXh0RWxlbWVudCkge1xuICAgICAgICB0ZXh0RWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmV2ZW50LmRlc2NyaXB0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0SGVhZGVyRGF0YSgpIHtcbiAgICBjb25zdCB0aXRsZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi53aWRnZXQtaGVhZGVyLWFib3V0X190aXRsZVwiXG4gICAgKTtcbiAgICBjb25zdCB0eXBlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtaGVhZGVyX190eXBlXCIpO1xuICAgIGNvbnN0IGRhdGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1oZWFkZXJfX2RhdGVcIik7XG4gICAgY29uc3QgaWNvblVzZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi53aWRnZXQtaGVhZGVyLWFib3V0X19pY29uID4gdXNlXCJcbiAgICApO1xuICAgIGNvbnN0IGljb25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1oZWFkZXItYWJvdXRfX2ljb25cIik7XG5cbiAgICBpZiAodGl0bGVFbGVtZW50KSB7XG4gICAgICB0aXRsZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5ldmVudC50aXRsZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZUVsZW1lbnQpIHtcbiAgICAgIHR5cGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQuc291cmNlO1xuICAgIH1cblxuICAgIGlmIChkYXRlRWxlbWVudCkge1xuICAgICAgZGF0ZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5ldmVudC50aW1lO1xuICAgIH1cblxuICAgIGlmIChpY29uVXNlRWxlbWVudCkge1xuICAgICAgaWNvblVzZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwieGxpbms6aHJlZlwiLCBgIyR7dGhpcy5ldmVudC5pY29ufWApO1xuICAgIH1cblxuICAgIGlmIChpY29uRWxlbWVudCkge1xuICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChgaWNvbl8ke3RoaXMuZXZlbnQuaWNvbn1gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldERhdGFUZW1wbGF0ZVR5cGUoKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IGRhdGEgPSB7IHR5cGU6IFwiZW1wdHlcIiB9LCBpY29uIH0gPSB0aGlzLmV2ZW50O1xuXG4gICAgaWYgKGljb24gPT09IFwiY2FtXCIpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuQ0FNRVJBO1xuICAgIH1cblxuICAgIGlmICgoZGF0YSBhcyBUeXBlcy5JV2lkZ2V0VGhlbWFsRGF0YSkudGVtcGVyYXR1cmUpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuVEhFUk1BTDtcbiAgICB9XG5cbiAgICBpZiAoKGRhdGEgYXMgVHlwZXMuSVdpZGdldFBsYXllckRhdGEpLmFsYnVtY292ZXIpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuUExBWUVSO1xuICAgIH1cblxuICAgIGlmICgoZGF0YSBhcyBUeXBlcy5JV2lkZ2V0UXVlc3Rpb25zRGF0YSkuYnV0dG9ucykge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5RVUVTVElPTlM7XG4gICAgfVxuXG4gICAgaWYgKChkYXRhIGFzIFR5cGVzLklXaWRnZXREZWZhdWx0RGF0YSkudHlwZSA9PT0gXCJncmFwaFwiKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLlNUQVRTO1xuICAgIH1cblxuICAgIHJldHVybiBXSURHRVRfVFlQRVMuREVGQVVMVDtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyRGF0YVRlbXBsYXRlKCkge1xuICAgIGNvbnN0IHRlbXBsYXRlRGF0YVR5cGUgPSB0aGlzLmdldERhdGFUZW1wbGF0ZVR5cGUoKTtcbiAgICBsZXQgZGF0YUNvbnRlbnRCbG9jayA9IG51bGw7XG5cbiAgICBzd2l0Y2ggKHRlbXBsYXRlRGF0YVR5cGUpIHtcbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlNUQVRTOlxuICAgICAgICBjb25zdCBzdGF0c1dpZGdldCA9IG5ldyBTdGF0c1dpZGdldCgpO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBzdGF0c1dpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuQ0FNRVJBOlxuICAgICAgICBjb25zdCBjYW1lcmFXaWRnZXQgPSBuZXcgQ2FtZXJhV2lkZ2V0KCk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IGNhbWVyYVdpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuUExBWUVSOlxuICAgICAgICAvKipcbiAgICAgICAgICogVE9ETzog0J3QtSDQv9C+0L3QuNC80LDRjiwg0LrQsNC6INC30LTQtdGB0Ywg0LzQvtC20L3QviDQvtCx0L7QudGC0LjRgdGMINCx0LXQtyBhc3NpZ25tZW50XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBwbGF5ZXJXaWRnZXQgPSBuZXcgUGxheWVyV2lkZ2V0KHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmV2ZW50LmRhdGEgYXMgVHlwZXMuSVdpZGdldFBsYXllckRhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IHBsYXllcldpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuUVVFU1RJT05TOlxuICAgICAgICBjb25zdCBxdWVzdGlvbnNXaWRnZXQgPSBuZXcgUXVlc3Rpb25zV2lkZ2V0KHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmV2ZW50LmRhdGEgYXMgVHlwZXMuSVdpZGdldFF1ZXN0aW9uc0RhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IHF1ZXN0aW9uc1dpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuVEhFUk1BTDpcbiAgICAgICAgY29uc3QgdGhlcm1hbFdpZGdldCA9IG5ldyBUaGVtYWxXaWRnZXQoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuZXZlbnQuZGF0YSBhcyBUeXBlcy5JV2lkZ2V0VGhlbWFsRGF0YVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gdGhlcm1hbFdpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoZGF0YUNvbnRlbnRCbG9jaykge1xuICAgICAgY29uc3Qgd2lkZ2V0Q29udGVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtY29udGVudFwiKTtcblxuICAgICAgaWYgKHdpZGdldENvbnRlbnQpIHtcbiAgICAgICAgd2lkZ2V0Q29udGVudC5hcHBlbmRDaGlsZChkYXRhQ29udGVudEJsb2NrKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2lkZ2V0O1xuIiwiaW1wb3J0IFdpZGdldCBmcm9tIFwiLi4vY29tcG9uZW50cy93aWRnZXQvd2lkZ2V0XCI7XG5cbmltcG9ydCAqIGFzIFR5cGVzIGZyb20gXCIuLi90eXBlc1wiO1xuXG5jbGFzcyBJbmRleFBhZ2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyRGFzaGJvYXJkV2lkZ2V0cyhldmVudHM6IFR5cGVzLkV2ZW50W10pIHtcbiAgICBjb25zdCBkYXNoYm9hcmRXaWRnZXRzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFzaGJvYXJkLWxpc3RcIik7XG5cbiAgICBldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgIG5ldyBXaWRnZXQoe1xuICAgICAgICBldmVudCxcbiAgICAgICAgY29udGFpbmVyOiBkYXNoYm9hcmRXaWRnZXRzTGlzdCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRXZlbnRzKCkge1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZXZlbnRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHR5cGU6IFwiY3JpdGljYWw6aW5mb1wiLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxpbWl0OiAyMCxcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH0sXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4gcmVzdWx0KVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgdGhpcy5sb2FkRXZlbnRzKCkudGhlbigoZXZlbnRzKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlckRhc2hib2FyZFdpZGdldHMoZXZlbnRzKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmRleFBhZ2U7XG4iLCJpbXBvcnQgSGVhZGVyTmF2aWdhdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyXCI7XG5cbmltcG9ydCBJbmRleFBhZ2UgZnJvbSBcIi4vaW5kZXgucGFnZVwiO1xuaW1wb3J0IFZpZGVvY29udHJvbFBhZ2UgZnJvbSBcIi4vdmlkZW9jb250cm9sLnBhZ2VcIjtcblxuY2xhc3MgSW5pdEFwcGxpY2F0aW9uIHtcbiAgcHVibGljIHBhZ2U6IGFueTtcbiAgcHVibGljIGhlYWRlck5hdmlnYXRpb246IGFueTtcbiAgcHVibGljIGN1cnJlbnRQYWdlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByb3V0aW5nKCkge1xuICAgIHN3aXRjaCAodGhpcy5jdXJyZW50UGFnZSkge1xuICAgICAgY2FzZSBcIi9cIjpcbiAgICAgICAgdGhpcy5wYWdlID0gbmV3IEluZGV4UGFnZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIi92aWRlb2NvbnRyb2wuaHRtbFwiOlxuICAgICAgICB0aGlzLnBhZ2UgPSBuZXcgVmlkZW9jb250cm9sUGFnZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgdGhpcy5oZWFkZXJOYXZpZ2F0aW9uID0gbmV3IEhlYWRlck5hdmlnYXRpb24oe1xuICAgICAgc2VsZWN0b3I6IFwiI2hlYWRlci1tZW51XCIsXG4gICAgfSk7XG5cbiAgICB0aGlzLnJvdXRpbmcoKTtcbiAgfVxufVxuXG5uZXcgSW5pdEFwcGxpY2F0aW9uKCk7XG4iLCJpbXBvcnQgVmlkZW9jb250cm9sIGZyb20gXCIuLi9jb21wb25lbnRzL3ZpZGVvY29udHJvbC92aWRlb2NvbnRyb2xcIjtcblxuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmNsYXNzIFZpZGVvQ29udHJvbFBhZ2Uge1xuICBwdWJsaWMgYnJvYWRjYXN0czogVHlwZXMuQnJvYWRjYXN0W107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5icm9hZGNhc3RzID0gW1xuICAgICAge1xuICAgICAgICB1cmw6XG4gICAgICAgICAgXCJodHRwOi8vbG9jYWxob3N0OjkxOTEvbWFzdGVyP3VybD1odHRwJTNBJTJGJTJGbG9jYWxob3N0JTNBMzEwMiUyRnN0cmVhbXMlMkZzb3NlZCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmNhdCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmRvZyUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmhhbGwlMkZtYXN0ZXIubTN1OFwiLFxuICAgICAgICBwbGF5ZXI6IG51bGwsXG4gICAgICAgIGlkOiB1bmRlZmluZWQsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBjb25zdCBWaWRlb2NvbnRyb2xXaWRnZXQgPSBuZXcgVmlkZW9jb250cm9sKHtcbiAgICAgIGJyb2FkY2FzdHM6IHRoaXMuYnJvYWRjYXN0cyxcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmMtbGlzdFwiKSxcbiAgICAgIGVsZW1lbnRTaG93QWxsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZjLXNob3dhbGxcIiksXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW9Db250cm9sUGFnZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=