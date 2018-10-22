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



const headerNavigation = new _components_header_header__WEBPACK_IMPORTED_MODULE_1__["default"]({
  selector: "#header-menu",
  layout: _layout_layout__WEBPACK_IMPORTED_MODULE_0__["default"]
});

function loadEvents() {
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

const WIDGET_TYPES = {
  STATS: "STATS",
  CAMERA: "CAMERA",
  THERMAL: "THERMAL",
  PLAYER: "PLAYER",
  QUESTIONS: "QUESTIONS",
  DEFAULT: "DEFAULT"
};

class StatsWidget {
  constructor() {
    this.template = document.getElementById("widget-stats-template");
  }

  render() {
    return this.template.content.cloneNode(true);
  }
}

class CameraWidget {
  constructor() {
    this.template = document.getElementById("widget-camera-template");
  }

  render() {
    return this.template.content.cloneNode(true);
  }
}

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
        const statsWidget = new StatsWidget({
          data: this.event.data
        });

        dataContentBlock = statsWidget.render();

        break;

      case WIDGET_TYPES.CAMERA:
        const cameraWidget = new CameraWidget({
          data: this.event.data
        });

        dataContentBlock = cameraWidget.render();

        break;

      case WIDGET_TYPES.PLAYER:
        const playerWidget = new PlayerWidget({
          data: this.event.data
        });

        dataContentBlock = playerWidget.render();

        break;

      case WIDGET_TYPES.QUESTIONS:
        const questionsWidget = new QuestionsWidget({
          data: this.event.data
        });

        dataContentBlock = questionsWidget.render();

        break;

      case WIDGET_TYPES.THERMAL:
        const thermalWidget = new ThemalWidget({
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

function renderDashboardWidgets(events) {
  const dashboardWidgetsList = document.getElementById("dashboard-list");

  events.forEach(event => {
    new Widget({
      event,
      container: dashboardWidgetsList
    });
  });
}

loadEvents().then(events => {
  renderDashboardWidgets(events);
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map