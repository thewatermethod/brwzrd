import React, {useState} from "react";
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {gql} from "@apollo/client";

import Preview, {PreviewProps} from "./Preview";
import "../css/landing.css";

const Landing: React.SFC<{darkMode: boolean}> = (props) => {
  const [previews, setPreviews] = useState<PreviewProps[] | false>(false);

  if (!previews) {
    const httpLink = createHttpLink({
      uri: "https://graphql.fauna.com/graphql",
    });

    const authLink = setContext((_, {headers}) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${process.env.REACT_APP_FAUNA}`,
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
            LastThreeBrews(_size: 3) {
              data {
                _id
                name
                image
                style
              }
            }
          }
        `,
      })
      .then((result) => {
        //console.log(result.data.LastThreeBrews.data);
        setPreviews(result.data.LastThreeBrews.data);
      });
  }

  return (
    <main className="landing-main">
      <h2>Recent Brews</h2>
      <div className="previews">
        {previews
          ? previews.map((preview: PreviewProps) => {
              return (
                <Preview
                  key={preview._id}
                  name={preview.name}
                  _id={preview._id}
                  image={preview.image}
                  style={preview.style}
                />
              );
            })
          : null}
      </div>
    </main>
  );
};

export default Landing;
