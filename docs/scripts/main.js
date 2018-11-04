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

/***/ "./node_modules/shriflux/index.js":
/*!****************************************!*\
  !*** ./node_modules/shriflux/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

/**
 * The dispatcher is the central hub
 * that manages all data flow in a Flux application.
 */
class Dispatcher {
    constructor() {
        this.effects = [];
    }
    /**
     * Register storeEffect inside
     * @param storeEffect
     */
    register(storeEffect) {
        this.effects.push(storeEffect);
    }
    /**
     * Dispatch a new action to all registered stores
     * @param action
     */
    dispatch(action) {
        this.effects.forEach(effect => {
            effect(action);
        });
    }
}

class Store {
    constructor({ initialData }) {
        this.data = {};
        this.subscribers = new Map();
        this.amountSubscriptions = 0;
        this.data = initialData;
    }
    _createSubscriptionId() {
        this.amountSubscriptions++;
        return `sub_${this.amountSubscriptions}`;
    }
    _notifySubscribers() {
        this.subscribers.forEach((subscriberCallback) => {
            subscriberCallback();
        });
    }
    getData() {
        return this.data;
    }
    updateData(updatedFieldsData) {
        this.data = Object.assign({}, this.data, updatedFieldsData);
        this._notifySubscribers();
        return this.data;
    }
    subscribe(callback) {
        const subId = this._createSubscriptionId();
        this.subscribers.set(subId, callback);
        return subId;
    }
    unsubscribe(id) {
        return this.subscribers.delete(id);
    }
}



var types = /*#__PURE__*/Object.freeze({

});

exports.Dispatcher = Dispatcher;
exports.Store = Store;
exports.Types = types;


/***/ }),

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
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/store/index.ts");
/* harmony import */ var _store_events_actionCreators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/events/actionCreators */ "./src/store/events/actionCreators.ts");
/* harmony import */ var _services_userReadEventsService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/userReadEventsService */ "./src/services/userReadEventsService.ts");








const WIDGET_TYPES = {
    STATS: "STATS",
    CAMERA: "CAMERA",
    THERMAL: "THERMAL",
    PLAYER: "PLAYER",
    QUESTIONS: "QUESTIONS",
    DEFAULT: "DEFAULT"
};
// TODO: add method destoy, for removing events, when widget deleted from dom
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
        this.setEventListeners();
        this.container.appendChild(this.widget);
    }
    markWidgetAsRead() {
        _services_userReadEventsService__WEBPACK_IMPORTED_MODULE_7__["default"].markEventAsRead(this.event.id);
        _store__WEBPACK_IMPORTED_MODULE_5__["default"].dispatch(Object(_store_events_actionCreators__WEBPACK_IMPORTED_MODULE_6__["markEventAsRead"])(this.event.id));
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
    setEventListeners() {
        const closeElement = this.widget.querySelector(".widget__control_close");
        if (closeElement) {
            closeElement.addEventListener("click", () => {
                this.markWidgetAsRead();
            });
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
/* harmony import */ var _store_events_events_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/events/events.store */ "./src/store/events/events.store.ts");
/* harmony import */ var _store_events_actionCreators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/events/actionCreators */ "./src/store/events/actionCreators.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store */ "./src/store/index.ts");
/* harmony import */ var _services_userReadEventsService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/userReadEventsService */ "./src/services/userReadEventsService.ts");





class IndexPage {
    constructor() {
        this.init();
    }
    init() {
        _store_events_events_store__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe(this.renderDashboardWidgets);
        this.initEvents();
    }
    initEvents() {
        const userReadEvents = _services_userReadEventsService__WEBPACK_IMPORTED_MODULE_4__["default"].getReadEvents();
        this.loadEvents().then((events) => {
            let filteredEvents = [];
            if (!userReadEvents) {
                filteredEvents = events;
            }
            else {
                filteredEvents = events.filter((event) => !userReadEvents.includes(event.id));
            }
            _store__WEBPACK_IMPORTED_MODULE_3__["default"].dispatch(Object(_store_events_actionCreators__WEBPACK_IMPORTED_MODULE_2__["setEventsData"])(filteredEvents));
        });
    }
    renderDashboardWidgets() {
        const eventsStoreData = _store_events_events_store__WEBPACK_IMPORTED_MODULE_1__["default"].getData();
        const events = eventsStoreData.events.filter((event) => !event.userRead);
        const dashboardWidgetsList = document.getElementById("dashboard-list");
        // Clear dashboard
        dashboardWidgetsList.innerHTML = "";
        if (!events.length) {
            dashboardWidgetsList.innerHTML = "<h2>У вас нет новых событий</h2>";
        }
        else {
            events.forEach(event => {
                const widget = new _components_widget_widget__WEBPACK_IMPORTED_MODULE_0__["default"]({
                    event,
                    container: dashboardWidgetsList
                });
            });
        }
    }
    loadEvents() {
        // server works only on localmachine
        // run npm start server for it
        if (location.hostname === "localhost") {
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
                .catch(err => console.error(err));
        }
        return fetch("events.json")
            .then(response => response.json())
            .then(response => response.events)
            .catch(err => console.error(err));
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


/***/ }),

/***/ "./src/services/storageService.ts":
/*!****************************************!*\
  !*** ./src/services/storageService.ts ***!
  \****************************************/
/*! exports provided: storageKeys, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storageKeys", function() { return storageKeys; });
const storageKeys = {
    userReadEvents: "userReadEvents"
};
const StorageService = {
    set: (key, value) => {
        window.localStorage.setItem(key, value);
    },
    get: (key) => {
        return window.localStorage.getItem(key);
    }
};
/* harmony default export */ __webpack_exports__["default"] = (StorageService);


/***/ }),

/***/ "./src/services/userReadEventsService.ts":
/*!***********************************************!*\
  !*** ./src/services/userReadEventsService.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storageService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storageService */ "./src/services/storageService.ts");

/**
 * Service work with events, which was marked user as read in LocalStorage
 */
const UserReadEventsService = {
    /**
     * Get marked as read events
     */
    getReadEvents: () => {
        const userReadEvents = JSON.parse(_storageService__WEBPACK_IMPORTED_MODULE_0__["default"].get(_storageService__WEBPACK_IMPORTED_MODULE_0__["storageKeys"].userReadEvents));
        return userReadEvents;
    },
    /**
     * Save, that event is marked as read
     */
    markEventAsRead: (id) => {
        const userReadEvents = JSON.parse(_storageService__WEBPACK_IMPORTED_MODULE_0__["default"].get(_storageService__WEBPACK_IMPORTED_MODULE_0__["storageKeys"].userReadEvents)) || [];
        userReadEvents.push(id);
        _storageService__WEBPACK_IMPORTED_MODULE_0__["default"].set(_storageService__WEBPACK_IMPORTED_MODULE_0__["storageKeys"].userReadEvents, JSON.stringify(userReadEvents));
    }
};
/* harmony default export */ __webpack_exports__["default"] = (UserReadEventsService);


/***/ }),

/***/ "./src/store/events/actionCreators.ts":
/*!********************************************!*\
  !*** ./src/store/events/actionCreators.ts ***!
  \********************************************/
/*! exports provided: setEventsData, markEventAsRead */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEventsData", function() { return setEventsData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markEventAsRead", function() { return markEventAsRead; });
/* harmony import */ var _events_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events.store */ "./src/store/events/events.store.ts");

const setEventsData = (events) => ({
    type: _events_store__WEBPACK_IMPORTED_MODULE_0__["EventsActions"].SET_EVENTS,
    payload: {
        events
    }
});
const markEventAsRead = (id) => ({
    type: _events_store__WEBPACK_IMPORTED_MODULE_0__["EventsActions"].MARK_EVENT_AS_READ,
    payload: {
        id
    }
});


/***/ }),

/***/ "./src/store/events/events.store.ts":
/*!******************************************!*\
  !*** ./src/store/events/events.store.ts ***!
  \******************************************/
/*! exports provided: EventsActions, EventsEffects, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsActions", function() { return EventsActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsEffects", function() { return EventsEffects; });
/* harmony import */ var shriflux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shriflux */ "./node_modules/shriflux/index.js");
/* harmony import */ var shriflux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shriflux__WEBPACK_IMPORTED_MODULE_0__);

// Actions
const EventsActions = {
    SET_EVENTS: "SET_EVENTS",
    MARK_EVENT_AS_READ: "MARK_EVENT_AS_READ"
};
const initialData = {
    events: []
};
const EventsStore = new shriflux__WEBPACK_IMPORTED_MODULE_0__["Store"]({
    initialData
});
// Effects for store
const EventsEffects = (action) => {
    const { type, payload } = action;
    switch (type) {
        case EventsActions.SET_EVENTS:
            EventsStore.updateData({
                events: payload.events
            });
            break;
        case EventsActions.MARK_EVENT_AS_READ:
            const data = EventsStore.getData();
            EventsStore.updateData({
                events: data.events.map((event) => event.id === payload.id ? Object.assign({}, event, { userRead: true }) : event)
            });
            break;
        default:
            break;
    }
};
/* harmony default export */ __webpack_exports__["default"] = (EventsStore);


/***/ }),

/***/ "./src/store/index.ts":
/*!****************************!*\
  !*** ./src/store/index.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var shriflux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shriflux */ "./node_modules/shriflux/index.js");
/* harmony import */ var shriflux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shriflux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _events_events_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events/events.store */ "./src/store/events/events.store.ts");


