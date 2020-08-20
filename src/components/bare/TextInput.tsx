import React, {Dispatch, SetStateAction} from "react";

interface TextInputProps {
  label: string;
  name: string;
  onChangeHandler: Dispatch<SetStateAction<string>>;
  value: string;
  className: string;
  default?: string;
  hint?: string;
}

const TextInput: React.SFC<TextInputProps> = (props) => {
  const {label, name, onChangeHandler} = props;

  let value = props.value;

  if (!value && props.default) {
    value = props.default;
  }

  return (
    <React.Fragment>
      <label className={`input-label ${props.className}`} htmlFor={name}>
        {label}
      </label>
      {props.hint ? <small>{props.hint}</small> : null}
      <input
        className={`input-text ${props.className}`}
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          onChangeHandler(e.target.value);
        }}
      />
    </React.Fragment>
  );
};

export default TextInput;
