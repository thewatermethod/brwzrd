import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {gql} from "@apollo/client";

import "../brew.css";

import secret from "./secret";

interface Brewterface {
  name: string;
  image: string;
  fermentables: [string];
  fermentableAmounts: [number];
  hops: [string];
  hopTypes: [number];
  hopTimes: [number];
  batchSize: number;
  boilTime: number;
  ibus: number;
  method: number;
  notes: string;
  og: number;
  srm: number;
  hex: string;
  style: string;
  others: [string];
  otherAmounts: [number];
  otherTimes: [number];
  yeast: [string];
}

const Brew = () => {
  const [brew, setBrew] = useState<Brewterface | false>(false);

  let {id} = useParams();

  if (!brew) {
    const httpLink = createHttpLink({
      uri: "https://graphql.fauna.com/graphql",
    });

    const authLink = setContext((_, {headers}) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${secret.token}`,
        },
      };
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query {
            findBrewByID(id: ${id}) {
              name
              hex
              boilTime
              batchSize
              method
              srm
              ibus
              og
              hops
              hopTypes
              hopTimes
              fermentables
              fermentableAmounts
              yeast
              others
              otherAmounts
              otherTimes
              notes
              image
            }
          }
        `,
      })
      .then((result) => {
        const brew = result.data.findBrewByID;
        setBrew(brew);
      });
  }

  return (
    <main>
      {brew ? (
        <div>
          <div
            className="masthead"
            style={{
              backgroundImage: `url(${brew.image})`,
            }}>
            <h2>{brew.name}</h2>
          </div>
          <div>
            <p>Batch Size: {brew.batchSize}</p>
            <p>Boil Time: {brew.boilTime}</p>
            <p>Method: {brew.method === 1 ? "Extract" : "All Grain"}</p>
            <p>IBUS: {brew.ibus > 0 ? brew.ibus.toFixed(0) : brew.ibus}</p>
            <p>OG: {brew.og > 0 ? brew.og.toFixed(3) : brew.og}</p>
            <p>
              SRM: {brew.srm ? brew.srm.toFixed(0) : brew.srm}
              <span
                style={{
                  backgroundColor: brew.hex,
                  display: "inline-block",
                  height: "40px",
                  width: "40px",
                }}></span>
            </p>
            <p>{brew.style}</p>
          </div>
          <div>
            <div>
              <h2>Ingredients</h2>
              <table>
                <caption>Fermentables</caption>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amounts</th>
                  </tr>
                </thead>
                <tbody>
                  {brew.fermentables.map((f, i) => {
                    const amount = (brew.fermentableAmounts[i] / 16).toFixed(2);
                    return (
                      <tr>
                        <td>{f}</td>
                        <td>{amount} lbs</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <table>
                <caption>Hops</caption>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Time from end of boil</th>
                  </tr>
                </thead>
                <tbody>
                  {brew.hops.map((h, i) => {
                    const type = brew.hopTypes[i] === 1 ? "Whole" : "Pellet";
                    return (
                      <tr>
                        <td>{h}</td>
                        <td>{type}</td>
                        <td>{brew.hopTimes[i]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <table>
                <caption>Yeast</caption>
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {brew.yeast.map((yeast, i) => {
                    return (
                      <tr>
                        <td key={i}>{yeast}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {brew.others.length > 0 ? (
              <table>
                <caption>Others</caption>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {brew.others.map((o, i) => {
                    return (
                      <tr>
                        <td>{o}</td>
                        <td>{brew.otherAmounts[i]} lbs</td>
                        <td>{brew.otherTimes[i]} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </div>
          {brew.notes !== "<p>Tell me a little about your brew</p>" ? (
            <React.Fragment>
              <h2>Notes</h2>
              <div dangerouslySetInnerHTML={{__html: brew.notes}} />
            </React.Fragment>
          ) : null}
        </div>
      ) : null}
    </main>
  );
};

export default Brew;
