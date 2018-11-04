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




class IndexPage {
    constructor() {
        this.init();
    }
    init() {
        _store_events_events_store__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe(this.renderDashboardWidgets);
        this.loadEvents().then(events => {
            _store__WEBPACK_IMPORTED_MODULE_3__["default"].dispatch(Object(_store_events_actionCreators__WEBPACK_IMPORTED_MODULE_2__["setEventsData"])(events));
        });
    }
    renderDashboardWidgets() {
        const eventsStoreData = _store_events_events_store__WEBPACK_IMPORTED_MODULE_1__["default"].getData();
        const events = eventsStoreData.events;
        const dashboardWidgetsList = document.getElementById("dashboard-list");
        // Clear dashboard
        dashboardWidgetsList.innerHTML = "";
        events.forEach(event => {
            if (event.userRead) {
                return;
            }
            const widget = new _components_widget_widget__WEBPACK_IMPORTED_MODULE_0__["default"]({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NocmlmbHV4L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmlkZW9jb250cm9sL2F1ZGlvQW5hbHlzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvY2FudmFzVmlkZW8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmlkZW9jb250cm9sL3BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvdmlkZW9jb250cm9sLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9jYW1lcmEud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9wbGF5ZXIud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9xdWVzdGlvbnMud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9zdGF0cy53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3RoZW1hbC53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3dpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXgucGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3ZpZGVvY29udHJvbC5wYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9ldmVudHMvYWN0aW9uQ3JlYXRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2V2ZW50cy9ldmVu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Q3JCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTthQUN2QixDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1IsS0FBSyxhQUFhLENBQUMsa0JBQWtCO1lBQ25DLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVuQyxXQUFXLENBQUMsVUFBVSxDQUFDO2dCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ3JCLENBQUMsS0FBMEIsRUFBRSxFQUFFLENBQzdCLEtBQUssQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFNLEtBQUssSUFBRSxRQUFRLEVBQUUsSUFBSSxJQUFHLENBQUMsQ0FBQyxLQUFLLENBQ2pFO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUVSO1lBQ0UsTUFBTTtLQUNUO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsK0RBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hEVztBQUVnQjtBQUV0RCxNQUFNLGFBQWEsR0FBRyxJQUFJLG1EQUFVLEVBQUUsQ0FBQztBQUV2QywyQkFBMkI7QUFFM0IsYUFBYSxDQUFDLFFBQVEsQ0FBQyxrRUFBYSxDQUFDLENBQUM7QUFFdEMsK0RBQWUsYUFBYSxFQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wYWdlcy9pbmRleC50c1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuLyoqXHJcbiAqIFRoZSBkaXNwYXRjaGVyIGlzIHRoZSBjZW50cmFsIGh1YlxyXG4gKiB0aGF0IG1hbmFnZXMgYWxsIGRhdGEgZmxvdyBpbiBhIEZsdXggYXBwbGljYXRpb24uXHJcbiAqL1xyXG5jbGFzcyBEaXNwYXRjaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZWZmZWN0cyA9IFtdO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciBzdG9yZUVmZmVjdCBpbnNpZGVcclxuICAgICAqIEBwYXJhbSBzdG9yZUVmZmVjdFxyXG4gICAgICovXHJcbiAgICByZWdpc3RlcihzdG9yZUVmZmVjdCkge1xyXG4gICAgICAgIHRoaXMuZWZmZWN0cy5wdXNoKHN0b3JlRWZmZWN0KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRGlzcGF0Y2ggYSBuZXcgYWN0aW9uIHRvIGFsbCByZWdpc3RlcmVkIHN0b3Jlc1xyXG4gICAgICogQHBhcmFtIGFjdGlvblxyXG4gICAgICovXHJcbiAgICBkaXNwYXRjaChhY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmVmZmVjdHMuZm9yRWFjaChlZmZlY3QgPT4ge1xyXG4gICAgICAgICAgICBlZmZlY3QoYWN0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdG9yZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7IGluaXRpYWxEYXRhIH0pIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMuYW1vdW50U3Vic2NyaXB0aW9ucyA9IDA7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gaW5pdGlhbERhdGE7XHJcbiAgICB9XHJcbiAgICBfY3JlYXRlU3Vic2NyaXB0aW9uSWQoKSB7XHJcbiAgICAgICAgdGhpcy5hbW91bnRTdWJzY3JpcHRpb25zKys7XHJcbiAgICAgICAgcmV0dXJuIGBzdWJfJHt0aGlzLmFtb3VudFN1YnNjcmlwdGlvbnN9YDtcclxuICAgIH1cclxuICAgIF9ub3RpZnlTdWJzY3JpYmVycygpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKHN1YnNjcmliZXJDYWxsYmFjaykgPT4ge1xyXG4gICAgICAgICAgICBzdWJzY3JpYmVyQ2FsbGJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldERhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxuICAgIHVwZGF0ZURhdGEodXBkYXRlZEZpZWxkc0RhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRhdGEsIHVwZGF0ZWRGaWVsZHNEYXRhKTtcclxuICAgICAgICB0aGlzLl9ub3RpZnlTdWJzY3JpYmVycygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICB9XHJcbiAgICBzdWJzY3JpYmUoY2FsbGJhY2spIHtcclxuICAgICAgICBjb25zdCBzdWJJZCA9IHRoaXMuX2NyZWF0ZVN1YnNjcmlwdGlvbklkKCk7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5zZXQoc3ViSWQsIGNhbGxiYWNrKTtcclxuICAgICAgICByZXR1cm4gc3ViSWQ7XHJcbiAgICB9XHJcbiAgICB1bnN1YnNjcmliZShpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZXJzLmRlbGV0ZShpZCk7XHJcbiAgICB9XHJcbn1cblxuXG5cbnZhciB0eXBlcyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcblxufSk7XG5cbmV4cG9ydHMuRGlzcGF0Y2hlciA9IERpc3BhdGNoZXI7XG5leHBvcnRzLlN0b3JlID0gU3RvcmU7XG5leHBvcnRzLlR5cGVzID0gdHlwZXM7XG4iLCJjb25zdCBkb21VdGlscyA9IHtcbiAgZG9lc05vZGVDb250YWluQ2xpY2s6IChub2RlOiBIVE1MRWxlbWVudCwgZTogRXZlbnQpOiBib29sZWFuID0+IHtcbiAgICBpZiAoIW5vZGUgfHwgIWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmV0dXJuIG5vZGUuY29udGFpbnMoZS50YXJnZXQpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdGlvbiB7XG4gIHB1YmxpYyBtZW51T3BlbmVkOiBib29sZWFuO1xuICBwdWJsaWMgaGVhZGVyTWVudTogSFRNTEVsZW1lbnQgfCBudWxsO1xuICBwdWJsaWMgaGVhZGVyQnVyZ2VyTWVudTogSFRNTEVsZW1lbnQgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHsgc2VsZWN0b3IgfTogeyBzZWxlY3Rvcjogc3RyaW5nIH0pIHtcbiAgICB0aGlzLm1lbnVPcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLmhlYWRlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB0aGlzLmhlYWRlckJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlci1idXJnZXJcIik7XG5cbiAgICBpZiAodGhpcy5pc01vYmlsZSgpKSB7XG4gICAgICB0aGlzLmluaXROYXZpZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9wZW5OYXZpZ2F0aW9uKCkge1xuICAgIGlmICh0aGlzLmhlYWRlck1lbnUpIHtcbiAgICAgIHRoaXMuaGVhZGVyTWVudS5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyLW1lbnUtbGlzdF9zdGF0ZS1tb2JpbGUtb3BlbmVkXCIpO1xuICAgIH1cblxuICAgIHRoaXMubWVudU9wZW5lZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VOYXZpZ2F0aW9uKCkge1xuICAgIGlmICh0aGlzLmhlYWRlck1lbnUpIHtcbiAgICAgIHRoaXMuaGVhZGVyTWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiaGVhZGVyLW1lbnUtbGlzdF9zdGF0ZS1tb2JpbGUtb3BlbmVkXCIpO1xuICAgIH1cblxuICAgIHRoaXMubWVudU9wZW5lZCA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBpc01vYmlsZSgpIHtcbiAgICBjb25zdCBtYXhNb2JpbGVXaWR0aCA9IDc2ODtcblxuICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCA8IG1heE1vYmlsZVdpZHRoO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0TmF2aWdhdGlvbigpIHtcbiAgICBpZiAodGhpcy5oZWFkZXJNZW51KSB7XG4gICAgICB0aGlzLmhlYWRlck1lbnUuY2xhc3NMaXN0LmFkZChcImhlYWRlci1tZW51LWxpc3Rfc3RhdGUtbW9iaWxlXCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlYWRlckJ1cmdlck1lbnUpIHtcbiAgICAgIHRoaXMuaGVhZGVyQnVyZ2VyTWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMubWVudU9wZW5lZCkge1xuICAgICAgICAgIHRoaXMub3Blbk5hdmlnYXRpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNsb3NlTmF2aWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIEB0cy1pZ25vcmVcbmNvbnN0IEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcblxuY29uc3QgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuY2xhc3MgQW5hbHlzZSB7XG4gIHB1YmxpYyBzdGFydFNob3c6IGJvb2xlYW47XG4gIHB1YmxpYyBidWZmZXJMZW5ndGg6IG51bWJlcjtcbiAgcHVibGljIGJhbmRzOiBVaW50OEFycmF5O1xuXG4gIHB1YmxpYyBub2RlOiBhbnk7XG4gIHB1YmxpYyBub2lzZUxldmVsUmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHB1YmxpYyBhbmFseXNlcjogYW55O1xuICBwdWJsaWMgc291cmNlOiBhbnk7XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHZpZGVvLFxuICAgIG5vaXNlTGV2ZWxSYW5nZSxcbiAgfToge1xuICAgIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50O1xuICAgIG5vaXNlTGV2ZWxSYW5nZTogSFRNTElucHV0RWxlbWVudDtcbiAgfSkge1xuICAgIHRoaXMubm9kZSA9IGNvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKDIwNDgsIDEsIDEpO1xuICAgIHRoaXMubm9pc2VMZXZlbFJhbmdlID0gbm9pc2VMZXZlbFJhbmdlO1xuXG4gICAgdGhpcy5hbmFseXNlciA9IGNvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcblxuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcbiAgICB0aGlzLmJhbmRzID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXJMZW5ndGgpO1xuXG4gICAgdGhpcy5zdGFydFNob3cgPSBmYWxzZTtcblxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zb3VyY2UpIHtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBjb250ZXh0LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZSh2aWRlbyk7XG5cbiAgICAgICAgdGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcbiAgICAgICAgdGhpcy5hbmFseXNlci5jb25uZWN0KHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgICB0aGlzLnNvdXJjZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbmF1ZGlvcHJvY2VzcyA9IChlOiBFdmVudFRhcmdldCkgPT4ge1xuICAgICAgICAgIHRoaXMuYW5hbHlzZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEodGhpcy5iYW5kcyk7IC8vIGNvcHkgY3VycmVudCBkYXRhIHRvIHRoaXMuYmFuZHNcblxuICAgICAgICAgIGlmICghdGhpcy5zdGFydFNob3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5zdGFydFNob3cgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93KCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLm5vaXNlTGV2ZWxSYW5nZS52YWx1ZSA9IHRoaXMuZ2V0QXZlcmFnZVZvbHVtZSh0aGlzLmJhbmRzKS50b1N0cmluZygpO1xuXG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXZlcmFnZVZvbHVtZShhcnJheTogVWludDhBcnJheSk6IG51bWJlciB7XG4gICAgbGV0IHZhbHVlcyA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZXMgKz0gYXJyYXlbaV07XG4gICAgfVxuXG4gICAgY29uc3QgYXZlcmFnZSA9IHZhbHVlcyAvIGFycmF5Lmxlbmd0aDtcblxuICAgIC8vIGNhbGN1bGF0ZSBpbiAxMDAlIHNjYWxlLCAxJSBpcyAyLjU2XG4gICAgcmV0dXJuIGF2ZXJhZ2UgPT09IDAgPyAwIDogYXZlcmFnZSAvIDIuNTY7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5hbHlzZTtcbiIsImNsYXNzIENhbnZhc1ZpZGVvIHtcbiAgcHVibGljIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50O1xuICBwdWJsaWMgdmlkZW9QbGF5ZXI6IEhUTUxFbGVtZW50O1xuICBwdWJsaWMgc3RvcFZpZGVvOiBib29sZWFuO1xuXG4gIHB1YmxpYyBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbDtcbiAgcHVibGljIGNhbnZhc0hlbHBlcjogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHsgdmlkZW8sIHZpZGVvUGxheWVyIH06IHsgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQ7IHZpZGVvUGxheWVyOiBIVE1MRWxlbWVudCB9KSB7XG4gICAgdGhpcy52aWRlbyA9IHZpZGVvO1xuICAgIHRoaXMudmlkZW9QbGF5ZXIgPSB2aWRlb1BsYXllcjtcbiAgICB0aGlzLnN0b3BWaWRlbyA9IGZhbHNlO1xuXG4gICAgdGhpcy5jYW52YXMgPSBudWxsO1xuICAgIHRoaXMuY2FudmFzSGVscGVyID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBwbGF5KHtcbiAgICBjYW52YXNJbml0ZWQsXG4gICAgYnJpZ2h0bmVzcyxcbiAgICBjb250cmFzdCxcbiAgICBzaXplOiB7IHdpZHRoLCBoZWlnaHQgfSxcbiAgfToge1xuICAgIGNhbnZhc0luaXRlZDogYm9vbGVhbjtcbiAgICBicmlnaHRuZXNzOiBzdHJpbmc7XG4gICAgY29udHJhc3Q6IHN0cmluZztcbiAgICBzaXplOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH07XG4gIH0pIHtcbiAgICBpZiAoIWNhbnZhc0luaXRlZCkge1xuICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofWA7XG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9YDtcblxuICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgdGhpcy52aWRlb1BsYXllci5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFZpZGVvID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jYW52YXMpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGlmICghY29udGV4dCkgeyByZXR1cm47IH1cblxuICAgICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZEltYWdlID0gdGhpcy5maWx0ZXIoe1xuICAgICAgICAgICAgdmlkZW86IHRoaXMudmlkZW8sXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIGNvbnRyYXN0LFxuICAgICAgICAgICAgYnJpZ2h0bmVzcyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGZpbHRlcmVkSW1hZ2UsIDAsIDApO1xuXG4gICAgICAgICAgaWYgKHRoaXMuc3RvcFZpZGVvIHx8IHRoaXMudmlkZW8ucGF1c2VkIHx8IHRoaXMudmlkZW8uZW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFZpZGVvID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJhdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBkcmF3KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUJyaWdodG5lc3MoZGF0YTogVWludDhDbGFtcGVkQXJyYXksIGJyaWdodG5lc3M6IHN0cmluZykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgZGF0YVtpXSArPSAyNTUgKiAoK2JyaWdodG5lc3MgLyAxMDApO1xuICAgICAgZGF0YVtpICsgMV0gKz0gMjU1ICogKCticmlnaHRuZXNzIC8gMTAwKTtcbiAgICAgIGRhdGFbaSArIDJdICs9IDI1NSAqICgrYnJpZ2h0bmVzcyAvIDEwMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNvbnRyYXN0KGRhdGE6IFVpbnQ4Q2xhbXBlZEFycmF5LCBjb250cmFzdDogc3RyaW5nKSB7XG4gICAgY29uc3QgZmFjdG9yID0gKDI1OS4wICogKCtjb250cmFzdCArIDI1NS4wKSkgLyAoMjU1LjAgKiAoMjU5LjAgLSArY29udHJhc3QpKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgZGF0YVtpXSA9IHRoaXMudHJ1bmNhdGVDb2xvcihmYWN0b3IgKiAoZGF0YVtpXSAtIDEyOC4wKSArIDEyOC4wKTtcbiAgICAgIGRhdGFbaSArIDFdID0gdGhpcy50cnVuY2F0ZUNvbG9yKGZhY3RvciAqIChkYXRhW2kgKyAxXSAtIDEyOC4wKSArIDEyOC4wKTtcbiAgICAgIGRhdGFbaSArIDJdID0gdGhpcy50cnVuY2F0ZUNvbG9yKGZhY3RvciAqIChkYXRhW2kgKyAyXSAtIDEyOC4wKSArIDEyOC4wKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRydW5jYXRlQ29sb3IodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgdmFsdWUgPSAwO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPiAyNTUpIHtcbiAgICAgIHZhbHVlID0gMjU1O1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZmlsdGVyKHtcbiAgICB2aWRlbyxcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgY29udHJhc3QsXG4gICAgYnJpZ2h0bmVzcyxcbiAgfToge1xuICAgIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50O1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgY29udHJhc3Q6IHN0cmluZztcbiAgICBicmlnaHRuZXNzOiBzdHJpbmc7XG4gIH0pIHtcbiAgICBpZiAoIXRoaXMuY2FudmFzSGVscGVyKSB7XG4gICAgICB0aGlzLmNhbnZhc0hlbHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cbiAgICAgIHRoaXMuY2FudmFzSGVscGVyLndpZHRoID0gd2lkdGg7XG4gICAgICB0aGlzLmNhbnZhc0hlbHBlci5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGV4dEhlbHBlciA9IHRoaXMuY2FudmFzSGVscGVyLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGlmIChjb250ZXh0SGVscGVyKSB7XG4gICAgICBjb250ZXh0SGVscGVyLmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgIGNvbnN0IGlkYXRhID0gY29udGV4dEhlbHBlci5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBpZGF0YS5kYXRhO1xuXG4gICAgICB0aGlzLmFwcGx5QnJpZ2h0bmVzcyhkYXRhLCBicmlnaHRuZXNzKTtcbiAgICAgIHRoaXMuYXBwbHlDb250cmFzdChkYXRhLCBjb250cmFzdCk7XG5cbiAgICAgIHJldHVybiBpZGF0YTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FudmFzVmlkZW87XG4iLCJpbXBvcnQgQW5hbHlzZSBmcm9tIFwiLi9hdWRpb0FuYWx5c2VcIjtcbmltcG9ydCBDYW52YXNWaWRlbyBmcm9tIFwiLi9jYW52YXNWaWRlb1wiO1xuXG4vKipcbiAqIFBsYXllclRlbXBsYXRlIC0gZ2VuZXJhdGUgdmlkZW8tcGxheWVyIGZyb20gPHRlbXBsYXRlPiB0YWdcbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXllclRlbXBsYXRlIHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlbXBsYXRlLXBsYXllclwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICB9XG5cbiAgcHVibGljIHJlbmRlcihpZDogc3RyaW5nKTogTm9kZSB7XG4gICAgY29uc3QgZWxlbWVudDogTm9kZSA9IHRoaXMudGVtcGxhdGUuY29udGVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudmlkZW9jb250cm9sLWxpc3RfX2l0ZW1cIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAvLyBwbGF5ZXIte2lkfVxuICAgIGNvbnN0IHBsYXllckVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IChlbGVtZW50IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXCIudmMtcGxheWVyXCIpO1xuXG4gICAgcGxheWVyRWxlbWVudCAmJiBwbGF5ZXJFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGlkKTtcblxuICAgIC8vIHBsYXllci17aWR9LXZpZGVvXG4gICAgY29uc3QgdmlkZW9FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSAoZWxlbWVudCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIik7XG5cbiAgICBpZiAodmlkZW9FbGVtZW50KSB7XG4gICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aWR9LXZpZGVvYCk7XG4gICAgfVxuXG4gICAgLy8gcGxheWVyLXtpZH0td2ViZ2wtdmlkZW9cbiAgICBjb25zdCBpbnB1dEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IChlbGVtZW50IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICBpbnB1dEVsZW1lbnQgJiYgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2lkfS13ZWJnbC12aWRlb2ApO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBQbGF5ZXIgaXMgYSB3cmFwcGVyIGFyb3VuZCBodG1sNSB2aWRlbyBlbGVtZW50IGFuZCBITFMgc3RhbmRhcnQsXG4gKiBpdCBoYXMgc3BlY2lhbCBiZWhhdmlvciBmb3Igb3VyIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgcHVibGljIHNldHRpbmdzOiB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgY2FudmFzSW5pdGVkOiBib29sZWFuO1xuICAgIGNvbnRhaW5lckJvdW5kczoge1xuICAgICAgbGVmdDogbnVtYmVyO1xuICAgICAgdG9wOiBudW1iZXI7XG4gICAgICB3aWR0aDogbnVtYmVyO1xuICAgICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgfTtcbiAgICBpc0Z1bGxzY3JlZW46IGJvb2xlYW47XG4gIH07XG5cbiAgcHVibGljIHZpZGVvU2V0dGluZ3M6IHtcbiAgICBicmlnaHRuZXNzOiBzdHJpbmc7XG4gICAgY29udHJhc3Q6IHN0cmluZztcbiAgICBpc0Z1bGxzY3JlZW46IGJvb2xlYW47XG4gIH07XG5cbiAgcHVibGljIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwdWJsaWMgcGxheWVyOiBIVE1MRWxlbWVudCB8IG51bGw7XG4gIHB1YmxpYyB2aWRlbzogSFRNTFZpZGVvRWxlbWVudCB8IG51bGw7XG4gIHB1YmxpYyBicmlnaHRuZXNzUmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xuICBwdWJsaWMgbm9pc2VMZXZlbFJhbmdlOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbiAgcHVibGljIGNvbnRyYXN0UmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xuXG4gIHB1YmxpYyBjYW52YXNWaWRlbzogQ2FudmFzVmlkZW87XG5cbiAgcHVibGljIGluaXRQcm9taXNlOiBQcm9taXNlPEhUTUxWaWRlb0VsZW1lbnQ+O1xuICBwdWJsaWMgYW5hbHlzZXI6IGFueTtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgdXJsLFxuICAgIGNvbnRhaW5lckVsZW1lbnQsXG4gICAgcGxheWVyRWxlbWVudFxuICB9OiB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcGxheWVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIH0pIHtcbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgdXJsLFxuICAgICAgY2FudmFzSW5pdGVkOiBmYWxzZSxcbiAgICAgIGNvbnRhaW5lckJvdW5kczoge1xuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDBcbiAgICAgIH0sXG4gICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMudmlkZW9TZXR0aW5ncyA9IHtcbiAgICAgIGJyaWdodG5lc3M6IFwiMFwiLFxuICAgICAgY29udHJhc3Q6IFwiMFwiLFxuICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXJFbGVtZW50O1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyRWxlbWVudDtcbiAgICB0aGlzLnZpZGVvID0gcGxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIik7XG4gICAgdGhpcy5icmlnaHRuZXNzUmFuZ2UgPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmMtcGxheWVyX19icmlnaHRuZXNzXCIpO1xuICAgIHRoaXMubm9pc2VMZXZlbFJhbmdlID0gcGxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnZjLXBsYXllcl9fbm9pc2UtbGV2ZWxcIik7XG4gICAgdGhpcy5jb250cmFzdFJhbmdlID0gcGxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnZjLXBsYXllcl9fY29udHJhc3RcIik7XG5cbiAgICB0aGlzLmNhbnZhc1ZpZGVvID0gbmV3IENhbnZhc1ZpZGVvKHtcbiAgICAgIHZpZGVvOiB0aGlzLnZpZGVvLFxuICAgICAgdmlkZW9QbGF5ZXI6IHRoaXMucGxheWVyXG4gICAgfSk7XG5cbiAgICB0aGlzLmluaXRQcm9taXNlID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuICB9XG5cbiAgcHVibGljIGluaXQoKSB7XG4gICAgaWYgKHRoaXMuaW5pdFByb21pc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmluaXRQcm9taXNlO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAod2luZG93Lkhscy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIGNvbnN0IGhscyA9IG5ldyB3aW5kb3cuSGxzKCk7XG5cbiAgICAgICAgaGxzLmxvYWRTb3VyY2UodGhpcy5zZXR0aW5ncy51cmwpO1xuICAgICAgICBobHMuYXR0YWNoTWVkaWEodGhpcy52aWRlbyk7XG5cbiAgICAgICAgaGxzLm9uKHdpbmRvdy5IbHMuRXZlbnRzLk1BTklGRVNUX1BBUlNFRCwgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodGhpcy52aWRlbyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZGVvLmNhblBsYXlUeXBlKFwiYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmxcIikpIHtcbiAgICAgICAgdGhpcy52aWRlby5zcmMgPSB0aGlzLnNldHRpbmdzLnVybDtcblxuICAgICAgICB0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLnZpZGVvKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGxheSgpIHtcbiAgICB0aGlzLnZpZGVvLnBsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCkge1xuICAgIHRoaXMudmlkZW8ucGF1c2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuRnVsbHNjcmVlbigpIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5pc0Z1bGxzY3JlZW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnNldENvbnRhaW5lckJvdW5kcygpO1xuXG4gICAgY29uc3QgeyBjb250YWluZXJCb3VuZHMgfSA9IHRoaXMuc2V0dGluZ3M7XG5cbiAgICB0aGlzLnZpZGVvLm11dGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBwbGF5ZXJCb3VuZHMgPSB0aGlzLnBsYXllci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGBcbiAgICAgICAgdHJhbnNsYXRlWCgwcHgpXG4gICAgICAgIHRyYW5zbGF0ZVkoMHB4KVxuICAgIGA7XG5cbiAgICB0aGlzLnBsYXllci5zdHlsZS53aWR0aCA9IHBsYXllckJvdW5kcy53aWR0aCArIFwicHhcIjtcbiAgICB0aGlzLnBsYXllci5zdHlsZS5oZWlnaHQgPSBwbGF5ZXJCb3VuZHMuaGVpZ2h0ICsgXCJweFwiO1xuICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IFwiXCI7XG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gXCJcIjtcbiAgICB0aGlzLnBsYXllci5zdHlsZS56SW5kZXggPSBcIjJcIjtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gXCJ0cmFuc2Zvcm0sIHdpZHRoLCBoZWlnaHRcIjtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IFwiMC4zc1wiO1xuXG4gICAgICAvLyBtb3ZlIGVsZW1lbnQgdG8gdG9wL2xlZnQgYm91bmRlciBvZiB0aGUgbGlzdC1jb250YWluZXJcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGBcbiAgICAgICAgdHJhbnNsYXRlWCgtJHtwbGF5ZXJCb3VuZHMubGVmdCAtIGNvbnRhaW5lckJvdW5kcy5sZWZ0fXB4KVxuICAgICAgICB0cmFuc2xhdGVZKC0ke3BsYXllckJvdW5kcy50b3AgLSBjb250YWluZXJCb3VuZHMudG9wfXB4KVxuICAgICAgYDtcblxuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUud2lkdGggPSBjb250YWluZXJCb3VuZHMud2lkdGggKyBcInB4XCI7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS5oZWlnaHQgPSBjb250YWluZXJCb3VuZHMuaGVpZ2h0ICsgXCJweFwiO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXR0aW5ncy5pc0Z1bGxzY3JlZW4gPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNsb3NlRnVsbHNjcmVlbigpIHtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuaXNGdWxsc2NyZWVuKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy52aWRlby5tdXRlZCA9IHRydWU7XG5cbiAgICB0aGlzLnBsYXllci5zdHlsZS56SW5kZXggPSBcIjFcIjtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXG4gICAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgXG4gICAgICAgICAgdHJhbnNsYXRlWCgwcHgpXG4gICAgICAgICAgdHJhbnNsYXRlWSgwcHgpXG4gICAgICBgO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXR0aW5ncy5pc0Z1bGxzY3JlZW4gPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoZTogRXZlbnQpID0+IHZvaWQpIHtcbiAgICB0aGlzLnBsYXllci5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjayk7XG4gIH1cblxuICBwcml2YXRlIHNldENvbnRhaW5lckJvdW5kcygpIHtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuY29udGFpbmVyQm91bmRzKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcyA9IHRoaXMuY29udGFpbmVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHM7XG4gIH1cblxuICBwcml2YXRlIHBsYXlWaWRlb09uQ2FudmFzKCkge1xuICAgIHRoaXMuc2V0Q29udGFpbmVyQm91bmRzKCk7XG5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuY2FudmFzSW5pdGVkKSB7XG4gICAgICB0aGlzLnZpZGVvLmNsYXNzTGlzdC5hZGQoXCJ2Yy1wbGF5ZXJfX3ZpZGVvX3N0YXRlLWhpZGRlblwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhbnZhc1ZpZGVvLnBsYXkoe1xuICAgICAgY2FudmFzSW5pdGVkOiB0aGlzLnNldHRpbmdzLmNhbnZhc0luaXRlZCxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgd2lkdGg6IHRoaXMuc2V0dGluZ3MuY29udGFpbmVyQm91bmRzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuc2V0dGluZ3MuY29udGFpbmVyQm91bmRzLmhlaWdodFxuICAgICAgfSxcbiAgICAgIGJyaWdodG5lc3M6IHRoaXMudmlkZW9TZXR0aW5ncy5icmlnaHRuZXNzLFxuICAgICAgY29udHJhc3Q6IHRoaXMudmlkZW9TZXR0aW5ncy5jb250cmFzdFxuICAgIH0pO1xuXG4gICAgdGhpcy5zZXR0aW5ncy5jYW52YXNJbml0ZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VCcmlnaHRuZXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZGVvU2V0dGluZ3MuYnJpZ2h0bmVzcyA9IHZhbHVlO1xuXG4gICAgdGhpcy5wbGF5VmlkZW9PbkNhbnZhcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VDb250cmFzdCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52aWRlb1NldHRpbmdzLmNvbnRyYXN0ID0gdmFsdWU7XG5cbiAgICB0aGlzLnBsYXlWaWRlb09uQ2FudmFzKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRFdmVudHMoKSB7XG4gICAgdGhpcy5icmlnaHRuZXNzUmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VCcmlnaHRuZXNzKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbnRyYXN0UmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VDb250cmFzdCgoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hbmFseXNlciA9IG5ldyBBbmFseXNlKHtcbiAgICAgIHZpZGVvOiB0aGlzLnZpZGVvLFxuICAgICAgbm9pc2VMZXZlbFJhbmdlOiB0aGlzLm5vaXNlTGV2ZWxSYW5nZVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCcm9hZGNhc3QgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcbmltcG9ydCB7IFBsYXllciwgUGxheWVyVGVtcGxhdGUgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuLyoqXG4gKiBWaWRlb2NvbnRyb2wgcmVwcmVzZW50cyBjb250cm9sbGVyIG92ZXIgb3VyIGZlYXR1cmUsXG4gKiBpdCBpbml0aWFsaXplcyBicm9hZGNhc3RzIGFuZCBpbnRlcmFjdCB3aXRoIHVzZXIncyBhY3Rpb25zXG4gKi9cbmNsYXNzIFZpZGVvY29udHJvbCB7XG4gIHB1YmxpYyBicm9hZGNhc3RzOiBCcm9hZGNhc3RbXTtcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwdWJsaWMgZWxlbWVudFNob3dBbGw6IEhUTUxFbGVtZW50O1xuXG4gIHB1YmxpYyBzdGF0ZToge1xuICAgIGZ1bGxzY3JlZW5JZDogbnVtYmVyO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBicm9hZGNhc3RzLFxuICAgIGVsZW1lbnRTaG93QWxsLFxuICAgIGVsZW1lbnQsXG4gIH06IHtcbiAgICBicm9hZGNhc3RzOiBCcm9hZGNhc3RbXTtcbiAgICBlbGVtZW50U2hvd0FsbDogSFRNTEVsZW1lbnQ7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIH0pIHtcbiAgICB0aGlzLmJyb2FkY2FzdHMgPSBicm9hZGNhc3RzO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5lbGVtZW50U2hvd0FsbCA9IGVsZW1lbnRTaG93QWxsO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZ1bGxzY3JlZW5JZDogSW5maW5pdHksXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdFBsYXllcnMoKTtcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VGdWxsUGxheWVyKCkge1xuICAgIC8vIHBsYXkgYWxsIHBsYXllcnNcbiAgICB0aGlzLmJyb2FkY2FzdHMuZm9yRWFjaCgoYnJvYWRjYXN0KSA9PiBicm9hZGNhc3QucGxheWVyLnBsYXkoKSk7XG5cbiAgICB0aGlzLmJyb2FkY2FzdHNbdGhpcy5zdGF0ZS5mdWxsc2NyZWVuSWRdLnBsYXllci5jbG9zZUZ1bGxzY3JlZW4oKTtcblxuICAgIHRoaXMuc3RhdGUuZnVsbHNjcmVlbklkID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgb3BlbkZ1bGxQbGF5ZXIoaWQ6IG51bWJlcikge1xuICAgIC8vIHN0b3AgYWxsIHBsYXllcnMgZXhjZXB0IGEgZnVsbHNjcmVlblxuICAgIHRoaXMuYnJvYWRjYXN0c1xuICAgICAgLmZpbHRlcigoYnJvYWRjYXN0KSA9PiBicm9hZGNhc3QuaWQgIT09IGlkKVxuICAgICAgLmZvckVhY2goKGJyb2FkY2FzdCkgPT4gYnJvYWRjYXN0LnBsYXllci5zdG9wKCkpO1xuXG4gICAgLy8gb3BlbiBwbGF5ZXIgaW4gZnVsbHNjcmVlblxuICAgIHRoaXMuYnJvYWRjYXN0c1tpZF0ucGxheWVyLm9wZW5GdWxsc2NyZWVuKCk7XG5cbiAgICB0aGlzLnN0YXRlLmZ1bGxzY3JlZW5JZCA9IGlkO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RXZlbnRzKCkge1xuICAgIHRoaXMuZWxlbWVudFNob3dBbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2VGdWxsUGxheWVyKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnRTaG93QWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlRnVsbFBsYXllcigpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0UGxheWVycygpIHtcbiAgICB0aGlzLmJyb2FkY2FzdHMuZm9yRWFjaCgoYnJvYWRjYXN0LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgVmlkZW9UZW1wbGF0ZTogUGxheWVyVGVtcGxhdGUgPSBuZXcgUGxheWVyVGVtcGxhdGUoKTtcbiAgICAgIGNvbnN0IGxpc3RWaWRlb0VsZW1lbnQ6IE5vZGUgPSBWaWRlb1RlbXBsYXRlLnJlbmRlcihgcGxheWVyLSR7aW5kZXggKyAxfWApO1xuXG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobGlzdFZpZGVvRWxlbWVudCk7XG5cbiAgICAgIGNvbnN0IFZpZGVvUGxheWVyID0gbmV3IFBsYXllcih7XG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgICAgcGxheWVyRWxlbWVudDogKGxpc3RWaWRlb0VsZW1lbnQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJcIiksXG4gICAgICAgIHVybDogYnJvYWRjYXN0LnVybCxcbiAgICAgIH0pO1xuXG4gICAgICBWaWRlb1BsYXllci5pbml0KClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIFZpZGVvUGxheWVyLnBsYXkoKTtcblxuICAgICAgICAgIC8vIEluaXQgZXZlbnRzXG4gICAgICAgICAgVmlkZW9QbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9wZW5GdWxsUGxheWVyKGluZGV4KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIFZpZGVvUGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcGVuRnVsbFBsYXllcihpbmRleCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBTYXZlIHBsYXllciB0byBicm9hZGNhc3RzIGFycmF5XG4gICAgICAgICAgdGhpcy5icm9hZGNhc3RzW2luZGV4XS5pZCA9IGluZGV4O1xuICAgICAgICAgIHRoaXMuYnJvYWRjYXN0c1tpbmRleF0ucGxheWVyID0gVmlkZW9QbGF5ZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLndhcm4oZXJyKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW9jb250cm9sO1xuIiwiY2xhc3MgQ2FtZXJhV2lkZ2V0IHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1jYW1lcmEtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FtZXJhV2lkZ2V0O1xuIiwiaW1wb3J0IHsgSVdpZGdldFBsYXllckRhdGEgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcblxuY2xhc3MgUGxheWVyV2lkZ2V0IHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICBwdWJsaWMgZGF0YTogSVdpZGdldFBsYXllckRhdGE7XG4gIHB1YmxpYyB3aWRnZXQ6IE5vZGU7XG5cbiAgY29uc3RydWN0b3IoeyBkYXRhIH06IHsgZGF0YTogSVdpZGdldFBsYXllckRhdGEgfSkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1wbGF5ZXItdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogTm9kZSB7XG4gICAgdGhpcy5zZXRDb3ZlcigpO1xuXG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIucGxheWVyLW5vd19fdGl0bGVcIiwgYCR7dGhpcy5kYXRhLmFydGlzdH0gJHt0aGlzLmRhdGEudHJhY2submFtZX1gKTtcblxuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLnBsYXllci1wcm9ncmVzc19fdGltZVwiLCB0aGlzLmRhdGEudHJhY2subGVuZ3RoKTtcbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5wbGF5ZXItdm9sdW1lX19wZXJjZW50YWdlXCIsIGAke3RoaXMuZGF0YS52b2x1bWV9JWApO1xuXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbm5lclRleHQoc2VsZWN0b3I6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3QgYmxvY2s6IEhUTUxFbGVtZW50ID0gKHRoaXMud2lkZ2V0IGFzIEhUTUxFbGVtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmIChibG9jaykge1xuICAgICAgYmxvY2suaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENvdmVyKCkge1xuICAgIGNvbnN0IGJsb2NrID0gKHRoaXMud2lkZ2V0IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5vd19fY292ZXJcIik7XG5cbiAgICBibG9jay5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdGhpcy5kYXRhLmFsYnVtY292ZXIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcldpZGdldDtcbiIsImltcG9ydCB7IElXaWRnZXRRdWVzdGlvbnNEYXRhIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2luZGV4XCI7XG5cbmNsYXNzIFF1ZXN0aW9uc1dpZGdldCB7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgcHVibGljIGRhdGE6IElXaWRnZXRRdWVzdGlvbnNEYXRhO1xuICBwdWJsaWMgd2lkZ2V0OiBOb2RlO1xuXG4gIGNvbnN0cnVjdG9yKHsgZGF0YSB9OiB7IGRhdGE6IElXaWRnZXRRdWVzdGlvbnNEYXRhIH0pIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtcXVlc3Rpb25zLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IE5vZGUge1xuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLmJ1dHRvbl90eXBlLXllbGxvd1wiLCB0aGlzLmRhdGEuYnV0dG9uc1swXSk7XG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIuYnV0dG9uX3R5cGUtZ3JleVwiLCB0aGlzLmRhdGEuYnV0dG9uc1sxXSk7XG5cbiAgICByZXR1cm4gdGhpcy53aWRnZXQ7XG4gIH1cblxuICBwcml2YXRlIHNldElubmVyVGV4dChzZWxlY3Rvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBibG9jazogSFRNTEVsZW1lbnQgPSAodGhpcy53aWRnZXQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoYmxvY2spIHtcbiAgICAgIGJsb2NrLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFF1ZXN0aW9uc1dpZGdldDtcbiIsImNsYXNzIFN0YXRzV2lkZ2V0IHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1zdGF0cy10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBOb2RlIHtcbiAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0c1dpZGdldDtcbiIsImltcG9ydCB7IElXaWRnZXRUaGVtYWxEYXRhIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2luZGV4XCI7XG5cbmNsYXNzIFRoZW1hbFdpZGdldCB7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgcHVibGljIGRhdGE6IElXaWRnZXRUaGVtYWxEYXRhO1xuICBwdWJsaWMgd2lkZ2V0OiBOb2RlO1xuXG4gIGNvbnN0cnVjdG9yKHsgZGF0YSB9OiB7IGRhdGE6IElXaWRnZXRUaGVtYWxEYXRhIH0pIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtdGhlcm1hbC10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBOb2RlIHtcbiAgICB0aGlzLnNldElubmVyVGV4dChcbiAgICAgIFwiLndpZGdldC1zZW5zb3JfdHlwZS10ZW1wIC53aWRnZXQtc2Vuc29yX192YWx1ZVwiLFxuICAgICAgYCR7dGhpcy5kYXRhLnRlbXBlcmF0dXJlfUNgLFxuICAgICk7XG5cbiAgICB0aGlzLnNldElubmVyVGV4dChcbiAgICAgIFwiLndpZGdldC1zZW5zb3JfdHlwZS1odW1pZGl0eSAud2lkZ2V0LXNlbnNvcl9fdmFsdWVcIixcbiAgICAgIGAke3RoaXMuZGF0YS5odW1pZGl0eX0lYCxcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbm5lclRleHQoc2VsZWN0b3I6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3QgYmxvY2s6IEhUTUxFbGVtZW50ID0gKHRoaXMud2lkZ2V0IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYgKGJsb2NrKSB7XG4gICAgICBibG9jay5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaGVtYWxXaWRnZXQ7XG4iLCJpbXBvcnQgQ2FtZXJhV2lkZ2V0IGZyb20gXCIuL2NhbWVyYS53aWRnZXRcIjtcbmltcG9ydCBQbGF5ZXJXaWRnZXQgZnJvbSBcIi4vcGxheWVyLndpZGdldFwiO1xuaW1wb3J0IFF1ZXN0aW9uc1dpZGdldCBmcm9tIFwiLi9xdWVzdGlvbnMud2lkZ2V0XCI7XG5pbXBvcnQgU3RhdHNXaWRnZXQgZnJvbSBcIi4vc3RhdHMud2lkZ2V0XCI7XG5pbXBvcnQgVGhlbWFsV2lkZ2V0IGZyb20gXCIuL3RoZW1hbC53aWRnZXRcIjtcblxuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSBcIi4uLy4uL3N0b3JlXCI7XG5pbXBvcnQgeyBtYXJrRXZlbnRBc1JlYWQgfSBmcm9tIFwiLi4vLi4vc3RvcmUvZXZlbnRzL2FjdGlvbkNyZWF0b3JzXCI7XG5cbmltcG9ydCAqIGFzIFR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCBXSURHRVRfVFlQRVMgPSB7XG4gIFNUQVRTOiBcIlNUQVRTXCIsXG4gIENBTUVSQTogXCJDQU1FUkFcIixcbiAgVEhFUk1BTDogXCJUSEVSTUFMXCIsXG4gIFBMQVlFUjogXCJQTEFZRVJcIixcbiAgUVVFU1RJT05TOiBcIlFVRVNUSU9OU1wiLFxuICBERUZBVUxUOiBcIkRFRkFVTFRcIlxufTtcblxuLy8gVE9ETzogYWRkIG1ldGhvZCBkZXN0b3ksIGZvciByZW1vdmluZyBldmVudHMsIHdoZW4gd2lkZ2V0IGRlbGV0ZWQgZnJvbSBkb21cbmNsYXNzIFdpZGdldCB7XG4gIHB1YmxpYyBldmVudDogVHlwZXMuRXZlbnQ7XG4gIHB1YmxpYyBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIHB1YmxpYyB3aWRnZXQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHsgZXZlbnQsIGNvbnRhaW5lciB9OiB7IGV2ZW50OiBUeXBlcy5FdmVudDsgY29udGFpbmVyOiBIVE1MRWxlbWVudCB9KSB7XG4gICAgdGhpcy5ldmVudCA9IGV2ZW50O1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0XCIpLmNsb25lTm9kZSh0cnVlKTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5hZGQoYHdpZGdldF9zaXplLSR7dGhpcy5ldmVudC5zaXplfWApO1xuICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5hZGQoYHdpZGdldF90eXBlLSR7dGhpcy5ldmVudC50eXBlfWApO1xuXG4gICAgdGhpcy5zZXRIZWFkZXJEYXRhKCk7XG4gICAgdGhpcy5zZXREZXNjcmlwdGlvbigpO1xuICAgIHRoaXMucmVuZGVyRGF0YVRlbXBsYXRlKCk7XG4gICAgdGhpcy5zZXRFdmVudExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy53aWRnZXQpO1xuICB9XG5cbiAgcHVibGljIG1hcmtXaWRnZXRBc1JlYWQoKTogdm9pZCB7XG4gICAgRGlzcGF0Y2hlci5kaXNwYXRjaChtYXJrRXZlbnRBc1JlYWQodGhpcy5ldmVudC5pZCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXREZXNjcmlwdGlvbigpIHtcbiAgICBpZiAodGhpcy5ldmVudC5kZXNjcmlwdGlvbiAmJiB0aGlzLndpZGdldCkge1xuICAgICAgY29uc3QgY29udGVudFRleHQgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1jb250ZW50X190ZXh0XCIpO1xuICAgICAgY29uc3QgdGV4dEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWNvbnRlbnRfX3RleHRcIik7XG5cbiAgICAgIGlmIChjb250ZW50VGV4dCkge1xuICAgICAgICBjb250ZW50VGV4dC5jbGFzc0xpc3QuYWRkKGB3aWRnZXQtY29udGVudF9fdGV4dF93aWR0aC0ke3RoaXMuZXZlbnQuc2l6ZX1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRleHRFbGVtZW50KSB7XG4gICAgICAgIHRleHRFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQuZGVzY3JpcHRpb247XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRIZWFkZXJEYXRhKCkge1xuICAgIGNvbnN0IHRpdGxlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLndpZGdldC1oZWFkZXItYWJvdXRfX3RpdGxlXCJcbiAgICApO1xuICAgIGNvbnN0IHR5cGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1oZWFkZXJfX3R5cGVcIik7XG4gICAgY29uc3QgZGF0ZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWhlYWRlcl9fZGF0ZVwiKTtcbiAgICBjb25zdCBpY29uVXNlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLndpZGdldC1oZWFkZXItYWJvdXRfX2ljb24gPiB1c2VcIlxuICAgICk7XG4gICAgY29uc3QgaWNvbkVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWhlYWRlci1hYm91dF9faWNvblwiKTtcblxuICAgIGlmICh0aXRsZUVsZW1lbnQpIHtcbiAgICAgIHRpdGxlRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmV2ZW50LnRpdGxlO1xuICAgIH1cblxuICAgIGlmICh0eXBlRWxlbWVudCkge1xuICAgICAgdHlwZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5ldmVudC5zb3VyY2U7XG4gICAgfVxuXG4gICAgaWYgKGRhdGVFbGVtZW50KSB7XG4gICAgICBkYXRlRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmV2ZW50LnRpbWU7XG4gICAgfVxuXG4gICAgaWYgKGljb25Vc2VFbGVtZW50KSB7XG4gICAgICBpY29uVXNlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIsIGAjJHt0aGlzLmV2ZW50Lmljb259YCk7XG4gICAgfVxuXG4gICAgaWYgKGljb25FbGVtZW50KSB7XG4gICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBpY29uXyR7dGhpcy5ldmVudC5pY29ufWApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgY2xvc2VFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldF9fY29udHJvbF9jbG9zZVwiKTtcblxuICAgIGlmIChjbG9zZUVsZW1lbnQpIHtcbiAgICAgIGNsb3NlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLm1hcmtXaWRnZXRBc1JlYWQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0YVRlbXBsYXRlVHlwZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgZGF0YSA9IHsgdHlwZTogXCJlbXB0eVwiIH0sIGljb24gfSA9IHRoaXMuZXZlbnQ7XG5cbiAgICBpZiAoaWNvbiA9PT0gXCJjYW1cIikge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5DQU1FUkE7XG4gICAgfVxuXG4gICAgaWYgKChkYXRhIGFzIFR5cGVzLklXaWRnZXRUaGVtYWxEYXRhKS50ZW1wZXJhdHVyZSkge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5USEVSTUFMO1xuICAgIH1cblxuICAgIGlmICgoZGF0YSBhcyBUeXBlcy5JV2lkZ2V0UGxheWVyRGF0YSkuYWxidW1jb3Zlcikge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5QTEFZRVI7XG4gICAgfVxuXG4gICAgaWYgKChkYXRhIGFzIFR5cGVzLklXaWRnZXRRdWVzdGlvbnNEYXRhKS5idXR0b25zKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLlFVRVNUSU9OUztcbiAgICB9XG5cbiAgICBpZiAoKGRhdGEgYXMgVHlwZXMuSVdpZGdldERlZmF1bHREYXRhKS50eXBlID09PSBcImdyYXBoXCIpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuU1RBVFM7XG4gICAgfVxuXG4gICAgcmV0dXJuIFdJREdFVF9UWVBFUy5ERUZBVUxUO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJEYXRhVGVtcGxhdGUoKSB7XG4gICAgY29uc3QgdGVtcGxhdGVEYXRhVHlwZSA9IHRoaXMuZ2V0RGF0YVRlbXBsYXRlVHlwZSgpO1xuICAgIGxldCBkYXRhQ29udGVudEJsb2NrID0gbnVsbDtcblxuICAgIHN3aXRjaCAodGVtcGxhdGVEYXRhVHlwZSkge1xuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuU1RBVFM6XG4gICAgICAgIGNvbnN0IHN0YXRzV2lkZ2V0ID0gbmV3IFN0YXRzV2lkZ2V0KCk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IHN0YXRzV2lkZ2V0LnJlbmRlcigpO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdJREdFVF9UWVBFUy5DQU1FUkE6XG4gICAgICAgIGNvbnN0IGNhbWVyYVdpZGdldCA9IG5ldyBDYW1lcmFXaWRnZXQoKTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gY2FtZXJhV2lkZ2V0LnJlbmRlcigpO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdJREdFVF9UWVBFUy5QTEFZRVI6XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUT0RPOiDQndC1INC/0L7QvdC40LzQsNGOLCDQutCw0Log0LfQtNC10YHRjCDQvNC+0LbQvdC+INC+0LHQvtC50YLQuNGB0Ywg0LHQtdC3IGFzc2lnbm1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IHBsYXllcldpZGdldCA9IG5ldyBQbGF5ZXJXaWRnZXQoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuZXZlbnQuZGF0YSBhcyBUeXBlcy5JV2lkZ2V0UGxheWVyRGF0YVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gcGxheWVyV2lkZ2V0LnJlbmRlcigpO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdJREdFVF9UWVBFUy5RVUVTVElPTlM6XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uc1dpZGdldCA9IG5ldyBRdWVzdGlvbnNXaWRnZXQoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuZXZlbnQuZGF0YSBhcyBUeXBlcy5JV2lkZ2V0UXVlc3Rpb25zRGF0YVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gcXVlc3Rpb25zV2lkZ2V0LnJlbmRlcigpO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdJREdFVF9UWVBFUy5USEVSTUFMOlxuICAgICAgICBjb25zdCB0aGVybWFsV2lkZ2V0ID0gbmV3IFRoZW1hbFdpZGdldCh7XG4gICAgICAgICAgZGF0YTogdGhpcy5ldmVudC5kYXRhIGFzIFR5cGVzLklXaWRnZXRUaGVtYWxEYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSB0aGVybWFsV2lkZ2V0LnJlbmRlcigpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChkYXRhQ29udGVudEJsb2NrKSB7XG4gICAgICBjb25zdCB3aWRnZXRDb250ZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1jb250ZW50XCIpO1xuXG4gICAgICBpZiAod2lkZ2V0Q29udGVudCkge1xuICAgICAgICB3aWRnZXRDb250ZW50LmFwcGVuZENoaWxkKGRhdGFDb250ZW50QmxvY2spO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXaWRnZXQ7XG4iLCJpbXBvcnQgV2lkZ2V0IGZyb20gXCIuLi9jb21wb25lbnRzL3dpZGdldC93aWRnZXRcIjtcblxuaW1wb3J0IEV2ZW50c1N0b3JlIGZyb20gXCIuLi9zdG9yZS9ldmVudHMvZXZlbnRzLnN0b3JlXCI7XG5pbXBvcnQgeyBzZXRFdmVudHNEYXRhIH0gZnJvbSBcIi4uL3N0b3JlL2V2ZW50cy9hY3Rpb25DcmVhdG9yc1wiO1xuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSBcIi4uL3N0b3JlXCI7XG5cbmltcG9ydCAqIGFzIFR5cGVzIGZyb20gXCIuLi90eXBlc1wiO1xuXG5jbGFzcyBJbmRleFBhZ2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBFdmVudHNTdG9yZS5zdWJzY3JpYmUodGhpcy5yZW5kZXJEYXNoYm9hcmRXaWRnZXRzKTtcblxuICAgIHRoaXMubG9hZEV2ZW50cygpLnRoZW4oZXZlbnRzID0+IHtcbiAgICAgIERpc3BhdGNoZXIuZGlzcGF0Y2goc2V0RXZlbnRzRGF0YShldmVudHMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyRGFzaGJvYXJkV2lkZ2V0cygpIHtcbiAgICBjb25zdCBldmVudHNTdG9yZURhdGEgPSBFdmVudHNTdG9yZS5nZXREYXRhKCk7XG4gICAgY29uc3QgZXZlbnRzOiBUeXBlcy5FdmVudFtdID0gZXZlbnRzU3RvcmVEYXRhLmV2ZW50cztcblxuICAgIGNvbnN0IGRhc2hib2FyZFdpZGdldHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXNoYm9hcmQtbGlzdFwiKTtcblxuICAgIC8vIENsZWFyIGRhc2hib2FyZFxuICAgIGRhc2hib2FyZFdpZGdldHNMaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQudXNlclJlYWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB3aWRnZXQgPSBuZXcgV2lkZ2V0KHtcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIGNvbnRhaW5lcjogZGFzaGJvYXJkV2lkZ2V0c0xpc3RcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRXZlbnRzKCkge1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZXZlbnRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHR5cGU6IFwiY3JpdGljYWw6aW5mb1wiLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxpbWl0OiAyMFxuICAgICAgfSksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmRleFBhZ2U7XG4iLCJpbXBvcnQgSGVhZGVyTmF2aWdhdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyXCI7XG5cbmltcG9ydCBJbmRleFBhZ2UgZnJvbSBcIi4vaW5kZXgucGFnZVwiO1xuaW1wb3J0IFZpZGVvY29udHJvbFBhZ2UgZnJvbSBcIi4vdmlkZW9jb250cm9sLnBhZ2VcIjtcblxuY2xhc3MgSW5pdEFwcGxpY2F0aW9uIHtcbiAgcHVibGljIHBhZ2U6IGFueTtcbiAgcHVibGljIGhlYWRlck5hdmlnYXRpb246IGFueTtcbiAgcHVibGljIGN1cnJlbnRQYWdlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByb3V0aW5nKCkge1xuICAgIHN3aXRjaCAodGhpcy5jdXJyZW50UGFnZSkge1xuICAgICAgY2FzZSBcIi9cIjpcbiAgICAgICAgdGhpcy5wYWdlID0gbmV3IEluZGV4UGFnZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIi92aWRlb2NvbnRyb2wuaHRtbFwiOlxuICAgICAgICB0aGlzLnBhZ2UgPSBuZXcgVmlkZW9jb250cm9sUGFnZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgdGhpcy5oZWFkZXJOYXZpZ2F0aW9uID0gbmV3IEhlYWRlck5hdmlnYXRpb24oe1xuICAgICAgc2VsZWN0b3I6IFwiI2hlYWRlci1tZW51XCIsXG4gICAgfSk7XG5cbiAgICB0aGlzLnJvdXRpbmcoKTtcbiAgfVxufVxuXG5uZXcgSW5pdEFwcGxpY2F0aW9uKCk7XG4iLCJpbXBvcnQgVmlkZW9jb250cm9sIGZyb20gXCIuLi9jb21wb25lbnRzL3ZpZGVvY29udHJvbC92aWRlb2NvbnRyb2xcIjtcblxuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmNsYXNzIFZpZGVvQ29udHJvbFBhZ2Uge1xuICBwdWJsaWMgYnJvYWRjYXN0czogVHlwZXMuQnJvYWRjYXN0W107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5icm9hZGNhc3RzID0gW1xuICAgICAge1xuICAgICAgICB1cmw6XG4gICAgICAgICAgXCJodHRwOi8vbG9jYWxob3N0OjkxOTEvbWFzdGVyP3VybD1odHRwJTNBJTJGJTJGbG9jYWxob3N0JTNBMzEwMiUyRnN0cmVhbXMlMkZzb3NlZCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmNhdCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmRvZyUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmhhbGwlMkZtYXN0ZXIubTN1OFwiLFxuICAgICAgICBwbGF5ZXI6IG51bGwsXG4gICAgICAgIGlkOiB1bmRlZmluZWQsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBjb25zdCBWaWRlb2NvbnRyb2xXaWRnZXQgPSBuZXcgVmlkZW9jb250cm9sKHtcbiAgICAgIGJyb2FkY2FzdHM6IHRoaXMuYnJvYWRjYXN0cyxcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmMtbGlzdFwiKSxcbiAgICAgIGVsZW1lbnRTaG93QWxsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZjLXNob3dhbGxcIiksXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW9Db250cm9sUGFnZTtcbiIsImltcG9ydCB7IEV2ZW50c0FjdGlvbnMgfSBmcm9tIFwiLi9ldmVudHMuc3RvcmVcIjtcblxuZXhwb3J0IGNvbnN0IHNldEV2ZW50c0RhdGEgPSAoZXZlbnRzOiBvYmplY3RbXSkgPT4gKHtcbiAgdHlwZTogRXZlbnRzQWN0aW9ucy5TRVRfRVZFTlRTLFxuICBwYXlsb2FkOiB7XG4gICAgZXZlbnRzXG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgbWFya0V2ZW50QXNSZWFkID0gKGlkOiBzdHJpbmcpID0+ICh7XG4gIHR5cGU6IEV2ZW50c0FjdGlvbnMuTUFSS19FVkVOVF9BU19SRUFELFxuICBwYXlsb2FkOiB7XG4gICAgaWRcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBTdG9yZSwgVHlwZXMgfSBmcm9tIFwic2hyaWZsdXhcIjtcbmltcG9ydCAqIGFzIEFwcE1vZGVsVHlwZXMgZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbi8vIEFjdGlvbnNcbmV4cG9ydCBjb25zdCBFdmVudHNBY3Rpb25zID0ge1xuICBTRVRfRVZFTlRTOiBcIlNFVF9FVkVOVFNcIixcbiAgTUFSS19FVkVOVF9BU19SRUFEOiBcIk1BUktfRVZFTlRfQVNfUkVBRFwiXG59O1xuXG4vLyBTdG9yZVxuaW50ZXJmYWNlIElFdmVudHNTdG9yZURhdGEge1xuICBldmVudHM6IEFwcE1vZGVsVHlwZXMuRXZlbnRbXTtcbn1cblxuY29uc3QgaW5pdGlhbERhdGE6IElFdmVudHNTdG9yZURhdGEgPSB7XG4gIGV2ZW50czogW11cbn07XG5cbmNvbnN0IEV2ZW50c1N0b3JlID0gbmV3IFN0b3JlKHtcbiAgaW5pdGlhbERhdGFcbn0pO1xuXG4vLyBFZmZlY3RzIGZvciBzdG9yZVxuZXhwb3J0IGNvbnN0IEV2ZW50c0VmZmVjdHMgPSAoYWN0aW9uOiBUeXBlcy5JQWN0aW9uKSA9PiB7XG4gIGNvbnN0IHsgdHlwZSwgcGF5bG9hZCB9ID0gYWN0aW9uO1xuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgRXZlbnRzQWN0aW9ucy5TRVRfRVZFTlRTOlxuICAgICAgRXZlbnRzU3RvcmUudXBkYXRlRGF0YSh7XG4gICAgICAgIGV2ZW50czogcGF5bG9hZC5ldmVudHNcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBFdmVudHNBY3Rpb25zLk1BUktfRVZFTlRfQVNfUkVBRDpcbiAgICAgIGNvbnN0IGRhdGEgPSBFdmVudHNTdG9yZS5nZXREYXRhKCk7XG5cbiAgICAgIEV2ZW50c1N0b3JlLnVwZGF0ZURhdGEoe1xuICAgICAgICBldmVudHM6IGRhdGEuZXZlbnRzLm1hcChcbiAgICAgICAgICAoZXZlbnQ6IEFwcE1vZGVsVHlwZXMuRXZlbnQpID0+XG4gICAgICAgICAgICBldmVudC5pZCA9PT0gcGF5bG9hZC5pZCA/IHsgLi4uZXZlbnQsIHVzZXJSZWFkOiB0cnVlIH0gOiBldmVudFxuICAgICAgICApXG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFdmVudHNTdG9yZTtcbiIsImltcG9ydCB7IERpc3BhdGNoZXIgfSBmcm9tIFwic2hyaWZsdXhcIjtcblxuaW1wb3J0IHsgRXZlbnRzRWZmZWN0cyB9IGZyb20gXCIuL2V2ZW50cy9ldmVudHMuc3RvcmVcIjtcblxuY29uc3QgYXBwRGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG5cbi8vIFJlZ2lzdGVyIGFsbCBlZmZlY3QgaGVyZVxuXG5hcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKEV2ZW50c0VmZmVjdHMpO1xuXG5leHBvcnQgZGVmYXVsdCBhcHBEaXNwYXRjaGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==