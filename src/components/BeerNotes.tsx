import React, {Dispatch, SetStateAction} from "react";
import {Editor} from "@tinymce/tinymce-react";
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

      <Upload image={image} setImage={setImage} />
    </div>
  );
};

export {BeerNotes};
