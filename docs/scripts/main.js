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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/header/header.js":
/*!*****************************************!*\
  !*** ./src/components/header/header.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navigation; });
const domUtils = {
  doesNodeContainClick: (node, e) => {
    if (!node || !e) return false;

    if (node.contains(e.target)) return true;
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
    this.headerMenu.classList.add("header-menu-list_state-mobile");

    this.headerBurgerMenu.addEventListener("click", () => {
      if (!this.menuOpened) {
        this.openNavigation();
      } else {
        this.closeNavigation();
      }
    });
  }

  openNavigation() {
    this.headerMenu.classList.add("header-menu-list_state-mobile-opened");

    this.menuOpened = true;
  }

  closeNavigation() {
    this.headerMenu.classList.remove("header-menu-list_state-mobile-opened");

    this.menuOpened = false;
  }
}

/***/ }),

/***/ "./src/components/videocontrol/audioAnalyse.js":
/*!*****************************************************!*\
  !*** ./src/components/videocontrol/audioAnalyse.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

        this.node.onaudioprocess = e => {
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
      this.noiseLevelRange.value = this.getAverageVolume(this.bands);

      this.show();
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Analyse);

/***/ }),

/***/ "./src/components/videocontrol/canvasVideo.js":
/*!****************************************************!*\
  !*** ./src/components/videocontrol/canvasVideo.js ***!
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
      data[i] += 255 * (brightness / 100);
      data[i + 1] += 255 * (brightness / 100);
      data[i + 2] += 255 * (brightness / 100);
    }
  }

  applyContrast(data, contrast) {
    const factor = 259.0 * (contrast + 255.0) / (255.0 * (259.0 - contrast));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = this.truncateColor(factor * (data[i] - 128.0) + 128.0);
      data[i + 1] = this.truncateColor(factor * (data[i + 1] - 128.0) + 128.0);
      data[i + 2] = this.truncateColor(factor * (data[i + 2] - 128.0) + 128.0);
    }
  }

  truncateColor(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 255) {
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

    contextHelper.drawImage(video, 0, 0, width, height);

    const idata = contextHelper.getImageData(0, 0, width, height);

    var data = idata.data;

    this.applyBrightness(data, brightness);
    this.applyContrast(data, contrast);

    return idata;
  }

  play({ canvasInited, brightness, contrast, size: { width, height } }) {
    if (!canvasInited) {
      this.canvas = document.createElement("canvas");

      this.canvas.style.width = width;
      this.canvas.style.height = height;

      this.canvas.width = width;
      this.canvas.height = height;

      this.videoPlayer.appendChild(this.canvas);
    } else {
      this.stopVideo = true;
    }

    const context = this.canvas.getContext("2d");

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
        } else {
          draw();
        }
      });
    };

    draw();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (CanvasVideo);

/***/ }),

/***/ "./src/components/videocontrol/player.js":
/*!***********************************************!*\
  !*** ./src/components/videocontrol/player.js ***!
  \***********************************************/
/*! exports provided: PlayerTemplate, Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerTemplate", function() { return PlayerTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _webglVideo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webglVideo */ "./src/components/videocontrol/webglVideo.js");
/* harmony import */ var _canvasVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvasVideo */ "./src/components/videocontrol/canvasVideo.js");
/* harmony import */ var _audioAnalyse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audioAnalyse */ "./src/components/videocontrol/audioAnalyse.js");




/**
 * PlayerTemplate - generate video-player from <template> tag
 */
class PlayerTemplate {
  constructor() {
    this.template = document.getElementById("template-player");
  }

  render(id) {
    const element = this.template.content.querySelector(".videocontrol-list__item").cloneNode(true);

    // player-{id}
    element.querySelector(".vc-player").setAttribute("id", id);

    // player-{id}-video
    element.querySelector("video").setAttribute("id", `${id}-video`);

    // player-{id}-webgl-video
    element.querySelector("input").setAttribute("id", `${id}-webgl-video`);

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
      webglInited: false,
      canvasInited: false,
      containerBounds: null
    };

    this.videoSettings = {
      brightness: 0,
      contrast: 0,
      isFullscreen: false
    };

    this.containerElement = containerElement;
    this.player = playerElement;
    this.video = playerElement.querySelector("video");
    this.brightnessRange = playerElement.querySelector(".vc-player__brightness");
    this.noiseLevelRange = playerElement.querySelector(".vc-player__noise-level");
    this.contrastRange = playerElement.querySelector(".vc-player__contrast");

    this.webglVideo = new _webglVideo__WEBPACK_IMPORTED_MODULE_0__["default"]({
      video: this.video,
      videoPlayer: this.player
    });

