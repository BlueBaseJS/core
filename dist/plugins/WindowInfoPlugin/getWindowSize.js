'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getWindowSize;
// Grid Upper limits
var gridLimits = {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200
};
function getWindowSize(width) {
    if (width === void 0) {
        width = 0;
    }
    if (width < gridLimits.xs) {
        return 'xs';
    } else if (width < gridLimits.sm) {
        return 'sm';
    } else if (width < gridLimits.md) {
        return 'md';
    } else if (width < gridLimits.lg) {
        return 'lg';
    }
    return 'xl';
}