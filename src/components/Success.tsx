import React from "react";
import {Link} from "react-router-dom";

import "../css/success.css";

interface SuccessProps {
  id: string;
}

const Success: React.SFC<SuccessProps> = (props) => {
  return (
    <div className="success-message">
      <p>Congrats! You are THE brewmaster.</p>
      <nav>
        <Link to={`/brew/${props.id}`}>The link to your new brew</Link>
      </nav>
      <p>
        <small>(Hopefully, you've gotten an email as well)</small>
      </p>
    </div>
  );
};

export default Success;
