'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var ClassNameMixin = require('./mixins/ClassNameMixin');
var Button = require('./Button');
var Input = require('./Input');

var FormFile = createReactClass({
  displayName: 'FormFile',
  mixins: [ClassNameMixin],

  propTypes: {
  },

  getDefaultProps: function() {
    return {};
  },

  render: function() {
    return (
      <FormGroup
        className={this.setClassNamespace('form-file')}
      >
        <Input type='file' standalone />
      </FormGroup>
    );
  },
});

module.exports = FormFile;
