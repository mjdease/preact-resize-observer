"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var resize_observer_polyfill_1 = __importDefault(require("resize-observer-polyfill"));
var PropTypes = __importStar(require("prop-types"));
var PreactResizeObserver = /** @class */ (function (_super) {
    __extends(PreactResizeObserver, _super);
    function PreactResizeObserver(props) {
        var _this = _super.call(this, props) || this;
        _this.suppressResizeEvent = false;
        _this.suppressReRender = false;
        _this.style = {
            position: 'absolute',
            width: 0,
            height: 0,
            display: 'none',
        };
        _this.onResize = function (resizeEntries) {
            var resizeCallback = _this.props.onResize;
            if (_this.suppressResizeEvent) {
                _this.suppressResizeEvent = false;
                return;
            }
            if (typeof resizeCallback !== 'function') {
                return;
            }
            resizeEntries.forEach(function (entry) {
                var _a = entry.contentRect, width = _a.width, height = _a.height;
                var resized = false;
                if (_this.props.width && _this.currentWidth !== width) {
                    resized = true;
                    _this.currentWidth = width;
                }
                if (_this.props.height && _this.currentHeight !== height) {
                    resized = true;
                    _this.currentHeight = height;
                }
                if (resized) {
                    resizeCallback(width, height);
                }
            });
        };
        _this.handleRef = function (el) {
            _this.element = el;
        };
        _this.observer = new resize_observer_polyfill_1.default(_this.onResize);
        return _this;
    }
    PreactResizeObserver.prototype.componentDidMount = function () {
        var observedElement;
        if (this.props.target) {
            observedElement = this.props.target;
        }
        else if (this.element && this.element.parentElement) {
            observedElement = this.element.parentElement;
        }
        if (observedElement) {
            this.observeElement(observedElement);
        }
        this.suppressReRender = true;
    };
    PreactResizeObserver.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.target && nextProps.target !== this.props.target) {
            this.observeElement(nextProps.target);
        }
    };
    PreactResizeObserver.prototype.shouldComponentUpdate = function () {
        return !this.suppressReRender;
    };
    PreactResizeObserver.prototype.observeElement = function (element) {
        this.suppressResizeEvent = this.props.noInitial;
        this.observer.disconnect();
        this.observer.observe(element);
    };
    PreactResizeObserver.prototype.render = function () {
        return (preact_1.h("div", { ref: this.handleRef, style: this.style }));
    };
    PreactResizeObserver.propTypes = {
        onResize: PropTypes.func.isRequired,
        width: PropTypes.bool,
        height: PropTypes.bool,
        noInitial: PropTypes.bool,
        target: PropTypes.element,
    };
    PreactResizeObserver.defaultProps = {
        noInitial: false,
        width: true,
        height: true,
    };
    return PreactResizeObserver;
}(preact_1.Component));
exports.default = PreactResizeObserver;
