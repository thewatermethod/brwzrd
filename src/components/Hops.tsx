import React, {useState, Dispatch, SetStateAction} from "react";
import Select from "../components/bare/Select";
import NumberInput from "../components/bare/NumberInput";
import {DeleteButton} from "../components/bare/DeleteButton";
import {HopInterface} from "../components/interfaces/Hop";
import {ResourceValue} from "../components/interfaces/ResourceValue";
import {find} from "lodash";

interface HopsProps {
  hops: [] | HopInterface[];
  setHops: Dispatch<SetStateAction<HopInterface[] | []>>;
  data: [] | ResourceValue[];
  hopsError: string;
}

const Hops: React.SFC<HopsProps> = (props) => {
  // hops hooks
  const [activeHops, setActiveHops] = useState(0);
  const [activeHopsType, setActiveHopsType] = useState(0);
  const [activeHopsAmount, setActiveHopsAmount] = useState(0);
  const [activeHopsTime, setActiveHopsTime] = useState(60);
  const [nameError, setNameError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [timeError, setTimeError] = useState("");

  return (
    <div className={`card hops ${props.hopsError}`}>
      <h2>Hops</h2>

      {props.hopsError === "error" ? (
        <small>Did you forget to add your hops?</small>
      ) : null}

      {props.hops.length > 0 ? (
        <table className="hops-list">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Name</th>
              <th>Type</th>
              <th>Time (Minutes from end of boil)</th>
              <th>
                <span className="screen-reader-text">Delete Button Column</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {(props.hops as Array<HopInterface>).map((h: HopInterface, i) => {
              return (
                <tr key={i}>
                  <td>{h.amount}</td>
                  <td>{h.name}</td>
                  <td>{h.type === 1 ? "Whole" : "Pellet"}</td>
                  <td>{h.time}</td>

                  <td>
                    <DeleteButton
                      visible="x"
                      invisible="Delete"
                      handler={() => {
                        let hops = props.hops;
                        delete hops[i];
                        hops = hops.filter((h) => h.name);
                        props.setHops(hops);
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
          label="Add Hops"
          name="hops_active"
          options={props.data}
          onChangeHandler={(e) => {
            const target = e.target as HTMLSelectElement;
            setActiveHops(parseInt(target.value));
          }}
          value={activeHops}
        />

        <Select
          className={typeError}
          label="Type"
          name="hops_active_type"
          options={[
            {name: "---", id: 0},
            {name: "Whole", id: 1},
            {name: "Pellet", id: 2},
          ]}
          onChangeHandler={(e) => {
            const target = e.target as HTMLSelectElement;
            setActiveHopsType(parseInt(target.value));
          }}
          value={activeHopsType}
        />

        <NumberInput
          className={amountError}
          label="Amount (oz)"
          name="hops_active_amount"
          onChangeHandler={setActiveHopsAmount}
          value={activeHopsAmount}
        />

        <Select
          className={timeError}
          label="Time (minutes from end of boil)"
          name="hops_active_time"
          options={[
            {name: "120", id: 120},
            {name: "110", id: 110},
            {name: "100", id: 100},
            {name: "90", id: 90},
            {name: "80", id: 80},
            {name: "70", id: 70},
            {name: "60", id: 60},
            {name: "55", id: 55},
            {name: "50", id: 50},
            {name: "45", id: 45},
            {name: "40", id: 40},
            {name: "35", id: 35},
            {name: "30", id: 30},
            {name: "25", id: 25},
            {name: "20", id: 20},
            {name: "15", id: 15},
            {name: "10", id: 10},
            {name: "5", id: 5},
            {name: "0", id: 0},
          ]}
          onChangeHandler={(e) => {
            const target = e.target as HTMLSelectElement;
            setActiveHopsTime(parseInt(target.value));
          }}
          value={activeHopsTime}
        />

        <button
          onClick={() => {
            if (activeHops === 0) {
              setNameError("error");
              return;
            }

            if (activeHopsAmount === 0) {
              setAmountError("error");
              return;
            }

            if (activeHopsType === 0) {
              setTypeError("error");
              return;
            }

            let name = "";
            let aau = 0;

            const hops = find(props.data, {id: activeHops});

            if (hops) {
              name = hops?.name;
              if (hops.alphaAcidMin) {
                aau = hops?.alphaAcidMin;
              }
            }

            // get current fermentable
            const hop = [
              {
                amount: activeHopsAmount,
                name: name,
                type: activeHopsType,
                time: activeHopsTime,
                alphaAcidMin: aau,
                id: activeHops,
              },
            ];

            let recipe = [...props.hops, ...hop];

            //update state
            props.setHops(recipe);

            // zero out current
            setActiveHops(0);
            setActiveHopsAmount(0);
            setActiveHopsType(0);
            setActiveHopsTime(60);
            setNameError("");
            setTimeError("");
            setTypeError("");
            setAmountError("");
          }}>
          Add to brew
        </button>
      </fieldset>
    </div>
  );
};

export default Hops;
