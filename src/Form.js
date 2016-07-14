'use strict';

var React = require('react');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var Form = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    horizontal: React.PropTypes.bool,
    inline: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'form'
    };
  },

  render: function() {
    var classSet = this.getClassSet();
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    classSet[this.prefixClass('horizontal')] = this.props.horizontal;
    classSet[this.prefixClass('inline')] = this.props.inline;

    return (
      <form
        {...restProps}
        className={classNames(classSet, this.props.className)}
      >
        {this.props.children}
      </form>
    );
  }
});

module.exports = Form;
