'use strict';

var React = require('react');
var classNames = require('classnames');
var ClassNameMixin = require('./mixins/ClassNameMixin');
var omit = require('object.omit');

var Thumbnail = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string,
    standalone: React.PropTypes.bool,
    caption: React.PropTypes.node,
    component: React.PropTypes.node
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'thumbnail',
      component: 'figure'
    };
  },

  renderImg: function(classes, props) {
    props = props || {};

    return props.src ? (
      <img
        {...props}
        className={classes}
      />
    ) : null;
  },

  render: function() {
    var classes = classNames(this.getClassSet(), this.props.className);

    if (this.props.standalone) {
      return this.renderImg(classes, Object.keys(this.constructor.propTypes));
    }

    var Component = this.props.href ? 'a' : this.props.component;
    var imgProps = {
      alt: this.props.alt,
      src: this.props.src,
      width: this.props.width,
      height: this.props.height
    };
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes), Object.keys(imgProps));
    var caption = this.props.caption;

    return (
      <Component
        {...restProps}
        className={classes}
      >
        {this.renderImg(null, imgProps)}

        {caption || this.props.children ? (
          <Thumbnail.Caption
            component={typeof caption === 'string' ? 'figcaption' : 'div'}
          >
            {this.props.caption || this.props.children}
          </Thumbnail.Caption>
        ) : null}
      </Component>
    );
  }
});

Thumbnail.Caption = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    component: React.PropTypes.node
  },

  getDefaultProps: function() {
    return {
      component: 'div'
    };
  },

  render: function() {
    var Component = this.props.component;
    var classes = classNames(
      this.props.className,
      this.setClassNamespace('thumbnail-caption')
    );
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <Component
        {...restProps}
        className={classes}
      >
        {this.props.children}
      </Component>
    );
  }
});

module.exports = Thumbnail;
