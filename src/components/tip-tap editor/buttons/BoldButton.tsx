function BoldButton({ editor }) {
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
    </div>
  );
}

export default BoldButton;
