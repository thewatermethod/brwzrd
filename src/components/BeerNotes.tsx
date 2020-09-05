import React, {useCallback, Dispatch, SetStateAction} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {useDropzone} from "react-dropzone";
import axios from "axios";
import Upload from "../components/bare/Upload";

interface FileWithPath extends File {
  path?: string;
}

interface BeerNotesProps {
  image: string | false;
  setImage: Dispatch<SetStateAction<string | false>>;
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
}

const BeerNotes: React.SFC<BeerNotesProps> = (props) => {
  const {image, setImage, notes, setNotes} = props;

  const handleEditorChange = (content: string) => {
    setNotes(content);
  };

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];

      let formData = new FormData();
      formData.append("image", file);

      axios
        .post(`http://localhost:3001/upload`, formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          setImage(res.data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [setImage]
  );
  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <div className="card brew-settings">
      <label htmlFor="brew-notes">Notes about your brew</label>
      <Editor
        initialValue={notes}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],

          toolbar:
            // eslint-disable-next-line
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={handleEditorChange}
      />

      <Upload image={props.image} setImage={props.setImage} />
    </div>
  );
};

export {BeerNotes};
