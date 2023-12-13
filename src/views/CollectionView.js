"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionView = void 0;
var CollectionView = /** @class */ (function () {
    function CollectionView(parent, collection) {
        this.parent = parent;
        this.collection = collection;
    }
    CollectionView.prototype.render = function () {
        this.parent.innerHTML = "";
        var templateElement = document.createElement("template");
        for (var _i = 0, _a = this.collection.models; _i < _a.length; _i++) {
            var model = _a[_i];
            var itemParent = document.createElement("div");
            this.renderItem(model, itemParent);
            templateElement.content.append(itemParent);
        }
        this.parent.append(templateElement.content);
    };
    return CollectionView;
}());
exports.CollectionView = CollectionView;
