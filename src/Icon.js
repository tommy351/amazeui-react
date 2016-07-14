'use strict';

var React = require('react');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Icon = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string,
    amStyle: React.PropTypes.string,
    amSize: React.PropTypes.string,
    fw: React.PropTypes.bool,
    spin: React.PropTypes.bool,
    button: React.PropTypes.bool,
    size: React.PropTypes.string,
    href: React.PropTypes.string,
    component: React.PropTypes.node.isRequired,
    icon: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'icon',
      component: 'span'
    };
  },

  render: function() {
    var classes = this.getClassSet(true);
    var props = this.props;
    var Component = props.href ? 'a' : props.component;
    var prefixClass = this.prefixClass;
    var setClassNamespace = this.setClassNamespace;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    // am-icon-[iconName]
    classes[prefixClass(props.icon)] = true;

    // am-icon-btn
    classes[prefixClass('btn')] = props.button;

    // button style
    props.button && props.amStyle &&
    (classes[setClassNamespace(props.amStyle)] = true);

    // am-icon-fw
    classes[prefixClass('fw')] = props.fw;

    // am-icon-spin
    classes[prefixClass('spin')] = props.spin;

    return (
      <Component
        {...restProps}
        className={classNames(classes, this.props.className)}
      >
        {this.props.children}
      </Component>
    );
  }
});

module.exports = Icon;
