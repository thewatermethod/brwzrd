import React, {Dispatch, SetStateAction} from "react";

interface NumberInputProps {
  label: string;
  name: string;
  onChangeHandler: Dispatch<SetStateAction<number>>;
  value: number;
  default?: number;
  className: string;
  step?: string;
  min?: string;
  max?: string;
}

const NumberInput: React.SFC<NumberInputProps> = (props) => {
  const {label, name, onChangeHandler} = props;

  let value = props.value;

  if (!value && props.default) {
    value = props.default;
  }

  let step = "any";

  if (props.step) {
    step = props.step;
  }

  return (
    <React.Fragment>
      <label className={`input-label ${props.className}`} htmlFor={name}>
        {label}
      </label>
      <input
        className={`input-number ${props.className}`}
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          onChangeHandler(parseFloat(e.target.value));
        }}
        step={step}
      />
    </React.Fragment>
  );
};

export default NumberInput;
