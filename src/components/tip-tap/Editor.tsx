import React, { useState } from "react";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { VariableExtension } from "./VariableExtension";
import { Variables } from "./VariableSuggestion";
import "../../styles.css";
import Bold from "@tiptap/extension-bold";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";

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
    content: `<p>This isn’t bold.</p>
<p>Type {{ to insert a variable...</p>`,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const match = text.match(/\{\{(\w*)$/);
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
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Toggle bold
        </button>
        <button
          onClick={() => editor.chain().focus().setBold().run()}
          disabled={editor.isActive("bold")}
        >
          Set bold
        </button>
        <button
          onClick={() => editor.chain().focus().unsetBold().run()}
          disabled={!editor.isActive("bold")}
        >
          Unset bold
        </button>

        <button
          onClick={() => editor.chain().focus().setItalic().run()}
          disabled={editor.isActive("italic")}
        >
          Set italic
        </button>
        <button
          onClick={() => editor.chain().focus().unsetItalic().run()}
          disabled={!editor.isActive("italic")}
        >
          Unset italic
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Toggle bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Toggle ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().splitListItem("listItem").run()}
          disabled={!editor.can().splitListItem("listItem")}
        >
          Split list item
        </button>
        <button
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
          disabled={!editor.can().sinkListItem("listItem")}
        >
          Sink list item
        </button>
        <button
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
          disabled={!editor.can().liftListItem("listItem")}
        >
          Lift list item
        </button>
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
