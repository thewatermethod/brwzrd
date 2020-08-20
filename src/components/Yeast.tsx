import React, {Dispatch, SetStateAction, useState} from "react";
import Select from "../components/bare/Select";
import {Option} from "../components/interfaces/Option";
import {DeleteButton} from "../components/bare/DeleteButton";
import {find} from "lodash";
import {ResourceValue} from "./interfaces/ResourceValue";

interface YeastProps {
  yeast: [] | Option[];
  setYeast: Dispatch<SetStateAction<Option[] | []>>;
  data: [] | ResourceValue[];
  yeastError: string;
}

const Yeast: React.SFC<YeastProps> = (props) => {
  const [activeYeast, setActiveYeast] = useState(0);
  const [nameError, setNameError] = useState("");

  return (
    <div className={`card yeast ${props.yeastError}`}>
      <h2>Yeast</h2>

      {props.yeastError === "error" ? (
        <small>Yeast is real important</small>
      ) : null}

      {props.yeast.length > 0 ? (
        <table className="yeast-list">
          <thead>
            <tr>
              <th>Type</th>
              <th>
                <span className="screen-reader-text">Delete Button Column</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {(props.yeast as Array<Option>).map((y: Option, i) => {
              return (
                <tr key={i}>
                  <td>{y.label}</td>
                  <td>
                    <DeleteButton
                      visible="x"
                      invisible="Delete"
                      handler={() => {
                        let yeasts = props.yeast;
                        delete yeasts[i];
                        yeasts = yeasts.filter((y) => y.value);
                        props.setYeast(yeasts);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}

      <Select
        label="Select yeast"
        name="yeast_name_active"
        options={props.data}
        onChangeHandler={(e) => {
          const target = e.target as HTMLSelectElement;
          const activeYeast = find(props.data, {id: parseInt(target.value)});
          if (activeYeast) {
            setActiveYeast(activeYeast.id);
          }
        }}
        value={activeYeast}
        className={nameError}
      />
      <button
        onClick={() => {
          if (activeYeast === 0) {
            setNameError("error");
            return;
          }

          // get current fermentable

          const yeast = find(props.data, {id: activeYeast});

          if (!yeast) {
            return;
          }

          const yeastForRecipe = [{label: yeast.name, value: yeast.id}];

          let recipe = [...props.yeast, ...yeastForRecipe];

          // //update state
          props.setYeast(recipe);

          // zero out current
          setActiveYeast(0);
          setNameError("");
        }}>
        Add to grain bill
      </button>
    </div>
  );
};

export default Yeast;