    this.canvasVideo = new _canvasVideo__WEBPACK_IMPORTED_MODULE_1__["default"]({
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
      if (Hls.isSupported()) {
        const hls = new Hls();

        hls.loadSource(this.settings.url);
        hls.attachMedia(this.video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          resolve(this.video);
        });
      } else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
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
    if (this.settings.isFullscreen) return false;

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
    if (!this.settings.isFullscreen) return false;

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

  playVideoOnWebgl() {
    this.setContainerBounds();

    if (!this.settings.webglInited) {
      this.video.classList.add("vc-player__video_state-hidden");
    }

    this.webglVideo.play({
      brightness: this.videoSettings.brightness,
      webglInited: this.settings.webglInited
    });

    this.settings.webglInited = true;
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

    // turn on webgl instead of canvas
    // this.playVideoOnWebgl();
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

    this.analyser = new _audioAnalyse__WEBPACK_IMPORTED_MODULE_2__["default"]({
      video: this.video,
      noiseLevelRange: this.noiseLevelRange
    });
  }

  addEventListener(event, callback) {
    this.player.addEventListener(event, callback);
  }
}

/***/ }),

/***/ "./src/components/videocontrol/videocontrol.js":
/*!*****************************************************!*\
  !*** ./src/components/videocontrol/videocontrol.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/components/videocontrol/player.js");


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
      fullscreenId: null
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
    this.broadcasts.filter(broadcast => broadcast.id !== id).forEach(broadcast => broadcast.player.stop());

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

      VideoPlayer.init().then(() => {
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
      }).catch(err => console.err(err));
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Videocontrol);

/***/ }),

/***/ "./src/components/videocontrol/webglVideo.js":
/*!***************************************************!*\
  !*** ./src/components/videocontrol/webglVideo.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * It's my test solution of processing video with WebGL
 * https://www.youtube.com/watch?v=_ZQOUQsw_YI - interesting video about webgl
 * and yes, it works, but there's a problem with quality of video
 */
class WebglVideo {
  constructor({ video, videoPlayer }) {
    this.video = video;
    this.videoPlayer = videoPlayer;
    this.stopVideo = false;

    this.canvas = null;
  }

  calculateBrightness(value) {
    // от -0.5 до 0.5, 0 - картинка без изменений
    return (value - 50) / 100;
  }

  play({ webglInited, brightness }) {
    if (!webglInited) {
      this.canvas = document.createElement("canvas");

      this.canvas.style.width = "auto";
      this.canvas.style.height = "100%";

      this.videoPlayer.appendChild(this.canvas);
    } else {
      this.stopVideo = true;
    }

    const gl = this.canvas.getContext("webgl");

    // Create new program using gsls
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(255, 255, 255, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertShaderSource = `
        attribute vec2 position;
        varying vec2 texCoords;
        
        void main() {
          texCoords = (position + 1.0) / 2.0;
          texCoords.y = 1.0 - texCoords.y;
          gl_Position = vec4(position, 0, 1.0);
        }
      `;

    const fragShaderSource = `
        precision highp float;
        varying vec2 texCoords;
        uniform sampler2D textureSampler;
        
        void main() {
          float brightness = ${this.calculateBrightness(brightness)};
          vec4 color = texture2D(textureSampler, texCoords);
          color.rgb += brightness;
          gl_FragColor = color;
        }
      `;

    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertShader, vertShaderSource);
    gl.shaderSource(fragShader, fragShaderSource);

    gl.compileShader(vertShader);
    gl.compileShader(fragShader);

    const program = gl.createProgram();

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);

    gl.linkProgram(program);

    gl.useProgram(program);

    /** Magic
     * set rectange
     */
    const vertices = new Float32Array([-1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);
    /** Magic end */

    const draw = () => {
      requestAnimationFrame(() => {
        const texture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.video);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        if (!this.stopVideo) {
          draw();
        } else {
          this.stopVideo = false;
        }
      });
    };

    draw();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (WebglVideo);

/***/ }),

/***/ "./src/components/widget/camera.widget.js":
/*!************************************************!*\
  !*** ./src/components/widget/camera.widget.js ***!
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

/***/ "./src/components/widget/player.widget.js":
/*!************************************************!*\
  !*** ./src/components/widget/player.widget.js ***!
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

/***/ "./src/components/widget/questions.widget.js":
/*!***************************************************!*\
  !*** ./src/components/widget/questions.widget.js ***!
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

/***/ "./src/components/widget/stats.widget.js":
/*!***********************************************!*\
  !*** ./src/components/widget/stats.widget.js ***!
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

/***/ "./src/components/widget/themal.widget.js":
/*!************************************************!*\
  !*** ./src/components/widget/themal.widget.js ***!
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

/***/ "./src/components/widget/widget.js":
/*!*****************************************!*\
  !*** ./src/components/widget/widget.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stats_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stats.widget */ "./src/components/widget/stats.widget.js");
