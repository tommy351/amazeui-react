'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Popover = createReactClass({
  displayName: 'Popover',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    positionLeft: PropTypes.number,
    positionTop: PropTypes.number,
    amSize: PropTypes.oneOf(['sm', 'lg']),
    amStyle: PropTypes.string,
    onRequestHide: PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'popover'
    };
  },

  render: function render() {
    var classSet = this.getClassSet();
    var style = {
      left: this.props.positionLeft,
      top: this.props.positionTop,
      display: 'block'
    };
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    classSet[this.setClassNamespace('active')] = true;
    classSet[this.prefixClass(this.props.placement)] = true;

    return React.createElement(
      'div',
      _extends({}, restProps, {
        style: style,
        className: classNames(classSet, this.props.className)
      }),
      React.createElement(
        'div',
        { className: this.prefixClass('inner') },
        this.props.children
      ),
      React.createElement('div', { className: this.prefixClass('caret') })
    );
  }
});

module.exports = Popover;