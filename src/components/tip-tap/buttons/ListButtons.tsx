function ListButtons({ editor }) {
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
  );
}

export default ListButtons;
