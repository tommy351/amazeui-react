'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var AvgGrid = createReactClass({
  displayName: 'AvgGrid',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.node,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'avg',
      component: 'ul'
    };
  },

  render: function render() {
    var Component = this.props.component;
    var classSet = {};
    var prefixClass = this.prefixClass;
    var props = this.props;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    ['sm', 'md', 'lg'].forEach(function (size) {
      if (props[size]) {
        classSet[prefixClass(size + '-' + props[size])] = true;
      }
    });

    return React.createElement(
      Component,
      _extends({}, restProps, {
        className: classNames(this.props.className, classSet)
      }),
      this.props.children
    );
  }
});

module.exports = AvgGrid;