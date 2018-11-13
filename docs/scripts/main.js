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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NocmlmbHV4L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmlkZW9jb250cm9sL2F1ZGlvQW5hbHlzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvcGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZpZGVvY29udHJvbC9wbGF5ZXJUZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aWRlb2NvbnRyb2wvdmlkZW9jb250cm9sLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9jYW1lcmEud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9wbGF5ZXIud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9xdWVzdGlvbnMud2lkZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3dpZGdldC9zdGF0cy53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3RoZW1hbC53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvd2lkZ2V0L3dpZGdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXgucGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3ZpZGVvY29udHJvbC5wYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9zdG9yYWdlU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvdXNlclJlYWRFdmVudHNTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9ldmVudHMvYWN0aW9uQ3JlYXRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2V2ZW50cy9ldmVudHMuc3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUEsOENBQThDLGNBQWM7O0FBRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsY0FBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix5QkFBeUI7QUFD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LFVBQVU7WUFDM0IsV0FBVyxDQUFDLFVBQVUsQ0FBQztnQkFDckIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2FBQ3ZCLENBQUMsQ0FBQztZQUNILE1BQU07UUFDUixLQUFLLGFBQWEsQ0FBQyxrQkFBa0I7WUFDbkMsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRW5DLFdBQVcsQ0FBQyxVQUFVLENBQUM7Z0JBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDckIsQ0FBQyxLQUEwQixFQUFFLEVBQUUsQ0FDN0IsS0FBSyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsbUJBQU0sS0FBSyxJQUFFLFFBQVEsRUFBRSxJQUFJLElBQUcsQ0FBQyxDQUFDLEtBQUssQ0FDakU7YUFDRixDQUFDLENBQUM7WUFDSCxNQUFNO1FBRVI7WUFDRSxNQUFNO0tBQ1Q7QUFDSCxDQUFDLENBQUM7QUFFRiwrREFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERXO0FBRWdCO0FBRXRELE1BQU0sYUFBYSxHQUFHLElBQUksbURBQVUsRUFBRSxDQUFDO0FBRXZDLDJCQUEyQjtBQUUzQixhQUFhLENBQUMsUUFBUSxDQUFDLGtFQUFhLENBQUMsQ0FBQztBQUV0QywrREFBZSxhQUFhLEVBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2VzL2luZGV4LnRzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vKipcclxuICogVGhlIGRpc3BhdGNoZXIgaXMgdGhlIGNlbnRyYWwgaHViXHJcbiAqIHRoYXQgbWFuYWdlcyBhbGwgZGF0YSBmbG93IGluIGEgRmx1eCBhcHBsaWNhdGlvbi5cclxuICovXHJcbmNsYXNzIERpc3BhdGNoZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RzID0gW107XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIHN0b3JlRWZmZWN0IGluc2lkZVxyXG4gICAgICogQHBhcmFtIHN0b3JlRWZmZWN0XHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyKHN0b3JlRWZmZWN0KSB7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RzLnB1c2goc3RvcmVFZmZlY3QpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwYXRjaCBhIG5ldyBhY3Rpb24gdG8gYWxsIHJlZ2lzdGVyZWQgc3RvcmVzXHJcbiAgICAgKiBAcGFyYW0gYWN0aW9uXHJcbiAgICAgKi9cclxuICAgIGRpc3BhdGNoKGFjdGlvbikge1xyXG4gICAgICAgIHRoaXMuZWZmZWN0cy5mb3JFYWNoKGVmZmVjdCA9PiB7XHJcbiAgICAgICAgICAgIGVmZmVjdChhY3Rpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIFN0b3JlIHtcclxuICAgIGNvbnN0cnVjdG9yKHsgaW5pdGlhbERhdGEgfSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5hbW91bnRTdWJzY3JpcHRpb25zID0gMDtcclxuICAgICAgICB0aGlzLmRhdGEgPSBpbml0aWFsRGF0YTtcclxuICAgIH1cclxuICAgIF9jcmVhdGVTdWJzY3JpcHRpb25JZCgpIHtcclxuICAgICAgICB0aGlzLmFtb3VudFN1YnNjcmlwdGlvbnMrKztcclxuICAgICAgICByZXR1cm4gYHN1Yl8ke3RoaXMuYW1vdW50U3Vic2NyaXB0aW9uc31gO1xyXG4gICAgfVxyXG4gICAgX25vdGlmeVN1YnNjcmliZXJzKCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaCgoc3Vic2NyaWJlckNhbGxiYWNrKSA9PiB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZXJDYWxsYmFjaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0RGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlRGF0YSh1cGRhdGVkRmllbGRzRGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGF0YSwgdXBkYXRlZEZpZWxkc0RhdGEpO1xyXG4gICAgICAgIHRoaXMuX25vdGlmeVN1YnNjcmliZXJzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxuICAgIHN1YnNjcmliZShjYWxsYmFjaykge1xyXG4gICAgICAgIGNvbnN0IHN1YklkID0gdGhpcy5fY3JlYXRlU3Vic2NyaXB0aW9uSWQoKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLnNldChzdWJJZCwgY2FsbGJhY2spO1xyXG4gICAgICAgIHJldHVybiBzdWJJZDtcclxuICAgIH1cclxuICAgIHVuc3Vic2NyaWJlKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlcnMuZGVsZXRlKGlkKTtcclxuICAgIH1cclxufVxuXG5cblxudmFyIHR5cGVzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuXG59KTtcblxuZXhwb3J0cy5EaXNwYXRjaGVyID0gRGlzcGF0Y2hlcjtcbmV4cG9ydHMuU3RvcmUgPSBTdG9yZTtcbmV4cG9ydHMuVHlwZXMgPSB0eXBlcztcbiIsImNvbnN0IGRvbVV0aWxzID0ge1xuICBkb2VzTm9kZUNvbnRhaW5DbGljazogKG5vZGU6IEhUTUxFbGVtZW50LCBlOiBFdmVudCk6IGJvb2xlYW4gPT4ge1xuICAgIGlmICghbm9kZSB8fCAhZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gbm9kZS5jb250YWlucyhlLnRhcmdldCk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0aW9uIHtcbiAgcHVibGljIG1lbnVPcGVuZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBoZWFkZXJNZW51OiBIVE1MRWxlbWVudCB8IG51bGw7XG4gIHB1YmxpYyBoZWFkZXJCdXJnZXJNZW51OiBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoeyBzZWxlY3RvciB9OiB7IHNlbGVjdG9yOiBzdHJpbmcgfSkge1xuICAgIHRoaXMubWVudU9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMuaGVhZGVyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIHRoaXMuaGVhZGVyQnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyLWJ1cmdlclwiKTtcblxuICAgIGlmICh0aGlzLmlzTW9iaWxlKCkpIHtcbiAgICAgIHRoaXMuaW5pdE5hdmlnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3Blbk5hdmlnYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJNZW51LmNsYXNzTGlzdC5hZGQoXCJoZWFkZXItbWVudS1saXN0X3N0YXRlLW1vYmlsZS1vcGVuZWRcIik7XG4gICAgfVxuXG4gICAgdGhpcy5tZW51T3BlbmVkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZU5hdmlnYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJoZWFkZXItbWVudS1saXN0X3N0YXRlLW1vYmlsZS1vcGVuZWRcIik7XG4gICAgfVxuXG4gICAgdGhpcy5tZW51T3BlbmVkID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGlzTW9iaWxlKCkge1xuICAgIGNvbnN0IG1heE1vYmlsZVdpZHRoID0gNzY4O1xuXG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIDwgbWF4TW9iaWxlV2lkdGg7XG4gIH1cblxuICBwcml2YXRlIGluaXROYXZpZ2F0aW9uKCkge1xuICAgIGlmICh0aGlzLmhlYWRlck1lbnUpIHtcbiAgICAgIHRoaXMuaGVhZGVyTWVudS5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyLW1lbnUtbGlzdF9zdGF0ZS1tb2JpbGVcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVhZGVyQnVyZ2VyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJCdXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5tZW51T3BlbmVkKSB7XG4gICAgICAgICAgdGhpcy5vcGVuTmF2aWdhdGlvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VOYXZpZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQHRzLWlnbm9yZVxuY29uc3QgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXG5jb25zdCBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXG5jbGFzcyBBbmFseXNlIHtcbiAgcHVibGljIHN0YXJ0U2hvdzogYm9vbGVhbjtcbiAgcHVibGljIGJ1ZmZlckxlbmd0aDogbnVtYmVyO1xuICBwdWJsaWMgYmFuZHM6IFVpbnQ4QXJyYXk7XG5cbiAgcHVibGljIG5vZGU6IGFueTtcbiAgcHVibGljIG5vaXNlTGV2ZWxSYW5nZTogSFRNTElucHV0RWxlbWVudDtcbiAgcHVibGljIGFuYWx5c2VyOiBhbnk7XG4gIHB1YmxpYyBzb3VyY2U6IGFueTtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgdmlkZW8sXG4gICAgbm9pc2VMZXZlbFJhbmdlXG4gIH06IHtcbiAgICB2aWRlbzogSFRNTFZpZGVvRWxlbWVudDtcbiAgICBub2lzZUxldmVsUmFuZ2U6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIH0pIHtcbiAgICB0aGlzLm5vZGUgPSBjb250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcigyMDQ4LCAxLCAxKTtcbiAgICB0aGlzLm5vaXNlTGV2ZWxSYW5nZSA9IG5vaXNlTGV2ZWxSYW5nZTtcblxuICAgIHRoaXMuYW5hbHlzZXIgPSBjb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XG5cbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IHRoaXMuYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQ7XG4gICAgdGhpcy5iYW5kcyA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcblxuICAgIHRoaXMuc3RhcnRTaG93ID0gZmFsc2U7XG5cbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc291cmNlKSB7XG4gICAgICAgIHRoaXMuc291cmNlID0gY29udGV4dC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UodmlkZW8pO1xuXG4gICAgICAgIHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5hbmFseXNlcik7XG4gICAgICAgIHRoaXMuYW5hbHlzZXIuY29ubmVjdCh0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5zb3VyY2UuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKTtcblxuICAgICAgICB0aGlzLm5vZGUub25hdWRpb3Byb2Nlc3MgPSAoZTogRXZlbnRUYXJnZXQpID0+IHtcbiAgICAgICAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMuYmFuZHMpOyAvLyBjb3B5IGN1cnJlbnQgZGF0YSB0byB0aGlzLmJhbmRzXG5cbiAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRTaG93KSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTaG93ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2hvdygpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5ub2lzZUxldmVsUmFuZ2UudmFsdWUgPSB0aGlzLmdldEF2ZXJhZ2VWb2x1bWUodGhpcy5iYW5kcykudG9TdHJpbmcoKTtcblxuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldEF2ZXJhZ2VWb2x1bWUoYXJyYXk6IFVpbnQ4QXJyYXkpOiBudW1iZXIge1xuICAgIGxldCB2YWx1ZXMgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWVzICs9IGFycmF5W2ldO1xuICAgIH1cblxuICAgIGNvbnN0IGF2ZXJhZ2UgPSB2YWx1ZXMgLyBhcnJheS5sZW5ndGg7XG5cbiAgICAvLyBjYWxjdWxhdGUgaW4gMTAwJSBzY2FsZSwgMSUgaXMgMi41NlxuICAgIHJldHVybiBhdmVyYWdlID09PSAwID8gMCA6IGF2ZXJhZ2UgLyAwLjM5O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFuYWx5c2U7XG4iLCJpbXBvcnQgQW5hbHlzZSBmcm9tIFwiLi9hdWRpb0FuYWx5c2VcIjtcblxuLyoqXG4gKiBQbGF5ZXIgaXMgYSB3cmFwcGVyIGFyb3VuZCBodG1sNSB2aWRlbyBlbGVtZW50IGFuZCBITFMgc3RhbmRhcnQsXG4gKiBpdCBoYXMgc3BlY2lhbCBiZWhhdmlvciBmb3Igb3VyIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgcHVibGljIHNldHRpbmdzOiB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgY29udGFpbmVyQm91bmRzOiB7XG4gICAgICBsZWZ0OiBudW1iZXI7XG4gICAgICB0b3A6IG51bWJlcjtcbiAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICB9O1xuICAgIGlzRnVsbHNjcmVlbjogYm9vbGVhbjtcbiAgfTtcblxuICBwdWJsaWMgdmlkZW9TZXR0aW5nczoge1xuICAgIGJyaWdodG5lc3M6IHN0cmluZztcbiAgICBjb250cmFzdDogc3RyaW5nO1xuICAgIGlzRnVsbHNjcmVlbjogYm9vbGVhbjtcbiAgfTtcblxuICBwdWJsaWMgY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBwbGF5ZXI6IEhUTUxFbGVtZW50O1xuICBwdWJsaWMgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsO1xuICBwdWJsaWMgYnJpZ2h0bmVzc1JhbmdlOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbiAgcHVibGljIG5vaXNlTGV2ZWxSYW5nZTogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG4gIHB1YmxpYyBjb250cmFzdFJhbmdlOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcblxuICBwdWJsaWMgaW5pdFByb21pc2U6IFByb21pc2U8SFRNTFZpZGVvRWxlbWVudD47XG4gIHB1YmxpYyBhbmFseXNlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICB1cmwsXG4gICAgY29udGFpbmVyRWxlbWVudCxcbiAgICBwbGF5ZXJFbGVtZW50XG4gIH06IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBjb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwbGF5ZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgfSkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICB1cmwsXG4gICAgICBjb250YWluZXJCb3VuZHM6IHtcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiAwXG4gICAgICB9LFxuICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLnZpZGVvU2V0dGluZ3MgPSB7XG4gICAgICBicmlnaHRuZXNzOiBcIjEwMFwiLFxuICAgICAgY29udHJhc3Q6IFwiMTAwXCIsXG4gICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lckVsZW1lbnQ7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXJFbGVtZW50O1xuICAgIHRoaXMudmlkZW8gPSBwbGF5ZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcbiAgICB0aGlzLmJyaWdodG5lc3NSYW5nZSA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLnZjLXBsYXllcl9fYnJpZ2h0bmVzc1wiXG4gICAgKTtcbiAgICB0aGlzLm5vaXNlTGV2ZWxSYW5nZSA9IHBsYXllckVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLnZjLXBsYXllcl9fbm9pc2UtbGV2ZWxcIlxuICAgICk7XG4gICAgdGhpcy5jb250cmFzdFJhbmdlID0gcGxheWVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnZjLXBsYXllcl9fY29udHJhc3RcIik7XG5cbiAgICB0aGlzLmluaXRQcm9taXNlID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuICB9XG5cbiAgcHVibGljIGluaXQoKSB7XG4gICAgaWYgKHRoaXMuaW5pdFByb21pc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmluaXRQcm9taXNlO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAod2luZG93Lkhscy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIGNvbnN0IGhscyA9IG5ldyB3aW5kb3cuSGxzKCk7XG5cbiAgICAgICAgaGxzLmxvYWRTb3VyY2UodGhpcy5zZXR0aW5ncy51cmwpO1xuICAgICAgICBobHMuYXR0YWNoTWVkaWEodGhpcy52aWRlbyk7XG5cbiAgICAgICAgaGxzLm9uKHdpbmRvdy5IbHMuRXZlbnRzLk1BTklGRVNUX1BBUlNFRCwgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodGhpcy52aWRlbyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZGVvLmNhblBsYXlUeXBlKFwiYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmxcIikpIHtcbiAgICAgICAgdGhpcy52aWRlby5zcmMgPSB0aGlzLnNldHRpbmdzLnVybDtcblxuICAgICAgICB0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLnZpZGVvKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGxheSgpIHtcbiAgICB0aGlzLnZpZGVvLnBsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCkge1xuICAgIHRoaXMudmlkZW8ucGF1c2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuRnVsbHNjcmVlbigpIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5pc0Z1bGxzY3JlZW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnNldENvbnRhaW5lckJvdW5kcygpO1xuXG4gICAgY29uc3QgeyBjb250YWluZXJCb3VuZHMgfSA9IHRoaXMuc2V0dGluZ3M7XG5cbiAgICB0aGlzLnZpZGVvLm11dGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBwbGF5ZXJCb3VuZHMgPSB0aGlzLnBsYXllci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHRoaXMucGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGBcbiAgICAgICAgdHJhbnNsYXRlWCgwcHgpXG4gICAgICAgIHRyYW5zbGF0ZVkoMHB4KVxuICAgIGA7XG5cbiAgICB0aGlzLnBsYXllci5zdHlsZS53aWR0aCA9IGAke3BsYXllckJvdW5kcy53aWR0aH1weGA7XG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUuaGVpZ2h0ID0gYCR7cGxheWVyQm91bmRzLmhlaWdodH1weGA7XG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gXCJcIjtcbiAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBcIlwiO1xuICAgIHRoaXMucGxheWVyLnN0eWxlLnpJbmRleCA9IFwiMlwiO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcInRyYW5zZm9ybSwgd2lkdGgsIGhlaWdodFwiO1xuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwLjNzXCI7XG5cbiAgICAgIC8vIG1vdmUgZWxlbWVudCB0byB0b3AvbGVmdCBib3VuZGVyIG9mIHRoZSBsaXN0LWNvbnRhaW5lclxuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gYFxuICAgICAgICB0cmFuc2xhdGVYKC0ke3BsYXllckJvdW5kcy5sZWZ0IC0gY29udGFpbmVyQm91bmRzLmxlZnR9cHgpXG4gICAgICAgIHRyYW5zbGF0ZVkoLSR7cGxheWVyQm91bmRzLnRvcCAtIGNvbnRhaW5lckJvdW5kcy50b3B9cHgpXG4gICAgICBgO1xuXG4gICAgICB0aGlzLnBsYXllci5zdHlsZS53aWR0aCA9IGAke2NvbnRhaW5lckJvdW5kcy53aWR0aH1weGA7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS5oZWlnaHQgPSBgJHtjb250YWluZXJCb3VuZHMuaGVpZ2h0fXB4YDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dGluZ3MuaXNGdWxsc2NyZWVuID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZUZ1bGxzY3JlZW4oKSB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmlzRnVsbHNjcmVlbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMudmlkZW8ubXV0ZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5wbGF5ZXIuc3R5bGUuekluZGV4ID0gXCIxXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMucGxheWVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICB0aGlzLnBsYXllci5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblxuICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gYFxuICAgICAgICAgIHRyYW5zbGF0ZVgoMHB4KVxuICAgICAgICAgIHRyYW5zbGF0ZVkoMHB4KVxuICAgICAgYDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dGluZ3MuaXNGdWxsc2NyZWVuID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBjYWxsYmFjazogKGU6IEV2ZW50KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5wbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb250YWluZXJCb3VuZHMoKSB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmNvbnRhaW5lckJvdW5kcy53aWR0aCkge1xuICAgICAgdGhpcy5zZXR0aW5ncy5jb250YWluZXJCb3VuZHMgPSB0aGlzLmNvbnRhaW5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuY29udGFpbmVyQm91bmRzO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUZpbHRlcnMoKSB7XG4gICAgdGhpcy52aWRlby5zdHlsZS5maWx0ZXIgPSBgXG4gICAgICBicmlnaHRuZXNzKCR7K3RoaXMudmlkZW9TZXR0aW5ncy5icmlnaHRuZXNzIC8gMTAwfSlcbiAgICAgIGNvbnRyYXN0KCR7K3RoaXMudmlkZW9TZXR0aW5ncy5jb250cmFzdCAvIDEwMH0pXG4gICAgYDtcbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlQnJpZ2h0bmVzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52aWRlb1NldHRpbmdzLmJyaWdodG5lc3MgPSB2YWx1ZTtcblxuICAgIHRoaXMuYXBwbHlGaWx0ZXJzKCk7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZUNvbnRyYXN0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZGVvU2V0dGluZ3MuY29udHJhc3QgPSB2YWx1ZTtcblxuICAgIHRoaXMuYXBwbHlGaWx0ZXJzKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRFdmVudHMoKSB7XG4gICAgdGhpcy5icmlnaHRuZXNzUmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBlID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQnJpZ2h0bmVzcygoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jb250cmFzdFJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUNvbnRyYXN0KChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnBsYXllclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudmMtcGxheWVyX19jb250cm9sc1wiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5hbmFseXNlciA9IG5ldyBBbmFseXNlKHtcbiAgICAgIHZpZGVvOiB0aGlzLnZpZGVvLFxuICAgICAgbm9pc2VMZXZlbFJhbmdlOiB0aGlzLm5vaXNlTGV2ZWxSYW5nZVxuICAgIH0pO1xuICB9XG59XG4iLCIvKipcbiAqIFBsYXllclRlbXBsYXRlIC0gZ2VuZXJhdGUgdmlkZW8tcGxheWVyIGZyb20gPHRlbXBsYXRlPiB0YWdcbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXllclRlbXBsYXRlIHtcbiAgcHVibGljIHRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIFwidGVtcGxhdGUtcGxheWVyXCJcbiAgICApIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKGlkOiBzdHJpbmcpOiBOb2RlIHtcbiAgICBjb25zdCBlbGVtZW50OiBOb2RlID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi52aWRlb2NvbnRyb2wtbGlzdF9faXRlbVwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcblxuICAgIC8vIHBsYXllci17aWR9XG4gICAgY29uc3QgcGxheWVyRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gKGVsZW1lbnQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLnZjLXBsYXllclwiXG4gICAgKTtcblxuICAgIHBsYXllckVsZW1lbnQgJiYgcGxheWVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpZCk7XG5cbiAgICAvLyBwbGF5ZXIte2lkfS12aWRlb1xuICAgIGNvbnN0IHZpZGVvRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gKGVsZW1lbnQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcbiAgICAgIFwidmlkZW9cIlxuICAgICk7XG5cbiAgICBpZiAodmlkZW9FbGVtZW50KSB7XG4gICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aWR9LXZpZGVvYCk7XG4gICAgfVxuXG4gICAgLy8gcGxheWVyLXtpZH0td2ViZ2wtdmlkZW9cbiAgICBjb25zdCBpbnB1dEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IChlbGVtZW50IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcImlucHV0XCJcbiAgICApO1xuICAgIGlucHV0RWxlbWVudCAmJiBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aWR9LXdlYmdsLXZpZGVvYCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQnJvYWRjYXN0IH0gZnJvbSBcIi4uLy4uL3R5cGVzL2luZGV4XCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IFBsYXllclRlbXBsYXRlIH0gZnJvbSBcIi4vcGxheWVyVGVtcGxhdGVcIjtcblxuLyoqXG4gKiBWaWRlb2NvbnRyb2wgcmVwcmVzZW50cyBjb250cm9sbGVyIG92ZXIgb3VyIGZlYXR1cmUsXG4gKiBpdCBpbml0aWFsaXplcyBicm9hZGNhc3RzIGFuZCBpbnRlcmFjdCB3aXRoIHVzZXIncyBhY3Rpb25zXG4gKi9cbmNsYXNzIFZpZGVvY29udHJvbCB7XG4gIHB1YmxpYyBicm9hZGNhc3RzOiBCcm9hZGNhc3RbXTtcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwdWJsaWMgZWxlbWVudFNob3dBbGw6IEhUTUxFbGVtZW50O1xuXG4gIHB1YmxpYyBzdGF0ZToge1xuICAgIGZ1bGxzY3JlZW5JZDogbnVtYmVyO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBicm9hZGNhc3RzLFxuICAgIGVsZW1lbnRTaG93QWxsLFxuICAgIGVsZW1lbnRcbiAgfToge1xuICAgIGJyb2FkY2FzdHM6IEJyb2FkY2FzdFtdO1xuICAgIGVsZW1lbnRTaG93QWxsOiBIVE1MRWxlbWVudDtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgfSkge1xuICAgIHRoaXMuYnJvYWRjYXN0cyA9IGJyb2FkY2FzdHM7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmVsZW1lbnRTaG93QWxsID0gZWxlbWVudFNob3dBbGw7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZnVsbHNjcmVlbklkOiBJbmZpbml0eVxuICAgIH07XG5cbiAgICB0aGlzLmluaXRQbGF5ZXJzKCk7XG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlRnVsbFBsYXllcigpIHtcbiAgICAvLyBwbGF5IGFsbCBwbGF5ZXJzXG4gICAgdGhpcy5icm9hZGNhc3RzLmZvckVhY2goYnJvYWRjYXN0ID0+IGJyb2FkY2FzdC5wbGF5ZXIucGxheSgpKTtcblxuICAgIHRoaXMuYnJvYWRjYXN0c1t0aGlzLnN0YXRlLmZ1bGxzY3JlZW5JZF0ucGxheWVyLmNsb3NlRnVsbHNjcmVlbigpO1xuXG4gICAgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuSWQgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuRnVsbFBsYXllcihpZDogbnVtYmVyKSB7XG4gICAgLy8gc3RvcCBhbGwgcGxheWVycyBleGNlcHQgYSBmdWxsc2NyZWVuXG4gICAgdGhpcy5icm9hZGNhc3RzXG4gICAgICAuZmlsdGVyKGJyb2FkY2FzdCA9PiBicm9hZGNhc3QuaWQgIT09IGlkKVxuICAgICAgLmZvckVhY2goYnJvYWRjYXN0ID0+IGJyb2FkY2FzdC5wbGF5ZXIuc3RvcCgpKTtcblxuICAgIC8vIG9wZW4gcGxheWVyIGluIGZ1bGxzY3JlZW5cbiAgICB0aGlzLmJyb2FkY2FzdHNbaWRdLnBsYXllci5vcGVuRnVsbHNjcmVlbigpO1xuXG4gICAgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuSWQgPSBpZDtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEV2ZW50cygpIHtcbiAgICB0aGlzLmVsZW1lbnRTaG93QWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlRnVsbFBsYXllcigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50U2hvd0FsbC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZUZ1bGxQbGF5ZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFBsYXllcnMoKSB7XG4gICAgdGhpcy5icm9hZGNhc3RzLmZvckVhY2goKGJyb2FkY2FzdCwgaW5kZXgpID0+IHtcbiAgICAgIC8vIFRPRE86IHRvIGZ1bmN0aW9uXG4gICAgICBjb25zdCBWaWRlb1RlbXBsYXRlOiBQbGF5ZXJUZW1wbGF0ZSA9IG5ldyBQbGF5ZXJUZW1wbGF0ZSgpO1xuICAgICAgY29uc3QgbGlzdFZpZGVvRWxlbWVudDogTm9kZSA9IFZpZGVvVGVtcGxhdGUucmVuZGVyKFxuICAgICAgICBgcGxheWVyLSR7aW5kZXggKyAxfWBcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChsaXN0VmlkZW9FbGVtZW50KTtcblxuICAgICAgY29uc3QgcGxheWVyRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gKGxpc3RWaWRlb0VsZW1lbnQgYXMgRWxlbWVudCkucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIudmMtcGxheWVyXCJcbiAgICAgICk7XG5cbiAgICAgIGlmICghcGxheWVyRWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IFZpZGVvUGxheWVyID0gbmV3IFBsYXllcih7XG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgICAgcGxheWVyRWxlbWVudCxcbiAgICAgICAgdXJsOiBicm9hZGNhc3QudXJsXG4gICAgICB9KTtcblxuICAgICAgVmlkZW9QbGF5ZXIuaW5pdCgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBWaWRlb1BsYXllci5wbGF5KCk7XG5cbiAgICAgICAgICAvLyBJbml0IGV2ZW50c1xuICAgICAgICAgIFZpZGVvUGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZ1bGxQbGF5ZXIoaW5kZXgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgVmlkZW9QbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcGVuRnVsbFBsYXllcihpbmRleCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBTYXZlIHBsYXllciB0byBicm9hZGNhc3RzIGFycmF5XG4gICAgICAgICAgdGhpcy5icm9hZGNhc3RzW2luZGV4XS5pZCA9IGluZGV4O1xuICAgICAgICAgIHRoaXMuYnJvYWRjYXN0c1tpbmRleF0ucGxheWVyID0gVmlkZW9QbGF5ZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS53YXJuKGVycikpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZGVvY29udHJvbDtcbiIsImNsYXNzIENhbWVyYVdpZGdldCB7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtY2FtZXJhLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IE5vZGUge1xuICAgIHJldHVybiB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbWVyYVdpZGdldDtcbiIsImltcG9ydCB7IElXaWRnZXRQbGF5ZXJEYXRhIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2luZGV4XCI7XG5cbmNsYXNzIFBsYXllcldpZGdldCB7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgcHVibGljIGRhdGE6IElXaWRnZXRQbGF5ZXJEYXRhO1xuICBwdWJsaWMgd2lkZ2V0OiBOb2RlO1xuXG4gIGNvbnN0cnVjdG9yKHsgZGF0YSB9OiB7IGRhdGE6IElXaWRnZXRQbGF5ZXJEYXRhIH0pIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtcGxheWVyLXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IE5vZGUge1xuICAgIHRoaXMuc2V0Q292ZXIoKTtcblxuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLnBsYXllci1ub3dfX3RpdGxlXCIsIGAke3RoaXMuZGF0YS5hcnRpc3R9ICR7dGhpcy5kYXRhLnRyYWNrLm5hbWV9YCk7XG5cbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5wbGF5ZXItcHJvZ3Jlc3NfX3RpbWVcIiwgdGhpcy5kYXRhLnRyYWNrLmxlbmd0aCk7XG4gICAgdGhpcy5zZXRJbm5lclRleHQoXCIucGxheWVyLXZvbHVtZV9fcGVyY2VudGFnZVwiLCBgJHt0aGlzLmRhdGEudm9sdW1lfSVgKTtcblxuICAgIHJldHVybiB0aGlzLndpZGdldDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJUZXh0KHNlbGVjdG9yOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IGJsb2NrOiBIVE1MRWxlbWVudCA9ICh0aGlzLndpZGdldCBhcyBIVE1MRWxlbWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoYmxvY2spIHtcbiAgICAgIGJsb2NrLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb3ZlcigpIHtcbiAgICBjb25zdCBibG9jayA9ICh0aGlzLndpZGdldCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ub3dfX2NvdmVyXCIpO1xuXG4gICAgYmxvY2suc2V0QXR0cmlidXRlKFwic3JjXCIsIHRoaXMuZGF0YS5hbGJ1bWNvdmVyKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXJXaWRnZXQ7XG4iLCJpbXBvcnQgeyBJV2lkZ2V0UXVlc3Rpb25zRGF0YSB9IGZyb20gXCIuLi8uLi90eXBlcy9pbmRleFwiO1xuXG5jbGFzcyBRdWVzdGlvbnNXaWRnZXQge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIHB1YmxpYyBkYXRhOiBJV2lkZ2V0UXVlc3Rpb25zRGF0YTtcbiAgcHVibGljIHdpZGdldDogTm9kZTtcblxuICBjb25zdHJ1Y3Rvcih7IGRhdGEgfTogeyBkYXRhOiBJV2lkZ2V0UXVlc3Rpb25zRGF0YSB9KSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXF1ZXN0aW9ucy10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBOb2RlIHtcbiAgICB0aGlzLnNldElubmVyVGV4dChcIi5idXR0b25fdHlwZS15ZWxsb3dcIiwgdGhpcy5kYXRhLmJ1dHRvbnNbMF0pO1xuICAgIHRoaXMuc2V0SW5uZXJUZXh0KFwiLmJ1dHRvbl90eXBlLWdyZXlcIiwgdGhpcy5kYXRhLmJ1dHRvbnNbMV0pO1xuXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbm5lclRleHQoc2VsZWN0b3I6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3QgYmxvY2s6IEhUTUxFbGVtZW50ID0gKHRoaXMud2lkZ2V0IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYgKGJsb2NrKSB7XG4gICAgICBibG9jay5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBRdWVzdGlvbnNXaWRnZXQ7XG4iLCJjbGFzcyBTdGF0c1dpZGdldCB7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWRnZXQtc3RhdHMtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMudGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHNXaWRnZXQ7XG4iLCJpbXBvcnQgeyBJV2lkZ2V0VGhlbWFsRGF0YSB9IGZyb20gXCIuLi8uLi90eXBlcy9pbmRleFwiO1xuXG5jbGFzcyBUaGVtYWxXaWRnZXQge1xuICBwdWJsaWMgdGVtcGxhdGU6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIHB1YmxpYyBkYXRhOiBJV2lkZ2V0VGhlbWFsRGF0YTtcbiAgcHVibGljIHdpZGdldDogTm9kZTtcblxuICBjb25zdHJ1Y3Rvcih7IGRhdGEgfTogeyBkYXRhOiBJV2lkZ2V0VGhlbWFsRGF0YSB9KSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXRoZXJtYWwtdGVtcGxhdGVcIikgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy50ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogTm9kZSB7XG4gICAgdGhpcy5zZXRJbm5lclRleHQoXG4gICAgICBcIi53aWRnZXQtc2Vuc29yX3R5cGUtdGVtcCAud2lkZ2V0LXNlbnNvcl9fdmFsdWVcIixcbiAgICAgIGAke3RoaXMuZGF0YS50ZW1wZXJhdHVyZX1DYCxcbiAgICApO1xuXG4gICAgdGhpcy5zZXRJbm5lclRleHQoXG4gICAgICBcIi53aWRnZXQtc2Vuc29yX3R5cGUtaHVtaWRpdHkgLndpZGdldC1zZW5zb3JfX3ZhbHVlXCIsXG4gICAgICBgJHt0aGlzLmRhdGEuaHVtaWRpdHl9JWAsXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLndpZGdldDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJUZXh0KHNlbGVjdG9yOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IGJsb2NrOiBIVE1MRWxlbWVudCA9ICh0aGlzLndpZGdldCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmIChibG9jaykge1xuICAgICAgYmxvY2suaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGhlbWFsV2lkZ2V0O1xuIiwiaW1wb3J0IENhbWVyYVdpZGdldCBmcm9tIFwiLi9jYW1lcmEud2lkZ2V0XCI7XG5pbXBvcnQgUGxheWVyV2lkZ2V0IGZyb20gXCIuL3BsYXllci53aWRnZXRcIjtcbmltcG9ydCBRdWVzdGlvbnNXaWRnZXQgZnJvbSBcIi4vcXVlc3Rpb25zLndpZGdldFwiO1xuaW1wb3J0IFN0YXRzV2lkZ2V0IGZyb20gXCIuL3N0YXRzLndpZGdldFwiO1xuaW1wb3J0IFRoZW1hbFdpZGdldCBmcm9tIFwiLi90aGVtYWwud2lkZ2V0XCI7XG5cbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gXCIuLi8uLi9zdG9yZVwiO1xuaW1wb3J0IHsgbWFya0V2ZW50QXNSZWFkIH0gZnJvbSBcIi4uLy4uL3N0b3JlL2V2ZW50cy9hY3Rpb25DcmVhdG9yc1wiO1xuXG5pbXBvcnQgVXNlclJlYWRFdmVudHNTZXJ2aWNlIGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyUmVhZEV2ZW50c1NlcnZpY2VcIjtcblxuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmNvbnN0IFdJREdFVF9UWVBFUyA9IHtcbiAgU1RBVFM6IFwiU1RBVFNcIixcbiAgQ0FNRVJBOiBcIkNBTUVSQVwiLFxuICBUSEVSTUFMOiBcIlRIRVJNQUxcIixcbiAgUExBWUVSOiBcIlBMQVlFUlwiLFxuICBRVUVTVElPTlM6IFwiUVVFU1RJT05TXCIsXG4gIERFRkFVTFQ6IFwiREVGQVVMVFwiXG59O1xuXG4vLyBUT0RPOiBhZGQgbWV0aG9kIGRlc3RveSwgZm9yIHJlbW92aW5nIGV2ZW50cywgd2hlbiB3aWRnZXQgZGVsZXRlZCBmcm9tIGRvbVxuY2xhc3MgV2lkZ2V0IHtcbiAgcHVibGljIGV2ZW50OiBUeXBlcy5FdmVudDtcbiAgcHVibGljIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgcHVibGljIHdpZGdldDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoeyBldmVudCwgY29udGFpbmVyIH06IHsgZXZlbnQ6IFR5cGVzLkV2ZW50OyBjb250YWluZXI6IEhUTUxFbGVtZW50IH0pIHtcbiAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lkZ2V0LXRlbXBsYXRlXCIpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLnRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi53aWRnZXRcIikuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgdGhpcy53aWRnZXQuY2xhc3NMaXN0LmFkZChgd2lkZ2V0X3NpemUtJHt0aGlzLmV2ZW50LnNpemV9YCk7XG4gICAgdGhpcy53aWRnZXQuY2xhc3NMaXN0LmFkZChgd2lkZ2V0X3R5cGUtJHt0aGlzLmV2ZW50LnR5cGV9YCk7XG5cbiAgICB0aGlzLnNldEhlYWRlckRhdGEoKTtcbiAgICB0aGlzLnNldERlc2NyaXB0aW9uKCk7XG4gICAgdGhpcy5yZW5kZXJEYXRhVGVtcGxhdGUoKTtcbiAgICB0aGlzLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLndpZGdldCk7XG4gIH1cblxuICBwdWJsaWMgbWFya1dpZGdldEFzUmVhZCgpOiB2b2lkIHtcbiAgICBVc2VyUmVhZEV2ZW50c1NlcnZpY2UubWFya0V2ZW50QXNSZWFkKHRoaXMuZXZlbnQuaWQpO1xuXG4gICAgRGlzcGF0Y2hlci5kaXNwYXRjaChtYXJrRXZlbnRBc1JlYWQodGhpcy5ldmVudC5pZCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXREZXNjcmlwdGlvbigpIHtcbiAgICBpZiAodGhpcy5ldmVudC5kZXNjcmlwdGlvbiAmJiB0aGlzLndpZGdldCkge1xuICAgICAgY29uc3QgY29udGVudFRleHQgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1jb250ZW50X190ZXh0XCIpO1xuICAgICAgY29uc3QgdGV4dEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWNvbnRlbnRfX3RleHRcIik7XG5cbiAgICAgIGlmIChjb250ZW50VGV4dCkge1xuICAgICAgICBjb250ZW50VGV4dC5jbGFzc0xpc3QuYWRkKGB3aWRnZXQtY29udGVudF9fdGV4dF93aWR0aC0ke3RoaXMuZXZlbnQuc2l6ZX1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRleHRFbGVtZW50KSB7XG4gICAgICAgIHRleHRFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuZXZlbnQuZGVzY3JpcHRpb247XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRIZWFkZXJEYXRhKCkge1xuICAgIGNvbnN0IHRpdGxlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLndpZGdldC1oZWFkZXItYWJvdXRfX3RpdGxlXCJcbiAgICApO1xuICAgIGNvbnN0IHR5cGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1oZWFkZXJfX3R5cGVcIik7XG4gICAgY29uc3QgZGF0ZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWhlYWRlcl9fZGF0ZVwiKTtcbiAgICBjb25zdCBpY29uVXNlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLndpZGdldC1oZWFkZXItYWJvdXRfX2ljb24gPiB1c2VcIlxuICAgICk7XG4gICAgY29uc3QgaWNvbkVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0LWhlYWRlci1hYm91dF9faWNvblwiKTtcblxuICAgIGlmICh0aXRsZUVsZW1lbnQpIHtcbiAgICAgIHRpdGxlRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmV2ZW50LnRpdGxlO1xuICAgIH1cblxuICAgIGlmICh0eXBlRWxlbWVudCkge1xuICAgICAgdHlwZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5ldmVudC5zb3VyY2U7XG4gICAgfVxuXG4gICAgaWYgKGRhdGVFbGVtZW50KSB7XG4gICAgICBkYXRlRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmV2ZW50LnRpbWU7XG4gICAgfVxuXG4gICAgaWYgKGljb25Vc2VFbGVtZW50KSB7XG4gICAgICBpY29uVXNlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIsIGAjJHt0aGlzLmV2ZW50Lmljb259YCk7XG4gICAgfVxuXG4gICAgaWYgKGljb25FbGVtZW50KSB7XG4gICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBpY29uXyR7dGhpcy5ldmVudC5pY29ufWApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgY2xvc2VFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldF9fY29udHJvbF9jbG9zZVwiKTtcblxuICAgIGlmIChjbG9zZUVsZW1lbnQpIHtcbiAgICAgIGNsb3NlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLm1hcmtXaWRnZXRBc1JlYWQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0YVRlbXBsYXRlVHlwZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgZGF0YSA9IHsgdHlwZTogXCJlbXB0eVwiIH0sIGljb24gfSA9IHRoaXMuZXZlbnQ7XG5cbiAgICBpZiAoaWNvbiA9PT0gXCJjYW1cIikge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5DQU1FUkE7XG4gICAgfVxuXG4gICAgaWYgKChkYXRhIGFzIFR5cGVzLklXaWRnZXRUaGVtYWxEYXRhKS50ZW1wZXJhdHVyZSkge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5USEVSTUFMO1xuICAgIH1cblxuICAgIGlmICgoZGF0YSBhcyBUeXBlcy5JV2lkZ2V0UGxheWVyRGF0YSkuYWxidW1jb3Zlcikge1xuICAgICAgcmV0dXJuIFdJREdFVF9UWVBFUy5QTEFZRVI7XG4gICAgfVxuXG4gICAgaWYgKChkYXRhIGFzIFR5cGVzLklXaWRnZXRRdWVzdGlvbnNEYXRhKS5idXR0b25zKSB7XG4gICAgICByZXR1cm4gV0lER0VUX1RZUEVTLlFVRVNUSU9OUztcbiAgICB9XG5cbiAgICBpZiAoKGRhdGEgYXMgVHlwZXMuSVdpZGdldERlZmF1bHREYXRhKS50eXBlID09PSBcImdyYXBoXCIpIHtcbiAgICAgIHJldHVybiBXSURHRVRfVFlQRVMuU1RBVFM7XG4gICAgfVxuXG4gICAgcmV0dXJuIFdJREdFVF9UWVBFUy5ERUZBVUxUO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJEYXRhVGVtcGxhdGUoKSB7XG4gICAgY29uc3QgdGVtcGxhdGVEYXRhVHlwZSA9IHRoaXMuZ2V0RGF0YVRlbXBsYXRlVHlwZSgpO1xuICAgIGxldCBkYXRhQ29udGVudEJsb2NrID0gbnVsbDtcblxuICAgIHN3aXRjaCAodGVtcGxhdGVEYXRhVHlwZSkge1xuICAgICAgY2FzZSBXSURHRVRfVFlQRVMuU1RBVFM6XG4gICAgICAgIGNvbnN0IHN0YXRzV2lkZ2V0ID0gbmV3IFN0YXRzV2lkZ2V0KCk7XG5cbiAgICAgICAgZGF0YUNvbnRlbnRCbG9jayA9IHN0YXRzV2lkZ2V0LnJlbmRlcigpO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdJREdFVF9UWVBFUy5DQU1FUkE6XG4gICAgICAgIGNvbnN0IGNhbWVyYVdpZGdldCA9IG5ldyBDYW1lcmFXaWRnZXQoKTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gY2FtZXJhV2lkZ2V0LnJlbmRlcigpO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdJREdFVF9UWVBFUy5QTEFZRVI6XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUT0RPOiDQndC1INC/0L7QvdC40LzQsNGOLCDQutCw0Log0LfQtNC10YHRjCDQvNC+0LbQvdC+INC+0LHQvtC50YLQuNGB0Ywg0LHQtdC3IGFzc2lnbm1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IHBsYXllcldpZGdldCA9IG5ldyBQbGF5ZXJXaWRnZXQoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuZXZlbnQuZGF0YSBhcyBUeXBlcy5JV2lkZ2V0UGxheWVyRGF0YVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gcGxheWVyV2lkZ2V0LnJlbmRlcigpO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdJREdFVF9UWVBFUy5RVUVTVElPTlM6XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uc1dpZGdldCA9IG5ldyBRdWVzdGlvbnNXaWRnZXQoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuZXZlbnQuZGF0YSBhcyBUeXBlcy5JV2lkZ2V0UXVlc3Rpb25zRGF0YVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXRhQ29udGVudEJsb2NrID0gcXVlc3Rpb25zV2lkZ2V0LnJlbmRlcigpO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdJREdFVF9UWVBFUy5USEVSTUFMOlxuICAgICAgICBjb25zdCB0aGVybWFsV2lkZ2V0ID0gbmV3IFRoZW1hbFdpZGdldCh7XG4gICAgICAgICAgZGF0YTogdGhpcy5ldmVudC5kYXRhIGFzIFR5cGVzLklXaWRnZXRUaGVtYWxEYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhdGFDb250ZW50QmxvY2sgPSB0aGVybWFsV2lkZ2V0LnJlbmRlcigpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChkYXRhQ29udGVudEJsb2NrKSB7XG4gICAgICBjb25zdCB3aWRnZXRDb250ZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldC1jb250ZW50XCIpO1xuXG4gICAgICBpZiAod2lkZ2V0Q29udGVudCkge1xuICAgICAgICB3aWRnZXRDb250ZW50LmFwcGVuZENoaWxkKGRhdGFDb250ZW50QmxvY2spO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXaWRnZXQ7XG4iLCJpbXBvcnQgV2lkZ2V0IGZyb20gXCIuLi9jb21wb25lbnRzL3dpZGdldC93aWRnZXRcIjtcblxuaW1wb3J0IEV2ZW50c1N0b3JlIGZyb20gXCIuLi9zdG9yZS9ldmVudHMvZXZlbnRzLnN0b3JlXCI7XG5pbXBvcnQgeyBzZXRFdmVudHNEYXRhIH0gZnJvbSBcIi4uL3N0b3JlL2V2ZW50cy9hY3Rpb25DcmVhdG9yc1wiO1xuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSBcIi4uL3N0b3JlXCI7XG5cbmltcG9ydCBVc2VyUmVhZEV2ZW50c1NlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2VzL3VzZXJSZWFkRXZlbnRzU2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBUeXBlcyBmcm9tIFwiLi4vdHlwZXNcIjtcblxuY2xhc3MgSW5kZXhQYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgRXZlbnRzU3RvcmUuc3Vic2NyaWJlKHRoaXMucmVuZGVyRGFzaGJvYXJkV2lkZ2V0cyk7XG5cbiAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEV2ZW50cygpIHtcbiAgICBjb25zdCB1c2VyUmVhZEV2ZW50czogc3RyaW5nW10gPSBVc2VyUmVhZEV2ZW50c1NlcnZpY2UuZ2V0UmVhZEV2ZW50cygpO1xuXG4gICAgdGhpcy5sb2FkRXZlbnRzKCkudGhlbigoZXZlbnRzOiBUeXBlcy5FdmVudFtdKSA9PiB7XG4gICAgICBsZXQgZmlsdGVyZWRFdmVudHM6IFR5cGVzLkV2ZW50W10gPSBbXTtcblxuICAgICAgaWYgKCF1c2VyUmVhZEV2ZW50cykge1xuICAgICAgICBmaWx0ZXJlZEV2ZW50cyA9IGV2ZW50cztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbHRlcmVkRXZlbnRzID0gZXZlbnRzLmZpbHRlcigoZXZlbnQ6IFR5cGVzLkV2ZW50KSA9PiAhdXNlclJlYWRFdmVudHMuaW5jbHVkZXMoZXZlbnQuaWQpKTtcbiAgICAgIH1cblxuICAgICAgRGlzcGF0Y2hlci5kaXNwYXRjaChzZXRFdmVudHNEYXRhKGZpbHRlcmVkRXZlbnRzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckRhc2hib2FyZFdpZGdldHMoKSB7XG4gICAgY29uc3QgZXZlbnRzU3RvcmVEYXRhID0gRXZlbnRzU3RvcmUuZ2V0RGF0YSgpO1xuICAgIGNvbnN0IGV2ZW50czogVHlwZXMuRXZlbnRbXSA9IGV2ZW50c1N0b3JlRGF0YS5ldmVudHMuZmlsdGVyKFxuICAgICAgKGV2ZW50OiBUeXBlcy5FdmVudCkgPT4gIWV2ZW50LnVzZXJSZWFkXG4gICAgKTtcblxuICAgIGNvbnN0IGRhc2hib2FyZFdpZGdldHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXNoYm9hcmQtbGlzdFwiKTtcblxuICAgIC8vIENsZWFyIGRhc2hib2FyZFxuICAgIGRhc2hib2FyZFdpZGdldHNMaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBpZiAoIWV2ZW50cy5sZW5ndGgpIHtcbiAgICAgIGRhc2hib2FyZFdpZGdldHNMaXN0LmlubmVySFRNTCA9IFwiPGgyPtCjINCy0LDRgSDQvdC10YIg0L3QvtCy0YvRhSDRgdC+0LHRi9GC0LjQuTwvaDI+XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gbmV3IFdpZGdldCh7XG4gICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgY29udGFpbmVyOiBkYXNoYm9hcmRXaWRnZXRzTGlzdFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZEV2ZW50cygpOiBQcm9taXNlPFR5cGVzLkV2ZW50W10+IHtcbiAgICAvLyBzZXJ2ZXIgd29ya3Mgb25seSBvbiBsb2NhbG1hY2hpbmVcbiAgICAvLyBydW4gbnBtIHN0YXJ0IHNlcnZlciBmb3IgaXRcbiAgICBpZiAobG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpIHtcbiAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZXZlbnRzXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHR5cGU6IFwiY3JpdGljYWw6aW5mb1wiLFxuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBsaW1pdDogMjBcbiAgICAgICAgfSksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmV0Y2goXCJkYXRhL2V2ZW50cy5qc29uXCIpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5ldmVudHMpXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5kZXhQYWdlO1xuIiwiaW1wb3J0IEhlYWRlck5hdmlnYXRpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlclwiO1xuXG5pbXBvcnQgSW5kZXhQYWdlIGZyb20gXCIuL2luZGV4LnBhZ2VcIjtcbmltcG9ydCBWaWRlb2NvbnRyb2xQYWdlIGZyb20gXCIuL3ZpZGVvY29udHJvbC5wYWdlXCI7XG5cbmNsYXNzIEluaXRBcHBsaWNhdGlvbiB7XG4gIHB1YmxpYyBwYWdlOiBhbnk7XG4gIHB1YmxpYyBoZWFkZXJOYXZpZ2F0aW9uOiBhbnk7XG4gIHB1YmxpYyBjdXJyZW50UGFnZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcm91dGluZygpIHtcbiAgICBzd2l0Y2ggKHRoaXMuY3VycmVudFBhZ2UpIHtcbiAgICAgIGNhc2UgXCIvXCI6XG4gICAgICBjYXNlIFwiL3NocmktYWRhcHRpdmUtbGF5b3V0L1wiOlxuICAgICAgY2FzZSBcIi9zaHJpLWFkYXB0aXZlLWxheW91dC9pbmRleC5odG1sXCI6XG4gICAgICAgIHRoaXMucGFnZSA9IG5ldyBJbmRleFBhZ2UoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCIvdmlkZW9jb250cm9sLmh0bWxcIjpcbiAgICAgIGNhc2UgXCIvc2hyaS1hZGFwdGl2ZS1sYXlvdXQvdmlkZW9jb250cm9sLmh0bWxcIjpcbiAgICAgICAgdGhpcy5wYWdlID0gbmV3IFZpZGVvY29udHJvbFBhZ2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuaGVhZGVyTmF2aWdhdGlvbiA9IG5ldyBIZWFkZXJOYXZpZ2F0aW9uKHtcbiAgICAgIHNlbGVjdG9yOiBcIiNoZWFkZXItbWVudVwiXG4gICAgfSk7XG5cbiAgICB0aGlzLnJvdXRpbmcoKTtcbiAgfVxufVxuXG5jb25zdCBBcHAgPSBuZXcgSW5pdEFwcGxpY2F0aW9uKCk7XG4iLCJpbXBvcnQgVmlkZW9jb250cm9sIGZyb20gXCIuLi9jb21wb25lbnRzL3ZpZGVvY29udHJvbC92aWRlb2NvbnRyb2xcIjtcblxuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmNsYXNzIFZpZGVvQ29udHJvbFBhZ2Uge1xuICBwdWJsaWMgYnJvYWRjYXN0czogVHlwZXMuQnJvYWRjYXN0W107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5icm9hZGNhc3RzID0gW1xuICAgICAge1xuICAgICAgICB1cmw6XG4gICAgICAgICAgXCJodHRwOi8vbG9jYWxob3N0OjkxOTEvbWFzdGVyP3VybD1odHRwJTNBJTJGJTJGbG9jYWxob3N0JTNBMzEwMiUyRnN0cmVhbXMlMkZzb3NlZCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmNhdCUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmRvZyUyRm1hc3Rlci5tM3U4XCIsXG4gICAgICAgIHBsYXllcjogbnVsbCxcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVybDpcbiAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6OTE5MS9tYXN0ZXI/dXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMTAyJTJGc3RyZWFtcyUyRmhhbGwlMkZtYXN0ZXIubTN1OFwiLFxuICAgICAgICBwbGF5ZXI6IG51bGwsXG4gICAgICAgIGlkOiB1bmRlZmluZWQsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBjb25zdCBWaWRlb2NvbnRyb2xXaWRnZXQgPSBuZXcgVmlkZW9jb250cm9sKHtcbiAgICAgIGJyb2FkY2FzdHM6IHRoaXMuYnJvYWRjYXN0cyxcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmMtbGlzdFwiKSxcbiAgICAgIGVsZW1lbnRTaG93QWxsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZjLXNob3dhbGxcIiksXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW9Db250cm9sUGFnZTtcbiIsImV4cG9ydCBjb25zdCBzdG9yYWdlS2V5cyA9IHtcbiAgdXNlclJlYWRFdmVudHM6IFwidXNlclJlYWRFdmVudHNcIlxufTtcblxuY29uc3QgU3RvcmFnZVNlcnZpY2UgPSB7XG4gIHNldDogKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCA9PiB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9LFxuICBnZXQ6IChrZXk6IHN0cmluZyk6IGFueSA9PiB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlU2VydmljZTtcbiIsImltcG9ydCBTdG9yYWdlU2VydmljZSwgeyBzdG9yYWdlS2V5cyB9IGZyb20gXCIuL3N0b3JhZ2VTZXJ2aWNlXCI7XG5cbi8qKlxuICogU2VydmljZSB3b3JrIHdpdGggZXZlbnRzLCB3aGljaCB3YXMgbWFya2VkIHVzZXIgYXMgcmVhZCBpbiBMb2NhbFN0b3JhZ2VcbiAqL1xuY29uc3QgVXNlclJlYWRFdmVudHNTZXJ2aWNlID0ge1xuICAvKipcbiAgICogR2V0IG1hcmtlZCBhcyByZWFkIGV2ZW50c1xuICAgKi9cbiAgZ2V0UmVhZEV2ZW50czogKCk6IHN0cmluZ1tdID0+IHtcbiAgICBjb25zdCB1c2VyUmVhZEV2ZW50cyA9IEpTT04ucGFyc2UoU3RvcmFnZVNlcnZpY2UuZ2V0KHN0b3JhZ2VLZXlzLnVzZXJSZWFkRXZlbnRzKSk7XG5cbiAgICByZXR1cm4gdXNlclJlYWRFdmVudHM7XG4gIH0sXG4gIC8qKlxuICAgKiBTYXZlLCB0aGF0IGV2ZW50IGlzIG1hcmtlZCBhcyByZWFkXG4gICAqL1xuICBtYXJrRXZlbnRBc1JlYWQ6IChpZDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgdXNlclJlYWRFdmVudHM6IHN0cmluZ1tdID1cbiAgICAgIEpTT04ucGFyc2UoU3RvcmFnZVNlcnZpY2UuZ2V0KHN0b3JhZ2VLZXlzLnVzZXJSZWFkRXZlbnRzKSkgfHwgW107XG5cbiAgICB1c2VyUmVhZEV2ZW50cy5wdXNoKGlkKTtcblxuICAgIFN0b3JhZ2VTZXJ2aWNlLnNldChzdG9yYWdlS2V5cy51c2VyUmVhZEV2ZW50cywgSlNPTi5zdHJpbmdpZnkodXNlclJlYWRFdmVudHMpKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlclJlYWRFdmVudHNTZXJ2aWNlO1xuIiwiaW1wb3J0IHsgRXZlbnRzQWN0aW9ucyB9IGZyb20gXCIuL2V2ZW50cy5zdG9yZVwiO1xuXG5leHBvcnQgY29uc3Qgc2V0RXZlbnRzRGF0YSA9IChldmVudHM6IG9iamVjdFtdKSA9PiAoe1xuICB0eXBlOiBFdmVudHNBY3Rpb25zLlNFVF9FVkVOVFMsXG4gIHBheWxvYWQ6IHtcbiAgICBldmVudHNcbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBtYXJrRXZlbnRBc1JlYWQgPSAoaWQ6IHN0cmluZykgPT4gKHtcbiAgdHlwZTogRXZlbnRzQWN0aW9ucy5NQVJLX0VWRU5UX0FTX1JFQUQsXG4gIHBheWxvYWQ6IHtcbiAgICBpZFxuICB9XG59KTtcbiIsImltcG9ydCB7IFN0b3JlLCBUeXBlcyB9IGZyb20gXCJzaHJpZmx1eFwiO1xuaW1wb3J0ICogYXMgQXBwTW9kZWxUeXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuLy8gQWN0aW9uc1xuZXhwb3J0IGNvbnN0IEV2ZW50c0FjdGlvbnMgPSB7XG4gIFNFVF9FVkVOVFM6IFwiU0VUX0VWRU5UU1wiLFxuICBNQVJLX0VWRU5UX0FTX1JFQUQ6IFwiTUFSS19FVkVOVF9BU19SRUFEXCJcbn07XG5cbi8vIFN0b3JlXG5pbnRlcmZhY2UgSUV2ZW50c1N0b3JlRGF0YSB7XG4gIGV2ZW50czogQXBwTW9kZWxUeXBlcy5FdmVudFtdO1xufVxuXG5jb25zdCBpbml0aWFsRGF0YTogSUV2ZW50c1N0b3JlRGF0YSA9IHtcbiAgZXZlbnRzOiBbXVxufTtcblxuY29uc3QgRXZlbnRzU3RvcmUgPSBuZXcgU3RvcmUoe1xuICBpbml0aWFsRGF0YVxufSk7XG5cbi8vIEVmZmVjdHMgZm9yIHN0b3JlXG5leHBvcnQgY29uc3QgRXZlbnRzRWZmZWN0cyA9IChhY3Rpb246IFR5cGVzLklBY3Rpb24pID0+IHtcbiAgY29uc3QgeyB0eXBlLCBwYXlsb2FkIH0gPSBhY3Rpb247XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBFdmVudHNBY3Rpb25zLlNFVF9FVkVOVFM6XG4gICAgICBFdmVudHNTdG9yZS51cGRhdGVEYXRhKHtcbiAgICAgICAgZXZlbnRzOiBwYXlsb2FkLmV2ZW50c1xuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEV2ZW50c0FjdGlvbnMuTUFSS19FVkVOVF9BU19SRUFEOlxuICAgICAgY29uc3QgZGF0YSA9IEV2ZW50c1N0b3JlLmdldERhdGEoKTtcblxuICAgICAgRXZlbnRzU3RvcmUudXBkYXRlRGF0YSh7XG4gICAgICAgIGV2ZW50czogZGF0YS5ldmVudHMubWFwKFxuICAgICAgICAgIChldmVudDogQXBwTW9kZWxUeXBlcy5FdmVudCkgPT5cbiAgICAgICAgICAgIGV2ZW50LmlkID09PSBwYXlsb2FkLmlkID8geyAuLi5ldmVudCwgdXNlclJlYWQ6IHRydWUgfSA6IGV2ZW50XG4gICAgICAgIClcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50c1N0b3JlO1xuIiwiaW1wb3J0IHsgRGlzcGF0Y2hlciB9IGZyb20gXCJzaHJpZmx1eFwiO1xuXG5pbXBvcnQgeyBFdmVudHNFZmZlY3RzIH0gZnJvbSBcIi4vZXZlbnRzL2V2ZW50cy5zdG9yZVwiO1xuXG5jb25zdCBhcHBEaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcblxuLy8gUmVnaXN0ZXIgYWxsIGVmZmVjdCBoZXJlXG5cbmFwcERpc3BhdGNoZXIucmVnaXN0ZXIoRXZlbnRzRWZmZWN0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcERpc3BhdGNoZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9