const appDispatcher = new shriflux__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"]();
// Register all effect here
appDispatcher.register(_events_events_store__WEBPACK_IMPORTED_MODULE_1__["EventsEffects"]);
/* harmony default export */ __webpack_exports__["default"] = (appDispatcher);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NocmlmbHV4L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmlkZW9jb250cm9sL2F1ZGlvQW5hbHlzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvY2FudmFzVmlkZW8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmlkZW9jb250cm9sL3BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvdmlkZW9jb250cm9sLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9jYW1lcmEud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9wbGF5ZXIud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9xdWVzdGlvbnMud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9zdGF0cy53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3RoZW1hbC53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3dpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXgucGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3ZpZGVvY29udHJvbC5wYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9zdG9yYWdlU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvdXNlclJlYWRFdmVudHNTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9ldmVudHMvYWN0aW9uQ3JlYXRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2V2ZW50cy9ldmVudHMuc3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUEsOENBQThDLGNBQWM7O0FBRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsY0FBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix5QkFBeUI7QUFDL0M7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TUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2FBQ3ZCLENBQUMsQ0FBQztZQUNILE1BQU07UUFDUixLQUFLLGFBQWEsQ0FBQyxrQkFBa0I7WUFDbkMsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRW5DLFdBQVcsQ0FBQyxVQUFVLENBQUM7Z0JBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDckIsQ0FBQyxLQUEwQixFQUFFLEVBQUUsQ0FDN0IsS0FBSyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsbUJBQU0sS0FBSyxJQUFFLFFBQVEsRUFBRSxJQUFJLElBQUcsQ0FBQyxDQUFDLEtBQUssQ0FDakU7YUFDRixDQUFDLENBQUM7WUFDSCxNQUFNO1FBRVI7WUFDRSxNQUFNO0tBQ1Q7QUFDSCxDQUFDLENBQUM7QUFFRiwrREFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERXO0FBRWdCO0FBRXRELE1BQU0sYUFBYSxHQUFHLElBQUksbURBQVUsRUFBRSxDQUFDO0FBRXZDLDJCQUEyQjtBQUUzQixhQUFhLENBQUMsUUFBUSxDQUFDLGtFQUFhLENBQUMsQ0FBQztBQUV0QywrREFBZSxhQUFhLEVBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2VzL2luZGV4LnRzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vKipcclxuICogVGhlIGRpc3BhdGNoZXIgaXMgdGhlIGNlbnRyYWwgaHViXHJcbiAqIHRoYXQgbWFuYWdlcyBhbGwgZGF0YSBmbG93IGluIGEgRmx1eCBhcHBsaWNhdGlvbi5cclxuICovXHJcbmNsYXNzIERpc3BhdGNoZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RzID0gW107XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIHN0b3JlRWZmZWN0IGluc2lkZVxyXG4gICAgICogQHBhcmFtIHN0b3JlRWZmZWN0XHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyKHN0b3JlRWZmZWN0KSB7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RzLnB1c2goc3RvcmVFZmZlY3QpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwYXRjaCBhIG5ldyBhY3Rpb24gdG8gYWxsIHJlZ2lzdGVyZWQgc3RvcmVzXHJcbiAgICAgKiBAcGFyYW0gYWN0aW9uXHJcbiAgICAgKi9cclxuICAgIGRpc3BhdGNoKGFjdGlvbikge1xyXG4gICAgICAgIHRoaXMuZWZmZWN0cy5mb3JFYWNoKGVmZmVjdCA9PiB7XHJcbiAgICAgICAgICAgIGVmZmVjdChhY3Rpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIFN0b3JlIHtcclxuICAgIGNvbnN0cnVjdG9yKHsgaW5pdGlhbERhdGEgfSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5hbW91bnRTdWJzY3JpcHRpb25zID0gMDtcclxuICAgICAgICB0aGlzLmRhdGEgPSBpbml0aWFsRGF0YTtcclxuICAgIH1cclxuICAgIF9jcmVhdGVTdWJzY3JpcHRpb25JZCgpIHtcclxuICAgICAgICB0aGlzLmFtb3VudFN1YnNjcmlwdGlvbnMrKztcclxuICAgICAgICByZXR1cm4gYHN1Yl8ke3RoaXMuYW1vdW50U3Vic2NyaXB0aW9uc31gO1xyXG4gICAgfVxyXG4gICAgX25vdGlmeVN1YnNjcmliZXJzKCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaCgoc3Vic2NyaWJlckNhbGxiYWNrKSA9PiB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZXJDYWxsYmFjaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0RGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlRGF0YSh1cGRhdGVkRmllbGRzRGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGF0YSwgdXBkYXRlZEZpZWxkc0RhdGEpO1xyXG4gICAgICAgIHRoaXMuX25vdGlmeVN1YnNjcmliZXJzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxuICAgIHN1YnNjcmliZShjYWxsYmFjaykge1xyXG4gICAgICAgIGNvbnN0IHN1YklkID0gdGhpcy5fY3JlYXRlU3Vic2NyaXB0aW9uSWQoKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLnNldChzdWJJZCwgY2FsbGJhY2spO1xyXG4gICAgICAgIHJldHVybiBzdWJJZDtcclxuICAgIH1cclxuICAgIHVuc3Vic2NyaWJlKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlcnMuZGVsZXRlKGlkKTtcclxuICAgIH1cclxufVxuXG5cblxudmFyIHR5cGVzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuXG59KTtcblxuZXhwb3J0cy5EaXNwYXRjaGVyID0gRGlzcGF0Y2hlcjtcbmV4cG9ydHMuU3RvcmUgPSBTdG9yZTtcbmV4cG9ydHMuVHlwZXMgPSB0eXBlcztcbiIsImNvbnN0IGRvbVV0aWxzID0ge1xuICBkb2VzTm9kZUNvbnRhaW5DbGljazogKG5vZGU6IEhUTUxFbGVtZW50LCBlOiBFdmVudCk6IGJvb2xlYW4gPT4ge1xuICAgIGlmICghbm9kZSB8fCAhZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gbm9kZS5jb250YWlucyhlLnRhcmdldCk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0aW9uIHtcbiAgcHVibGljIG1lbnVPcGVuZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBoZWFkZXJNZW51OiBIVE1MRWxlbWVudCB8IG51bGw7XG4gIHB1YmxpYyBoZWFkZXJCdXJnZXJNZW51OiBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoeyBzZWxlY3RvciB9OiB7IHNlbGVjdG9yOiBzdHJpbmcgfSkge1xuICAgIHRoaXMubWVudU9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMuaGVhZGVyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIHRoaXMuaGVhZGVyQnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyLWJ1cmdlclwiKTtcblxuICAgIGlmICh0aGlzLmlzTW9iaWxlKCkpIHtcbiAgICAgIHRoaXMuaW5pdE5hdmlnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3Blbk5hdmlnYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJNZW51LmNsYXNzTGlzdC5hZGQoXCJoZWFkZXItbWVudS1saXN0X3N0YXRlLW1vYmlsZS1vcGVuZWRcIik7XG4gICAgfVxuXG4gICAgdGhpcy5tZW51T3BlbmVkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZU5hdmlnYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJoZWFkZXItbWVudS1saXN0X3N0YXRlLW1vYmlsZS1vcGVuZWRcIik7XG4gICAgfVxuXG4gICAgdGhpcy5tZW51T3BlbmVkID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGlzTW9iaWxlKCkge1xuICAgIGNvbnN0IG1heE1vYmlsZVdpZHRoID0gNzY4O1xuXG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIDwgbWF4TW9iaWxlV2lkdGg7XG4gIH1cblxuICBwcml2YXRlIGluaXROYXZpZ2F0aW9uKCkge1xuICAgIGlmICh0aGlzLmhlYWRlck1lbnUpIHtcbiAgICAgIHRoaXMuaGVhZGVyTWVudS5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyLW1lbnUtbGlzdF9zdGF0ZS1tb2JpbGVcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVhZGVyQnVyZ2VyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJCdXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5tZW51T3BlbmVkKSB7XG4gICAgICAgICAgdGhpcy5vcGVuTmF2aWdhdGlvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VOYXZpZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQHRzLWlnbm9yZVxuY29uc3QgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXG5jb25zdCBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXG5jbGFzcyBBbmFseXNlIHtcbiAgcHVibGljIHN0YXJ0U2hvdzogYm9vbGVhbjtcbiAgcHVibGljIGJ1ZmZlckxlbmd0aDogbnVtYmVyO1xuICBwdWJsaWMgYmFuZHM6IFVpbnQ4QXJyYXk7XG5cbiAgcHVibGljIG5vZGU6IGFueTtcbiAgcHVibGljIG5vaXNlTGV2ZWxSYW5nZTogSFRNTElucHV0RWxlbWVudDtcbiAgcHVibGljIGFuYWx5c2VyOiBhbnk7XG4gIHB1YmxpYyBzb3VyY2U6IGFueTtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgdmlkZW8sXG4gICAgbm9pc2VMZXZlbFJhbmdlLFxuICB9OiB7XG4gICAgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQ7XG4gICAgbm9pc2VMZXZlbFJhbmdlOiBIVE1MSW5wdXRFbGVtZW50O1xuICB9KSB7XG4gICAgdGhpcy5ub2RlID0gY29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoMjA0OCwgMSwgMSk7XG4gICAgdGhpcy5ub2lzZUxldmVsUmFuZ2UgPSBub2lzZUxldmVsUmFuZ2U7XG5cbiAgICB0aGlzLmFuYWx5c2VyID0gY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xuXG4gICAgdGhpcy5idWZmZXJMZW5ndGggPSB0aGlzLmFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50O1xuICAgIHRoaXMuYmFuZHMgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlckxlbmd0aCk7XG5cbiAgICB0aGlzLnN0YXJ0U2hvdyA9IGZhbHNlO1xuXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXlcIiwgKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnNvdXJjZSkge1xuICAgICAgICB0aGlzLnNvdXJjZSA9IGNvbnRleHQuY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKHZpZGVvKTtcblxuICAgICAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xuICAgICAgICB0aGlzLmFuYWx5c2VyLmNvbm5lY3QodGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMuc291cmNlLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uYXVkaW9wcm9jZXNzID0gKGU6IEV2ZW50VGFyZ2V0KSA9PiB7XG4gICAgICAgICAgdGhpcy5hbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YSh0aGlzLmJhbmRzKTsgLy8gY29weSBjdXJyZW50IGRhdGEgdG8gdGhpcy5iYW5kc1xuXG4gICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0U2hvdykge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2hvdyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNob3coKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubm9pc2VMZXZlbFJhbmdlLnZhbHVlID0gdGhpcy5nZXRBdmVyYWdlVm9sdW1lKHRoaXMuYmFuZHMpLnRvU3RyaW5nKCk7XG5cbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBdmVyYWdlVm9sdW1lKGFycmF5OiBVaW50OEFycmF5KTogbnVtYmVyIHtcbiAgICBsZXQgdmFsdWVzID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlcyArPSBhcnJheVtpXTtcbiAgICB9XG5cbiAgICBjb25zdCBhdmVyYWdlID0gdmFsdWVzIC8gYXJyYXkubGVuZ3RoO1xuXG4gICAgLy8gY2FsY3VsYXRlIGluIDEwMCUgc2NhbGUsIDElIGlzIDIuNTZcbiAgICByZXR1cm4gYXZlcmFnZSA9PT0gMCA/IDAgOiBhdmVyYWdlIC8gMi41NjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBbmFseXNlO1xuIiwiY2xhc3MgQ2FudmFzVmlkZW8ge1xuICBwdWJsaWMgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQ7XG4gIHB1YmxpYyB2aWRlb1BsYXllcjogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBzdG9wVmlkZW86IGJvb2xlYW47XG5cbiAgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsO1xuICBwdWJsaWMgY2FudmFzSGVscGVyOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoeyB2aWRlbywgdmlkZW9QbGF5ZXIgfTogeyB2aWRlbzogSFRNTFZpZGVvRWxlbWVudDsgdmlkZW9QbGF5ZXI6IEhUTUxFbGVtZW50IH0pIHtcbiAgICB0aGlzLnZpZGVvID0gdmlkZW87XG4gICAgdGhpcy52aWRlb1BsYXllciA9IHZpZGVvUGxheWVyO1xuICAgIHRoaXMuc3RvcFZpZGVvID0gZmFsc2U7XG5cbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgdGhpcy5jYW52YXNIZWxwZXIgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIHBsYXkoe1xuICAgIGNhbnZhc0luaXRlZCxcbiAgICBicmlnaHRuZXNzLFxuICAgIGNvbnRyYXN0LFxuICAgIHNpemU6IHsgd2lkdGgsIGhlaWdodCB9LFxuICB9OiB7XG4gICAgY2FudmFzSW5pdGVkOiBib29sZWFuO1xuICAgIGJyaWdodG5lc3M6IHN0cmluZztcbiAgICBjb250cmFzdDogc3RyaW5nO1xuICAgIHNpemU6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfTtcbiAgfSkge1xuICAgIGlmICghY2FudmFzSW5pdGVkKSB7XG4gICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9YDtcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1gO1xuXG4gICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICB0aGlzLnZpZGVvUGxheWVyLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wVmlkZW8gPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNhbnZhcykge1xuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgaWYgKCFjb250ZXh0KSB7IHJldHVybjsgfVxuXG4gICAgICBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkSW1hZ2UgPSB0aGlzLmZpbHRlcih7XG4gICAgICAgICAgICB2aWRlbzogdGhpcy52aWRlbyxcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgY29udHJhc3QsXG4gICAgICAgICAgICBicmlnaHRuZXNzLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29udGV4dC5wdXRJbWFnZURhdGEoZmlsdGVyZWRJbWFnZSwgMCwgMCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5zdG9wVmlkZW8gfHwgdGhpcy52aWRlby5wYXVzZWQgfHwgdGhpcy52aWRlby5lbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wVmlkZW8gPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmF3KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGRyYXcoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5QnJpZ2h0bmVzcyhkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgYnJpZ2h0bmVzczogc3RyaW5nKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBkYXRhW2ldICs9IDI1NSAqICgrYnJpZ2h0bmVzcyAvIDEwMCk7XG4gICAgICBkYXRhW2kgKyAxXSArPSAyNTUgKiAoK2JyaWdodG5lc3MgLyAxMDApO1xuICAgICAgZGF0YVtpICsgMl0gKz0gMjU1ICogKCticmlnaHRuZXNzIC8gMTAwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29udHJhc3QoZGF0YTogVWludDhDbGFtcGVkQXJyYXksIGNvbnRyYXN0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBmYWN0b3IgPSAoMjU5LjAgKiAoK2NvbnRyYXN0ICsgMjU1LjApKSAvICgyNTUuMCAqICgyNTkuMCAtICtjb250cmFzdCkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBkYXRhW2ldID0gdGhpcy50cnVuY2F0ZUNvbG9yKGZhY3RvciAqIChkYXRhW2ldIC0gMTI4LjApICsgMTI4LjApO1xuICAgICAgZGF0YVtpICsgMV0gPSB0aGlzLnRydW5jYXRlQ29sb3IoZmFjdG9yICogKGRhdGFbaSArIDFdIC0gMTI4LjApICsgMTI4LjApO1xuICAgICAgZGF0YVtpICsgMl0gPSB0aGlzLnRydW5jYXRlQ29sb3IoZmFjdG9yICogKGRhdGFbaSArIDJdIC0gMTI4LjApICsgMTI4LjApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJ1bmNhdGVDb2xvcih2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICB2YWx1ZSA9IDA7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA+IDI1NSkge1xuICAgICAgdmFsdWUgPSAyNTU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXIoe1xuICAgIHZpZGVvLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBjb250cmFzdCxcbiAgICBicmlnaHRuZXNzLFxuICB9OiB7XG4gICAgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQ7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICBjb250cmFzdDogc3RyaW5nO1xuICAgIGJyaWdodG5lc3M6IHN0cmluZztcbiAgfSkge1xuICAgIGlmICghdGhpcy5jYW52YXNIZWxwZXIpIHtcbiAgICAgIHRoaXMuY2FudmFzSGVscGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgICAgdGhpcy5jYW52YXNIZWxwZXIud2lkdGggPSB3aWR0aDtcbiAgICAgIHRoaXMuY2FudmFzSGVscGVyLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBjb25zdCBjb250ZXh0SGVscGVyID0gdGhpcy5jYW52YXNIZWxwZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgaWYgKGNvbnRleHRIZWxwZXIpIHtcbiAgICAgIGNvbnRleHRIZWxwZXIuZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgY29uc3QgaWRhdGEgPSBjb250ZXh0SGVscGVyLmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgY29uc3QgZGF0YSA9IGlkYXRhLmRhdGE7XG5cbiAgICAgIHRoaXMuYXBwbHlCcmlnaHRuZXNzKGRhdGEsIGJyaWdodG5lc3MpO1xuICAgICAgdGhpcy5hcHBseUNvbnRyYXN0KGRhdGEsIGNvbnRyYXN0KTtcblxuICAgICAgcmV0dXJuIGlkYXRhO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW52YXNWaWRlbztcbiIsImltcG9ydCBBbmFseXNlIGZyb20gXCIuL2F1ZGlvQW5hbHlzZVwiO1xuaW1wb3J0IENhbnZhc1ZpZGVvIGZyb20gXCIuL2NhbnZhc1ZpZGVvXCI7XG5cbi8qKlxuICogUGxheWVyVGVtcGxhdGUgLSBnZW5lcmF0ZSB2aWRlby1wbGF5ZXIgZnJvbSA8dGVtcGxhdGU+IHRhZ1xuICovXG5leHBvcnQgY2xhc3MgUGxheWVyVGVtcGxhdGUge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcGxhdGUtcGxheWVyXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKGlkOiBzdHJpbmcpOiBOb2RlIHtcbiAgICBjb25zdCBlbGVtZW50OiBOb2RlID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi52aWRlb2NvbnRyb2wtbGlzdF9faXRlbVwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcblxuICAgIC8vIHBsYXllci17aWR9XG4gICAgY29uc3QgcGxheWVyRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gKGVsZW1lbnQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJcIik7XG5cbiAgICBwbGF5ZXJFbGVtZW50ICYmIHBsYXllckVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xuXG4gICAgLy8gcGxheWVyLXtpZH0tdmlkZW9cbiAgICBjb25zdCB2aWRlb0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IChlbGVtZW50IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcblxuICAgIGlmICh2aWRlb0VsZW1lbnQpIHtcbiAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpZH0tdmlkZW9gKTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIte2lkfS13ZWJnbC12aWRlb1xuICAgIGNvbnN0IGlucHV0RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gKGVsZW1lbnQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgIGlucHV0RWxlbWVudCAmJiBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aWR9LXdlYmdsLXZpZGVvYCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuXG4vKipcbiAqIFBsYXllciBpcyBhIHdyYXBwZXIgYXJvdW5kIGh0bWw1IHZpZGVvIGVsZW1lbnQgYW5kIEhMUyBzdGFuZGFydCxcbiAqIGl0IGhhcyBzcGVjaWFsIGJlaGF2aW9yIGZvciBvdXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBwdWJsaWMgc2V0dGluZ3M6IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBjYW52YXNJbml0ZWQ6IGJvb2xlYW47XG4gICAgY29udGFpbmVyQm91bmRzOiB7XG4gICAgICBsZWZ0OiBudW1iZXI7XG4gICAgICB0b3A6IG51bWJlcjtcbiAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICB9O1xuICAgIGlzRnVsbHNjcmVlbjogYm9vbGVhbjtcbiAgfTtcblxuICBwdWJsaWMgdmlkZW9TZXR0aW5nczoge1xuICAgIGJyaWdodG5lc3M6IHN0cmluZztcbiAgICBjb250cmFzdDogc3RyaW5nO1xuICAgIGlzRnVsbHNjcmVlbjogYm9vbGVhbjtcbiAgfTtcblxuICBwdWJsaWMgY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBwbGF5ZXI6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcHVibGljIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50IHwgbnVsbDtcbiAgcHVibGljIGJyaWdodG5lc3NSYW5nZTogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG4gIHB1YmxpYyBub2lzZUxldmVsUmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xuICBwdWJsaWMgY29udHJhc3RSYW5nZTogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5cbiAgcHVibGljIGNhbnZhc1ZpZGVvOiBDYW52YXNWaWRlbztcblxuICBwdWJsaWMgaW5pdFByb21pc2U6IFByb21pc2U8SFRNTFZpZGVvRWxlbWVudD47XG4gIHB1YmxpYyBhbmFseXNlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICB1cmwsXG4gICAgY29udGFpbmVyRWxlbWVudCxcbiAgICBwbGF5ZXJFbGVtZW50XG4gIH06IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBjb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwbGF5ZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgfSkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICB1cmwsXG4gICAgICBjYW52YXNJbml0ZWQ6IGZhbHNlLFxuICAgICAgY29udGFpbmVyQm91bmRzOiB7XG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMFxuICAgICAgfSxcbiAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy52aWRlb1NldHRpbmdzID0ge1xuICAgICAgYnJpZ2h0bmVzczogXCIwXCIsXG4gICAgICBjb250cmFzdDogXCIwXCIsXG4gICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lckVsZW1lbnQ7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXJFbGVtZW50O1xuICAgIHRoaXMudmlkZW8gPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcbiAgICB0aGlzLmJyaWdodG5lc3NSYW5nZSA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJfX2JyaWdodG5lc3NcIik7XG4gICAgdGhpcy5ub2lzZUxldmVsUmFuZ2UgPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmMtcGxheWVyX19ub2lzZS1sZXZlbFwiKTtcbiAgICB0aGlzLmNvbnRyYXN0UmFuZ2UgPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmMtcGxheWVyX19jb250cmFzdFwiKTtcblxuICAgIHRoaXMuY2FudmFzVmlkZW8gPSBuZXcgQ2FudmFzVmlkZW8oe1xuICAgICAgdmlkZW86IHRoaXMudmlkZW8sXG4gICAgICB2aWRlb1BsYXllcjogdGhpcy5wbGF5ZXJcbiAgICB9KTtcblxuICAgIHRoaXMuaW5pdFByb21pc2UgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gIH1cblxuICBwdWJsaWMgaW5pdCgpIHtcbiAgICBpZiAodGhpcy5pbml0UHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb21pc2U7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuSGxzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgY29uc3QgaGxzID0gbmV3IHdpbmRvdy5IbHMoKTtcblxuICAgICAgICBobHMubG9hZFNvdXJjZSh0aGlzLnNldHRpbmdzLnVybCk7XG4gICAgICAgIGhscy5hdHRhY2hNZWRpYSh0aGlzLnZpZGVvKTtcblxuICAgICAgICBobHMub24od2luZG93Lkhscy5FdmVudHMuTUFOSUZFU1RfUEFSU0VELCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLnZpZGVvKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmlkZW8uY2FuUGxheVR5cGUoXCJhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybFwiKSkge1xuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IHRoaXMuc2V0dGluZ3MudXJsO1xuXG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMudmlkZW8pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwbGF5KCkge1xuICAgIHRoaXMudmlkZW8ucGxheSgpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKSB7XG4gICAgdGhpcy52aWRlby5wYXVzZSgpO1xuICB9XG5cbiAgcHVibGljIG9wZW5GdWxsc2NyZWVuKCkge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmlzRnVsbHNjcmVlbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuc2V0Q29udGFpbmVyQm91bmRzKCk7XG5cbiAgICBjb25zdCB7IGNvbnRhaW5lckJvdW5kcyB9ID0gdGhpcy5zZXR0aW5ncztcblxuICAgIHRoaXMudmlkZW8ubXV0ZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHBsYXllckJvdW5kcyA9IHRoaXMucGxheWVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gYFxuICAgICAgICB0cmFuc2xhdGVYKDBweClcbiAgICAgICAgdHJhbnNsYXRlWSgwcHgpXG4gICAgYDtcblxuICAgIHRoaXMucGxheWVyLnN0eWxlLndpZHRoID0gcGxheWVyQm91bmRzLndpZHRoICsgXCJweFwiO1xuICAgIHRoaXMucGxheWVyLnN0eWxlLmhlaWdodCA9IHBsYXllckJvdW5kcy5oZWlnaHQgKyBcInB4XCI7XG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gXCJcIjtcbiAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBcIlwiO1xuICAgIHRoaXMucGxheWVyLnN0eWxlLnpJbmRleCA9IFwiMlwiO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcInRyYW5zZm9ybSwgd2lkdGgsIGhlaWdodFwiO1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwLjNzXCI7XG5cbiAgICAgIC8vIG1vdmUgZWxlbWVudCB0byB0b3AvbGVmdCBib3VuZGVyIG9mIHRoZSBsaXN0LWNvbnRhaW5lclxuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gYFxuICAgICAgICB0cmFuc2xhdGVYKC0ke3BsYXllckJvdW5kcy5sZWZ0IC0gY29udGFpbmVyQm91bmRzLmxlZnR9cHgpXG4gICAgICAgIHRyYW5zbGF0ZVkoLSR7cGxheWVyQm91bmRzLnRvcCAtIGNvbnRhaW5lckJvdW5kcy50b3B9cHgpXG4gICAgICBgO1xuXG4gICAgICB0aGlzLnBsYXllci5zdHlsZS53aWR0aCA9IGNvbnRhaW5lckJvdW5kcy53aWR0aCArIFwicHhcIjtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLmhlaWdodCA9IGNvbnRhaW5lckJvdW5kcy5oZWlnaHQgKyBcInB4XCI7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldHRpbmdzLmlzRnVsbHNjcmVlbiA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VGdWxsc2NyZWVuKCkge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5pc0Z1bGxzY3JlZW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZGVvLm11dGVkID0gdHJ1ZTtcblxuICAgIHRoaXMucGxheWVyLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGBcbiAgICAgICAgICB0cmFuc2xhdGVYKDBweClcbiAgICAgICAgICB0cmFuc2xhdGVZKDBweClcbiAgICAgIGA7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldHRpbmdzLmlzRnVsbHNjcmVlbiA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IChlOiBFdmVudCkgPT4gdm9pZCkge1xuICAgIHRoaXMucGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q29udGFpbmVyQm91bmRzKCkge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHMpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MuY29udGFpbmVyQm91bmRzID0gdGhpcy5jb250YWluZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcztcbiAgfVxuXG4gIHByaXZhdGUgcGxheVZpZGVvT25DYW52YXMoKSB7XG4gICAgdGhpcy5zZXRDb250YWluZXJCb3VuZHMoKTtcblxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5jYW52YXNJbml0ZWQpIHtcbiAgICAgIHRoaXMudmlkZW8uY2xhc3NMaXN0LmFkZChcInZjLXBsYXllcl9fdmlkZW9fc3RhdGUtaGlkZGVuXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2FudmFzVmlkZW8ucGxheSh7XG4gICAgICBjYW52YXNJbml0ZWQ6IHRoaXMuc2V0dGluZ3MuY2FudmFzSW5pdGVkLFxuICAgICAgc2l6ZToge1xuICAgICAgICB3aWR0aDogdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHMuaGVpZ2h0XG4gICAgICB9LFxuICAgICAgYnJpZ2h0bmVzczogdGhpcy52aWRlb1NldHRpbmdzLmJyaWdodG5lc3MsXG4gICAgICBjb250cmFzdDogdGhpcy52aWRlb1NldHRpbmdzLmNvbnRyYXN0XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldHRpbmdzLmNhbnZhc0luaXRlZCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZUJyaWdodG5lc3ModmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmlkZW9TZXR0aW5ncy5icmlnaHRuZXNzID0gdmFsdWU7XG5cbiAgICB0aGlzLnBsYXlWaWRlb09uQ2FudmFzKCk7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZUNvbnRyYXN0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZGVvU2V0dGluZ3MuY29udHJhc3QgPSB2YWx1ZTtcblxuICAgIHRoaXMucGxheVZpZGVvT25DYW52YXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEV2ZW50cygpIHtcbiAgICB0aGlzLmJyaWdodG5lc3NSYW5nZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUJyaWdodG5lc3MoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY29udHJhc3RSYW5nZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUNvbnRyYXN0KChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFuYWx5c2VyID0gbmV3IEFuYWx5c2Uoe1xuICAgICAgdmlkZW86IHRoaXMudmlkZW8sXG4gICAgICBub2lzZUxldmVsUmFuZ2U6IHRoaXMubm9pc2VMZXZlbFJhbmdlXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJyb2FkY2FzdCB9IGZyb20gXCIuLi8uLi90eXBlcy9pbmRleFwiO1xuaW1wb3J0IHsgUGxheWVyLCBQbGF5ZXJUZW1wbGF0ZSB9IGZyb20gXCIuL3BsYXllclwiO1xuXG4vKipcbiAqIFZpZGVvY29udHJvbCByZXByZXNlbnRzIGNvbnRyb2xsZXIgb3ZlciBvdXIgZmVhdHVyZSxcbiAqIGl0IGluaXRpYWxpemVzIGJyb2FkY2FzdHMgYW5kIGludGVyYWN0IHdpdGggdXNlcidzIGFjdGlvbnNcbiAqL1xuY2xhc3MgVmlkZW9jb250cm9sIHtcbiAgcHVibGljIGJyb2FkY2FzdHM6IEJyb2FkY2FzdFtdO1xuICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBlbGVtZW50U2hvd0FsbDogSFRNTEVsZW1lbnQ7XG5cbiAgcHVibGljIHN0YXRlOiB7XG4gICAgZnVsbHNjcmVlbklkOiBudW1iZXI7XG4gIH07XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIGJyb2FkY2FzdHMsXG4gICAgZWxlbWVudFNob3dBbGwsXG4gICAgZWxlbWVudCxcbiAgfToge1xuICAgIGJyb2FkY2FzdHM6IEJyb2FkY2FzdFtdO1xuICAgIGVsZW1lbnRTaG93QWxsOiBIVE1MRWxlbWVudDtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgfSkge1xuICAgIHRoaXMuYnJvYWRjYXN0cyA9IGJyb2FkY2FzdHM7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmVsZW1lbnRTaG93QWxsID0gZWxlbWVudFNob3dBbGw7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZnVsbHNjcmVlbklkOiBJbmZpbml0eSxcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0UGxheWVycygpO1xuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZUZ1bGxQbGF5ZXIoKSB7XG4gICAgLy8gcGxheSBhbGwgcGxheWVyc1xuICAgIHRoaXMuYnJvYWRjYXN0cy5mb3JFYWNoKChicm9hZGNhc3QpID0+IGJyb2FkY2FzdC5wbGF5ZXIucGxheSgpKTtcblxuICAgIHRoaXMuYnJvYWRjYXN0c1t0aGlzLnN0YXRlLmZ1bGxzY3JlZW5JZF0ucGxheWVyLmNsb3NlRnVsbHNjcmVlbigpO1xuXG4gICAgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuSWQgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuRnVsbFBsYXllcihpZDogbnVtYmVyKSB7XG4gICAgLy8gc3RvcCBhbGwgcGxheWVycyBleGNlcHQgYSBmdWxsc2NyZWVuXG4gICAgdGhpcy5icm9hZGNhc3RzXG4gICAgICAuZmlsdGVyKChicm9hZGNhc3QpID0+IGJyb2FkY2FzdC5pZCAhPT0gaWQpXG4gICAgICAuZm9yRWFjaCgoYnJvYWRjYXN0KSA9PiBicm9hZGNhc3QucGxheWVyLnN0b3AoKSk7XG5cbiAgICAvLyBvcGVuIHBsYXllciBpbiBmdWxsc2NyZWVuXG4gICAgdGhpcy5icm9hZGNhc3RzW2lkXS5wbGF5ZXIub3BlbkZ1bGxzY3JlZW4oKTtcblxuICAgIHRoaXMuc3RhdGUuZnVsbHNjcmVlbklkID0gaWQ7XG4gIH1cblxuICBwcml2YXRlIGluaXRFdmVudHMoKSB7XG4gICAgdGhpcy5lbGVtZW50U2hvd0FsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZUZ1bGxQbGF5ZXIoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudFNob3dBbGwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsICgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2VGdWxsUGxheWVyKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRQbGF5ZXJzKCkge1xuICAgIHRoaXMuYnJvYWRjYXN0cy5mb3JFYWNoKChicm9hZGNhc3QsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBWaWRlb1RlbXBsYXRlOiBQbGF5ZXJUZW1wbGF0ZSA9IG5ldyBQbGF5ZXJUZW1wbGF0ZSgpO1xuICAgICAgY29uc3QgbGlzdFZpZGVvRWxlbWVudDogTm9kZSA9IFZpZGVvVGVtcGxhdGUucmVuZGVyKGBwbGF5ZXItJHtpbmRleCArIDF9YCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChsaXN0VmlkZW9FbGVtZW50KTtcblxuICAgICAgY29uc3QgVmlkZW9QbGF5ZXIgPSBuZXcgUGxheWVyKHtcbiAgICAgICAgY29udGFpbmVyRWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICBwbGF5ZXJFbGVtZW50OiAobGlzdFZpZGVvRWxlbWVudCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKFwiLnZjLXBsYXllclwiKSxcbiAgICAgICAgdXJsOiBicm9hZGNhc3QudXJsLFxuICAgICAgfSk7XG5cbiAgICAgIFZpZGVvUGxheWVyLmluaXQoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgVmlkZW9QbGF5ZXIucGxheSgpO1xuXG4gICAgICAgICAgLy8gSW5pdCBldmVudHNcbiAgICAgICAgICBWaWRlb1BsYXllci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZ1bGxQbGF5ZXIoaW5kZXgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgVmlkZW9QbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9wZW5GdWxsUGxheWVyKGluZGV4KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFNhdmUgcGxheWVyIHRvIGJyb2FkY2FzdHMgYXJyYXlcbiAgICAgICAgICB0aGlzLmJyb2FkY2FzdHNbaW5kZXhdLmlkID0gaW5kZXg7XG4gICAgICAgICAgdGhpcy5icm9hZGNhc3RzW2luZGV4XS5wbGF5ZXIgPSBWaWRlb1BsYXllcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUud2FybihlcnIpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWaWRlb2NvbnRyb2w7XG4iLCJjbGFzcyBDYW1lcmFXaWRnZXQge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LWNhbWVyYS10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBOb2RlIHtcbiAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW1lcmFXaWRnZXQ7XG4iLCJpbXBvcnQgeyBJV2lkZ2V0UGxheWVyRGF0YSB9IGZyb20gXCIuLi8uLi90eXBlcy9pbmRleFwiO1xuXG5jbGFzcyBQbGF5ZXJXaWRnZXQge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIHB1YmxpYyBkYXRhOiBJV2lkZ2V0UGxheWVyRGF0YTtcbiAgcHVibGljIHdpZGdldDogTm9kZTtcblxuICBjb25zdHJ1Y3Rvcih7IGRhdGEgfTogeyBkYXRhOiBJV2lkZ2V0UGxheWVyRGF0YSB9KSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXBsYXllci10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBOb2RlIHtcbiAgICB0aGlzLnNldENvdmVyKCk7XG5cbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5wbGF5ZXItbm93X190aXRsZVwiLCBgJHt0aGlzLmRhdGEuYXJ0aXN0fSAke3RoaXMuZGF0YS50cmFjay5uYW1lfWApO1xuXG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIucGxheWVyLXByb2dyZXNzX190aW1lXCIsIHRoaXMuZGF0YS50cmFjay5sZW5ndGgpO1xuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLnBsYXllci12b2x1bWVfX3BlcmNlbnRhZ2VcIiwgYCR7dGhpcy5kYXRhLnZvbHVtZX0lYCk7XG5cbiAgICByZXR1cm4gdGhpcy53aWRnZXQ7XG4gIH1cblxuICBwcml2YXRlIHNldElubmVyVGV4dChzZWxlY3Rvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBibG9jazogSFRNTEVsZW1lbnQgPSAodGhpcy53aWRnZXQgYXMgSFRNTEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYgKGJsb2NrKSB7XG4gICAgICBibG9jay5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q292ZXIoKSB7XG4gICAgY29uc3QgYmxvY2sgPSAodGhpcy53aWRnZXQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbm93X19jb3ZlclwiKTtcblxuICAgIGJsb2NrLnNldEF0dHJpYnV0ZShcInNyY1wiLCB0aGlzLmRhdGEuYWxidW1jb3Zlcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyV2lkZ2V0O1xuIiwiaW1wb3J0IHsgSVdpZGdldFF1ZXN0aW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcblxuY2xhc3MgUXVlc3Rpb25zV2lkZ2V0IHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICBwdWJsaWMgZGF0YTogSVdpZGdldFF1ZXN0aW9uc0RhdGE7XG4gIHB1YmxpYyB3aWRnZXQ6IE5vZGU7XG5cbiAgY29uc3RydWN0b3IoeyBkYXRhIH06IHsgZGF0YTogSVdpZGdldFF1ZXN0aW9uc0RhdGEgfSkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1xdWVzdGlvbnMtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogTm9kZSB7XG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIuYnV0dG9uX3R5cGUteWVsbG93XCIsIHRoaXMuZGF0YS5idXR0b25zWzBdKTtcbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5idXR0b25fdHlwZS1ncmV5XCIsIHRoaXMuZGF0YS5idXR0b25zWzFdKTtcblxuICAgIHJldHVybiB0aGlzLndpZGdldDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJUZXh0KHNlbGVjdG9yOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IGJsb2NrOiBIVE1MRWxlbWVudCA9ICh0aGlzLndpZGdldCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmIChibG9jaykge1xuICAgICAgYmxvY2suaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUXVlc3Rpb25zV2lkZ2V0O1xuIiwiY2xhc3MgU3RhdHNXaWRnZXQge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXN0YXRzLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IE5vZGUge1xuICAgIHJldHVybiB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRzV2lkZ2V0O1xuIiwiaW1wb3J0IHsgSVdpZGdldFRoZW1hbERhdGEgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcblxuY2xhc3MgVGhlbWFsV2lkZ2V0IHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICBwdWJsaWMgZGF0YTogSVdpZGdldFRoZW1hbERhdGE7XG4gIHB1YmxpYyB3aWRnZXQ6IE5vZGU7XG5cbiAgY29uc3RydWN0b3IoeyBkYXRhIH06IHsgZGF0YTogSVdpZGdldFRoZW1hbERhdGEgfSkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC10aGVybWFsLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IE5vZGUge1xuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFxuICAgICAgXCIud2lkZ2V0LXNlbnNvcl90eXBlLXRlbXAgLndpZGdldC1zZW5zb3JfX3ZhbHVlXCIsXG4gICAgICBgJHt0aGlzLmRhdGEudGVtcGVyYXR1cmV9Q2AsXG4gICAgKTtcblxuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFxuICAgICAgXCIud2lkZ2V0LXNlbnNvcl90eXBlLWh1bWlkaXR5IC53aWRnZXQtc2Vuc29yX192YWx1ZVwiLFxuICAgICAgYCR7dGhpcy5kYXRhLmh1bWlkaXR5fSVgLFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy53aWRnZXQ7XG4gIH1cblxuICBwcml2YXRlIHNldElubmVyVGV4dChzZWxlY3Rvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBibG9jazogSFRNTEVsZW1lbnQgPSAodGhpcy53aWRnZXQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoYmxvY2spIHtcbiAgICAgIGJsb2NrLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRoZW1hbFdpZGdldDtcbiIsImltcG9ydCBDYW1lcmFXaWRnZXQgZnJvbSBcIi4vY2FtZXJhLndpZGdldFwiO1xuaW1wb3J0IFBsYXllcldpZGdldCBmcm9tIFwiLi9wbGF5ZXIud2lkZ2V0XCI7XG5pbXBvcnQgUXVlc3Rpb25zV2lkZ2V0IGZyb20gXCIuL3F1ZXN0aW9ucy53aWRnZXRcIjtcbmltcG9ydCBTdGF0c1dpZGdldCBmcm9tIFwiLi9zdGF0cy53aWRnZXRcIjtcbmltcG9ydCBUaGVtYWxXaWRnZXQgZnJvbSBcIi4vdGhlbWFsLndpZGdldFwiO1xuXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tIFwiLi4vLi4vc3RvcmVcIjtcbmltcG9ydCB7IG1hcmtFdmVudEFzUmVhZCB9IGZyb20gXCIuLi8uLi9zdG9yZS9ldmVudHMvYWN0aW9uQ3JlYXRvcnNcIjtcblxuaW1wb3J0IFVzZXJSZWFkRXZlbnRzU2VydmljZSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlclJlYWRFdmVudHNTZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIFR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCBXSURHRVRfVFlQRVMgPSB7XG4gIFNUQVRTOiBcIlNUQVRTXCIsXG4gIENBTUVSQTogXCJDQU1FUkFcIixcbiAgVEhFUk1BTDogXCJUSEVSTUFMXCIsXG4gIFBMQVlFUjogXCJQTEFZRVJcIixcbiAgUVVFU1RJT05TOiBcIlFVRVNUSU9OU1wiLFxuICBERUZBVUxUOiBcIkRFRkFVTFRcIlxufTtcblxuLy8gVE9ETzogYWRkIG1ldGhvZCBkZXN0b3ksIGZvciByZW1vdmluZyBldmVudHMsIHdoZW4gd2lkZ2V0IGRlbGV0ZWQgZnJvbSBkb21cbmNsYXNzIFdpZGdldCB7XG4gIHB1YmxpYyBldmVudDogVHlwZXMuRXZlbnQ7XG4gIHB1YmxpYyBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIHB1YmxpYyB3aWRnZXQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHsgZXZlbnQsIGNvbnRhaW5lciB9OiB7IGV2ZW50OiBUeXBlcy5FdmVudDsgY29udGFpbmVyOiBIVE1MRWxlbWVudCB9KSB7XG4gICAgdGhpcy5ldmVudCA9IGV2ZW50O1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0XCIpLmNsb25lTm9kZSh0cnVlKTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5hZGQoYHdpZGdldF9zaXplLSR7dGhpcy5ldmVudC5zaXplfWApO1xuICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5hZGQoYHdpZGdldF90eXBlLSR7dGhpcy5ldmVudC50eXBlfWApO1xuXG4gICAgdGhpcy5zZXRIZWFkZXJEYXRhKCk7XG4gICAgdGhpcy5zZXREZXNjcmlwdGlvbigpO1xuICAgIHRoaXMucmVuZGVyRGF0YVRlbXBsYXRlKCk7XG4gICAgdGhpcy5zZXRFdmVudExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy53aWRnZXQpO1xuICB9XG5cbiAgcHVibGljIG1hcmtXaWRnZXRBc1JlYWQoKTogdm9pZCB7XG4gICAgVXNlclJlYWRFdmVudHNTZXJ2aWNlLm1hcmtFdmVudEFzUmVhZCh0aGlzLmV2ZW50LmlkKTtcblxuICAgIERpc3BhdGNoZXIuZGlzcGF0Y2gobWFya0V2ZW50QXNSZWFkKHRoaXMuZXZlbnQuaWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RGVzY3JpcHRpb24oKSB7XG4gICAgaWYgKHRoaXMuZXZlbnQuZGVzY3JpcHRpb24gJiYgdGhpcy53aWRnZXQpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRUZXh0ID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtY29udGVudF9fdGV4dFwiKTtcbiAgICAgIGNvbnN0IHRleHRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1jb250ZW50X190ZXh0XCIpO1xuXG4gICAgICBpZiAoY29udGVudFRleHQpIHtcbiAgICAgICAgY29udGVudFRleHQuY2xhc3NMaXN0LmFkZChgd2lkZ2V0LWNvbnRlbnRfX3RleHRfd2lkdGgtJHt0aGlzLmV2ZW50LnNpemV9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0ZXh0RWxlbWVudCkge1xuICAgICAgICB0ZXh0RWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmV2ZW50LmRlc2NyaXB0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0SGVhZGVyRGF0YSgpIHtcbiAgICBjb25zdCB0aXRsZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi53aWRnZXQtaGVhZGVyLWFib3V0X190aXRsZVwiXG4gICAgKTtcbiAgICBjb25zdCB0eXBlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtaGVhZGVyX190eXBlXCIpO1xuICAgIGNvbnN0IGRhdGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1oZWFkZXJfX2RhdGVcIik7XG4gICAgY29uc3QgaWNvblVzZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi53aWRnZXQtaGVhZGVyLWFib3V0X19pY29uID4gdXNlXCJcbiAgICApO1xuICAgIGNvbnN0IGljb25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1oZWFkZXItYWJvdXRfX2ljb25cIik7XG5cbiAgICBpZiAodGl0bGVFbGVtZW50KSB7XG4gICAgICB0aXRsZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5ldmVudC50aXRsZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZUVsZW1lbnQpIHtcbiAgICAgIHR5cGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQuc291cmNlO1xuICAgIH1cblxuICAgIGlmIChkYXRlRWxlbWVudCkge1xuICAgICAgZGF0ZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5ldmVudC50aW1lO1xuICAgIH1cblxuICAgIGlmIChpY29uVXNlRWxlbWVudCkge1xuICAgICAgaWNvblVzZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwieGxpbms6aHJlZlwiLCBgIyR7dGhpcy5ldmVudC5pY29ufWApO1xuICAgIH1cblxuICAgIGlmIChpY29uRWxlbWVudCkge1xuICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChgaWNvbl8ke3RoaXMuZXZlbnQuaWNvbn1gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGNsb3NlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXRfX2NvbnRyb2xfY2xvc2VcIik7XG5cbiAgICBpZiAoY2xvc2VFbGVtZW50KSB7XG4gICAgICBjbG9zZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5tYXJrV2lkZ2V0QXNSZWFkKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldERhdGFUZW1wbGF0ZVR5cGUoKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IGRhdGEgPSB7IHR5cGU6IFwiZW1wdHlcIiB9LCBpY29uIH0gPSB0aGlzLmV2ZW50O1xuXG4gICAgaWYgKGljb24gPT09IFwiY2FtXCIpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuQ0FNRVJBO1xuICAgIH1cblxuICAgIGlmICgoZGF0YSBhcyBUeXBlcy5JV2lkZ2V0VGhlbWFsRGF0YSkudGVtcGVyYXR1cmUpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuVEhFUk1BTDtcbiAgICB9XG5cbiAgICBpZiAoKGRhdGEgYXMgVHlwZXMuSVdpZGdldFBsYXllckRhdGEpLmFsYnVtY292ZXIpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuUExBWUVSO1xuICAgIH1cblxuICAgIGlmICgoZGF0YSBhcyBUeXBlcy5JV2lkZ2V0UXVlc3Rpb25zRGF0YSkuYnV0dG9ucykge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5RVUVTVElPTlM7XG4gICAgfVxuXG4gICAgaWYgKChkYXRhIGFzIFR5cGVzLklXaWRnZXREZWZhdWx0RGF0YSkudHlwZSA9PT0gXCJncmFwaFwiKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLlNUQVRTO1xuICAgIH1cblxuICAgIHJldHVybiBXSURHRVRfVFlQRVMuREVGQVVMVDtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyRGF0YVRlbXBsYXRlKCkge1xuICAgIGNvbnN0IHRlbXBsYXRlRGF0YVR5cGUgPSB0aGlzLmdldERhdGFUZW1wbGF0ZVR5cGUoKTtcbiAgICBsZXQgZGF0YUNvbnRlbnRCbG9jayA9IG51bGw7XG5cbiAgICBzd2l0Y2ggKHRlbXBsYXRlRGF0YVR5cGUpIHtcbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlNUQVRTOlxuICAgICAgICBjb25zdCBzdGF0c1dpZGdldCA9IG5ldyBTdGF0c1dpZGdldCgpO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBzdGF0c1dpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuQ0FNRVJBOlxuICAgICAgICBjb25zdCBjYW1lcmFXaWRnZXQgPSBuZXcgQ2FtZXJhV2lkZ2V0KCk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IGNhbWVyYVdpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuUExBWUVSOlxuICAgICAgICAvKipcbiAgICAgICAgICogVE9ETzog0J3QtSDQv9C+0L3QuNC80LDRjiwg0LrQsNC6INC30LTQtdGB0Ywg0LzQvtC20L3QviDQvtCx0L7QudGC0LjRgdGMINCx0LXQtyBhc3NpZ25tZW50XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBwbGF5ZXJXaWRnZXQgPSBuZXcgUGxheWVyV2lkZ2V0KHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmV2ZW50LmRhdGEgYXMgVHlwZXMuSVdpZGdldFBsYXllckRhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IHBsYXllcldpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuUVVFU1RJT05TOlxuICAgICAgICBjb25zdCBxdWVzdGlvbnNXaWRnZXQgPSBuZXcgUXVlc3Rpb25zV2lkZ2V0KHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmV2ZW50LmRhdGEgYXMgVHlwZXMuSVdpZGdldFF1ZXN0aW9uc0RhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IHF1ZXN0aW9uc1dpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuVEhFUk1BTDpcbiAgICAgICAgY29uc3QgdGhlcm1hbFdpZGdldCA9IG5ldyBUaGVtYWxXaWRnZXQoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuZXZlbnQuZGF0YSBhcyBUeXBlcy5JV2lkZ2V0VGhlbWFsRGF0YVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gdGhlcm1hbFdpZGdldC5yZW5kZXIoKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoZGF0YUNvbnRlbnRCbG9jaykge1xuICAgICAgY29uc3Qgd2lkZ2V0Q29udGVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtY29udGVudFwiKTtcblxuICAgICAgaWYgKHdpZGdldENvbnRlbnQpIHtcbiAgICAgICAgd2lkZ2V0Q29udGVudC5hcHBlbmRDaGlsZChkYXRhQ29udGVudEJsb2NrKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2lkZ2V0O1xuIiwiaW1wb3J0IFdpZGdldCBmcm9tIFwiLi4vY29tcG9uZW50cy93aWRnZXQvd2lkZ2V0XCI7XG5cbmltcG9ydCBFdmVudHNTdG9yZSBmcm9tIFwiLi4vc3RvcmUvZXZlbnRzL2V2ZW50cy5zdG9yZVwiO1xuaW1wb3J0IHsgc2V0RXZlbnRzRGF0YSB9IGZyb20gXCIuLi9zdG9yZS9ldmVudHMvYWN0aW9uQ3JlYXRvcnNcIjtcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gXCIuLi9zdG9yZVwiO1xuXG5pbXBvcnQgVXNlclJlYWRFdmVudHNTZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlcy91c2VyUmVhZEV2ZW50c1NlcnZpY2VcIjtcblxuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmNsYXNzIEluZGV4UGFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIEV2ZW50c1N0b3JlLnN1YnNjcmliZSh0aGlzLnJlbmRlckRhc2hib2FyZFdpZGdldHMpO1xuXG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRFdmVudHMoKSB7XG4gICAgY29uc3QgdXNlclJlYWRFdmVudHM6IHN0cmluZ1tdID0gVXNlclJlYWRFdmVudHNTZXJ2aWNlLmdldFJlYWRFdmVudHMoKTtcblxuICAgIHRoaXMubG9hZEV2ZW50cygpLnRoZW4oKGV2ZW50czogVHlwZXMuRXZlbnRbXSkgPT4ge1xuICAgICAgbGV0IGZpbHRlcmVkRXZlbnRzOiBUeXBlcy5FdmVudFtdID0gW107XG5cbiAgICAgIGlmICghdXNlclJlYWRFdmVudHMpIHtcbiAgICAgICAgZmlsdGVyZWRFdmVudHMgPSBldmVudHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWx0ZXJlZEV2ZW50cyA9IGV2ZW50cy5maWx0ZXIoKGV2ZW50OiBUeXBlcy5FdmVudCkgPT4gIXVzZXJSZWFkRXZlbnRzLmluY2x1ZGVzKGV2ZW50LmlkKSk7XG4gICAgICB9XG5cbiAgICAgIERpc3BhdGNoZXIuZGlzcGF0Y2goc2V0RXZlbnRzRGF0YShmaWx0ZXJlZEV2ZW50cykpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJEYXNoYm9hcmRXaWRnZXRzKCkge1xuICAgIGNvbnN0IGV2ZW50c1N0b3JlRGF0YSA9IEV2ZW50c1N0b3JlLmdldERhdGEoKTtcbiAgICBjb25zdCBldmVudHM6IFR5cGVzLkV2ZW50W10gPSBldmVudHNTdG9yZURhdGEuZXZlbnRzLmZpbHRlcihcbiAgICAgIChldmVudDogVHlwZXMuRXZlbnQpID0+ICFldmVudC51c2VyUmVhZFxuICAgICk7XG5cbiAgICBjb25zdCBkYXNoYm9hcmRXaWRnZXRzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFzaGJvYXJkLWxpc3RcIik7XG5cbiAgICAvLyBDbGVhciBkYXNoYm9hcmRcbiAgICBkYXNoYm9hcmRXaWRnZXRzTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgaWYgKCFldmVudHMubGVuZ3RoKSB7XG4gICAgICBkYXNoYm9hcmRXaWRnZXRzTGlzdC5pbm5lckhUTUwgPSBcIjxoMj7QoyDQstCw0YEg0L3QtdGCINC90L7QstGL0YUg0YHQvtCx0YvRgtC40Lk8L2gyPlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBXaWRnZXQoe1xuICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgIGNvbnRhaW5lcjogZGFzaGJvYXJkV2lkZ2V0c0xpc3RcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxvYWRFdmVudHMoKTogUHJvbWlzZTxUeXBlcy5FdmVudFtdPiB7XG4gICAgLy8gc2VydmVyIHdvcmtzIG9ubHkgb24gbG9jYWxtYWNoaW5lXG4gICAgLy8gcnVuIG5wbSBzdGFydCBzZXJ2ZXIgZm9yIGl0XG4gICAgaWYgKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiKSB7XG4gICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2V2ZW50c1wiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICB0eXBlOiBcImNyaXRpY2FsOmluZm9cIixcbiAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgbGltaXQ6IDIwXG4gICAgICAgIH0pLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZldGNoKFwiZXZlbnRzLmpzb25cIilcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmV2ZW50cylcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmRleFBhZ2U7XG4iLCJpbXBvcnQgSGVhZGVyTmF2aWdhdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyXCI7XG5cbmltcG9ydCBJbmRleFBhZ2UgZnJvbSBcIi4vaW5kZXgucGFnZVwiO1xuaW1wb3J0IFZpZGVvY29udHJvbFBhZ2UgZnJvbSBcIi4vdmlkZW9jb250cm9sLnBhZ2VcIjtcblxuY2xhc3MgSW5pdEFwcGxpY2F0aW9uIHtcbiAgcHVibGljIHBhZ2U6IGFueTtcbiAgcHVibGljIGhlYWRlck5hdmlnYXRpb246IGFueTtcbiAgcHVibGljIGN1cnJlbnRQYWdlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByb3V0aW5nKCkge1xuICAgIHN3aXRjaCAodGhpcy5jdXJyZW50UGFnZSkge1xuICAgICAgY2FzZSBcIi9cIjpcbiAgICAgICAgdGhpcy5wYWdlID0gbmV3IEluZGV4UGFnZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIi92aWRlb2NvbnRyb2wuaHRtbFwiOlxuICAgICAgICB0aGlzLnBhZ2UgPSBuZXcgVmlkZW9jb250cm9sUGFnZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgdGhpcy5oZWFkZXJOYXZpZ2F0aW9uID0gbmV3IEhlYWRlck5hdmlnYXRpb24oe1xuICAgICAgc2VsZWN0b3I6IFwiI2hlYWRlci1tZW51XCIsXG4gICAgfSk7XG5cbiAgICB0aGlzLnJvdXRpbmcoKTtcbiAgfVxufVxuXG5uZXcgSW5pdEFwcGxpY2F0aW9uKCk7XG4iLCJpbXBvcnQgVmlkZW9jb250cm9sIGZyb20gXCIuLi9jb21wb25lbnRzL3ZpZGVvY29udHJvbC92aWRlb2NvbnRyb2xcIjtcblxuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmNsYXNzIFZpZGVvQ29udHJvbFBhZ2Uge1xuICBwdWJsaWMgYnJvYWRjYXN0czogVHlwZXMuQnJvYWRjYXN0W107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5icm9hZGNhc3RzID0gW1xuICAgICAge1xuICAgICAgICB1cmw6XG4gICAgICAgICAgXCJodHRwOi8vbG9jYWxob3N0OjkxOTEvbWFzdGVyP3VybD1odHRwJTNBJTJGJTJGbG9jYWxob3N0JTNBMzEwMiUyRnN0cmVhbXMlMkZzb3NlZCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmNhdCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmRvZyUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmhhbGwlMkZtYXN0ZXIubTN1OFwiLFxuICAgICAgICBwbGF5ZXI6IG51bGwsXG4gICAgICAgIGlkOiB1bmRlZmluZWQsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBjb25zdCBWaWRlb2NvbnRyb2xXaWRnZXQgPSBuZXcgVmlkZW9jb250cm9sKHtcbiAgICAgIGJyb2FkY2FzdHM6IHRoaXMuYnJvYWRjYXN0cyxcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmMtbGlzdFwiKSxcbiAgICAgIGVsZW1lbnRTaG93QWxsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZjLXNob3dhbGxcIiksXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW9Db250cm9sUGFnZTtcbiIsImV4cG9ydCBjb25zdCBzdG9yYWdlS2V5cyA9IHtcbiAgdXNlclJlYWRFdmVudHM6IFwidXNlclJlYWRFdmVudHNcIlxufTtcblxuY29uc3QgU3RvcmFnZVNlcnZpY2UgPSB7XG4gIHNldDogKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCA9PiB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9LFxuICBnZXQ6IChrZXk6IHN0cmluZyk6IGFueSA9PiB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlU2VydmljZTtcbiIsImltcG9ydCBTdG9yYWdlU2VydmljZSwgeyBzdG9yYWdlS2V5cyB9IGZyb20gXCIuL3N0b3JhZ2VTZXJ2aWNlXCI7XG5cbi8qKlxuICogU2VydmljZSB3b3JrIHdpdGggZXZlbnRzLCB3aGljaCB3YXMgbWFya2VkIHVzZXIgYXMgcmVhZCBpbiBMb2NhbFN0b3JhZ2VcbiAqL1xuY29uc3QgVXNlclJlYWRFdmVudHNTZXJ2aWNlID0ge1xuICAvKipcbiAgICogR2V0IG1hcmtlZCBhcyByZWFkIGV2ZW50c1xuICAgKi9cbiAgZ2V0UmVhZEV2ZW50czogKCk6IHN0cmluZ1tdID0+IHtcbiAgICBjb25zdCB1c2VyUmVhZEV2ZW50cyA9IEpTT04ucGFyc2UoU3RvcmFnZVNlcnZpY2UuZ2V0KHN0b3JhZ2VLZXlzLnVzZXJSZWFkRXZlbnRzKSk7XG5cbiAgICByZXR1cm4gdXNlclJlYWRFdmVudHM7XG4gIH0sXG4gIC8qKlxuICAgKiBTYXZlLCB0aGF0IGV2ZW50IGlzIG1hcmtlZCBhcyByZWFkXG4gICAqL1xuICBtYXJrRXZlbnRBc1JlYWQ6IChpZDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgdXNlclJlYWRFdmVudHM6IHN0cmluZ1tdID1cbiAgICAgIEpTT04ucGFyc2UoU3RvcmFnZVNlcnZpY2UuZ2V0KHN0b3JhZ2VLZXlzLnVzZXJSZWFkRXZlbnRzKSkgfHwgW107XG5cbiAgICB1c2VyUmVhZEV2ZW50cy5wdXNoKGlkKTtcblxuICAgIFN0b3JhZ2VTZXJ2aWNlLnNldChzdG9yYWdlS2V5cy51c2VyUmVhZEV2ZW50cywgSlNPTi5zdHJpbmdpZnkodXNlclJlYWRFdmVudHMpKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlclJlYWRFdmVudHNTZXJ2aWNlO1xuIiwiaW1wb3J0IHsgRXZlbnRzQWN0aW9ucyB9IGZyb20gXCIuL2V2ZW50cy5zdG9yZVwiO1xuXG5leHBvcnQgY29uc3Qgc2V0RXZlbnRzRGF0YSA9IChldmVudHM6IG9iamVjdFtdKSA9PiAoe1xuICB0eXBlOiBFdmVudHNBY3Rpb25zLlNFVF9FVkVOVFMsXG4gIHBheWxvYWQ6IHtcbiAgICBldmVudHNcbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBtYXJrRXZlbnRBc1JlYWQgPSAoaWQ6IHN0cmluZykgPT4gKHtcbiAgdHlwZTogRXZlbnRzQWN0aW9ucy5NQVJLX0VWRU5UX0FTX1JFQUQsXG4gIHBheWxvYWQ6IHtcbiAgICBpZFxuICB9XG59KTtcbiIsImltcG9ydCB7IFN0b3JlLCBUeXBlcyB9IGZyb20gXCJzaHJpZmx1eFwiO1xuaW1wb3J0ICogYXMgQXBwTW9kZWxUeXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuLy8gQWN0aW9uc1xuZXhwb3J0IGNvbnN0IEV2ZW50c0FjdGlvbnMgPSB7XG4gIFNFVF9FVkVOVFM6IFwiU0VUX0VWRU5UU1wiLFxuICBNQVJLX0VWRU5UX0FTX1JFQUQ6IFwiTUFSS19FVkVOVF9BU19SRUFEXCJcbn07XG5cbi8vIFN0b3JlXG5pbnRlcmZhY2UgSUV2ZW50c1N0b3JlRGF0YSB7XG4gIGV2ZW50czogQXBwTW9kZWxUeXBlcy5FdmVudFtdO1xufVxuXG5jb25zdCBpbml0aWFsRGF0YTogSUV2ZW50c1N0b3JlRGF0YSA9IHtcbiAgZXZlbnRzOiBbXVxufTtcblxuY29uc3QgRXZlbnRzU3RvcmUgPSBuZXcgU3RvcmUoe1xuICBpbml0aWFsRGF0YVxufSk7XG5cbi8vIEVmZmVjdHMgZm9yIHN0b3JlXG5leHBvcnQgY29uc3QgRXZlbnRzRWZmZWN0cyA9IChhY3Rpb246IFR5cGVzLklBY3Rpb24pID0+IHtcbiAgY29uc3QgeyB0eXBlLCBwYXlsb2FkIH0gPSBhY3Rpb247XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBFdmVudHNBY3Rpb25zLlNFVF9FVkVOVFM6XG4gICAgICBFdmVudHNTdG9yZS51cGRhdGVEYXRhKHtcbiAgICAgICAgZXZlbnRzOiBwYXlsb2FkLmV2ZW50c1xuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEV2ZW50c0FjdGlvbnMuTUFSS19FVkVOVF9BU19SRUFEOlxuICAgICAgY29uc3QgZGF0YSA9IEV2ZW50c1N0b3JlLmdldERhdGEoKTtcblxuICAgICAgRXZlbnRzU3RvcmUudXBkYXRlRGF0YSh7XG4gICAgICAgIGV2ZW50czogZGF0YS5ldmVudHMubWFwKFxuICAgICAgICAgIChldmVudDogQXBwTW9kZWxUeXBlcy5FdmVudCkgPT5cbiAgICAgICAgICAgIGV2ZW50LmlkID09PSBwYXlsb2FkLmlkID8geyAuLi5ldmVudCwgdXNlclJlYWQ6IHRydWUgfSA6IGV2ZW50XG4gICAgICAgIClcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50c1N0b3JlO1xuIiwiaW1wb3J0IHsgRGlzcGF0Y2hlciB9IGZyb20gXCJzaHJpZmx1eFwiO1xuXG5pbXBvcnQgeyBFdmVudHNFZmZlY3RzIH0gZnJvbSBcIi4vZXZlbnRzL2V2ZW50cy5zdG9yZVwiO1xuXG5jb25zdCBhcHBEaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcblxuLy8gUmVnaXN0ZXIgYWxsIGVmZmVjdCBoZXJlXG5cbmFwcERpc3BhdGNoZXIucmVnaXN0ZXIoRXZlbnRzRWZmZWN0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcERpc3BhdGNoZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9