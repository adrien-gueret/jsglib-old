define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var Trait = function Trait(trait) {
        return function (target_class) {
            Object.getOwnPropertyNames(trait).forEach(function (property_name) {
                target_class.prototype[property_name] = trait[property_name];
            });
        };
    };

    exports.default = Trait;
});
//# sourceMappingURL=trait.js.map