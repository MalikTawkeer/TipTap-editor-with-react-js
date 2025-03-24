import { Node } from "@tiptap/core";

export const VariableExtension = Node.create({
  name: "variable",
  group: "inline",
  inline: true,
  selectable: false,

  addAttributes() {
    return {
      label: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: "span.variable-token" }];
  },

  renderHTML({ node }) {
    return [
      "span",
      { class: "variable-token" },
      `{{${node.attrs.label}}}`,
    ];
  },

  addCommands() {
    return {
      insertVariable:
        (label: string) =>
        ({ chain }) => {
          return chain()
            .focus()
            .insertContent([
              {
                type: "variable",
                attrs: { label },
              },
              { type: "text", text: " " },
            ])
            .run();
        },
    };
  },
});
