'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Badge = createReactClass({
  displayName: 'Badge',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    component: PropTypes.node,
    href: PropTypes.string,
    round: PropTypes.bool,
    radius: PropTypes.bool,
    amStyle: PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'badge',
      component: 'span'
    };
  },

  renderAnchor: function renderAnchor(classSet) {
    var Component = this.props.component || 'a';
    var href = this.props.href || '#';
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return React.createElement(
      Component,
      _extends({}, restProps, {
        href: href,
        className: classNames(classSet, this.props.className),
        role: 'badge'
      }),
      this.props.children
    );
  },

  render: function render() {
    var classSet = this.getClassSet();
    var Component = this.props.component;
    var renderAnchor = this.props.href;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    if (renderAnchor) {
      return this.renderAnchor(classSet);
    }

    return React.createElement(
      Component,
      _extends({}, restProps, {
        className: classNames(classSet, this.props.className)
      }),
      this.props.children
    );
  }
});

module.exports = Badge;