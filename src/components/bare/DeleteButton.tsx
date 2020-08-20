import React from "react";

interface DeleteButtonProps {
  handler: (e?: any) => void;
  visible: string;
  invisible: string;
}

const DeleteButton: React.SFC<DeleteButtonProps> = (props) => {
  return (
    <button onClick={props.handler}>
      <span aria-hidden="true">{props.visible}</span>
      <span className="screen-reader-text">{props.invisible}</span>
    </button>
  );
};

export {DeleteButton};
