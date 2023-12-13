"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
var View = /** @class */ (function () {
    function View(parent, model) {
        this.parent = parent;
        this.model = model;
        this.regions = {};
        this.bindModel();
    }
    View.prototype.regionsMap = function () {
        return {};
    };
    View.prototype.eventsMap = function () {
        return {};
    };
    View.prototype.bindModel = function () {
        var _this = this;
        this.model.on("change", function () {
            _this.render();
        });
    };
    View.prototype.bindEvents = function (fragment) {
        var eventsMap = this.eventsMap();
        var _loop_1 = function (eventKey) {
            var _a = eventKey.split(":"), eventName = _a[0], selector = _a[1];
            fragment.querySelectorAll(selector).forEach(function (element) {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        };
        for (var eventKey in eventsMap) {
            _loop_1(eventKey);
        }
    };
    View.prototype.mapRegions = function (fragment) {
        var regionsMap = this.regionsMap();
        for (var key in regionsMap) {
            var selector = regionsMap[key];
            var element = fragment.querySelector(selector);
            if (element) {
                this.regions[key] = element;
            }
        }
    };
    View.prototype.onRender = function () { };
    View.prototype.render = function () {
        var templateElement = document.createElement("template");
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);
        if (this.parent) {
            this.parent.innerHTML = "";
            this.onRender();
            this.parent.append(templateElement.content);
        }
    };
    return View;
}());
exports.View = View;
