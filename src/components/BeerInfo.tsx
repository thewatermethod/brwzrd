import React, {Dispatch, SetStateAction} from "react";
import Select from "../components/bare/Select";
import TextInput from "../components/bare/TextInput";
import NumberInput from "../components/bare/NumberInput";

interface BeerInfoProps {
  beerName: string;
  setBeerName: Dispatch<SetStateAction<string>>;
  beerNameError: string;
  author: string;
  setAuthor: Dispatch<SetStateAction<string>>;
  authorError: string;
  style: string;
  setStyle: Dispatch<SetStateAction<string>>;
  method: number;
  setMethod: Dispatch<SetStateAction<number>>;
  methodError: string;
  boilSize: number;
  setBoilSize: Dispatch<SetStateAction<number>>;
  boilSizeError: string;
  batchSize: number;
  setBatchSize: Dispatch<SetStateAction<number>>;
  batchSizeError: string;
  boilTime: number;
  setBoilTime: Dispatch<SetStateAction<number>>;
  boilTimeError: string;
  efficiency: number;
  setEfficiency: Dispatch<SetStateAction<number>>;
  efficiencyError: string;
}

const BeerInfo: React.SFC<BeerInfoProps> = (props) => {
  return (
    <div className="card beer-info grid two-col">
      <div>
        <TextInput
          className={props.beerNameError}
          label="Beer Name"
          name="beerName"
          onChangeHandler={props.setBeerName}
          value={props.beerName}
        />
        <TextInput
          className={props.authorError}
          label="Author"
          name="author"
          onChangeHandler={props.setAuthor}
          value={props.author}
          hint="Enter your email address (just to email you the link to your brew)"
        />

        <TextInput
          className=""
          label="Style"
          name="style"
          onChangeHandler={props.setStyle}
          value={props.style}
        />

        <Select
          className={props.methodError}
          label="Brew Method"
          name="method"
          options={[
            {name: "---", id: 0},
            {name: "All Grain", id: 1},
            {name: "Extract", id: 2},
          ]}
          value={props.method}
          onChangeHandler={(e) => {
            const target = e.target as HTMLSelectElement;
            const value = parseInt(target.value);
            props.setMethod(value);
          }}
        />
      </div>
      <div>
        <NumberInput
          className={props.boilSizeError}
          label="Boil Size"
          name="boilSize"
          value={props.boilSize}
          onChangeHandler={props.setBoilSize}
          default={6.5}
        />

        <NumberInput
          className={props.batchSizeError}
          label="Batch Size"
          name="batchSize"
          value={props.batchSize}
          onChangeHandler={props.setBatchSize}
          default={5}
        />

        <NumberInput
          className={props.boilTimeError}
          label="Boil Time"
          name="boilTime"
          value={props.boilTime}
          onChangeHandler={props.setBoilTime}
          default={60}
        />

        <NumberInput
          className={props.efficiencyError}
          label="Efficiency"
          name="efficiency"
          value={props.efficiency}
          onChangeHandler={props.setEfficiency}
          default={75}
        />
      </div>
    </div>
  );
};

export default BeerInfo;
