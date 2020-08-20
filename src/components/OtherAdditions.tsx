import React, {Dispatch, SetStateAction, useState} from "react";
import Select from "../components/bare/Select";
import {Other} from "../components/interfaces/Other";
import NumberInput from "../components/bare/NumberInput";
import {find} from "lodash";
import {DeleteButton} from "./bare/DeleteButton";

interface OtherAdditionsProps {
  activeOther: number;
  setActiveOther: Dispatch<SetStateAction<number>>;
  activeOtherAmount: number;
  setActiveOtherAmount: Dispatch<SetStateAction<number>>;
  activeOtherTime: number;
  setActiveOtherTime: Dispatch<SetStateAction<number>>;
  others: Other[] | [];
  setOthers: Dispatch<SetStateAction<Other[] | []>>;
}

const OtherAdditions: React.SFC<OtherAdditionsProps> = (props) => {
  const [nameError, setNameError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [timeError, setTimeError] = useState("");

  //let otherAdditionsTableData = [[]];

  // if (props.recipe.other) {
  //   otherAdditionsTableData = props.recipe.other;
  // }

  const data = [
    {name: "---", id: 0},
    {name: "Irish Moss", id: 1},
  ];

  return (
    <div className="card other">
      <h2>Other Additions</h2>
      {/* <Table
        className="other-list"
        headings={["Amount", "Name", "Time (Minutes from end of boil)"]}
        data={otherAdditionsTableData}
      /> */}

      {props.others.length > 0 ? (
        <table className="yeast-list">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Name</th>
              <th>Time (Minutes from end of boil)</th>
              <th>
                <span className="screen-reader-text">Delete Button Column</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {(props.others as Array<Other>).map((o: Other, i) => {
              return (
                <tr key={i}>
                  <td>{o.amount}</td>
                  <td>{o.name}</td>
                  <td>{o.time}</td>
                  <td>
                    <DeleteButton
                      visible="x"
                      invisible="Delete"
                      handler={() => {
                        let others = props.others;
                        delete others[i];
                        others = others.filter((o) => o.name);
                        props.setOthers(others);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}

      <fieldset>
        <Select
          className={nameError}
          label="Add Other Ingredient"
          name="other_active"
          options={data}
          onChangeHandler={(e) => {
            const target = e.target as HTMLSelectElement;
            props.setActiveOther(parseInt(target.value));
          }}
          value={props.activeOther}
        />

        <NumberInput
          className={amountError}
          label="Amount (oz)"
          name="other_active_amount"
          onChangeHandler={props.setActiveOtherAmount}
          value={props.activeOtherAmount}
        />

        <NumberInput
          className={timeError}
          label=" Time (minutes from end of boil)"
          name="other_active_time"
          onChangeHandler={props.setActiveOtherTime}
          value={props.activeOtherTime}
        />

        <button
          onClick={() => {
            if (props.activeOther === 0) {
              setNameError("error");
              return;
            }

            if (props.activeOtherAmount === 0) {
              setAmountError("error");
              return;
            }

            if (props.activeOtherTime === 0) {
              setTimeError("error");
              return;
            }

            const other = find(data, {id: props.activeOther});

            if (!other) {
              setNameError("error");
              return;
            }

            // get current fermentable
            const newOther = [
              {
                amount: props.activeOtherAmount,
                name: other.name,
                time: props.activeOtherTime,
              },
            ];

            let recipe = [...props.others, ...newOther];

            // //update state
            props.setOthers(recipe);

            // zero out current
            props.setActiveOther(0);
            props.setActiveOtherAmount(0);
            props.setActiveOtherTime(0);

            setNameError("");
            setTimeError("");
            setAmountError("");
          }}>
          Add to recipe
        </button>
      </fieldset>
    </div>
  );
};

export default OtherAdditions;
