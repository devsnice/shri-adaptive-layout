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
        return average === 0 ? 0 : average / 0.39;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Analyse);


/***/ }),

/***/ "./src/components/videocontrol/player.ts":
/*!***********************************************!*\
  !*** ./src/components/videocontrol/player.ts ***!
  \***********************************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _audioAnalyse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audioAnalyse */ "./src/components/videocontrol/audioAnalyse.ts");

/**
 * Player is a wrapper around html5 video element and HLS standart,
 * it has special behavior for our application.
 */
class Player {
    constructor({ url, containerElement, playerElement }) {
        this.settings = {
            url,
            containerBounds: {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            },
            isFullscreen: false
        };
        this.videoSettings = {
            brightness: "100",
            contrast: "100",
            isFullscreen: false
        };
        this.containerElement = containerElement;
        this.player = playerElement;
        this.video = playerElement.querySelector("video");
        this.brightnessRange = playerElement.querySelector(".vc-player__brightness");
        this.noiseLevelRange = playerElement.querySelector(".vc-player__noise-level");
        this.contrastRange = playerElement.querySelector(".vc-player__contrast");
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
        this.player.style.width = `${playerBounds.width}px`;
        this.player.style.height = `${playerBounds.height}px`;
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
            this.player.style.width = `${containerBounds.width}px`;
            this.player.style.height = `${containerBounds.height}px`;
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
        if (!this.settings.containerBounds.width) {
            this.settings.containerBounds = this.containerElement.getBoundingClientRect();
        }
        return this.settings.containerBounds;
    }
    applyFilters() {
        this.video.style.filter = `
      brightness(${+this.videoSettings.brightness / 100})
      contrast(${+this.videoSettings.contrast / 100})
    `;
    }
    changeBrightness(value) {
        this.videoSettings.brightness = value;
        this.applyFilters();
    }
    changeContrast(value) {
        this.videoSettings.contrast = value;
        this.applyFilters();
    }
    initEvents() {
        this.brightnessRange.addEventListener("change", e => {
            this.changeBrightness(e.target.value);
        });
        this.contrastRange.addEventListener("change", e => {
            this.changeContrast(e.target.value);
        });
        this.player
            .querySelector(".vc-player__controls")
            .addEventListener("click", e => {
            e.stopPropagation();
        });
        this.analyser = new _audioAnalyse__WEBPACK_IMPORTED_MODULE_0__["default"]({
            video: this.video,
            noiseLevelRange: this.noiseLevelRange
        });
    }
}


/***/ }),

/***/ "./src/components/videocontrol/playerTemplate.ts":
/*!*******************************************************!*\
  !*** ./src/components/videocontrol/playerTemplate.ts ***!
  \*******************************************************/
