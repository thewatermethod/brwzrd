import React, {ChangeEvent} from "react";
import {ResourceValue} from "../interfaces/ResourceValue";

interface SelectProps {
  className: string;
  label: string;
  name: string;
  options: Array<ResourceValue>;
  onChangeHandler: (e: ChangeEvent) => void;
  value: number;
  default?: number;
}

const Select: React.SFC<SelectProps> = (props) => {
  return (
    <React.Fragment>
      <label className={`select-label ${props.className}`} htmlFor={props.name}>
        {props.label}
      </label>
      <select
        className={`select ${props.className}`}
        id={props.name}
        name={props.name}
        onChange={(e) => {
          props.onChangeHandler(e);
        }}
        value={props.value}>
        {props.options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
};

export default Select;
