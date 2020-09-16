import React from "react";
import {Link} from "react-router-dom";
import CSS from "csstype";

import "../css/preview.css";

export interface PreviewProps {
  _id: string;
  name: string;
  image: string;
  style: string;
}

const Preview: React.SFC<PreviewProps> = (props) => {
  let previewClass = "preview";
  const stylings: CSS.Properties = {
    backgroundColor: "lightsteelblue",
  };

  if (props.image !== "") {
    stylings.backgroundImage = `url(${props.image})`;
    previewClass = "preview has-image";
  }

  return (
    <article className={previewClass} style={stylings}>
      <Link to={`/brew/${props._id}`}>
        <h3>{props.name}</h3>
      </Link>
      <p>{props.style}</p>
    </article>
  );
};

export default Preview;