/*! exports provided: PlayerTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerTemplate", function() { return PlayerTemplate; });
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
/* harmony import */ var _playerTemplate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerTemplate */ "./src/components/videocontrol/playerTemplate.ts");


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
            // TODO: to function
            const VideoTemplate = new _playerTemplate__WEBPACK_IMPORTED_MODULE_1__["PlayerTemplate"]();
            const listVideoElement = VideoTemplate.render(`player-${index + 1}`);
            this.element.appendChild(listVideoElement);
            const playerElement = listVideoElement.querySelector(".vc-player");
            if (!playerElement) {
                return;
            }
            const VideoPlayer = new _player__WEBPACK_IMPORTED_MODULE_0__["Player"]({
                containerElement: this.element,
                playerElement,
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
        // if (location.hostname === "localhost") {
        //   return fetch("http://localhost:8000/api/events", {
        //     method: "POST",
        //     body: JSON.stringify({
        //       type: "critical:info",
        //       offset: 0,
        //       limit: 20
        //     }),
        //     headers: {
        //       "Content-Type": "application/json"
        //     }
        //   })
        //     .then(response => response.json())
        //     .catch(err => console.error(err));
        // }
        return fetch("data/events.json")
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
            case "/index.html":
            case "/shri-adaptive-layout/":
            case "/shri-adaptive-layout/index.html":
                this.page = new _index_page__WEBPACK_IMPORTED_MODULE_1__["default"]();
                break;
            case "/videocontrol.html":
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
const App = new InitApplication();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NocmlmbHV4L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmlkZW9jb250cm9sL2F1ZGlvQW5hbHlzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvcGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvY29udHJvbC9wbGF5ZXJUZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvdmlkZW9jb250cm9sLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9jYW1lcmEud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9wbGF5ZXIud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9xdWVzdGlvbnMud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9zdGF0cy53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3RoZW1hbC53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3dpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXgucGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3ZpZGVvY29udHJvbC5wYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9zdG9yYWdlU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvdXNlclJlYWRFdmVudHNTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9ldmVudHMvYWN0aW9uQ3JlYXRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2V2ZW50cy9ldmVudHMuc3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUEsOENBQThDLGNBQWM7O0FBRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsY0FBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix5QkFBeUI7QUFD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QUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNyQixDQUFDLEtBQTBCLEVBQUUsRUFBRSxDQUM3QixLQUFLLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxtQkFBTSxLQUFLLElBQUUsUUFBUSxFQUFFLElBQUksSUFBRyxDQUFDLENBQUMsS0FBSyxDQUNqRTthQUNGLENBQUMsQ0FBQztZQUNILE1BQU07UUFFUjtZQUNFLE1BQU07S0FDVDtBQUNILENBQUMsQ0FBQztBQUVGLCtEQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRFc7QUFFZ0I7QUFFdEQsTUFBTSxhQUFhLEdBQUcsSUFBSSxtREFBVSxFQUFFLENBQUM7QUFFdkMsMkJBQTJCO0FBRTNCLGFBQWEsQ0FBQyxRQUFRLENBQUMsa0VBQWEsQ0FBQyxDQUFDO0FBRXRDLCtEQUFlLGFBQWEsRUFBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGFnZXMvaW5kZXgudHNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbi8qKlxyXG4gKiBUaGUgZGlzcGF0Y2hlciBpcyB0aGUgY2VudHJhbCBodWJcclxuICogdGhhdCBtYW5hZ2VzIGFsbCBkYXRhIGZsb3cgaW4gYSBGbHV4IGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuY2xhc3MgRGlzcGF0Y2hlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmVmZmVjdHMgPSBbXTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgc3RvcmVFZmZlY3QgaW5zaWRlXHJcbiAgICAgKiBAcGFyYW0gc3RvcmVFZmZlY3RcclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXIoc3RvcmVFZmZlY3QpIHtcclxuICAgICAgICB0aGlzLmVmZmVjdHMucHVzaChzdG9yZUVmZmVjdCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIERpc3BhdGNoIGEgbmV3IGFjdGlvbiB0byBhbGwgcmVnaXN0ZXJlZCBzdG9yZXNcclxuICAgICAqIEBwYXJhbSBhY3Rpb25cclxuICAgICAqL1xyXG4gICAgZGlzcGF0Y2goYWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RzLmZvckVhY2goZWZmZWN0ID0+IHtcclxuICAgICAgICAgICAgZWZmZWN0KGFjdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgU3RvcmUge1xyXG4gICAgY29uc3RydWN0b3IoeyBpbml0aWFsRGF0YSB9KSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLmFtb3VudFN1YnNjcmlwdGlvbnMgPSAwO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGluaXRpYWxEYXRhO1xyXG4gICAgfVxyXG4gICAgX2NyZWF0ZVN1YnNjcmlwdGlvbklkKCkge1xyXG4gICAgICAgIHRoaXMuYW1vdW50U3Vic2NyaXB0aW9ucysrO1xyXG4gICAgICAgIHJldHVybiBgc3ViXyR7dGhpcy5hbW91bnRTdWJzY3JpcHRpb25zfWA7XHJcbiAgICB9XHJcbiAgICBfbm90aWZ5U3Vic2NyaWJlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChzdWJzY3JpYmVyQ2FsbGJhY2spID0+IHtcclxuICAgICAgICAgICAgc3Vic2NyaWJlckNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXREYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVEYXRhKHVwZGF0ZWRGaWVsZHNEYXRhKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kYXRhLCB1cGRhdGVkRmllbGRzRGF0YSk7XHJcbiAgICAgICAgdGhpcy5fbm90aWZ5U3Vic2NyaWJlcnMoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViSWQgPSB0aGlzLl9jcmVhdGVTdWJzY3JpcHRpb25JZCgpO1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuc2V0KHN1YklkLCBjYWxsYmFjayk7XHJcbiAgICAgICAgcmV0dXJuIHN1YklkO1xyXG4gICAgfVxyXG4gICAgdW5zdWJzY3JpYmUoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmVycy5kZWxldGUoaWQpO1xyXG4gICAgfVxyXG59XG5cblxuXG52YXIgdHlwZXMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG5cbn0pO1xuXG5leHBvcnRzLkRpc3BhdGNoZXIgPSBEaXNwYXRjaGVyO1xuZXhwb3J0cy5TdG9yZSA9IFN0b3JlO1xuZXhwb3J0cy5UeXBlcyA9IHR5cGVzO1xuIiwiY29uc3QgZG9tVXRpbHMgPSB7XG4gIGRvZXNOb2RlQ29udGFpbkNsaWNrOiAobm9kZTogSFRNTEVsZW1lbnQsIGU6IEV2ZW50KTogYm9vbGVhbiA9PiB7XG4gICAgaWYgKCFub2RlIHx8ICFlKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiBub2RlLmNvbnRhaW5zKGUudGFyZ2V0KTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmlnYXRpb24ge1xuICBwdWJsaWMgbWVudU9wZW5lZDogYm9vbGVhbjtcbiAgcHVibGljIGhlYWRlck1lbnU6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcHVibGljIGhlYWRlckJ1cmdlck1lbnU6IEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih7IHNlbGVjdG9yIH06IHsgc2VsZWN0b3I6IHN0cmluZyB9KSB7XG4gICAgdGhpcy5tZW51T3BlbmVkID0gZmFsc2U7XG4gICAgdGhpcy5oZWFkZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgdGhpcy5oZWFkZXJCdXJnZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFkZXItYnVyZ2VyXCIpO1xuXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUoKSkge1xuICAgICAgdGhpcy5pbml0TmF2aWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvcGVuTmF2aWdhdGlvbigpIHtcbiAgICBpZiAodGhpcy5oZWFkZXJNZW51KSB7XG4gICAgICB0aGlzLmhlYWRlck1lbnUuY2xhc3NMaXN0LmFkZChcImhlYWRlci1tZW51LWxpc3Rfc3RhdGUtbW9iaWxlLW9wZW5lZFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnVPcGVuZWQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNsb3NlTmF2aWdhdGlvbigpIHtcbiAgICBpZiAodGhpcy5oZWFkZXJNZW51KSB7XG4gICAgICB0aGlzLmhlYWRlck1lbnUuY2xhc3NMaXN0LnJlbW92ZShcImhlYWRlci1tZW51LWxpc3Rfc3RhdGUtbW9iaWxlLW9wZW5lZFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnVPcGVuZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNNb2JpbGUoKSB7XG4gICAgY29uc3QgbWF4TW9iaWxlV2lkdGggPSA3Njg7XG5cbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPCBtYXhNb2JpbGVXaWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdE5hdmlnYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJNZW51LmNsYXNzTGlzdC5hZGQoXCJoZWFkZXItbWVudS1saXN0X3N0YXRlLW1vYmlsZVwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWFkZXJCdXJnZXJNZW51KSB7XG4gICAgICB0aGlzLmhlYWRlckJ1cmdlck1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLm1lbnVPcGVuZWQpIHtcbiAgICAgICAgICB0aGlzLm9wZW5OYXZpZ2F0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbG9zZU5hdmlnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCIvLyBAdHMtaWdub3JlXG5jb25zdCBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG5cbmNvbnN0IGNvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG5cbmNsYXNzIEFuYWx5c2Uge1xuICBwdWJsaWMgc3RhcnRTaG93OiBib29sZWFuO1xuICBwdWJsaWMgYnVmZmVyTGVuZ3RoOiBudW1iZXI7XG4gIHB1YmxpYyBiYW5kczogVWludDhBcnJheTtcblxuICBwdWJsaWMgbm9kZTogYW55O1xuICBwdWJsaWMgbm9pc2VMZXZlbFJhbmdlOiBIVE1MSW5wdXRFbGVtZW50O1xuICBwdWJsaWMgYW5hbHlzZXI6IGFueTtcbiAgcHVibGljIHNvdXJjZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICB2aWRlbyxcbiAgICBub2lzZUxldmVsUmFuZ2VcbiAgfToge1xuICAgIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50O1xuICAgIG5vaXNlTGV2ZWxSYW5nZTogSFRNTElucHV0RWxlbWVudDtcbiAgfSkge1xuICAgIHRoaXMubm9kZSA9IGNvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKDIwNDgsIDEsIDEpO1xuICAgIHRoaXMubm9pc2VMZXZlbFJhbmdlID0gbm9pc2VMZXZlbFJhbmdlO1xuXG4gICAgdGhpcy5hbmFseXNlciA9IGNvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcblxuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcbiAgICB0aGlzLmJhbmRzID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXJMZW5ndGgpO1xuXG4gICAgdGhpcy5zdGFydFNob3cgPSBmYWxzZTtcblxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zb3VyY2UpIHtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBjb250ZXh0LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZSh2aWRlbyk7XG5cbiAgICAgICAgdGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcbiAgICAgICAgdGhpcy5hbmFseXNlci5jb25uZWN0KHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgICB0aGlzLnNvdXJjZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbmF1ZGlvcHJvY2VzcyA9IChlOiBFdmVudFRhcmdldCkgPT4ge1xuICAgICAgICAgIHRoaXMuYW5hbHlzZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEodGhpcy5iYW5kcyk7IC8vIGNvcHkgY3VycmVudCBkYXRhIHRvIHRoaXMuYmFuZHNcblxuICAgICAgICAgIGlmICghdGhpcy5zdGFydFNob3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5zdGFydFNob3cgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93KCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLm5vaXNlTGV2ZWxSYW5nZS52YWx1ZSA9IHRoaXMuZ2V0QXZlcmFnZVZvbHVtZSh0aGlzLmJhbmRzKS50b1N0cmluZygpO1xuXG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXZlcmFnZVZvbHVtZShhcnJheTogVWludDhBcnJheSk6IG51bWJlciB7XG4gICAgbGV0IHZhbHVlcyA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZXMgKz0gYXJyYXlbaV07XG4gICAgfVxuXG4gICAgY29uc3QgYXZlcmFnZSA9IHZhbHVlcyAvIGFycmF5Lmxlbmd0aDtcblxuICAgIC8vIGNhbGN1bGF0ZSBpbiAxMDAlIHNjYWxlLCAxJSBpcyAyLjU2XG4gICAgcmV0dXJuIGF2ZXJhZ2UgPT09IDAgPyAwIDogYXZlcmFnZSAvIDAuMzk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5hbHlzZTtcbiIsImltcG9ydCBBbmFseXNlIGZyb20gXCIuL2F1ZGlvQW5hbHlzZVwiO1xuXG4vKipcbiAqIFBsYXllciBpcyBhIHdyYXBwZXIgYXJvdW5kIGh0bWw1IHZpZGVvIGVsZW1lbnQgYW5kIEhMUyBzdGFuZGFydCxcbiAqIGl0IGhhcyBzcGVjaWFsIGJlaGF2aW9yIGZvciBvdXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBwdWJsaWMgc2V0dGluZ3M6IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBjb250YWluZXJCb3VuZHM6IHtcbiAgICAgIGxlZnQ6IG51bWJlcjtcbiAgICAgIHRvcDogbnVtYmVyO1xuICAgICAgd2lkdGg6IG51bWJlcjtcbiAgICAgIGhlaWdodDogbnVtYmVyO1xuICAgIH07XG4gICAgaXNGdWxsc2NyZWVuOiBib29sZWFuO1xuICB9O1xuXG4gIHB1YmxpYyB2aWRlb1NldHRpbmdzOiB7XG4gICAgYnJpZ2h0bmVzczogc3RyaW5nO1xuICAgIGNvbnRyYXN0OiBzdHJpbmc7XG4gICAgaXNGdWxsc2NyZWVuOiBib29sZWFuO1xuICB9O1xuXG4gIHB1YmxpYyBjb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHVibGljIHBsYXllcjogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyB2aWRlbzogSFRNTFZpZGVvRWxlbWVudCB8IG51bGw7XG4gIHB1YmxpYyBicmlnaHRuZXNzUmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xuICBwdWJsaWMgbm9pc2VMZXZlbFJhbmdlOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbiAgcHVibGljIGNvbnRyYXN0UmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xuXG4gIHB1YmxpYyBpbml0UHJvbWlzZTogUHJvbWlzZTxIVE1MVmlkZW9FbGVtZW50PjtcbiAgcHVibGljIGFuYWx5c2VyOiBhbnk7XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHVybCxcbiAgICBjb250YWluZXJFbGVtZW50LFxuICAgIHBsYXllckVsZW1lbnRcbiAgfToge1xuICAgIHVybDogc3RyaW5nO1xuICAgIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHBsYXllckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB9KSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIHVybCxcbiAgICAgIGNvbnRhaW5lckJvdW5kczoge1xuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDBcbiAgICAgIH0sXG4gICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMudmlkZW9TZXR0aW5ncyA9IHtcbiAgICAgIGJyaWdodG5lc3M6IFwiMTAwXCIsXG4gICAgICBjb250cmFzdDogXCIxMDBcIixcbiAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyRWxlbWVudDtcbiAgICB0aGlzLnBsYXllciA9IHBsYXllckVsZW1lbnQ7XG4gICAgdGhpcy52aWRlbyA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpO1xuICAgIHRoaXMuYnJpZ2h0bmVzc1JhbmdlID0gcGxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIudmMtcGxheWVyX19icmlnaHRuZXNzXCJcbiAgICApO1xuICAgIHRoaXMubm9pc2VMZXZlbFJhbmdlID0gcGxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIudmMtcGxheWVyX19ub2lzZS1sZXZlbFwiXG4gICAgKTtcbiAgICB0aGlzLmNvbnRyYXN0UmFuZ2UgPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmMtcGxheWVyX19jb250cmFzdFwiKTtcblxuICAgIHRoaXMuaW5pdFByb21pc2UgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gIH1cblxuICBwdWJsaWMgaW5pdCgpIHtcbiAgICBpZiAodGhpcy5pbml0UHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb21pc2U7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuSGxzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgY29uc3QgaGxzID0gbmV3IHdpbmRvdy5IbHMoKTtcblxuICAgICAgICBobHMubG9hZFNvdXJjZSh0aGlzLnNldHRpbmdzLnVybCk7XG4gICAgICAgIGhscy5hdHRhY2hNZWRpYSh0aGlzLnZpZGVvKTtcblxuICAgICAgICBobHMub24od2luZG93Lkhscy5FdmVudHMuTUFOSUZFU1RfUEFSU0VELCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLnZpZGVvKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmlkZW8uY2FuUGxheVR5cGUoXCJhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybFwiKSkge1xuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IHRoaXMuc2V0dGluZ3MudXJsO1xuXG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMudmlkZW8pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwbGF5KCkge1xuICAgIHRoaXMudmlkZW8ucGxheSgpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKSB7XG4gICAgdGhpcy52aWRlby5wYXVzZSgpO1xuICB9XG5cbiAgcHVibGljIG9wZW5GdWxsc2NyZWVuKCkge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmlzRnVsbHNjcmVlbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuc2V0Q29udGFpbmVyQm91bmRzKCk7XG5cbiAgICBjb25zdCB7IGNvbnRhaW5lckJvdW5kcyB9ID0gdGhpcy5zZXR0aW5ncztcblxuICAgIHRoaXMudmlkZW8ubXV0ZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHBsYXllckJvdW5kcyA9IHRoaXMucGxheWVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gYFxuICAgICAgICB0cmFuc2xhdGVYKDBweClcbiAgICAgICAgdHJhbnNsYXRlWSgwcHgpXG4gICAgYDtcblxuICAgIHRoaXMucGxheWVyLnN0eWxlLndpZHRoID0gYCR7cGxheWVyQm91bmRzLndpZHRofXB4YDtcbiAgICB0aGlzLnBsYXllci5zdHlsZS5oZWlnaHQgPSBgJHtwbGF5ZXJCb3VuZHMuaGVpZ2h0fXB4YDtcbiAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcIlwiO1xuICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IFwiXCI7XG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUuekluZGV4ID0gXCIyXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IFwidHJhbnNmb3JtLCB3aWR0aCwgaGVpZ2h0XCI7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBcIjAuM3NcIjtcblxuICAgICAgLy8gbW92ZSBlbGVtZW50IHRvIHRvcC9sZWZ0IGJvdW5kZXIgb2YgdGhlIGxpc3QtY29udGFpbmVyXG4gICAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgXG4gICAgICAgIHRyYW5zbGF0ZVgoLSR7cGxheWVyQm91bmRzLmxlZnQgLSBjb250YWluZXJCb3VuZHMubGVmdH1weClcbiAgICAgICAgdHJhbnNsYXRlWSgtJHtwbGF5ZXJCb3VuZHMudG9wIC0gY29udGFpbmVyQm91bmRzLnRvcH1weClcbiAgICAgIGA7XG5cbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLndpZHRoID0gYCR7Y29udGFpbmVyQm91bmRzLndpZHRofXB4YDtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLmhlaWdodCA9IGAke2NvbnRhaW5lckJvdW5kcy5oZWlnaHR9cHhgO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXR0aW5ncy5pc0Z1bGxzY3JlZW4gPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNsb3NlRnVsbHNjcmVlbigpIHtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuaXNGdWxsc2NyZWVuKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy52aWRlby5tdXRlZCA9IHRydWU7XG5cbiAgICB0aGlzLnBsYXllci5zdHlsZS56SW5kZXggPSBcIjFcIjtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXG4gICAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgXG4gICAgICAgICAgdHJhbnNsYXRlWCgwcHgpXG4gICAgICAgICAgdHJhbnNsYXRlWSgwcHgpXG4gICAgICBgO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXR0aW5ncy5pc0Z1bGxzY3JlZW4gPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoZTogRXZlbnQpID0+IHZvaWQpIHtcbiAgICB0aGlzLnBsYXllci5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjayk7XG4gIH1cblxuICBwcml2YXRlIHNldENvbnRhaW5lckJvdW5kcygpIHtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuY29udGFpbmVyQm91bmRzLndpZHRoKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcyA9IHRoaXMuY29udGFpbmVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHM7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5RmlsdGVycygpIHtcbiAgICB0aGlzLnZpZGVvLnN0eWxlLmZpbHRlciA9IGBcbiAgICAgIGJyaWdodG5lc3MoJHsrdGhpcy52aWRlb1NldHRpbmdzLmJyaWdodG5lc3MgLyAxMDB9KVxuICAgICAgY29udHJhc3QoJHsrdGhpcy52aWRlb1NldHRpbmdzLmNvbnRyYXN0IC8gMTAwfSlcbiAgICBgO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VCcmlnaHRuZXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZGVvU2V0dGluZ3MuYnJpZ2h0bmVzcyA9IHZhbHVlO1xuXG4gICAgdGhpcy5hcHBseUZpbHRlcnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlQ29udHJhc3QodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmlkZW9TZXR0aW5ncy5jb250cmFzdCA9IHZhbHVlO1xuXG4gICAgdGhpcy5hcHBseUZpbHRlcnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEV2ZW50cygpIHtcbiAgICB0aGlzLmJyaWdodG5lc3NSYW5nZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGUgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VCcmlnaHRuZXNzKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbnRyYXN0UmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBlID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQ29udHJhc3QoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMucGxheWVyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi52Yy1wbGF5ZXJfX2NvbnRyb2xzXCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmFuYWx5c2VyID0gbmV3IEFuYWx5c2Uoe1xuICAgICAgdmlkZW86IHRoaXMudmlkZW8sXG4gICAgICBub2lzZUxldmVsUmFuZ2U6IHRoaXMubm9pc2VMZXZlbFJhbmdlXG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qKlxuICogUGxheWVyVGVtcGxhdGUgLSBnZW5lcmF0ZSB2aWRlby1wbGF5ZXIgZnJvbSA8dGVtcGxhdGU+IHRhZ1xuICovXG5leHBvcnQgY2xhc3MgUGxheWVyVGVtcGxhdGUge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJ0ZW1wbGF0ZS1wbGF5ZXJcIlxuICAgICkgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoaWQ6IHN0cmluZyk6IE5vZGUge1xuICAgIGNvbnN0IGVsZW1lbnQ6IE5vZGUgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnZpZGVvY29udHJvbC1saXN0X19pdGVtXCIpXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgLy8gcGxheWVyLXtpZH1cbiAgICBjb25zdCBwbGF5ZXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSAoZWxlbWVudCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIudmMtcGxheWVyXCJcbiAgICApO1xuXG4gICAgcGxheWVyRWxlbWVudCAmJiBwbGF5ZXJFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGlkKTtcblxuICAgIC8vIHBsYXllci17aWR9LXZpZGVvXG4gICAgY29uc3QgdmlkZW9FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSAoZWxlbWVudCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCJ2aWRlb1wiXG4gICAgKTtcblxuICAgIGlmICh2aWRlb0VsZW1lbnQpIHtcbiAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpZH0tdmlkZW9gKTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIte2lkfS13ZWJnbC12aWRlb1xuICAgIGNvbnN0IGlucHV0RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gKGVsZW1lbnQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiaW5wdXRcIlxuICAgICk7XG4gICAgaW5wdXRFbGVtZW50ICYmIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpZH0td2ViZ2wtdmlkZW9gKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59XG4iLCJpbXBvcnQgeyBCcm9hZGNhc3QgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgUGxheWVyVGVtcGxhdGUgfSBmcm9tIFwiLi9wbGF5ZXJUZW1wbGF0ZVwiO1xuXG4vKipcbiAqIFZpZGVvY29udHJvbCByZXByZXNlbnRzIGNvbnRyb2xsZXIgb3ZlciBvdXIgZmVhdHVyZSxcbiAqIGl0IGluaXRpYWxpemVzIGJyb2FkY2FzdHMgYW5kIGludGVyYWN0IHdpdGggdXNlcidzIGFjdGlvbnNcbiAqL1xuY2xhc3MgVmlkZW9jb250cm9sIHtcbiAgcHVibGljIGJyb2FkY2FzdHM6IEJyb2FkY2FzdFtdO1xuICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBlbGVtZW50U2hvd0FsbDogSFRNTEVsZW1lbnQ7XG5cbiAgcHVibGljIHN0YXRlOiB7XG4gICAgZnVsbHNjcmVlbklkOiBudW1iZXI7XG4gIH07XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIGJyb2FkY2FzdHMsXG4gICAgZWxlbWVudFNob3dBbGwsXG4gICAgZWxlbWVudFxuICB9OiB7XG4gICAgYnJvYWRjYXN0czogQnJvYWRjYXN0W107XG4gICAgZWxlbWVudFNob3dBbGw6IEhUTUxFbGVtZW50O1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB9KSB7XG4gICAgdGhpcy5icm9hZGNhc3RzID0gYnJvYWRjYXN0cztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuZWxlbWVudFNob3dBbGwgPSBlbGVtZW50U2hvd0FsbDtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmdWxsc2NyZWVuSWQ6IEluZmluaXR5XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdFBsYXllcnMoKTtcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VGdWxsUGxheWVyKCkge1xuICAgIC8vIHBsYXkgYWxsIHBsYXllcnNcbiAgICB0aGlzLmJyb2FkY2FzdHMuZm9yRWFjaChicm9hZGNhc3QgPT4gYnJvYWRjYXN0LnBsYXllci5wbGF5KCkpO1xuXG4gICAgdGhpcy5icm9hZGNhc3RzW3RoaXMuc3RhdGUuZnVsbHNjcmVlbklkXS5wbGF5ZXIuY2xvc2VGdWxsc2NyZWVuKCk7XG5cbiAgICB0aGlzLnN0YXRlLmZ1bGxzY3JlZW5JZCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIG9wZW5GdWxsUGxheWVyKGlkOiBudW1iZXIpIHtcbiAgICAvLyBzdG9wIGFsbCBwbGF5ZXJzIGV4Y2VwdCBhIGZ1bGxzY3JlZW5cbiAgICB0aGlzLmJyb2FkY2FzdHNcbiAgICAgIC5maWx0ZXIoYnJvYWRjYXN0ID0+IGJyb2FkY2FzdC5pZCAhPT0gaWQpXG4gICAgICAuZm9yRWFjaChicm9hZGNhc3QgPT4gYnJvYWRjYXN0LnBsYXllci5zdG9wKCkpO1xuXG4gICAgLy8gb3BlbiBwbGF5ZXIgaW4gZnVsbHNjcmVlblxuICAgIHRoaXMuYnJvYWRjYXN0c1tpZF0ucGxheWVyLm9wZW5GdWxsc2NyZWVuKCk7XG5cbiAgICB0aGlzLnN0YXRlLmZ1bGxzY3JlZW5JZCA9IGlkO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RXZlbnRzKCkge1xuICAgIHRoaXMuZWxlbWVudFNob3dBbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2VGdWxsUGxheWVyKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnRTaG93QWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlRnVsbFBsYXllcigpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0UGxheWVycygpIHtcbiAgICB0aGlzLmJyb2FkY2FzdHMuZm9yRWFjaCgoYnJvYWRjYXN0LCBpbmRleCkgPT4ge1xuICAgICAgLy8gVE9ETzogdG8gZnVuY3Rpb25cbiAgICAgIGNvbnN0IFZpZGVvVGVtcGxhdGU6IFBsYXllclRlbXBsYXRlID0gbmV3IFBsYXllclRlbXBsYXRlKCk7XG4gICAgICBjb25zdCBsaXN0VmlkZW9FbGVtZW50OiBOb2RlID0gVmlkZW9UZW1wbGF0ZS5yZW5kZXIoXG4gICAgICAgIGBwbGF5ZXItJHtpbmRleCArIDF9YFxuICAgICAgKTtcblxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGxpc3RWaWRlb0VsZW1lbnQpO1xuXG4gICAgICBjb25zdCBwbGF5ZXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSAobGlzdFZpZGVvRWxlbWVudCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi52Yy1wbGF5ZXJcIlxuICAgICAgKTtcblxuICAgICAgaWYgKCFwbGF5ZXJFbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgVmlkZW9QbGF5ZXIgPSBuZXcgUGxheWVyKHtcbiAgICAgICAgY29udGFpbmVyRWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICBwbGF5ZXJFbGVtZW50LFxuICAgICAgICB1cmw6IGJyb2FkY2FzdC51cmxcbiAgICAgIH0pO1xuXG4gICAgICBWaWRlb1BsYXllci5pbml0KClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIFZpZGVvUGxheWVyLnBsYXkoKTtcblxuICAgICAgICAgIC8vIEluaXQgZXZlbnRzXG4gICAgICAgICAgVmlkZW9QbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcGVuRnVsbFBsYXllcihpbmRleCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBWaWRlb1BsYXllci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgZSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9wZW5GdWxsUGxheWVyKGluZGV4KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFNhdmUgcGxheWVyIHRvIGJyb2FkY2FzdHMgYXJyYXlcbiAgICAgICAgICB0aGlzLmJyb2FkY2FzdHNbaW5kZXhdLmlkID0gaW5kZXg7XG4gICAgICAgICAgdGhpcy5icm9hZGNhc3RzW2luZGV4XS5wbGF5ZXIgPSBWaWRlb1BsYXllcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLndhcm4oZXJyKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW9jb250cm9sO1xuIiwiY2xhc3MgQ2FtZXJhV2lkZ2V0IHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1jYW1lcmEtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FtZXJhV2lkZ2V0O1xuIiwiaW1wb3J0IHsgSVdpZGdldFBsYXllckRhdGEgfSBmcm9tIFwiLi4vLi4vdHlwZXMvaW5kZXhcIjtcblxuY2xhc3MgUGxheWVyV2lkZ2V0IHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICBwdWJsaWMgZGF0YTogSVdpZGdldFBsYXllckRhdGE7XG4gIHB1YmxpYyB3aWRnZXQ6IE5vZGU7XG5cbiAgY29uc3RydWN0b3IoeyBkYXRhIH06IHsgZGF0YTogSVdpZGdldFBsYXllckRhdGEgfSkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1wbGF5ZXItdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogTm9kZSB7XG4gICAgdGhpcy5zZXRDb3ZlcigpO1xuXG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIucGxheWVyLW5vd19fdGl0bGVcIiwgYCR7dGhpcy5kYXRhLmFydGlzdH0gJHt0aGlzLmRhdGEudHJhY2submFtZX1gKTtcblxuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLnBsYXllci1wcm9ncmVzc19fdGltZVwiLCB0aGlzLmRhdGEudHJhY2subGVuZ3RoKTtcbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5wbGF5ZXItdm9sdW1lX19wZXJjZW50YWdlXCIsIGAke3RoaXMuZGF0YS52b2x1bWV9JWApO1xuXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbm5lclRleHQoc2VsZWN0b3I6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3QgYmxvY2s6IEhUTUxFbGVtZW50ID0gKHRoaXMud2lkZ2V0IGFzIEhUTUxFbGVtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmIChibG9jaykge1xuICAgICAgYmxvY2suaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENvdmVyKCkge1xuICAgIGNvbnN0IGJsb2NrID0gKHRoaXMud2lkZ2V0IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5vd19fY292ZXJcIik7XG5cbiAgICBibG9jay5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdGhpcy5kYXRhLmFsYnVtY292ZXIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcldpZGdldDtcbiIsImltcG9ydCB7IElXaWRnZXRRdWVzdGlvbnNEYXRhIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2luZGV4XCI7XG5cbmNsYXNzIFF1ZXN0aW9uc1dpZGdldCB7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgcHVibGljIGRhdGE6IElXaWRnZXRRdWVzdGlvbnNEYXRhO1xuICBwdWJsaWMgd2lkZ2V0OiBOb2RlO1xuXG4gIGNvbnN0cnVjdG9yKHsgZGF0YSB9OiB7IGRhdGE6IElXaWRnZXRRdWVzdGlvbnNEYXRhIH0pIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtcXVlc3Rpb25zLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IE5vZGUge1xuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLmJ1dHRvbl90eXBlLXllbGxvd1wiLCB0aGlzLmRhdGEuYnV0dG9uc1swXSk7XG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIuYnV0dG9uX3R5cGUtZ3JleVwiLCB0aGlzLmRhdGEuYnV0dG9uc1sxXSk7XG5cbiAgICByZXR1cm4gdGhpcy53aWRnZXQ7XG4gIH1cblxuICBwcml2YXRlIHNldElubmVyVGV4dChzZWxlY3Rvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBibG9jazogSFRNTEVsZW1lbnQgPSAodGhpcy53aWRnZXQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoYmxvY2spIHtcbiAgICAgIGJsb2NrLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFF1ZXN0aW9uc1dpZGdldDtcbiIsImNsYXNzIFN0YXRzV2lkZ2V0IHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpZGdldC1zdGF0cy10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBOb2RlIHtcbiAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0c1dpZGdldDtcbiIsImltcG9ydCB7IElXaWRnZXRUaGVtYWxEYXRhIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2luZGV4XCI7XG5cbmNsYXNzIFRoZW1hbFdpZGdldCB7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgcHVibGljIGRhdGE6IElXaWRnZXRUaGVtYWxEYXRhO1xuICBwdWJsaWMgd2lkZ2V0OiBOb2RlO1xuXG4gIGNvbnN0cnVjdG9yKHsgZGF0YSB9OiB7IGRhdGE6IElXaWRnZXRUaGVtYWxEYXRhIH0pIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtdGhlcm1hbC10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBOb2RlIHtcbiAgICB0aGlzLnNldElubmVyVGV4dChcbiAgICAgIFwiLndpZGdldC1zZW5zb3JfdHlwZS10ZW1wIC53aWRnZXQtc2Vuc29yX192YWx1ZVwiLFxuICAgICAgYCR7dGhpcy5kYXRhLnRlbXBlcmF0dXJlfUNgLFxuICAgICk7XG5cbiAgICB0aGlzLnNldElubmVyVGV4dChcbiAgICAgIFwiLndpZGdldC1zZW5zb3JfdHlwZS1odW1pZGl0eSAud2lkZ2V0LXNlbnNvcl9fdmFsdWVcIixcbiAgICAgIGAke3RoaXMuZGF0YS5odW1pZGl0eX0lYCxcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbm5lclRleHQoc2VsZWN0b3I6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3QgYmxvY2s6IEhUTUxFbGVtZW50ID0gKHRoaXMud2lkZ2V0IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYgKGJsb2NrKSB7XG4gICAgICBibG9jay5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaGVtYWxXaWRnZXQ7XG4iLCJpbXBvcnQgQ2FtZXJhV2lkZ2V0IGZyb20gXCIuL2NhbWVyYS53aWRnZXRcIjtcbmltcG9ydCBQbGF5ZXJXaWRnZXQgZnJvbSBcIi4vcGxheWVyLndpZGdldFwiO1xuaW1wb3J0IFF1ZXN0aW9uc1dpZGdldCBmcm9tIFwiLi9xdWVzdGlvbnMud2lkZ2V0XCI7XG5pbXBvcnQgU3RhdHNXaWRnZXQgZnJvbSBcIi4vc3RhdHMud2lkZ2V0XCI7XG5pbXBvcnQgVGhlbWFsV2lkZ2V0IGZyb20gXCIuL3RoZW1hbC53aWRnZXRcIjtcblxuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSBcIi4uLy4uL3N0b3JlXCI7XG5pbXBvcnQgeyBtYXJrRXZlbnRBc1JlYWQgfSBmcm9tIFwiLi4vLi4vc3RvcmUvZXZlbnRzL2FjdGlvbkNyZWF0b3JzXCI7XG5cbmltcG9ydCBVc2VyUmVhZEV2ZW50c1NlcnZpY2UgZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXJSZWFkRXZlbnRzU2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBUeXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuY29uc3QgV0lER0VUX1RZUEVTID0ge1xuICBTVEFUUzogXCJTVEFUU1wiLFxuICBDQU1FUkE6IFwiQ0FNRVJBXCIsXG4gIFRIRVJNQUw6IFwiVEhFUk1BTFwiLFxuICBQTEFZRVI6IFwiUExBWUVSXCIsXG4gIFFVRVNUSU9OUzogXCJRVUVTVElPTlNcIixcbiAgREVGQVVMVDogXCJERUZBVUxUXCJcbn07XG5cbi8vIFRPRE86IGFkZCBtZXRob2QgZGVzdG95LCBmb3IgcmVtb3ZpbmcgZXZlbnRzLCB3aGVuIHdpZGdldCBkZWxldGVkIGZyb20gZG9tXG5jbGFzcyBXaWRnZXQge1xuICBwdWJsaWMgZXZlbnQ6IFR5cGVzLkV2ZW50O1xuICBwdWJsaWMgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICBwdWJsaWMgd2lkZ2V0OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcih7IGV2ZW50LCBjb250YWluZXIgfTogeyBldmVudDogVHlwZXMuRXZlbnQ7IGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfSkge1xuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLndpZGdldCA9IHRoaXMudGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldFwiKS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICB0aGlzLndpZGdldC5jbGFzc0xpc3QuYWRkKGB3aWRnZXRfc2l6ZS0ke3RoaXMuZXZlbnQuc2l6ZX1gKTtcbiAgICB0aGlzLndpZGdldC5jbGFzc0xpc3QuYWRkKGB3aWRnZXRfdHlwZS0ke3RoaXMuZXZlbnQudHlwZX1gKTtcblxuICAgIHRoaXMuc2V0SGVhZGVyRGF0YSgpO1xuICAgIHRoaXMuc2V0RGVzY3JpcHRpb24oKTtcbiAgICB0aGlzLnJlbmRlckRhdGFUZW1wbGF0ZSgpO1xuICAgIHRoaXMuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMud2lkZ2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBtYXJrV2lkZ2V0QXNSZWFkKCk6IHZvaWQge1xuICAgIFVzZXJSZWFkRXZlbnRzU2VydmljZS5tYXJrRXZlbnRBc1JlYWQodGhpcy5ldmVudC5pZCk7XG5cbiAgICBEaXNwYXRjaGVyLmRpc3BhdGNoKG1hcmtFdmVudEFzUmVhZCh0aGlzLmV2ZW50LmlkKSk7XG4gIH1cblxuICBwcml2YXRlIHNldERlc2NyaXB0aW9uKCkge1xuICAgIGlmICh0aGlzLmV2ZW50LmRlc2NyaXB0aW9uICYmIHRoaXMud2lkZ2V0KSB7XG4gICAgICBjb25zdCBjb250ZW50VGV4dCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWNvbnRlbnRfX3RleHRcIik7XG4gICAgICBjb25zdCB0ZXh0RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtY29udGVudF9fdGV4dFwiKTtcblxuICAgICAgaWYgKGNvbnRlbnRUZXh0KSB7XG4gICAgICAgIGNvbnRlbnRUZXh0LmNsYXNzTGlzdC5hZGQoYHdpZGdldC1jb250ZW50X190ZXh0X3dpZHRoLSR7dGhpcy5ldmVudC5zaXplfWApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGV4dEVsZW1lbnQpIHtcbiAgICAgICAgdGV4dEVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5ldmVudC5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEhlYWRlckRhdGEoKSB7XG4gICAgY29uc3QgdGl0bGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIud2lkZ2V0LWhlYWRlci1hYm91dF9fdGl0bGVcIlxuICAgICk7XG4gICAgY29uc3QgdHlwZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWhlYWRlcl9fdHlwZVwiKTtcbiAgICBjb25zdCBkYXRlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtaGVhZGVyX19kYXRlXCIpO1xuICAgIGNvbnN0IGljb25Vc2VFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIud2lkZ2V0LWhlYWRlci1hYm91dF9faWNvbiA+IHVzZVwiXG4gICAgKTtcbiAgICBjb25zdCBpY29uRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcIi53aWRnZXQtaGVhZGVyLWFib3V0X19pY29uXCIpO1xuXG4gICAgaWYgKHRpdGxlRWxlbWVudCkge1xuICAgICAgdGl0bGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQudGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVFbGVtZW50KSB7XG4gICAgICB0eXBlRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmV2ZW50LnNvdXJjZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0ZUVsZW1lbnQpIHtcbiAgICAgIGRhdGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQudGltZTtcbiAgICB9XG5cbiAgICBpZiAoaWNvblVzZUVsZW1lbnQpIHtcbiAgICAgIGljb25Vc2VFbGVtZW50LnNldEF0dHJpYnV0ZShcInhsaW5rOmhyZWZcIiwgYCMke3RoaXMuZXZlbnQuaWNvbn1gKTtcbiAgICB9XG5cbiAgICBpZiAoaWNvbkVsZW1lbnQpIHtcbiAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoYGljb25fJHt0aGlzLmV2ZW50Lmljb259YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBjbG9zZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0X19jb250cm9sX2Nsb3NlXCIpO1xuXG4gICAgaWYgKGNsb3NlRWxlbWVudCkge1xuICAgICAgY2xvc2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubWFya1dpZGdldEFzUmVhZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXREYXRhVGVtcGxhdGVUeXBlKCk6IHN0cmluZyB7XG4gICAgY29uc3QgeyBkYXRhID0geyB0eXBlOiBcImVtcHR5XCIgfSwgaWNvbiB9ID0gdGhpcy5ldmVudDtcblxuICAgIGlmIChpY29uID09PSBcImNhbVwiKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLkNBTUVSQTtcbiAgICB9XG5cbiAgICBpZiAoKGRhdGEgYXMgVHlwZXMuSVdpZGdldFRoZW1hbERhdGEpLnRlbXBlcmF0dXJlKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLlRIRVJNQUw7XG4gICAgfVxuXG4gICAgaWYgKChkYXRhIGFzIFR5cGVzLklXaWRnZXRQbGF5ZXJEYXRhKS5hbGJ1bWNvdmVyKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLlBMQVlFUjtcbiAgICB9XG5cbiAgICBpZiAoKGRhdGEgYXMgVHlwZXMuSVdpZGdldFF1ZXN0aW9uc0RhdGEpLmJ1dHRvbnMpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuUVVFU1RJT05TO1xuICAgIH1cblxuICAgIGlmICgoZGF0YSBhcyBUeXBlcy5JV2lkZ2V0RGVmYXVsdERhdGEpLnR5cGUgPT09IFwiZ3JhcGhcIikge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5TVEFUUztcbiAgICB9XG5cbiAgICByZXR1cm4gV0lER0VUX1RZUEVTLkRFRkFVTFQ7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckRhdGFUZW1wbGF0ZSgpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZURhdGFUeXBlID0gdGhpcy5nZXREYXRhVGVtcGxhdGVUeXBlKCk7XG4gICAgbGV0IGRhdGFDb250ZW50QmxvY2sgPSBudWxsO1xuXG4gICAgc3dpdGNoICh0ZW1wbGF0ZURhdGFUeXBlKSB7XG4gICAgICBjYXNlIFdJREdFVF9UWVBFUy5TVEFUUzpcbiAgICAgICAgY29uc3Qgc3RhdHNXaWRnZXQgPSBuZXcgU3RhdHNXaWRnZXQoKTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gc3RhdHNXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLkNBTUVSQTpcbiAgICAgICAgY29uc3QgY2FtZXJhV2lkZ2V0ID0gbmV3IENhbWVyYVdpZGdldCgpO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBjYW1lcmFXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlBMQVlFUjpcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRPRE86INCd0LUg0L/QvtC90LjQvNCw0Y4sINC60LDQuiDQt9C00LXRgdGMINC80L7QttC90L4g0L7QsdC+0LnRgtC40YHRjCDQsdC10LcgYXNzaWdubWVudFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcGxheWVyV2lkZ2V0ID0gbmV3IFBsYXllcldpZGdldCh7XG4gICAgICAgICAgZGF0YTogdGhpcy5ldmVudC5kYXRhIGFzIFR5cGVzLklXaWRnZXRQbGF5ZXJEYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBwbGF5ZXJXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlFVRVNUSU9OUzpcbiAgICAgICAgY29uc3QgcXVlc3Rpb25zV2lkZ2V0ID0gbmV3IFF1ZXN0aW9uc1dpZGdldCh7XG4gICAgICAgICAgZGF0YTogdGhpcy5ldmVudC5kYXRhIGFzIFR5cGVzLklXaWRnZXRRdWVzdGlvbnNEYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSBxdWVzdGlvbnNXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV0lER0VUX1RZUEVTLlRIRVJNQUw6XG4gICAgICAgIGNvbnN0IHRoZXJtYWxXaWRnZXQgPSBuZXcgVGhlbWFsV2lkZ2V0KHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmV2ZW50LmRhdGEgYXMgVHlwZXMuSVdpZGdldFRoZW1hbERhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IHRoZXJtYWxXaWRnZXQucmVuZGVyKCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFDb250ZW50QmxvY2spIHtcbiAgICAgIGNvbnN0IHdpZGdldENvbnRlbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWNvbnRlbnRcIik7XG5cbiAgICAgIGlmICh3aWRnZXRDb250ZW50KSB7XG4gICAgICAgIHdpZGdldENvbnRlbnQuYXBwZW5kQ2hpbGQoZGF0YUNvbnRlbnRCbG9jayk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdpZGdldDtcbiIsImltcG9ydCBXaWRnZXQgZnJvbSBcIi4uL2NvbXBvbmVudHMvd2lkZ2V0L3dpZGdldFwiO1xuXG5pbXBvcnQgRXZlbnRzU3RvcmUgZnJvbSBcIi4uL3N0b3JlL2V2ZW50cy9ldmVudHMuc3RvcmVcIjtcbmltcG9ydCB7IHNldEV2ZW50c0RhdGEgfSBmcm9tIFwiLi4vc3RvcmUvZXZlbnRzL2FjdGlvbkNyZWF0b3JzXCI7XG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tIFwiLi4vc3RvcmVcIjtcblxuaW1wb3J0IFVzZXJSZWFkRXZlbnRzU2VydmljZSBmcm9tIFwiLi4vc2VydmljZXMvdXNlclJlYWRFdmVudHNTZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIFR5cGVzIGZyb20gXCIuLi90eXBlc1wiO1xuXG5jbGFzcyBJbmRleFBhZ2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBFdmVudHNTdG9yZS5zdWJzY3JpYmUodGhpcy5yZW5kZXJEYXNoYm9hcmRXaWRnZXRzKTtcblxuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RXZlbnRzKCkge1xuICAgIGNvbnN0IHVzZXJSZWFkRXZlbnRzOiBzdHJpbmdbXSA9IFVzZXJSZWFkRXZlbnRzU2VydmljZS5nZXRSZWFkRXZlbnRzKCk7XG5cbiAgICB0aGlzLmxvYWRFdmVudHMoKS50aGVuKChldmVudHM6IFR5cGVzLkV2ZW50W10pID0+IHtcbiAgICAgIGxldCBmaWx0ZXJlZEV2ZW50czogVHlwZXMuRXZlbnRbXSA9IFtdO1xuXG4gICAgICBpZiAoIXVzZXJSZWFkRXZlbnRzKSB7XG4gICAgICAgIGZpbHRlcmVkRXZlbnRzID0gZXZlbnRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlsdGVyZWRFdmVudHMgPSBldmVudHMuZmlsdGVyKFxuICAgICAgICAgIChldmVudDogVHlwZXMuRXZlbnQpID0+ICF1c2VyUmVhZEV2ZW50cy5pbmNsdWRlcyhldmVudC5pZClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgRGlzcGF0Y2hlci5kaXNwYXRjaChzZXRFdmVudHNEYXRhKGZpbHRlcmVkRXZlbnRzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckRhc2hib2FyZFdpZGdldHMoKSB7XG4gICAgY29uc3QgZXZlbnRzU3RvcmVEYXRhID0gRXZlbnRzU3RvcmUuZ2V0RGF0YSgpO1xuICAgIGNvbnN0IGV2ZW50czogVHlwZXMuRXZlbnRbXSA9IGV2ZW50c1N0b3JlRGF0YS5ldmVudHMuZmlsdGVyKFxuICAgICAgKGV2ZW50OiBUeXBlcy5FdmVudCkgPT4gIWV2ZW50LnVzZXJSZWFkXG4gICAgKTtcblxuICAgIGNvbnN0IGRhc2hib2FyZFdpZGdldHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXNoYm9hcmQtbGlzdFwiKTtcblxuICAgIC8vIENsZWFyIGRhc2hib2FyZFxuICAgIGRhc2hib2FyZFdpZGdldHNMaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBpZiAoIWV2ZW50cy5sZW5ndGgpIHtcbiAgICAgIGRhc2hib2FyZFdpZGdldHNMaXN0LmlubmVySFRNTCA9IFwiPGgyPtCjINCy0LDRgSDQvdC10YIg0L3QvtCy0YvRhSDRgdC+0LHRi9GC0LjQuTwvaDI+XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gbmV3IFdpZGdldCh7XG4gICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgY29udGFpbmVyOiBkYXNoYm9hcmRXaWRnZXRzTGlzdFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZEV2ZW50cygpOiBQcm9taXNlPFR5cGVzLkV2ZW50W10+IHtcbiAgICAvLyBzZXJ2ZXIgd29ya3Mgb25seSBvbiBsb2NhbG1hY2hpbmVcbiAgICAvLyBydW4gbnBtIHN0YXJ0IHNlcnZlciBmb3IgaXRcbiAgICAvLyBpZiAobG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpIHtcbiAgICAvLyAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZXZlbnRzXCIsIHtcbiAgICAvLyAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAvLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgIC8vICAgICAgIHR5cGU6IFwiY3JpdGljYWw6aW5mb1wiLFxuICAgIC8vICAgICAgIG9mZnNldDogMCxcbiAgICAvLyAgICAgICBsaW1pdDogMjBcbiAgICAvLyAgICAgfSksXG4gICAgLy8gICAgIGhlYWRlcnM6IHtcbiAgICAvLyAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIC8vICAgICB9XG4gICAgLy8gICB9KVxuICAgIC8vICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLy8gICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgICAvLyB9XG5cbiAgICByZXR1cm4gZmV0Y2goXCJkYXRhL2V2ZW50cy5qc29uXCIpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5ldmVudHMpXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5kZXhQYWdlO1xuIiwiaW1wb3J0IEhlYWRlck5hdmlnYXRpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlclwiO1xuXG5pbXBvcnQgSW5kZXhQYWdlIGZyb20gXCIuL2luZGV4LnBhZ2VcIjtcbmltcG9ydCBWaWRlb2NvbnRyb2xQYWdlIGZyb20gXCIuL3ZpZGVvY29udHJvbC5wYWdlXCI7XG5cbmNsYXNzIEluaXRBcHBsaWNhdGlvbiB7XG4gIHB1YmxpYyBwYWdlOiBhbnk7XG4gIHB1YmxpYyBoZWFkZXJOYXZpZ2F0aW9uOiBhbnk7XG4gIHB1YmxpYyBjdXJyZW50UGFnZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcm91dGluZygpIHtcbiAgICBzd2l0Y2ggKHRoaXMuY3VycmVudFBhZ2UpIHtcbiAgICAgIGNhc2UgXCIvXCI6XG4gICAgICBjYXNlIFwiL2luZGV4Lmh0bWxcIjpcbiAgICAgIGNhc2UgXCIvc2hyaS1hZGFwdGl2ZS1sYXlvdXQvXCI6XG4gICAgICBjYXNlIFwiL3NocmktYWRhcHRpdmUtbGF5b3V0L2luZGV4Lmh0bWxcIjpcbiAgICAgICAgdGhpcy5wYWdlID0gbmV3IEluZGV4UGFnZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIi92aWRlb2NvbnRyb2wuaHRtbFwiOlxuICAgICAgY2FzZSBcIi9zaHJpLWFkYXB0aXZlLWxheW91dC92aWRlb2NvbnRyb2wuaHRtbFwiOlxuICAgICAgICB0aGlzLnBhZ2UgPSBuZXcgVmlkZW9jb250cm9sUGFnZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgdGhpcy5oZWFkZXJOYXZpZ2F0aW9uID0gbmV3IEhlYWRlck5hdmlnYXRpb24oe1xuICAgICAgc2VsZWN0b3I6IFwiI2hlYWRlci1tZW51XCJcbiAgICB9KTtcblxuICAgIHRoaXMucm91dGluZygpO1xuICB9XG59XG5cbmNvbnN0IEFwcCA9IG5ldyBJbml0QXBwbGljYXRpb24oKTtcbiIsImltcG9ydCBWaWRlb2NvbnRyb2wgZnJvbSBcIi4uL2NvbXBvbmVudHMvdmlkZW9jb250cm9sL3ZpZGVvY29udHJvbFwiO1xuXG5pbXBvcnQgKiBhcyBUeXBlcyBmcm9tIFwiLi4vdHlwZXNcIjtcblxuY2xhc3MgVmlkZW9Db250cm9sUGFnZSB7XG4gIHB1YmxpYyBicm9hZGNhc3RzOiBUeXBlcy5Ccm9hZGNhc3RbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJyb2FkY2FzdHMgPSBbXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRnNvc2VkJTJGbWFzdGVyLm0zdThcIixcbiAgICAgICAgcGxheWVyOiBudWxsLFxuICAgICAgICBpZDogdW5kZWZpbmVkLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdXJsOlxuICAgICAgICAgIFwiaHR0cDovL2xvY2FsaG9zdDo5MTkxL21hc3Rlcj91cmw9aHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTMxMDIlMkZzdHJlYW1zJTJGY2F0JTJGbWFzdGVyLm0zdThcIixcbiAgICAgICAgcGxheWVyOiBudWxsLFxuICAgICAgICBpZDogdW5kZWZpbmVkLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdXJsOlxuICAgICAgICAgIFwiaHR0cDovL2xvY2FsaG9zdDo5MTkxL21hc3Rlcj91cmw9aHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTMxMDIlMkZzdHJlYW1zJTJGZG9nJTJGbWFzdGVyLm0zdThcIixcbiAgICAgICAgcGxheWVyOiBudWxsLFxuICAgICAgICBpZDogdW5kZWZpbmVkLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdXJsOlxuICAgICAgICAgIFwiaHR0cDovL2xvY2FsaG9zdDo5MTkxL21hc3Rlcj91cmw9aHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTMxMDIlMkZzdHJlYW1zJTJGaGFsbCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgXTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIGNvbnN0IFZpZGVvY29udHJvbFdpZGdldCA9IG5ldyBWaWRlb2NvbnRyb2woe1xuICAgICAgYnJvYWRjYXN0czogdGhpcy5icm9hZGNhc3RzLFxuICAgICAgZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2Yy1saXN0XCIpLFxuICAgICAgZWxlbWVudFNob3dBbGw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmMtc2hvd2FsbFwiKSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWaWRlb0NvbnRyb2xQYWdlO1xuIiwiZXhwb3J0IGNvbnN0IHN0b3JhZ2VLZXlzID0ge1xuICB1c2VyUmVhZEV2ZW50czogXCJ1c2VyUmVhZEV2ZW50c1wiXG59O1xuXG5jb25zdCBTdG9yYWdlU2VydmljZSA9IHtcbiAgc2V0OiAoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkID0+IHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH0sXG4gIGdldDogKGtleTogc3RyaW5nKTogYW55ID0+IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2VTZXJ2aWNlO1xuIiwiaW1wb3J0IFN0b3JhZ2VTZXJ2aWNlLCB7IHN0b3JhZ2VLZXlzIH0gZnJvbSBcIi4vc3RvcmFnZVNlcnZpY2VcIjtcblxuLyoqXG4gKiBTZXJ2aWNlIHdvcmsgd2l0aCBldmVudHMsIHdoaWNoIHdhcyBtYXJrZWQgdXNlciBhcyByZWFkIGluIExvY2FsU3RvcmFnZVxuICovXG5jb25zdCBVc2VyUmVhZEV2ZW50c1NlcnZpY2UgPSB7XG4gIC8qKlxuICAgKiBHZXQgbWFya2VkIGFzIHJlYWQgZXZlbnRzXG4gICAqL1xuICBnZXRSZWFkRXZlbnRzOiAoKTogc3RyaW5nW10gPT4ge1xuICAgIGNvbnN0IHVzZXJSZWFkRXZlbnRzID0gSlNPTi5wYXJzZShTdG9yYWdlU2VydmljZS5nZXQoc3RvcmFnZUtleXMudXNlclJlYWRFdmVudHMpKTtcblxuICAgIHJldHVybiB1c2VyUmVhZEV2ZW50cztcbiAgfSxcbiAgLyoqXG4gICAqIFNhdmUsIHRoYXQgZXZlbnQgaXMgbWFya2VkIGFzIHJlYWRcbiAgICovXG4gIG1hcmtFdmVudEFzUmVhZDogKGlkOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBjb25zdCB1c2VyUmVhZEV2ZW50czogc3RyaW5nW10gPVxuICAgICAgSlNPTi5wYXJzZShTdG9yYWdlU2VydmljZS5nZXQoc3RvcmFnZUtleXMudXNlclJlYWRFdmVudHMpKSB8fCBbXTtcblxuICAgIHVzZXJSZWFkRXZlbnRzLnB1c2goaWQpO1xuXG4gICAgU3RvcmFnZVNlcnZpY2Uuc2V0KHN0b3JhZ2VLZXlzLnVzZXJSZWFkRXZlbnRzLCBKU09OLnN0cmluZ2lmeSh1c2VyUmVhZEV2ZW50cykpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyUmVhZEV2ZW50c1NlcnZpY2U7XG4iLCJpbXBvcnQgeyBFdmVudHNBY3Rpb25zIH0gZnJvbSBcIi4vZXZlbnRzLnN0b3JlXCI7XG5cbmV4cG9ydCBjb25zdCBzZXRFdmVudHNEYXRhID0gKGV2ZW50czogb2JqZWN0W10pID0+ICh7XG4gIHR5cGU6IEV2ZW50c0FjdGlvbnMuU0VUX0VWRU5UUyxcbiAgcGF5bG9hZDoge1xuICAgIGV2ZW50c1xuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IG1hcmtFdmVudEFzUmVhZCA9IChpZDogc3RyaW5nKSA9PiAoe1xuICB0eXBlOiBFdmVudHNBY3Rpb25zLk1BUktfRVZFTlRfQVNfUkVBRCxcbiAgcGF5bG9hZDoge1xuICAgIGlkXG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgU3RvcmUsIFR5cGVzIH0gZnJvbSBcInNocmlmbHV4XCI7XG5pbXBvcnQgKiBhcyBBcHBNb2RlbFR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG4vLyBBY3Rpb25zXG5leHBvcnQgY29uc3QgRXZlbnRzQWN0aW9ucyA9IHtcbiAgU0VUX0VWRU5UUzogXCJTRVRfRVZFTlRTXCIsXG4gIE1BUktfRVZFTlRfQVNfUkVBRDogXCJNQVJLX0VWRU5UX0FTX1JFQURcIlxufTtcblxuLy8gU3RvcmVcbmludGVyZmFjZSBJRXZlbnRzU3RvcmVEYXRhIHtcbiAgZXZlbnRzOiBBcHBNb2RlbFR5cGVzLkV2ZW50W107XG59XG5cbmNvbnN0IGluaXRpYWxEYXRhOiBJRXZlbnRzU3RvcmVEYXRhID0ge1xuICBldmVudHM6IFtdXG59O1xuXG5jb25zdCBFdmVudHNTdG9yZSA9IG5ldyBTdG9yZSh7XG4gIGluaXRpYWxEYXRhXG59KTtcblxuLy8gRWZmZWN0cyBmb3Igc3RvcmVcbmV4cG9ydCBjb25zdCBFdmVudHNFZmZlY3RzID0gKGFjdGlvbjogVHlwZXMuSUFjdGlvbikgPT4ge1xuICBjb25zdCB7IHR5cGUsIHBheWxvYWQgfSA9IGFjdGlvbjtcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIEV2ZW50c0FjdGlvbnMuU0VUX0VWRU5UUzpcbiAgICAgIEV2ZW50c1N0b3JlLnVwZGF0ZURhdGEoe1xuICAgICAgICBldmVudHM6IHBheWxvYWQuZXZlbnRzXG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRXZlbnRzQWN0aW9ucy5NQVJLX0VWRU5UX0FTX1JFQUQ6XG4gICAgICBjb25zdCBkYXRhID0gRXZlbnRzU3RvcmUuZ2V0RGF0YSgpO1xuXG4gICAgICBFdmVudHNTdG9yZS51cGRhdGVEYXRhKHtcbiAgICAgICAgZXZlbnRzOiBkYXRhLmV2ZW50cy5tYXAoXG4gICAgICAgICAgKGV2ZW50OiBBcHBNb2RlbFR5cGVzLkV2ZW50KSA9PlxuICAgICAgICAgICAgZXZlbnQuaWQgPT09IHBheWxvYWQuaWQgPyB7IC4uLmV2ZW50LCB1c2VyUmVhZDogdHJ1ZSB9IDogZXZlbnRcbiAgICAgICAgKVxuICAgICAgfSk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRzU3RvcmU7XG4iLCJpbXBvcnQgeyBEaXNwYXRjaGVyIH0gZnJvbSBcInNocmlmbHV4XCI7XG5cbmltcG9ydCB7IEV2ZW50c0VmZmVjdHMgfSBmcm9tIFwiLi9ldmVudHMvZXZlbnRzLnN0b3JlXCI7XG5cbmNvbnN0IGFwcERpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuXG4vLyBSZWdpc3RlciBhbGwgZWZmZWN0IGhlcmVcblxuYXBwRGlzcGF0Y2hlci5yZWdpc3RlcihFdmVudHNFZmZlY3RzKTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwRGlzcGF0Y2hlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=