import React, {Dispatch, SetStateAction} from "react";

import "../../css/upload.css";

interface UploadProps {
  image: string | false;
  setImage: Dispatch<SetStateAction<string | false>>;
}

interface Result {
  event: string;
  info: {url: string | false};
}

const Upload: React.SFC<UploadProps> = (props) => {
  // @ts-ignore we ignore the next line to avoid overriding the window global in any way
  const uploadWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.REACT_APP_CLOUD,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
    },
    (error: String, result: Result) => {
      if (!error && result && result.event === "success") {
        if (result.info.url) {
          props.setImage(result.info.url);
        }
      }
    }
  );

  function openWidget() {
    uploadWidget.open();
  }

  return (
    <button className="upload-widget" onClick={openWidget}>
      {props.image ? (
        <img
          src={props.image}
          alt="your label"
          style={{display: "block", margin: "1em auto", maxWidth: "67%"}}
        />
      ) : (
        <p>Click to add label art</p>
      )}
    </button>
  );
};

export default Upload;
