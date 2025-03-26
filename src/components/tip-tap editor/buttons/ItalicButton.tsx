import React from "react";

function ItalicButton({ editor }) {
  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        gap: 10, // Space between buttons
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
      }}
    >
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
    </div>
  );
}

export default ItalicButton;
