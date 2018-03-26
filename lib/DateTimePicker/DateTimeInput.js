'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');

var React = require('react');
var ReactDOM = require('react-dom');
var fecha = require('fecha');
var omit = require('object.omit');
var Events = require('../utils/Events');
var isNodeInTree = require('../utils/isNodeInTree');
var Input = require('../Input');
var DateTimePicker = require('./DateTimePicker');

var DateTimeInput = function (_React$Component) {
  _inherits(DateTimeInput, _React$Component);

  function DateTimeInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateTimeInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateTimeInput.__proto__ || Object.getPrototypeOf(DateTimeInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: _this.props.dateTime || fecha.format(new Date(), _this.props.format),
      showPicker: false
    }, _this.handleOuterClick = function (event) {
      var picker = ReactDOM.findDOMNode(_this.refs.DateTimePicker);

      if (!isNodeInTree(event.target, picker)) {
        _this.handleClose();
      }
    }, _this.bindOuterHandlers = function () {
      Events.on(document, 'click', _this.handleOuterClick);
    }, _this.unbindOuterHandlers = function () {
      Events.off(document, 'click', _this.handleOuterClick);
    }, _this.handleClose = function () {
      _this.unbindOuterHandlers();
      return _this.setState({
        showPicker: false
      });
    }, _this.handleClick = function () {
      _this.bindOuterHandlers();

      var positionNode = ReactDOM.findDOMNode(_this.refs.dateInput);
      // fixes #57
      // @see http://stackoverflow.com/questions/1044988/getting-offsettop-of-element-in-a-table
      var rect = positionNode.getBoundingClientRect();
      var offset = {
        top: rect.top + positionNode.offsetHeight,
        left: rect.left
      };

      var styles = {
        display: 'block',
        top: offset.top,
        left: offset.left,
        position: 'fixed',
        zIndex: 1120
      };

      _this.setState({
        showPicker: true,
        pickerStyle: styles
      });
    }, _this.handleChange = function (event) {
      _this.setState({
        value: event.target.value
      });
    }, _this.handleSelect = function (date) {
      _this.setState({
        value: date
      });

      _this.props.onSelect && _this.props.onSelect.call(_this, date);
    }, _this.renderPicker = function () {
      if (_this.state.showPicker) {
        return React.createElement(DateTimePicker, {
          style: _this.state.pickerStyle,
          ref: 'DateTimePicker',
          showDatePicker: _this.props.showDatePicker,
          showTimePicker: _this.props.showTimePicker,
          onSelect: _this.handleSelect,
          onClose: _this.handleClose,
          amStyle: _this.props.amStyle,
          dateTime: _this.state.value,
          viewMode: _this.props.viewMode,
          minViewMode: _this.props.minViewMode,
          daysOfWeekDisabled: _this.props.daysOfWeekDisabled,
          weekStart: _this.props.weekStart,
          format: _this.props.format,
          locale: _this.props.locale,
          maxDate: _this.props.maxDate,
          minDate: _this.props.minDate
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateTimeInput, [{
    key: 'render',
    value: function render() {
      var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

      return React.createElement(
        'div',
        null,
        React.createElement(Input, _extends({}, restProps, {
          type: 'text',
          value: this.state.value,
          onClick: this.handleClick,
          onChange: this.handleChange,
          onSelect: null,
          ref: 'dateInput'
        })),
        this.renderPicker()
      );
    }
  }]);

  return DateTimeInput;
}(React.Component);

DateTimeInput.propTypes = {
  format: PropTypes.string,
  dateTime: PropTypes.string,
  date: PropTypes.string,
  onSelect: PropTypes.func,
  showTimePicker: PropTypes.bool,
  showDatePicker: PropTypes.bool,
  amStyle: PropTypes.oneOf(['success', 'danger', 'warning']),
  viewMode: PropTypes.string,
  minViewMode: PropTypes.string,
  daysOfWeekDisabled: PropTypes.array,
  locale: PropTypes.string,
  weekStart: PropTypes.number,
  minDate: PropTypes.string,
  maxDate: PropTypes.string
};
DateTimeInput.defaultProps = {
  dateTime: '',
  format: 'YYYY-MM-DD HH:mm'
};


module.exports = DateTimeInput;

// TODO: 动画