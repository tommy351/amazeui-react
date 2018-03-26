'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var ClassNameMixin = require('./mixins/ClassNameMixin');
var omit = require('object.omit');

var Thumbnail = createReactClass({
  displayName: 'Thumbnail',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    standalone: PropTypes.bool,
    caption: PropTypes.node,
    component: PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'thumbnail',
      component: 'figure'
    };
  },

  renderImg: function renderImg(classes, props) {
    props = props || {};

    return props.src ? React.createElement('img', _extends({}, props, {
      className: classes
    })) : null;
  },

  render: function render() {
    var classes = classNames(this.getClassSet(), this.props.className);
    var restProps = omit(this.props, ['classPrefix', 'standalone', 'caption', 'component']);

    if (this.props.standalone) {
      return this.renderImg(classes, restProps);
    }

    var Component = this.props.href ? 'a' : this.props.component;
    var imgProps = {
      alt: this.props.alt,
      src: this.props.src,
      width: this.props.width,
      height: this.props.height
    };
    var props = omit(restProps, ['alt', 'src', 'width', 'height']);
    var caption = this.props.caption;

    return React.createElement(
      Component,
      _extends({}, props, {
        className: classes
      }),
      this.renderImg(null, imgProps),
      caption || this.props.children ? React.createElement(
        Thumbnail.Caption,
        {
          component: typeof caption === 'string' ? 'figcaption' : 'div'
        },
        this.props.caption || this.props.children
      ) : null
    );
  }
});

Thumbnail.Caption = createReactClass({
  displayName: 'Caption',

  mixins: [ClassNameMixin],

  propTypes: {
    component: PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      component: 'div'
    };
  },

  render: function render() {
    var Component = this.props.component;
    var classes = classNames(this.props.className, this.setClassNamespace('thumbnail-caption'));
    var restProps = omit(this.props, ['component']);

    return React.createElement(
      Component,
      _extends({}, restProps, {
        className: classes
      }),
      this.props.children
    );
  }
});

module.exports = Thumbnail;