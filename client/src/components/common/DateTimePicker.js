import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';

import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

require('moment/locale/nb');

const DateTimePicker = ({
  name,
  defaultValue,
  placeholder,
  value,
  label,
  error,
  info,
  onChange,
  disabled
}) => {
  return (
    <FormGroup>
      <DateTime
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </FormGroup>
  );
};

DateTimePicker.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.string
};

export default DateTimePicker;