/* harmony import */ var _camera_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camera.widget */ "./src/components/widget/camera.widget.js");
/* harmony import */ var _questions_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./questions.widget */ "./src/components/widget/questions.widget.js");
/* harmony import */ var _themal_widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./themal.widget */ "./src/components/widget/themal.widget.js");
/* harmony import */ var _player_widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player.widget */ "./src/components/widget/player.widget.js");






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
    this.widget = null;

    this.render();
  }

  setDescription() {
    if (this.event.description) {
      this.widget.querySelector(".widget-content__text").classList.add(`widget-content__text_width-${this.event.size}`);

      this.widget.querySelector(".widget-content__text").innerText = this.event.description;
    }
  }

  setHeaderData() {
    this.widget.querySelector(".widget-header-about__title").innerText = this.event.title;

    this.widget.querySelector(".widget-header__type").innerText = this.event.source;

    this.widget.querySelector(".widget-header__date").innerText = this.event.time;

    this.widget.querySelector(".widget-header-about__icon > use").setAttribute("xlink:href", `#${this.event.icon}`);

    this.widget.querySelector(".widget-header-about__icon").classList.add(`icon_${this.event.icon}`);
  }

  getDataTemplateType() {
    const { data = {}, icon } = this.event;

    if (data.type === "graph") {
      return WIDGET_TYPES.STATS;
    }

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

    return WIDGET_TYPES.DEFAULT;
  }

  renderDataTemplate() {
    const templateDataType = this.getDataTemplateType();
    let dataContentBlock = null;

    switch (templateDataType) {
      case WIDGET_TYPES.STATS:
        const statsWidget = new _stats_widget__WEBPACK_IMPORTED_MODULE_0__["default"]({
          data: this.event.data
        });

        dataContentBlock = statsWidget.render();

        break;

      case WIDGET_TYPES.CAMERA:
        const cameraWidget = new _camera_widget__WEBPACK_IMPORTED_MODULE_1__["default"]({
          data: this.event.data
        });

        dataContentBlock = cameraWidget.render();

        break;

      case WIDGET_TYPES.PLAYER:
        const playerWidget = new _player_widget__WEBPACK_IMPORTED_MODULE_4__["default"]({
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
        const thermalWidget = new _themal_widget__WEBPACK_IMPORTED_MODULE_3__["default"]({
          data: this.event.data
        });

        dataContentBlock = thermalWidget.render();

        break;
    }

    if (dataContentBlock) {
      this.widget.querySelector(".widget-content").appendChild(dataContentBlock);
    }
  }

  render() {
    this.widget = this.template.content.querySelector(".widget").cloneNode(true);

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

/***/ "./src/layout/layout.js":
/*!******************************!*\
  !*** ./src/layout/layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class ApplicationLayout {
  constructor(selector) {
    this.layout = document.querySelector(selector);
  }

  block() {
    this.layout.classList.add("application_state-frozen");
    this.layout.classList.add("application_state-blured");
  }

  unblock() {
    this.layout.classList.remove("application_state-frozen");
    this.layout.classList.remove("application_state-blured");
  }
}

const Layout = new ApplicationLayout("#application");

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layout/layout */ "./src/layout/layout.js");
/* harmony import */ var _components_header_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/header/header */ "./src/components/header/header.js");
/* harmony import */ var _index_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.page */ "./src/pages/index.page.js");
/* harmony import */ var _videocontrol_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./videocontrol.page */ "./src/pages/videocontrol.page.js");






class InitApplication {
  constructor() {
    this.currentPage = window.location.pathname;

    this.init();
  }

  routing() {
    switch (this.currentPage) {
      case "/":
        this.page = new _index_page__WEBPACK_IMPORTED_MODULE_2__["default"]();
        break;

      case "/videocontrol.html":
        this.page = new _videocontrol_page__WEBPACK_IMPORTED_MODULE_3__["default"]();
        break;
    }
  }

  init() {
    this.headerNavigation = new _components_header_header__WEBPACK_IMPORTED_MODULE_1__["default"]({
      selector: "#header-menu",
      layout: _layout_layout__WEBPACK_IMPORTED_MODULE_0__["default"]
    });

    this.routing();
  }
}

new InitApplication();

/***/ }),

/***/ "./src/pages/index.page.js":
/*!*********************************!*\
  !*** ./src/pages/index.page.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_widget_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/widget/widget */ "./src/components/widget/widget.js");


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
    }).then(response => response.json()).then(result => result).catch(err => alert(err));
  }

  init() {
    this.loadEvents().then(events => {
      this.renderDashboardWidgets(events);
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (IndexPage);

/***/ }),

/***/ "./src/pages/videocontrol.page.js":
/*!****************************************!*\
  !*** ./src/pages/videocontrol.page.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_videocontrol_videocontrol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/videocontrol/videocontrol */ "./src/components/videocontrol/videocontrol.js");



class VideoControlPage {
  constructor() {
    this.broadcasts = [{
      url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8"
    }, {
      url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8"
    }, {
      url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8"
    }, {
      url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8"
    }];

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
//# sourceMappingURL=main.js.map