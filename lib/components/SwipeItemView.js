'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactMotion = require('react-motion');

var _sqBox = require('sq-box');

var _sqBox2 = _interopRequireDefault(_sqBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initialScrollable = _sqBox2.default.initScrollable();

var SwipeItemView = function (_Component) {
  _inherits(SwipeItemView, _Component);

  function SwipeItemView(props, context) {
    _classCallCheck(this, SwipeItemView);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeItemView).call(this, props, context));
  }

  _createClass(SwipeItemView, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var fill = _props.fill;
      var scrollable = _props.scrollable;
      var children = _props.children;
      var style = _props.style;

      return _react2.default.createElement(
        _sqBox2.default,
        { fill: fill, scrollable: initialScrollable, direction: 'column',
          style: Object.assign(style, { 'flexShrink': 0 })
        },
        children
      );
    }
  }]);

  return SwipeItemView;
}(_react.Component);

SwipeItemView.defaultProps = {
  fill: true,
  scrollable: true,
  style: {}
};

SwipeItemView.propTypes = {

  /**
   * If true,the swipe item view will fill the parent container
   */
  fill: _react2.default.PropTypes.bool,

  /**
   * If true,the swipe item view will support scroll
   */
  scrollable: _react2.default.PropTypes.bool,

  /**
   * This is the inlined style that will be applied
   * on the root component.
   */
  style: _react2.default.PropTypes.object

};

exports.default = SwipeItemView;
module.exports = exports['default'];
