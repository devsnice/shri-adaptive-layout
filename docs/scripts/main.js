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
            case "/shri-adaptive-layout/":
            case "/shri-adaptive-layout/index.html":
                this.page = new _index_page__WEBPACK_IMPORTED_MODULE_1__["default"]();
                break;
            case "/shri-adaptive-layout/videocontrol.html":
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvYXVkaW9BbmFseXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvY29udHJvbC9jYW52YXNWaWRlby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvcGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvY29udHJvbC92aWRlb2NvbnRyb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L2NhbWVyYS53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3BsYXllci53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3F1ZXN0aW9ucy53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3N0YXRzLndpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy93aWRnZXQvdGhlbWFsLndpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy93aWRnZXQvd2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9pbmRleC5wYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvdmlkZW9jb250cm9sLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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LCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wYWdlcy9pbmRleC50c1wiKTtcbiIsImNvbnN0IGRvbVV0aWxzID0ge1xuICBkb2VzTm9kZUNvbnRhaW5DbGljazogKG5vZGU6IEhUTUxFbGVtZW50LCBlOiBFdmVudCk6IGJvb2xlYW4gPT4ge1xuICAgIGlmICghbm9kZSB8fCAhZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gbm9kZS5jb250YWlucyhlLnRhcmdldCk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0aW9uIHtcbiAgcHVibGljIG1lbnVPcGVuZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBoZWFkZXJNZW51OiBIVE1MRWxlbWVudCB8IG51bGw7XG4gIHB1YmxpYyBoZWFkZXJCdXJnZXJNZW51OiBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoeyBzZWxlY3RvciB9OiB7IHNlbGVjdG9yOiBzdHJpbmcgfSkge1xuICAgIHRoaXMubWVudU9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMuaGVhZGVyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIHRoaXMuaGVhZGVyQnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyLWJ1cmdlclwiKTtcblxuICAgIGlmICh0aGlzLmlzTW9iaWxlKCkpIHtcbiAgICAgIHRoaXMuaW5pdE5hdmlnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3Blbk5hdmlnYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJNZW51LmNsYXNzTGlzdC5hZGQoXCJoZWFkZXItbWVudS1saXN0X3N0YXRlLW1vYmlsZS1vcGVuZWRcIik7XG4gICAgfVxuXG4gICAgdGhpcy5tZW51T3BlbmVkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZU5hdmlnYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJoZWFkZXItbWVudS1saXN0X3N0YXRlLW1vYmlsZS1vcGVuZWRcIik7XG4gICAgfVxuXG4gICAgdGhpcy5tZW51T3BlbmVkID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGlzTW9iaWxlKCkge1xuICAgIGNvbnN0IG1heE1vYmlsZVdpZHRoID0gNzY4O1xuXG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIDwgbWF4TW9iaWxlV2lkdGg7XG4gIH1cblxuICBwcml2YXRlIGluaXROYXZpZ2F0aW9uKCkge1xuICAgIGlmICh0aGlzLmhlYWRlck1lbnUpIHtcbiAgICAgIHRoaXMuaGVhZGVyTWVudS5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyLW1lbnUtbGlzdF9zdGF0ZS1tb2JpbGVcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVhZGVyQnVyZ2VyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJCdXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5tZW51T3BlbmVkKSB7XG4gICAgICAgICAgdGhpcy5vcGVuTmF2aWdhdGlvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VOYXZpZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQHRzLWlnbm9yZVxuY29uc3QgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXG5jb25zdCBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXG5jbGFzcyBBbmFseXNlIHtcbiAgcHVibGljIHN0YXJ0U2hvdzogYm9vbGVhbjtcbiAgcHVibGljIGJ1ZmZlckxlbmd0aDogbnVtYmVyO1xuICBwdWJsaWMgYmFuZHM6IFVpbnQ4QXJyYXk7XG5cbiAgcHVibGljIG5vZGU6IGFueTtcbiAgcHVibGljIG5vaXNlTGV2ZWxSYW5nZTogSFRNTElucHV0RWxlbWVudDtcbiAgcHVibGljIGFuYWx5c2VyOiBhbnk7XG4gIHB1YmxpYyBzb3VyY2U6IGFueTtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgdmlkZW8sXG4gICAgbm9pc2VMZXZlbFJhbmdlLFxuICB9OiB7XG4gICAgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQ7XG4gICAgbm9pc2VMZXZlbFJhbmdlOiBIVE1MSW5wdXRFbGVtZW50O1xuICB9KSB7XG4gICAgdGhpcy5ub2RlID0gY29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoMjA0OCwgMSwgMSk7XG4gICAgdGhpcy5ub2lzZUxldmVsUmFuZ2UgPSBub2lzZUxldmVsUmFuZ2U7XG5cbiAgICB0aGlzLmFuYWx5c2VyID0gY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xuXG4gICAgdGhpcy5idWZmZXJMZW5ndGggPSB0aGlzLmFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50O1xuICAgIHRoaXMuYmFuZHMgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlckxlbmd0aCk7XG5cbiAgICB0aGlzLnN0YXJ0U2hvdyA9IGZhbHNlO1xuXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXlcIiwgKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnNvdXJjZSkge1xuICAgICAgICB0aGlzLnNvdXJjZSA9IGNvbnRleHQuY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKHZpZGVvKTtcblxuICAgICAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xuICAgICAgICB0aGlzLmFuYWx5c2VyLmNvbm5lY3QodGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMuc291cmNlLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uYXVkaW9wcm9jZXNzID0gKGU6IEV2ZW50VGFyZ2V0KSA9PiB7XG4gICAgICAgICAgdGhpcy5hbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YSh0aGlzLmJhbmRzKTsgLy8gY29weSBjdXJyZW50IGRhdGEgdG8gdGhpcy5iYW5kc1xuXG4gICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0U2hvdykge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2hvdyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNob3coKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubm9pc2VMZXZlbFJhbmdlLnZhbHVlID0gdGhpcy5nZXRBdmVyYWdlVm9sdW1lKHRoaXMuYmFuZHMpLnRvU3RyaW5nKCk7XG5cbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBdmVyYWdlVm9sdW1lKGFycmF5OiBVaW50OEFycmF5KTogbnVtYmVyIHtcbiAgICBsZXQgdmFsdWVzID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlcyArPSBhcnJheVtpXTtcbiAgICB9XG5cbiAgICBjb25zdCBhdmVyYWdlID0gdmFsdWVzIC8gYXJyYXkubGVuZ3RoO1xuXG4gICAgLy8gY2FsY3VsYXRlIGluIDEwMCUgc2NhbGUsIDElIGlzIDIuNTZcbiAgICByZXR1cm4gYXZlcmFnZSA9PT0gMCA/IDAgOiBhdmVyYWdlIC8gMi41NjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBbmFseXNlO1xuIiwiY2xhc3MgQ2FudmFzVmlkZW8ge1xuICBwdWJsaWMgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQ7XG4gIHB1YmxpYyB2aWRlb1BsYXllcjogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBzdG9wVmlkZW86IGJvb2xlYW47XG5cbiAgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsO1xuICBwdWJsaWMgY2FudmFzSGVscGVyOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoeyB2aWRlbywgdmlkZW9QbGF5ZXIgfTogeyB2aWRlbzogSFRNTFZpZGVvRWxlbWVudDsgdmlkZW9QbGF5ZXI6IEhUTUxFbGVtZW50IH0pIHtcbiAgICB0aGlzLnZpZGVvID0gdmlkZW87XG4gICAgdGhpcy52aWRlb1BsYXllciA9IHZpZGVvUGxheWVyO1xuICAgIHRoaXMuc3RvcFZpZGVvID0gZmFsc2U7XG5cbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgdGhpcy5jYW52YXNIZWxwZXIgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIHBsYXkoe1xuICAgIGNhbnZhc0luaXRlZCxcbiAgICBicmlnaHRuZXNzLFxuICAgIGNvbnRyYXN0LFxuICAgIHNpemU6IHsgd2lkdGgsIGhlaWdodCB9LFxuICB9OiB7XG4gICAgY2FudmFzSW5pdGVkOiBib29sZWFuO1xuICAgIGJyaWdodG5lc3M6IHN0cmluZztcbiAgICBjb250cmFzdDogc3RyaW5nO1xuICAgIHNpemU6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfTtcbiAgfSkge1xuICAgIGlmICghY2FudmFzSW5pdGVkKSB7XG4gICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9YDtcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1gO1xuXG4gICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICB0aGlzLnZpZGVvUGxheWVyLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wVmlkZW8gPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNhbnZhcykge1xuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgaWYgKCFjb250ZXh0KSB7IHJldHVybjsgfVxuXG4gICAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkSW1hZ2UgPSB0aGlzLmZpbHRlcih7XG4gICAgICAgICAgICB2aWRlbzogdGhpcy52aWRlbyxcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgY29udHJhc3QsXG4gICAgICAgICAgICBicmlnaHRuZXNzLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29udGV4dC5wdXRJbWFnZURhdGEoZmlsdGVyZWRJbWFnZSwgMCwgMCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5zdG9wVmlkZW8gfHwgdGhpcy52aWRlby5wYXVzZWQgfHwgdGhpcy52aWRlby5lbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wVmlkZW8gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmF3KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGRyYXcoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5QnJpZ2h0bmVzcyhkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgYnJpZ2h0bmVzczogc3RyaW5nKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBkYXRhW2ldICs9IDI1NSAqICgrYnJpZ2h0bmVzcyAvIDEwMCk7XG4gICAgICBkYXRhW2kgKyAxXSArPSAyNTUgKiAoK2JyaWdodG5lc3MgLyAxMDApO1xuICAgICAgZGF0YVtpICsgMl0gKz0gMjU1ICogKCticmlnaHRuZXNzIC8gMTAwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29udHJhc3QoZGF0YTogVWludDhDbGFtcGVkQXJyYXksIGNvbnRyYXN0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBmYWN0b3IgPSAoMjU5LjAgKiAoK2NvbnRyYXN0ICsgMjU1LjApKSAvICgyNTUuMCAqICgyNTkuMCAtICtjb250cmFzdCkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBkYXRhW2ldID0gdGhpcy50cnVuY2F0ZUNvbG9yKGZhY3RvciAqIChkYXRhW2ldIC0gMTI4LjApICsgMTI4LjApO1xuICAgICAgZGF0YVtpICsgMV0gPSB0aGlzLnRydW5jYXRlQ29sb3IoZmFjdG9yICogKGRhdGFbaSArIDFdIC0gMTI4LjApICsgMTI4LjApO1xuICAgICAgZGF0YVtpICsgMl0gPSB0aGlzLnRydW5jYXRlQ29sb3IoZmFjdG9yICogKGRhdGFbaSArIDJdIC0gMTI4LjApICsgMTI4LjApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJ1bmNhdGVDb2xvcih2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICB2YWx1ZSA9IDA7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA+IDI1NSkge1xuICAgICAgdmFsdWUgPSAyNTU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXIoe1xuICAgIHZpZGVvLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBjb250cmFzdCxcbiAgICBicmlnaHRuZXNzLFxuICB9OiB7XG4gICAgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQ7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICBjb250cmFzdDogc3RyaW5nO1xuICAgIGJyaWdodG5lc3M6IHN0cmluZztcbiAgfSkge1xuICAgIGlmICghdGhpcy5jYW52YXNIZWxwZXIpIHtcbiAgICAgIHRoaXMuY2FudmFzSGVscGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgICAgdGhpcy5jYW52YXNIZWxwZXIud2lkdGggPSB3aWR0aDtcbiAgICAgIHRoaXMuY2FudmFzSGVscGVyLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBjb25zdCBjb250ZXh0SGVscGVyID0gdGhpcy5jYW52YXNIZWxwZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgaWYgKGNvbnRleHRIZWxwZXIpIHtcbiAgICAgIGNvbnRleHRIZWxwZXIuZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgY29uc3QgaWRhdGEgPSBjb250ZXh0SGVscGVyLmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgY29uc3QgZGF0YSA9IGlkYXRhLmRhdGE7XG5cbiAgICAgIHRoaXMuYXBwbHlCcmlnaHRuZXNzKGRhdGEsIGJyaWdodG5lc3MpO1xuICAgICAgdGhpcy5hcHBseUNvbnRyYXN0KGRhdGEsIGNvbnRyYXN0KTtcblxuICAgICAgcmV0dXJuIGlkYXRhO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW52YXNWaWRlbztcbiIsImltcG9ydCBBbmFseXNlIGZyb20gXCIuL2F1ZGlvQW5hbHlzZVwiO1xuaW1wb3J0IENhbnZhc1ZpZGVvIGZyb20gXCIuL2NhbnZhc1ZpZGVvXCI7XG5cbi8qKlxuICogUGxheWVyVGVtcGxhdGUgLSBnZW5lcmF0ZSB2aWRlby1wbGF5ZXIgZnJvbSA8dGVtcGxhdGU+IHRhZ1xuICovXG5leHBvcnQgY2xhc3MgUGxheWVyVGVtcGxhdGUge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcGxhdGUtcGxheWVyXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKGlkOiBzdHJpbmcpOiBOb2RlIHtcbiAgICBjb25zdCBlbGVtZW50OiBOb2RlID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi52aWRlb2NvbnRyb2wtbGlzdF9faXRlbVwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcblxuICAgIC8vIHBsYXllci17aWR9XG4gICAgY29uc3QgcGxheWVyRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gKGVsZW1lbnQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJcIik7XG5cbiAgICBwbGF5ZXJFbGVtZW50ICYmIHBsYXllckVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xuXG4gICAgLy8gcGxheWVyLXtpZH0tdmlkZW9cbiAgICBjb25zdCB2aWRlb0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IChlbGVtZW50IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcblxuICAgIGlmICh2aWRlb0VsZW1lbnQpIHtcbiAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpZH0tdmlkZW9gKTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIte2lkfS13ZWJnbC12aWRlb1xuICAgIGNvbnN0IGlucHV0RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gKGVsZW1lbnQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgIGlucHV0RWxlbWVudCAmJiBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aWR9LXdlYmdsLXZpZGVvYCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuXG4vKipcbiAqIFBsYXllciBpcyBhIHdyYXBwZXIgYXJvdW5kIGh0bWw1IHZpZGVvIGVsZW1lbnQgYW5kIEhMUyBzdGFuZGFydCxcbiAqIGl0IGhhcyBzcGVjaWFsIGJlaGF2aW9yIGZvciBvdXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBwdWJsaWMgc2V0dGluZ3M6IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBjYW52YXNJbml0ZWQ6IGJvb2xlYW47XG4gICAgY29udGFpbmVyQm91bmRzOiB7XG4gICAgICBsZWZ0OiBudW1iZXI7XG4gICAgICB0b3A6IG51bWJlcjtcbiAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICB9O1xuICAgIGlzRnVsbHNjcmVlbjogYm9vbGVhbjtcbiAgfTtcblxuICBwdWJsaWMgdmlkZW9TZXR0aW5nczoge1xuICAgIGJyaWdodG5lc3M6IHN0cmluZztcbiAgICBjb250cmFzdDogc3RyaW5nO1xuICAgIGlzRnVsbHNjcmVlbjogYm9vbGVhbjtcbiAgfTtcblxuICBwdWJsaWMgY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBwbGF5ZXI6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcHVibGljIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50IHwgbnVsbDtcbiAgcHVibGljIGJyaWdodG5lc3NSYW5nZTogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG4gIHB1YmxpYyBub2lzZUxldmVsUmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xuICBwdWJsaWMgY29udHJhc3RSYW5nZTogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5cbiAgcHVibGljIGNhbnZhc1ZpZGVvOiBDYW52YXNWaWRlbztcblxuICBwdWJsaWMgaW5pdFByb21pc2U6IFByb21pc2U8SFRNTFZpZGVvRWxlbWVudD47XG4gIHB1YmxpYyBhbmFseXNlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICB1cmwsXG4gICAgY29udGFpbmVyRWxlbWVudCxcbiAgICBwbGF5ZXJFbGVtZW50XG4gIH06IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBjb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwbGF5ZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgfSkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICB1cmwsXG4gICAgICBjYW52YXNJbml0ZWQ6IGZhbHNlLFxuICAgICAgY29udGFpbmVyQm91bmRzOiB7XG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMFxuICAgICAgfSxcbiAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy52aWRlb1NldHRpbmdzID0ge1xuICAgICAgYnJpZ2h0bmVzczogXCIwXCIsXG4gICAgICBjb250cmFzdDogXCIwXCIsXG4gICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lckVsZW1lbnQ7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXJFbGVtZW50O1xuICAgIHRoaXMudmlkZW8gPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcbiAgICB0aGlzLmJyaWdodG5lc3NSYW5nZSA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJfX2JyaWdodG5lc3NcIik7XG4gICAgdGhpcy5ub2lzZUxldmVsUmFuZ2UgPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmMtcGxheWVyX19ub2lzZS1sZXZlbFwiKTtcbiAgICB0aGlzLmNvbnRyYXN0UmFuZ2UgPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmMtcGxheWVyX19jb250cmFzdFwiKTtcblxuICAgIHRoaXMuY2FudmFzVmlkZW8gPSBuZXcgQ2FudmFzVmlkZW8oe1xuICAgICAgdmlkZW86IHRoaXMudmlkZW8sXG4gICAgICB2aWRlb1BsYXllcjogdGhpcy5wbGF5ZXJcbiAgICB9KTtcblxuICAgIHRoaXMuaW5pdFByb21pc2UgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gIH1cblxuICBwdWJsaWMgaW5pdCgpIHtcbiAgICBpZiAodGhpcy5pbml0UHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb21pc2U7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuSGxzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgY29uc3QgaGxzID0gbmV3IHdpbmRvdy5IbHMoKTtcblxuICAgICAgICBobHMubG9hZFNvdXJjZSh0aGlzLnNldHRpbmdzLnVybCk7XG4gICAgICAgIGhscy5hdHRhY2hNZWRpYSh0aGlzLnZpZGVvKTtcblxuICAgICAgICBobHMub24od2luZG93Lkhscy5FdmVudHMuTUFOSUZFU1RfUEFSU0VELCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLnZpZGVvKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmlkZW8uY2FuUGxheVR5cGUoXCJhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybFwiKSkge1xuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IHRoaXMuc2V0dGluZ3MudXJsO1xuXG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMudmlkZW8pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwbGF5KCkge1xuICAgIHRoaXMudmlkZW8ucGxheSgpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKSB7XG4gICAgdGhpcy52aWRlby5wYXVzZSgpO1xuICB9XG5cbiAgcHVibGljIG9wZW5GdWxsc2NyZWVuKCkge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmlzRnVsbHNjcmVlbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuc2V0Q29udGFpbmVyQm91bmRzKCk7XG5cbiAgICBjb25zdCB7IGNvbnRhaW5lckJvdW5kcyB9ID0gdGhpcy5zZXR0aW5ncztcblxuICAgIHRoaXMudmlkZW8ubXV0ZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHBsYXllckJvdW5kcyA9IHRoaXMucGxheWVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gYFxuICAgICAgICB0cmFuc2xhdGVYKDBweClcbiAgICAgICAgdHJhbnNsYXRlWSgwcHgpXG4gICAgYDtcblxuICAgIHRoaXMucGxheWVyLnN0eWxlLndpZHRoID0gcGxheWVyQm91bmRzLndpZHRoICsgXCJweFwiO1xuICAgIHRoaXMucGxheWVyLnN0eWxlLmhlaWdodCA9IHBsYXllckJvdW5kcy5oZWlnaHQgKyBcInB4XCI7XG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gXCJcIjtcbiAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBcIlwiO1xuICAgIHRoaXMucGxheWVyLnN0eWxlLnpJbmRleCA9IFwiMlwiO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcInRyYW5zZm9ybSwgd2lkdGgsIGhlaWdodFwiO1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwLjNzXCI7XG5cbiAgICAgIC8vIG1vdmUgZWxlbWVudCB0byB0b3AvbGVmdCBib3VuZGVyIG9mIHRoZSBsaXN0LWNvbnRhaW5lclxuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gYFxuICAgICAgICB0cmFuc2xhdGVYKC0ke3BsYXllckJvdW5kcy5sZWZ0IC0gY29udGFpbmVyQm91bmRzLmxlZnR9cHgpXG4gICAgICAgIHRyYW5zbGF0ZVkoLSR7cGxheWVyQm91bmRzLnRvcCAtIGNvbnRhaW5lckJvdW5kcy50b3B9cHgpXG4gICAgICBgO1xuXG4gICAgICB0aGlzLnBsYXllci5zdHlsZS53aWR0aCA9IGNvbnRhaW5lckJvdW5kcy53aWR0aCArIFwicHhcIjtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLmhlaWdodCA9IGNvbnRhaW5lckJvdW5kcy5oZWlnaHQgKyBcInB4XCI7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldHRpbmdzLmlzRnVsbHNjcmVlbiA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VGdWxsc2NyZWVuKCkge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5pc0Z1bGxzY3JlZW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZGVvLm11dGVkID0gdHJ1ZTtcblxuICAgIHRoaXMucGxheWVyLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGBcbiAgICAgICAgICB0cmFuc2xhdGVYKDBweClcbiAgICAgICAgICB0cmFuc2xhdGVZKDBweClcbiAgICAgIGA7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldHRpbmdzLmlzRnVsbHNjcmVlbiA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IChlOiBFdmVudCkgPT4gdm9pZCkge1xuICAgIHRoaXMucGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q29udGFpbmVyQm91bmRzKCkge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHMpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MuY29udGFpbmVyQm91bmRzID0gdGhpcy5jb250YWluZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcztcbiAgfVxuXG4gIHByaXZhdGUgcGxheVZpZGVvT25DYW52YXMoKSB7XG4gICAgdGhpcy5zZXRDb250YWluZXJCb3VuZHMoKTtcblxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5jYW52YXNJbml0ZWQpIHtcbiAgICAgIHRoaXMudmlkZW8uY2xhc3NMaXN0LmFkZChcInZjLXBsYXllcl9fdmlkZW9fc3RhdGUtaGlkZGVuXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2FudmFzVmlkZW8ucGxheSh7XG4gICAgICBjYW52YXNJbml0ZWQ6IHRoaXMuc2V0dGluZ3MuY2FudmFzSW5pdGVkLFxuICAgICAgc2l6ZToge1xuICAgICAgICB3aWR0aDogdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHMuaGVpZ2h0XG4gICAgICB9LFxuICAgICAgYnJpZ2h0bmVzczogdGhpcy52aWRlb1NldHRpbmdzLmJyaWdodG5lc3MsXG4gICAgICBjb250cmFzdDogdGhpcy52aWRlb1NldHRpbmdzLmNvbnRyYXN0XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldHRpbmdzLmNhbnZhc0luaXRlZCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZUJyaWdodG5lc3ModmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmlkZW9TZXR0aW5ncy5icmlnaHRuZXNzID0gdmFsdWU7XG5cbiAgICB0aGlzLnBsYXlWaWRlb09uQ2FudmFzKCk7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZUNvbnRyYXN0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZGVvU2V0dGluZ3MuY29udHJhc3QgPSB2YWx1ZTtcblxuICAgIHRoaXMucGxheVZpZGVvT25DYW52YXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEV2ZW50cygpIHtcbiAgICB0aGlzLmJyaWdodG5lc3NSYW5nZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUJyaWdodG5lc3MoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY29udHJhc3RSYW5nZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUNvbnRyYXN0KChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFuYWx5c2VyID0gbmV3IEFuYWx5c2Uoe1xuICAgICAgdmlkZW86IHRoaXMudmlkZW8sXG4gICAgICBub2lzZUxldmVsUmFuZ2U6IHRoaXMubm9pc2VMZXZlbFJhbmdlXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJyb2FkY2FzdCB9IGZyb20gXCIuLi8uLi90eXBlcy9pbmRleFwiO1xuaW1wb3J0IHsgUGxheWVyLCBQbGF5ZXJUZW1wbGF0ZSB9IGZyb20gXCIuL3BsYXllclwiO1xuXG4vKipcbiAqIFZpZGVvY29udHJvbCByZXByZXNlbnRzIGNvbnRyb2xsZXIgb3ZlciBvdXIgZmVhdHVyZSxcbiAqIGl0IGluaXRpYWxpemVzIGJyb2FkY2FzdHMgYW5kIGludGVyYWN0IHdpdGggdXNlcidzIGFjdGlvbnNcbiAqL1xuY2xhc3MgVmlkZW9jb250cm9sIHtcbiAgcHVibGljIGJyb2FkY2FzdHM6IEJyb2FkY2FzdFtdO1xuICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBlbGVtZW50U2hvd0FsbDogSFRNTEVsZW1lbnQ7XG5cbiAgcHVibGljIHN0YXRlOiB7XG4gICAgZnVsbHNjcmVlbklkOiBudW1iZXI7XG4gIH07XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIGJyb2FkY2FzdHMsXG4gICAgZWxlbWVudFNob3dBbGwsXG4gICAgZWxlbWVudCxcbiAgfToge1xuICAgIGJyb2FkY2FzdHM6IEJyb2FkY2FzdFtdO1xuICAgIGVsZW1lbnRTaG93QWxsOiBIVE1MRWxlbWVudDtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgfSkge1xuICAgIHRoaXMuYnJvYWRjYXN0cyA9IGJyb2FkY2FzdHM7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmVsZW1lbnRTaG93QWxsID0gZWxlbWVudFNob3dBbGw7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZnVsbHNjcmVlbklkOiBJbmZpbml0eSxcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0UGxheWVycygpO1xuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZUZ1bGxQbGF5ZXIoKSB7XG4gICAgLy8gcGxheSBhbGwgcGxheWVyc1xuICAgIHRoaXMuYnJvYWRjYXN0cy5mb3JFYWNoKChicm9hZGNhc3QpID0+IGJyb2FkY2FzdC5wbGF5ZXIucGxheSgpKTtcblxuICAgIHRoaXMuYnJvYWRjYXN0c1t0aGlzLnN0YXRlLmZ1bGxzY3JlZW5JZF0ucGxheWVyLmNsb3NlRnVsbHNjcmVlbigpO1xuXG4gICAgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuSWQgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuRnVsbFBsYXllcihpZDogbnVtYmVyKSB7XG4gICAgLy8gc3RvcCBhbGwgcGxheWVycyBleGNlcHQgYSBmdWxsc2NyZWVuXG4gICAgdGhpcy5icm9hZGNhc3RzXG4gICAgICAuZmlsdGVyKChicm9hZGNhc3QpID0+IGJyb2FkY2FzdC5pZCAhPT0gaWQpXG4gICAgICAuZm9yRWFjaCgoYnJvYWRjYXN0KSA9PiBicm9hZGNhc3QucGxheWVyLnN0b3AoKSk7XG5cbiAgICAvLyBvcGVuIHBsYXllciBpbiBmdWxsc2NyZWVuXG4gICAgdGhpcy5icm9hZGNhc3RzW2lkXS5wbGF5ZXIub3BlbkZ1bGxzY3JlZW4oKTtcblxuICAgIHRoaXMuc3RhdGUuZnVsbHNjcmVlbklkID0gaWQ7XG4gIH1cblxuICBwcml2YXRlIGluaXRFdmVudHMoKSB7XG4gICAgdGhpcy5lbGVtZW50U2hvd0FsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZUZ1bGxQbGF5ZXIoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudFNob3dBbGwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsICgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2VGdWxsUGxheWVyKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRQbGF5ZXJzKCkge1xuICAgIHRoaXMuYnJvYWRjYXN0cy5mb3JFYWNoKChicm9hZGNhc3QsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBWaWRlb1RlbXBsYXRlOiBQbGF5ZXJUZW1wbGF0ZSA9IG5ldyBQbGF5ZXJUZW1wbGF0ZSgpO1xuICAgICAgY29uc3QgbGlzdFZpZGVvRWxlbWVudDogTm9kZSA9IFZpZGVvVGVtcGxhdGUucmVuZGVyKGBwbGF5ZXItJHtpbmRleCArIDF9YCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChsaXN0VmlkZW9FbGVtZW50KTtcblxuICAgICAgY29uc3QgVmlkZW9QbGF5ZXIgPSBuZXcgUGxheWVyKHtcbiAgICAgICAgY29udGFpbmVyRWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICBwbGF5ZXJFbGVtZW50OiAobGlzdFZpZGVvRWxlbWVudCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKFwiLnZjLXBsYXllclwiKSxcbiAgICAgICAgdXJsOiBicm9hZGNhc3QudXJsLFxuICAgICAgfSk7XG5cbiAgICAgIFZpZGVvUGxheWVyLmluaXQoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgVmlkZW9QbGF5ZXIucGxheSgpO1xuXG4gICAgICAgICAgLy8gSW5pdCBldmVudHNcbiAgICAgICAgICBWaWRlb1BsYXllci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZ1bGxQbGF5ZXIoaW5kZXgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgVmlkZW9QbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9wZW5GdWxsUGxheWVyKGluZGV4KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFNhdmUgcGxheWVyIHRvIGJyb2FkY2FzdHMgYXJyYXlcbiAgICAgICAgICB0aGlzLmJyb2FkY2FzdHNbaW5kZXhdLmlkID0gaW5kZXg7XG4gICAgICAgICAgdGhpcy5icm9hZGNhc3RzW2luZGV4XS5wbGF5ZXIgPSBWaWRlb1BsYXllcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUud2FybihlcnIpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWaWRlb2NvbnRyb2w7XG4iLCJjbGFzcyBDYW1lcmFXaWRnZXQge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LWNhbWVyYS10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBOb2RlIHtcbiAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW1lcmFXaWRnZXQ7XG4iLCJpbXBvcnQgeyBJV2lkZ2V0UGxheWVyRGF0YSB9IGZyb20gXCIuLi8uLi90eXBlcy9pbmRleFwiO1xuXG5jbGFzcyBQbGF5ZXJXaWRnZXQge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIHB1YmxpYyBkYXRhOiBJV2lkZ2V0UGxheWVyRGF0YTtcbiAgcHVibGljIHdpZGdldDogTm9kZTtcblxuICBjb25zdHJ1Y3Rvcih7IGRhdGEgfTogeyBkYXRhOiBJV2lkZ2V0UGxheWVyRGF0YSB9KSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXBsYXllci10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBOb2RlIHtcbiAgICB0aGlzLnNldENvdmVyKCk7XG5cbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5wbGF5ZXItbm93X190aXRsZVwiLCBgJHt0aGlzLmRhdGEuYXJ0aXN0fSAke3RoaXMuZGF0YS50cmFjay5uYW1lfWApO1xuXG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIucGxheWVyLXByb2dyZXNzX190aW1lXCIsIHRoaXMuZGF0YS50cmFjay5sZW5ndGgpO1xuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLnBsYXllci12b2x1bWVfX3BlcmNlbnRhZ2VcIiwgYCR7dGhpcy5kYXRhLnZvbHVtZX0lYCk7XG5cbiAgICByZXR1cm4gdGhpcy53aWRnZXQ7XG4gIH1cblxuICBwcml2YXRlIHNldElubmVyVGV4dChzZWxlY3Rvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBibG9jazogSFRNTEVsZW1lbnQgPSAodGhpcy53aWRnZXQgYXMgSFRNTEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYgKGJsb2NrKSB7XG4gICAgICBibG9jay5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q292ZXIoKSB7XG4gICAgY29uc3QgYmxvY2sgPSAodGhpcy53aWRnZXQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbm93X19jb3ZlclwiKTtcblxuICAgIGJsb2NrLnNldEF0dHJpYnV0ZShcInNyY1wiLCB0aGlzLmRhdGEuYWxidW1jb3Zlcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyV2lkZ2V0O1xuIiwiaW1wb3J0IHsgSVdpZGdldFF1ZXN0aW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcblxuY2xhc3MgUXVlc3Rpb25zV2lkZ2V0IHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICBwdWJsaWMgZGF0YTogSVdpZGdldFF1ZXN0aW9uc0RhdGE7XG4gIHB1YmxpYyB3aWRnZXQ6IE5vZGU7XG5cbiAgY29uc3RydWN0b3IoeyBkYXRhIH06IHsgZGF0YTogSVdpZGdldFF1ZXN0aW9uc0RhdGEgfSkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1xdWVzdGlvbnMtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogTm9kZSB7XG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIuYnV0dG9uX3R5cGUteWVsbG93XCIsIHRoaXMuZGF0YS5idXR0b25zWzBdKTtcbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5idXR0b25fdHlwZS1ncmV5XCIsIHRoaXMuZGF0YS5idXR0b25zWzFdKTtcblxuICAgIHJldHVybiB0aGlzLndpZGdldDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJUZXh0KHNlbGVjdG9yOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IGJsb2NrOiBIVE1MRWxlbWVudCA9ICh0aGlzLndpZGdldCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmIChibG9jaykge1xuICAgICAgYmxvY2suaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUXVlc3Rpb25zV2lkZ2V0O1xuIiwiY2xhc3MgU3RhdHNXaWRnZXQge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXN0YXRzLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IE5vZGUge1xuICAgIHJldHVybiB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRzV2lkZ2V0O1xuIiwiaW1wb3J0IHsgSVdpZGdldFRoZW1hbERhdGEgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcblxuY2xhc3MgVGhlbWFsV2lkZ2V0IHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICBwdWJsaWMgZGF0YTogSVdpZGdldFRoZW1hbERhdGE7XG4gIHB1YmxpYyB3aWRnZXQ6IE5vZGU7XG5cbiAgY29uc3RydWN0b3IoeyBkYXRhIH06IHsgZGF0YTogSVdpZGdldFRoZW1hbERhdGEgfSkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC10aGVybWFsLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IE5vZGUge1xuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFxuICAgICAgXCIud2lkZ2V0LXNlbnNvcl90eXBlLXRlbXAgLndpZGdldC1zZW5zb3JfX3ZhbHVlXCIsXG4gICAgICBgJHt0aGlzLmRhdGEudGVtcGVyYXR1cmV9Q2AsXG4gICAgKTtcblxuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFxuICAgICAgXCIud2lkZ2V0LXNlbnNvcl90eXBlLWh1bWlkaXR5IC53aWRnZXQtc2Vuc29yX192YWx1ZVwiLFxuICAgICAgYCR7dGhpcy5kYXRhLmh1bWlkaXR5fSVgLFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy53aWRnZXQ7XG4gIH1cblxuICBwcml2YXRlIHNldElubmVyVGV4dChzZWxlY3Rvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBibG9jazogSFRNTEVsZW1lbnQgPSAodGhpcy53aWRnZXQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoYmxvY2spIHtcbiAgICAgIGJsb2NrLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRoZW1hbFdpZGdldDtcbiIsImltcG9ydCBDYW1lcmFXaWRnZXQgZnJvbSBcIi4vY2FtZXJhLndpZGdldFwiO1xuaW1wb3J0IFBsYXllcldpZGdldCBmcm9tIFwiLi9wbGF5ZXIud2lkZ2V0XCI7XG5pbXBvcnQgUXVlc3Rpb25zV2lkZ2V0IGZyb20gXCIuL3F1ZXN0aW9ucy53aWRnZXRcIjtcbmltcG9ydCBTdGF0c1dpZGdldCBmcm9tIFwiLi9zdGF0cy53aWRnZXRcIjtcbmltcG9ydCBUaGVtYWxXaWRnZXQgZnJvbSBcIi4vdGhlbWFsLndpZGdldFwiO1xuXG5pbXBvcnQgKiBhcyBUeXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuY29uc3QgV0lER0VUX1RZUEVTID0ge1xuICBTVEFUUzogXCJTVEFUU1wiLFxuICBDQU1FUkE6IFwiQ0FNRVJBXCIsXG4gIFRIRVJNQUw6IFwiVEhFUk1BTFwiLFxuICBQTEFZRVI6IFwiUExBWUVSXCIsXG4gIFFVRVNUSU9OUzogXCJRVUVTVElPTlNcIixcbiAgREVGQVVMVDogXCJERUZBVUxUXCJcbn07XG5cbmNsYXNzIFdpZGdldCB7XG4gIHB1YmxpYyBldmVudDogVHlwZXMuRXZlbnQ7XG4gIHB1YmxpYyBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIHB1YmxpYyB3aWRnZXQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHsgZXZlbnQsIGNvbnRhaW5lciB9OiB7IGV2ZW50OiBUeXBlcy5FdmVudDsgY29udGFpbmVyOiBIVE1MRWxlbWVudCB9KSB7XG4gICAgdGhpcy5ldmVudCA9IGV2ZW50O1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0XCIpLmNsb25lTm9kZSh0cnVlKTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5hZGQoYHdpZGdldF9zaXplLSR7dGhpcy5ldmVudC5zaXplfWApO1xuICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5hZGQoYHdpZGdldF90eXBlLSR7dGhpcy5ldmVudC50eXBlfWApO1xuXG4gICAgdGhpcy5zZXRIZWFkZXJEYXRhKCk7XG4gICAgdGhpcy5zZXREZXNjcmlwdGlvbigpO1xuICAgIHRoaXMucmVuZGVyRGF0YVRlbXBsYXRlKCk7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLndpZGdldCk7XG4gIH1cblxuICBwcml2YXRlIHNldERlc2NyaXB0aW9uKCkge1xuICAgIGlmICh0aGlzLmV2ZW50LmRlc2NyaXB0aW9uICYmIHRoaXMud2lkZ2V0KSB7XG4gICAgICBjb25zdCBjb250ZW50VGV4dCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWNvbnRlbnRfX3RleHRcIik7XG4gICAgICBjb25zdCB0ZXh0RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtY29udGVudF9fdGV4dFwiKTtcblxuICAgICAgaWYgKGNvbnRlbnRUZXh0KSB7XG4gICAgICAgIGNvbnRlbnRUZXh0LmNsYXNzTGlzdC5hZGQoYHdpZGdldC1jb250ZW50X190ZXh0X3dpZHRoLSR7dGhpcy5ldmVudC5zaXplfWApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGV4dEVsZW1lbnQpIHtcbiAgICAgICAgdGV4dEVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5ldmVudC5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEhlYWRlckRhdGEoKSB7XG4gICAgY29uc3QgdGl0bGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIud2lkZ2V0LWhlYWRlci1hYm91dF9fdGl0bGVcIlxuICAgICk7XG4gICAgY29uc3QgdHlwZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWhlYWRlcl9fdHlwZVwiKTtcbiAgICBjb25zdCBkYXRlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtaGVhZGVyX19kYXRlXCIpO1xuICAgIGNvbnN0IGljb25Vc2VFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIud2lkZ2V0LWhlYWRlci1hYm91dF9faWNvbiA+IHVzZVwiXG4gICAgKTtcbiAgICBjb25zdCBpY29uRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtaGVhZGVyLWFib3V0X19pY29uXCIpO1xuXG4gICAgaWYgKHRpdGxlRWxlbWVudCkge1xuICAgICAgdGl0bGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQudGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVFbGVtZW50KSB7XG4gICAgICB0eXBlRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmV2ZW50LnNvdXJjZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0ZUVsZW1lbnQpIHtcbiAgICAgIGRhdGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQudGltZTtcbiAgICB9XG5cbiAgICBpZiAoaWNvblVzZUVsZW1lbnQpIHtcbiAgICAgIGljb25Vc2VFbGVtZW50LnNldEF0dHJpYnV0ZShcInhsaW5rOmhyZWZcIiwgYCMke3RoaXMuZXZlbnQuaWNvbn1gKTtcbiAgICB9XG5cbiAgICBpZiAoaWNvbkVsZW1lbnQpIHtcbiAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoYGljb25fJHt0aGlzLmV2ZW50Lmljb259YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXREYXRhVGVtcGxhdGVUeXBlKCk6IHN0cmluZyB7XG4gICAgY29uc3QgeyBkYXRhID0geyB0eXBlOiBcImVtcHR5XCIgfSwgaWNvbiB9ID0gdGhpcy5ldmVudDtcblxuICAgIGlmIChpY29uID09PSBcImNhbVwiKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLkNBTUVSQTtcbiAgICB9XG5cbiAgICBpZiAoKGRhdGEgYXMgVHlwZXMuSVdpZGdldFRoZW1hbERhdGEpLnRlbXBlcmF0dXJlKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLlRIRVJNQUw7XG4gICAgfVxuXG4gICAgaWYgKChkYXRhIGFzIFR5cGVzLklXaWRnZXRQbGF5ZXJEYXRhKS5hbGJ1bWNvdmVyKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLlBMQVlFUjtcbiAgICB9XG5cbiAgICBpZiAoKGRhdGEgYXMgVHlwZXMuSVdpZGdldFF1ZXN0aW9uc0RhdGEpLmJ1dHRvbnMpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuUVVFU1RJT05TO1xuICAgIH1cblxuICAgIGlmICgoZGF0YSBhcyBUeXBlcy5JV2lkZ2V0RGVmYXVsdERhdGEpLnR5cGUgPT09IFwiZ3JhcGhcIikge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5TVEFUUztcbiAgICB9XG5cbiAgICByZXR1cm4gV0lER0VUX1RZUEVTLkRFRkFVTFQ7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckRhdGFUZW1wbGF0ZSgpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZURhdGFUeXBlID0gdGhpcy5nZXREYXRhVGVtcGxhdGVUeXBlKCk7XG4gICAgbGV0IGRhdGFDb250ZW50QmxvY2sgPSBudWxsO1xuXG4gICAgc3dpdGNoICh0ZW1wbGF0ZURhdGFUeXBlKSB7XG4gICAgICBjYXNlIFdJREdFVF9UWVBFUy5TVEFUUzpcbiAgICAgICAgY29uc3Qgc3RhdHNXaWRnZXQgPSBuZXcgU3RhdHNXaWRnZXQoKTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gc3RhdHNXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLkNBTUVSQTpcbiAgICAgICAgY29uc3QgY2FtZXJhV2lkZ2V0ID0gbmV3IENhbWVyYVdpZGdldCgpO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBjYW1lcmFXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlBMQVlFUjpcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRPRE86INCd0LUg0L/QvtC90LjQvNCw0Y4sINC60LDQuiDQt9C00LXRgdGMINC80L7QttC90L4g0L7QsdC+0LnRgtC40YHRjCDQsdC10LcgYXNzaWdubWVudFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcGxheWVyV2lkZ2V0ID0gbmV3IFBsYXllcldpZGdldCh7XG4gICAgICAgICAgZGF0YTogdGhpcy5ldmVudC5kYXRhIGFzIFR5cGVzLklXaWRnZXRQbGF5ZXJEYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBwbGF5ZXJXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlFVRVNUSU9OUzpcbiAgICAgICAgY29uc3QgcXVlc3Rpb25zV2lkZ2V0ID0gbmV3IFF1ZXN0aW9uc1dpZGdldCh7XG4gICAgICAgICAgZGF0YTogdGhpcy5ldmVudC5kYXRhIGFzIFR5cGVzLklXaWRnZXRRdWVzdGlvbnNEYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBxdWVzdGlvbnNXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlRIRVJNQUw6XG4gICAgICAgIGNvbnN0IHRoZXJtYWxXaWRnZXQgPSBuZXcgVGhlbWFsV2lkZ2V0KHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmV2ZW50LmRhdGEgYXMgVHlwZXMuSVdpZGdldFRoZW1hbERhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IHRoZXJtYWxXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFDb250ZW50QmxvY2spIHtcbiAgICAgIGNvbnN0IHdpZGdldENvbnRlbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWNvbnRlbnRcIik7XG5cbiAgICAgIGlmICh3aWRnZXRDb250ZW50KSB7XG4gICAgICAgIHdpZGdldENvbnRlbnQuYXBwZW5kQ2hpbGQoZGF0YUNvbnRlbnRCbG9jayk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdpZGdldDtcbiIsImltcG9ydCBXaWRnZXQgZnJvbSBcIi4uL2NvbXBvbmVudHMvd2lkZ2V0L3dpZGdldFwiO1xuXG5pbXBvcnQgKiBhcyBUeXBlcyBmcm9tIFwiLi4vdHlwZXNcIjtcblxuY2xhc3MgSW5kZXhQYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckRhc2hib2FyZFdpZGdldHMoZXZlbnRzOiBUeXBlcy5FdmVudFtdKSB7XG4gICAgY29uc3QgZGFzaGJvYXJkV2lkZ2V0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhc2hib2FyZC1saXN0XCIpO1xuXG4gICAgZXZlbnRzLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICBuZXcgV2lkZ2V0KHtcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIGNvbnRhaW5lcjogZGFzaGJvYXJkV2lkZ2V0c0xpc3QsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEV2ZW50cygpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2V2ZW50c1wiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0eXBlOiBcImNyaXRpY2FsOmluZm9cIixcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBsaW1pdDogMjAsXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICB9LFxuICAgIH0pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHJlc3VsdClcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMubG9hZEV2ZW50cygpLnRoZW4oKGV2ZW50cykgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJEYXNoYm9hcmRXaWRnZXRzKGV2ZW50cyk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5kZXhQYWdlO1xuIiwiaW1wb3J0IEhlYWRlck5hdmlnYXRpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlclwiO1xuXG5pbXBvcnQgSW5kZXhQYWdlIGZyb20gXCIuL2luZGV4LnBhZ2VcIjtcbmltcG9ydCBWaWRlb2NvbnRyb2xQYWdlIGZyb20gXCIuL3ZpZGVvY29udHJvbC5wYWdlXCI7XG5cbmNsYXNzIEluaXRBcHBsaWNhdGlvbiB7XG4gIHB1YmxpYyBwYWdlOiBhbnk7XG4gIHB1YmxpYyBoZWFkZXJOYXZpZ2F0aW9uOiBhbnk7XG4gIHB1YmxpYyBjdXJyZW50UGFnZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcm91dGluZygpIHtcbiAgICBzd2l0Y2ggKHRoaXMuY3VycmVudFBhZ2UpIHtcbiAgICAgIGNhc2UgXCIvXCI6XG4gICAgICBjYXNlIFwiL3NocmktYWRhcHRpdmUtbGF5b3V0L1wiOlxuICAgICAgY2FzZSBcIi9zaHJpLWFkYXB0aXZlLWxheW91dC9pbmRleC5odG1sXCI6XG4gICAgICAgIHRoaXMucGFnZSA9IG5ldyBJbmRleFBhZ2UoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCIvc2hyaS1hZGFwdGl2ZS1sYXlvdXQvdmlkZW9jb250cm9sLmh0bWxcIjpcbiAgICAgICAgdGhpcy5wYWdlID0gbmV3IFZpZGVvY29udHJvbFBhZ2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuaGVhZGVyTmF2aWdhdGlvbiA9IG5ldyBIZWFkZXJOYXZpZ2F0aW9uKHtcbiAgICAgIHNlbGVjdG9yOiBcIiNoZWFkZXItbWVudVwiXG4gICAgfSk7XG5cbiAgICB0aGlzLnJvdXRpbmcoKTtcbiAgfVxufVxuXG5uZXcgSW5pdEFwcGxpY2F0aW9uKCk7XG4iLCJpbXBvcnQgVmlkZW9jb250cm9sIGZyb20gXCIuLi9jb21wb25lbnRzL3ZpZGVvY29udHJvbC92aWRlb2NvbnRyb2xcIjtcblxuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmNsYXNzIFZpZGVvQ29udHJvbFBhZ2Uge1xuICBwdWJsaWMgYnJvYWRjYXN0czogVHlwZXMuQnJvYWRjYXN0W107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5icm9hZGNhc3RzID0gW1xuICAgICAge1xuICAgICAgICB1cmw6XG4gICAgICAgICAgXCJodHRwOi8vbG9jYWxob3N0OjkxOTEvbWFzdGVyP3VybD1odHRwJTNBJTJGJTJGbG9jYWxob3N0JTNBMzEwMiUyRnN0cmVhbXMlMkZzb3NlZCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmNhdCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmRvZyUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmhhbGwlMkZtYXN0ZXIubTN1OFwiLFxuICAgICAgICBwbGF5ZXI6IG51bGwsXG4gICAgICAgIGlkOiB1bmRlZmluZWQsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBjb25zdCBWaWRlb2NvbnRyb2xXaWRnZXQgPSBuZXcgVmlkZW9jb250cm9sKHtcbiAgICAgIGJyb2FkY2FzdHM6IHRoaXMuYnJvYWRjYXN0cyxcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmMtbGlzdFwiKSxcbiAgICAgIGVsZW1lbnRTaG93QWxsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZjLXNob3dhbGxcIiksXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW9Db250cm9sUGFnZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=