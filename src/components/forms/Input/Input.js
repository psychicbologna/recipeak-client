import React, { Component } from 'react';

export default class Input extends Component {

  static defaultProps = {
    defaultValue: ''
  }

  render() {
    const { defaultValue, updateField, parentForm, inputId = 'DEFAULT', inputLabel = 'DEFAULT', inputType = 'text', required, max, disabled = false } = this.props;
    const inputName = parentForm ? `${parentForm}__${inputId}` : inputId;

    return (
      <label htmlFor={inputName} className={`Input__label ${inputName}`}>
        <span className='Input__label__description'>{inputLabel}</span>
        <input
          className={`Input__input ${inputName}`}
          type={inputType}
          max={max ? max : null}
          required={required ? true : false}
          name={inputName}
          id={inputId}
          defaultValue={defaultValue}
          onChange={updateField ? event => updateField(inputId, event.target.value) : null}
          disabled={disabled}
        />
      </label>
    )
  }
}
