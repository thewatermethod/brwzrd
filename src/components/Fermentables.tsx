import React, {useState, Dispatch, SetStateAction} from "react";
import Select from "../components/bare/Select";
import NumberInput from "../components/bare/NumberInput";
import {DeleteButton} from "../components/bare/DeleteButton";
import {find} from "lodash";
import {FermentableInterface} from "./interfaces/Fermentable";
import {ResourceValue} from "./interfaces/ResourceValue";

interface FermentablesProps {
  fermentables: [] | FermentableInterface[];
  setFermentables: Dispatch<SetStateAction<FermentableInterface[] | []>>;
  data: [] | ResourceValue[];
  fermentablesError: string;
}

const Fermentables: React.SFC<FermentablesProps> = (props) => {
  const [activeFermentable, setActiveFermentable] = useState(0);
  const [activeFermentableAmount, setActiveFermentableAmount] = useState<
    number
  >(0);

  const [activeFermentableName, setActiveFermentableName] = useState("");
  const [activeSRM, setActiveSRM] = useState(0);
  const [activeUnit, setActiveUnit] = useState(0);
  const [typeError, setTypeError] = useState("");
  const [amountError, setAmountError] = useState("");

  return (
    <div className={`card fermentables ${props.fermentablesError}`}>
      <h2>Fermentables</h2>

      {props.fermentablesError === "error" ? (
        <small>You are going to need something to ferment</small>
      ) : null}

      {props.fermentables.length > 0 ? (
        <table className="grain-bill">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Type</th>
              <th>
                <span className="screen-reader-text">Delete Button Column</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {(props.fermentables as Array<FermentableInterface>).map(
              (f: FermentableInterface, i) => {
                const fermentable = find(props.data, {id: f.fermentable});

                return (
                  <tr key={i}>
                    <td>{(f.amount / 16).toFixed(2)}</td>
                    <td>{fermentable?.name}</td>
                    <td>
                      <DeleteButton
                        visible="x"
                        invisible="Delete"
                        handler={() => {
                          let fermentables = props.fermentables;

                          delete fermentables[i];
                          fermentables = fermentables.filter(
                            (f) => f.fermentable
                          );
                          props.setFermentables(fermentables);
                        }}
                      />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      ) : null}

      <div>
        <Select
          className={typeError}
          label="Add Fermentable"
          name="fermentable_active"
          onChangeHandler={(e) => {
            const target = e.target as HTMLSelectElement;
            const active = find(props.data, {
              id: parseInt(target.value),
            });
            if (active) {
              setActiveFermentable(active.id);
              setActiveFermentableName(active.name);

              if (active.srmPrecise) {
                setActiveSRM(active.srmPrecise);
              }
            }
          }}
          value={activeFermentable}
          options={props.data}
        />

        <div className="vertical-field-wrap">
          <NumberInput
            className={amountError}
            label="Amount"
            value={activeFermentableAmount}
            onChangeHandler={setActiveFermentableAmount}
            name="fermentable-amount_active"
          />
          <Select
            className="fermentable_unit"
            label="Unit"
            name="fermentable_unit"
            options={[
              {name: "lbs", id: 0},
              {name: "oz", id: 1},
            ]}
            onChangeHandler={(e) => {
              const target = e.target as HTMLSelectElement;
              setActiveUnit(parseInt(target.value));
            }}
            value={activeUnit}
          />
        </div>

        <button
          onClick={() => {
            if (activeFermentable === 0) {
              setTypeError("error");
              return;
            }

            if (activeFermentableAmount === 0) {
              setAmountError("error");
              return;
            }

            let amount = activeFermentableAmount;
            if (activeUnit === 0) {
              amount *= 16;
            }

            // get current fermentable
            const fermentable = [
              {
                amount: amount,
                fermentable: activeFermentable,
                srm: activeSRM,
                name: activeFermentableName,
              },
            ];

            let recipe = [...props.fermentables, ...fermentable];

            // add current to fermentables

            //update state
            props.setFermentables(recipe);

            // zero out current
            setActiveFermentable(0);
            setActiveFermentableAmount(0);
            setActiveFermentableName("");
            setActiveUnit(0);
            setTypeError("");
            setAmountError("");
          }}>
          Add to grain bill
        </button>
      </div>
    </div>
  );
};

export default Fermentables;
