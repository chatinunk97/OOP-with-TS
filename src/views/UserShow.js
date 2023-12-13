"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserShow = void 0;
var View_1 = require("./View");
var UserShow = /** @class */ (function (_super) {
    __extends(UserShow, _super);
    function UserShow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserShow.prototype.template = function () {
        return "\n        <div>\n        <h1> User Information </h1>\n        <div>User name : ".concat(this.model.get("name"), "</div>\n        <div>User Age : ").concat(this.model.get("age"), "</div>\n        </div>\n        ");
    };
    return UserShow;
}(View_1.View));
exports.UserShow = UserShow;
