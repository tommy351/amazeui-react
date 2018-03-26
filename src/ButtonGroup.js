'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var ButtonGroup = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    stacked: PropTypes.bool,
    justify: PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'btn-group'
    };
  },

  render: function() {
    var classSet = this.getClassSet();
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    classSet[this.prefixClass('stacked')] = this.props.stacked;
    classSet[this.prefixClass('justify')] = this.props.justify;

    return (
      <div
        {...restProps}
        className={classNames(this.props.className, classSet)}
      >
        {this.props.children}
      </div>
    );
  }
});

module.exports = ButtonGroup;
