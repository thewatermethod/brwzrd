import React, {useState} from "react";
import {Link} from "react-router-dom";

import BeerInfo from "./BeerInfo";
import Fermentables from "./Fermentables";
import Hops from "./Hops";
import Yeast from "./Yeast";
import OtherAdditions from "./OtherAdditions";

import {useOptions} from "./hooks/useOptions";
import {useIBU} from "./hooks/useIBU";
import {useGravity} from "./hooks/useGravity";
import {useSRM} from "./hooks/useSRM";

import {FermentableInterface} from "./interfaces/Fermentable";
import {HopInterface} from "./interfaces/Hop";
import {Option} from "./interfaces/Option";
import {Other} from "./interfaces/Other";
import {BeerNotes} from "./BeerNotes";

function New() {
  /**
   * all the hooks follow
   * todo - at least give serious thought to something like redux, cause this file is starting to feel a bit porky
   */

  /*
   *
   * This is the basic beer info, followed by a useState to drive a CSS error class that will be passed into the component where they live
   * The same pattern follows for fermentables, hops, etc
   *
   * */

  //

  const [success, setSuccess] = useState(false);
  const [id, setId] = useState("");

  // beer info hooks

  const [beerName, setBeerName] = useState<string>("");
  const [beerNameError, setBeerNameError] = useState("");
  const [author, setAuthor] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [style, setStyle] = useState("");
  const [method, setMethod] = useState(0);
  const [methodError, setMethodError] = useState("");
  const [boilSize, setBoilSize] = useState(6.5);
  const [boilSizeError, setBoilSizeError] = useState("");
  const [batchSize, setBatchSize] = useState(5);
  const [batchSizeError, setBatchSizeError] = useState("");
  const [boilTime, setBoilTime] = useState(60);
  const [boilTimeError, setBoilTimeError] = useState("");
  const [efficiency, setEfficiency] = useState(75);
  const [efficiencyError, setEfficiencyError] = useState("");

  // fermentables hooks
  const [fermentables, setFermentables] = useState<FermentableInterface[] | []>(
    []
  );
  const [fermentablesError, setFermentablesError] = useState("");

  // hops hooks
  const [hops, setHops] = useState<HopInterface[] | []>([]);
  const [hopsError, setHopsError] = useState("");

  // yeast hooks
  const [yeast, setYeast] = useState<Option[] | []>([]);
  const [yeastError, setYeastError] = useState("");

  //other additions hooks
  const [activeOther, setActiveOther] = useState(0);
  const [activeOtherAmount, setActiveOtherAmount] = useState(0);
  const [activeOtherTime, setActiveOtherTime] = useState(0);
  const [others, setOthers] = useState<Other[] | []>([]);

  //derived beer info hooks
  const OG = useGravity(fermentables);
  const IBUS = useIBU(hops, OG, boilSize, yeast, fermentables);
  const SRM = useSRM(fermentables, boilSize);

  // these are for the bottom panel
  const [notes, setNotes] = useState("<p>Tell me a little about your brew</p>");
  const [image, setImage] = useState<false | string>(false);

  // fetch data for selects
  const [hopsLoaded, setHopsLoaded] = useState(false);
  const hopsData = useOptions("hops", hopsLoaded, setHopsLoaded);
  const [yeastLoaded, setYeastLoaded] = useState(false);
  const yeastData = useOptions("yeast", yeastLoaded, setYeastLoaded);
  const [fermentablesLoaded, setFermentablesLoaded] = useState(false);
  const fermentablesData = useOptions(
    "fermentable",
    fermentablesLoaded,
    setFermentablesLoaded
  );

  const handleErrors = (brew: any) => {
    // reset all error fields

    setBeerNameError("");
    setAuthorError("");
    setMethodError("");
    setBoilSizeError("");
    setBatchSizeError("");
    setBoilTimeError("");
    setEfficiencyError("");
    setHopsError("");
    setYeastError("");
    setBeerNameError("");
    setAuthorError("");

    // this is a very long regex I found online that matches email strings
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const r = new RegExp(regex);

    if (!r.test(brew.author)) {
      setAuthorError("error");
      return false;

      // handle email error
    }

    if (!brew.method || brew.method === 0) {
      // handle method error
      setMethodError("error");
      return false;
    }

    if (!brew.boilSize || brew.boilSize === "") {
      // handle boilSize error
      setBoilSizeError("error");
      return false;
    }

    if (!brew.batchSize || brew.batchSize === "") {
      // handle boilSize error
      setBatchSizeError("error");
      return false;
    }

    if (!brew.boilTime || brew.boilTime === "") {
      // handle boil time error
      setBoilTimeError("error");
      return false;
    }

    if (!brew.efficiency || brew.efficiency === "") {
      // handle efficiency error
      setEfficiencyError("error");
      return false;
    }

    if (!brew.hops || brew.hops.length === 0) {
      // handle hops error
      setHopsError("error");
      return false;
    }

    if (!brew.yeast || brew.yeast.length === 0) {
      // handle yeast error
      setYeastError("error");
      return false;
    }

    if (!brew.fermentables || brew.fermentables.length === 0) {
      // handle fermentables error
      setFermentablesError("error");
      return false;
    }

    return true;
  };

  const saveBrew = () => {
    const brew = {
      name: beerName,
      author: author,
      style: style,
      method: method,
      boilSize: boilSize,
      boilTime: boilTime,
      batchSize: batchSize,
      efficiency: efficiency,
      hops: hops,
      yeast: yeast,
      fermentables: fermentables,
      others: others,
      og: OG,
      srm: SRM,
      ibus: IBUS,
      notes: notes,
      image: image,
    };

    const proceed = handleErrors(brew);

    if (!proceed) {
      return;
    }

    //todo -> this needs to be moved into Netlify functions
    fetch(`http://localhost:3001/save`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brew),
    })
      .then((res) => {
        if (res.status === 200) {
          //handle success

          return res.json();
        }
      })
      .then((json) => {
        console.log(json.ref);
        setSuccess(true);
        setId(json.ref["@ref"].id);
      });
  };

  return (
    <main>
      {success ? (
        <div>
          <Link to={`/brew/${id}`}>View your new brew</Link>
        </div>
      ) : (
        <React.Fragment>
          {/* Derived info that will show the beer's color, ibus, etc*/}
          <div className="card derived-info">
            <span>OG: {OG.toFixed(3)}</span> |{" "}
            <span>
              IBU: {IBUS.toFixed(0)} | SRM:{" "}
              <span
                className="srm-preview"
                style={{
                  backgroundColor: SRM.hex,
                  display: "inline-block",
                  height: "20px",
                  marginRight: "4px",
                  width: "20px",
                }}
              />
              {SRM.srm.toFixed(0)}
            </span>
          </div>

          {/* nuts and bolts info of the beer */}
          <BeerInfo
            beerName={beerName}
            setBeerName={setBeerName}
            author={author}
            setAuthor={setAuthor}
            style={style}
            setStyle={setStyle}
            method={method}
            setMethod={setMethod}
            boilSize={boilSize}
            setBoilSize={setBoilSize}
            batchSize={batchSize}
            setBatchSize={setBatchSize}
            boilTime={boilTime}
            setBoilTime={setBoilTime}
            efficiency={efficiency}
            setEfficiency={setEfficiency}
            beerNameError={beerNameError}
            authorError={authorError}
            methodError={methodError}
            boilSizeError={boilSizeError}
            batchSizeError={batchSizeError}
            boilTimeError={boilTimeError}
            efficiencyError={efficiencyError}
          />

          <div className="grid two-col">
            {/* all the fermentables (mainly barley malt*/}
            <Fermentables
              fermentables={fermentables}
              setFermentables={setFermentables}
              data={fermentablesData}
              fermentablesError={fermentablesError}
            />

            {/* all the hops */}
            <Hops
              hops={hops}
              setHops={setHops}
              data={hopsData}
              hopsError={hopsError}
            />

            {/* the yeast*/}
            <Yeast
              yeast={yeast}
              setYeast={setYeast}
              data={yeastData}
              yeastError={yeastError}
            />

            {/* other ingredients */}
            <OtherAdditions
              activeOther={activeOther}
              setActiveOther={setActiveOther}
              activeOtherAmount={activeOtherAmount}
              setActiveOtherAmount={setActiveOtherAmount}
              activeOtherTime={activeOtherTime}
              setActiveOtherTime={setActiveOtherTime}
              others={others}
              setOthers={setOthers}
            />
          </div>

          <BeerNotes
            image={image}
            setImage={setImage}
            notes={notes}
            setNotes={setNotes}
          />

          <button onClick={saveBrew}>Save brew</button>
        </React.Fragment>
      )}
    </main>
  );
}

export default New;
