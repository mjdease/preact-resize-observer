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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { h, Component } from 'preact';
import ResizeObserver from 'resize-observer-polyfill';
import * as PropTypes from 'prop-types';
var PreactResizeObserver = /** @class */ (function (_super) {
    __extends(PreactResizeObserver, _super);
    function PreactResizeObserver(props) {
        var _this = _super.call(this, props) || this;
        _this.suppressResizeEvent = false;
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
                if (_this.props.horizontal && _this.currentWidth !== width) {
                    resized = true;
                    _this.currentWidth = width;
                }
                if (_this.props.vertical && _this.currentHeight !== height) {
                    resized = true;
                    _this.currentHeight = height;
                }
                if (resized) {
                    resizeCallback(width, height);
                }
            });
        };
        _this.handleRef = function (el) {
            var innerRef = _this.props.innerRef;
            _this.element = el;
            if (_this.element && innerRef && typeof innerRef === 'function') {
                innerRef(_this.element);
            }
        };
        _this.observer = new ResizeObserver(_this.onResize);
        return _this;
    }
    PreactResizeObserver.prototype.componentDidMount = function () {
        var observedElement;
        if (this.props.element) {
            observedElement = this.props.element;
        }
        else if (this.element) {
            observedElement = this.element;
        }
        if (observedElement) {
            this.observeElement(observedElement);
        }
    };
    PreactResizeObserver.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.element) {
            // Custom element was provided when we didn't have one before
            if (nextProps.element !== this.props.element) {
                this.observeElement(nextProps.element);
            }
        }
        else if (this.props.element) {
            // No custom element provided but we had one previously
            this.observeElement(this.element);
        }
    };
    PreactResizeObserver.prototype.observeElement = function (element) {
        if (element) {
            this.suppressResizeEvent = !this.props.initial;
            this.observer.disconnect();
            this.observer.observe(element);
        }
    };
    PreactResizeObserver.prototype.render = function () {
        var _a = this.props, onResize = _a.onResize, innerRef = _a.innerRef, horizontal = _a.horizontal, vertical = _a.vertical, initial = _a.initial, element = _a.element, tag = _a.tag, children = _a.children, rest = __rest(_a, ["onResize", "innerRef", "horizontal", "vertical", "initial", "element", "tag", "children"]);
        return h(tag, __assign({ ref: this.handleRef }, rest), children);
    };
    PreactResizeObserver.propTypes = {
        onResize: PropTypes.func.isRequired,
        horizontal: PropTypes.bool,
        vertical: PropTypes.bool,
        initial: PropTypes.bool,
        element: PropTypes.element,
        tag: PropTypes.string,
    };
    PreactResizeObserver.defaultProps = {
        initial: true,
        horizontal: true,
        vertical: true,
        tag: 'div',
    };
    return PreactResizeObserver;
}(Component));
export default PreactResizeObserver;
