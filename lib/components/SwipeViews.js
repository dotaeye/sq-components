'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _reactMotion = require('react-motion');

var _sqBox = require('sq-box');

var _sqBox2 = _interopRequireDefault(_sqBox);

var _SwipeItemView = require('./SwipeItemView');

var _SwipeItemView2 = _interopRequireDefault(_SwipeItemView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var resistanceCoef = 0.7;

var SwipeViews = function (_Component) {
  _inherits(SwipeViews, _Component);

  function SwipeViews(props, context) {
    _classCallCheck(this, SwipeViews);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeViews).call(this, props, context));

    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleTouchStart = _this.handleTouchStart.bind(_this);

    _this.state = {
      indexCurrent: props.index,
      indexLatest: props.index,
      isDragging: false,
      isFirstRender: true,
      heightLatest: 0
    };
    return _this;
  }

  _createClass(SwipeViews, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        isFirstRender: false
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var index = nextProps.index;

      if (typeof index === 'number' && index !== this.props.index) {
        this.setState({
          indexCurrent: index,
          indexLatest: index
        });
      }
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      var touch = event.touches[0];

      this.startWidth = _reactDom2.default.findDOMNode(this).getBoundingClientRect().width;
      this.startIndex = this.state.indexCurrent;
      this.startX = touch.pageX;
      this.lastX = touch.pageX;
      this.deltaX = 0;
      this.startY = touch.pageY;
      this.isScrolling = undefined;
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {
      var touch = event.touches[0];

      // This is a one time test
      if (this.isScrolling === undefined) {
        this.isScrolling = Math.abs(this.startY - touch.pageY) > Math.abs(this.startX - touch.pageX);
      }

      if (this.isScrolling) {
        return;
      }

      // Prevent native scrolling
      event.preventDefault();

      this.deltaX = this.deltaX * 0.5 + (touch.pageX - this.lastX) * 0.5;
      this.lastX = touch.pageX;

      var indexMax = _react2.default.Children.count(this.props.children) - 1;

      var index = this.startIndex + (this.startX - touch.pageX) / this.startWidth;

      if (!this.props.resistance) {
        if (index < 0) {
          index = 0;
          this.startX = touch.pageX;
        } else if (index > indexMax) {
          index = indexMax;
          this.startX = touch.pageX;
        }
      } else {
        if (index < 0) {
          index = Math.exp(index * resistanceCoef) - 1;
        } else if (index > indexMax) {
          index = indexMax + 1 - Math.exp((indexMax - index) * resistanceCoef);
        }
      }

      if (this.props.onSwitching) {
        this.props.onSwitching(index);
      }

      this.setState({
        isDragging: true,
        indexCurrent: index
      });
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      if (this.isScrolling) {
        return;
      }

      var indexNew = undefined;

      // Quick movement
      if (Math.abs(this.deltaX) > this.props.threshold) {
        if (this.deltaX > 0) {
          indexNew = Math.floor(this.state.indexCurrent);
        } else {
          indexNew = Math.ceil(this.state.indexCurrent);
        }
      } else {
        // Some hysteresis with startIndex
        if (Math.abs(this.startIndex - this.state.indexCurrent) > 0.6) {
          indexNew = Math.round(this.state.indexCurrent);
        } else {
          indexNew = this.startIndex;
        }
      }

      var indexMax = _react2.default.Children.count(this.props.children) - 1;

      if (indexNew < 0) {
        indexNew = 0;
      } else if (indexNew > indexMax) {
        indexNew = indexMax;
      }

      this.setState({
        indexCurrent: indexNew,
        indexLatest: indexNew,
        isDragging: false
      });

      if (this.props.onSwitching) {
        this.props.onSwitching(indexNew);
      }

      if (this.props.onChangeIndex && indexNew !== this.startIndex) {
        this.props.onChangeIndex(indexNew, this.startIndex);
      }
    }
  }, {
    key: 'renderContainer',
    value: function renderContainer(interpolatedStyle) {
      var children = this.props.children;

      var translate = -interpolatedStyle.translate;

      return _react2.default.createElement(
        _sqBox2.default,
        { fill: true, direction: 'column' },
        _react2.default.createElement(
          'div',
          {
            style: Object.assign({
              WebkitTransform: 'translate3d(' + translate + '%, 0, 0)',
              transform: 'translate3d(' + translate + '%, 0, 0)',
              width: '100%',
              height: '100%',
              display: 'flex'
            })
          },
          children
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var indexCurrent = _state.indexCurrent;
      var isDragging = _state.isDragging;
      var disabled = this.props.disabled;

      var translate = indexCurrent * 100;
      var motionStyle = isDragging ? {
        translate: translate
      } : {
        translate: (0, _reactMotion.spring)(translate, {
          stiffness: 300,
          damping: 30
        })
      };

      var touchEvents = disabled ? {} : {
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd
      };
      var props = (0, _blacklist2.default)(this.props, 'children', 'disabled', 'index', 'onChangeIndex', 'onSwitching', 'resistance', 'style', 'threshold');

      return _react2.default.createElement(
        _sqBox2.default,
        _extends({
          direction: 'column'
        }, props, touchEvents),
        _react2.default.createElement(
          _reactMotion.Motion,
          { style: motionStyle },
          function (interpolatedStyle) {
            return _this2.renderContainer(interpolatedStyle);
          }
        )
      );
    }
  }]);

  return SwipeViews;
}(_react.Component);

SwipeViews.defaultProps = {
  index: 0,
  threshold: 5,
  resistance: false,
  disabled: false,
  fill: true
};

SwipeViews.propTypes = {
  /**
   * Use this property to provide your slides.
   */
  children: _react2.default.PropTypes.node,

  /**
   * If true,the viewContainer will fill the height of the parent container
   */

  fill: _react2.default.PropTypes.bool,

  /**
   * If true, it will disable touch events.
   * This is useful when you want to prohibit the user from changing slides.
   */
  disabled: _react2.default.PropTypes.bool,

  /**
   * This is the index of the slide to show.
   * This is useful when you want to change the default slide shown.
   * Or when you have tabs linked to each slide.
   */

  index: _react2.default.PropTypes.number,

  /**
   * This is callback prop. It's call by the
   * component when the shown slide change after a swipe made by the user.
   * This is useful when you have tabs linked to each slide.
   */

  onChangeIndex: _react2.default.PropTypes.func,

  /**
   * This is callback prop. It's called by the
   * component when the slide switching.
   * This is useful when you want to implement something corresponding to the current slide position.
   */
  onSwitching: _react2.default.PropTypes.func,

  /**
   * If true, it will add bounds effect on the edges.
   */
  resistance: _react2.default.PropTypes.bool,

  /**
   * This is the inlined style that will be applied
   * on the root component.
   */
  style: _react2.default.PropTypes.object,

  /**
   * This is the threshold used for detecting a quick swipe.
   * If the computed speed is above this value, the index change.
   */
  threshold: _react2.default.PropTypes.number
};

exports.default = SwipeViews;
module.exports = exports['default'];
