'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var List = createReactClass({
  displayName: 'List',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    component: PropTypes.node.isRequired,
    border: PropTypes.bool,
    bordered: PropTypes.bool,
    striped: PropTypes.bool,
    static: PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'list',
      component: 'ul'
    };
  },

  render: function render() {
    var classes = this.getClassSet();
    var Component = this.props.component;
    var props = this.props;
    var prefixClass = this.prefixClass;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    // am-list-border
    classes[prefixClass('border')] = props.border || props.bordered;

    // am-list-striped
    classes[prefixClass('striped')] = props.striped;

    // am-list-static
    classes[prefixClass('static')] = props.static;

    return React.createElement(
      Component,
      _extends({}, restProps, {
        className: classNames(classes, props.className)
      }),
      props.children
    );
  }
});

module.exports = List;