import { useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import "../../styles.css";

import { VariableExtension } from "./VariableExtension";
import { Variables } from "./VariableSuggestion";
import Bold from "@tiptap/extension-bold";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BoldButton from "./buttons/BoldButton";
import ItalicButton from "./buttons/ItalicButton";
import HeadingButtons from "./buttons/HeadingButtons";
import ListButtons from "./buttons/ListButtons";

const Editor = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [filteredVars, setFilteredVars] = useState(Variables);

  const editor = useEditor({
    extensions: [
      StarterKit,
      VariableExtension,
      Bold,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Paragraph,
      ListItem,
    ],
    content: `<p>Write somthing...</p>
         
    <p>Type {{ to insert a variable...</p>`,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const match = text.match(/{{\s*([\w]*)$/);

      if (match) {
        setShowPopup(true);
        setFilteredVars(
          Variables.filter((v) =>
            v.label.toLowerCase().includes(match[1].toLowerCase())
          )
        );
      } else {
        setShowPopup(false);
      }
    },
  });

  const insertVariable = (label: string) => {
    editor?.commands.insertVariable(label);
    setShowPopup(false);
  };

  return (
    <div className="editor-container">
      <div className="button-group">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BoldButton editor={editor} />
          <ItalicButton editor={editor} />
        </div>

        <HeadingButtons editor={editor} />

        <ListButtons editor={editor} />
      </div>

      <EditorContent editor={editor} />

      {showPopup && (
        <div className="variable-popup">
          {filteredVars.map((variable) => (
            <div
              key={variable.id}
              className="variable-item"
              onClick={() => insertVariable(variable.label)}
            >
              {variable.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Editor;
