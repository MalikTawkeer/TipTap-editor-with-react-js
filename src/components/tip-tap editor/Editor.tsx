import { useState, useRef, useCallback } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";

import { VariableExtension } from "./VariableExtension";
import { Variables } from "./VariableSuggestion";

import BoldButton from "./buttons/BoldButton";
import ItalicButton from "./buttons/ItalicButton";
import HeadingButtons from "./buttons/HeadingButtons";
import ListButtons from "./buttons/ListButtons";

import "../../styles.css";

// Variable Popup Component
const VariablePopup = ({ show, position, variables, onInsert }) => {
  if (!show) return null;

  return (
    <div
      className="variable-popup"
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        background: "white",
        border: "1px solid #ccc",
        padding: "5px",
        zIndex: 10,
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "5px",
      }}
    >
      {variables.map((variable) => (
        <div
          key={variable.id}
          className="variable-item"
          onClick={() => onInsert(variable.label)}
          style={{
            padding: "5px",
            cursor: "pointer",
            borderBottom: "1px solid #ddd",
          }}
        >
          {variable.label}
        </div>
      ))}
    </div>
  );
};

const Editor = () => {
  const editorRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit,
      VariableExtension,
      Bold,
      Heading.configure({ levels: [1, 2, 3] }),
      Paragraph,
      ListItem,
    ],
    content: `<p>Write something...</p>`,
    onUpdate: useCallback(({ editor }) => {
      const text = editor.getText();
      const match = text.lastIndexOf("{{");

      if (match !== -1) {
        const pos = match + 1;
        const { top, left } = editor.view.coordsAtPos(pos);
        const editorRect = editorRef.current?.getBoundingClientRect();

        if (editorRect) {
          setPopupPosition({
            top: Math.min(top - editorRect.top + 30, editorRect.height - 50),
            left: Math.min(left - editorRect.left + 10, editorRect.width - 150),
          });
        }
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    }, []),
  });

  const insertVariable = useCallback(
    (label) => {
      editor?.commands.insertVariable(label);
      setShowPopup(false);
    },
    [editor]
  );

  return (
    <div
      ref={editorRef}
      className="editor-container"
      style={{ position: "relative" }}
    >
      <div className="button-group">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BoldButton editor={editor} />
          <ItalicButton editor={editor} />
        </div>
        <HeadingButtons editor={editor} />
        <ListButtons editor={editor} />
      </div>

      <EditorContent editor={editor} />

      <VariablePopup
        show={showPopup}
        position={popupPosition}
        variables={Variables}
        onInsert={insertVariable}
      />
    </div>
  );
};

export default Editor;
