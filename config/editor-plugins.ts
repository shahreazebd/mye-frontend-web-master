import {
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
} from "@mdxeditor/editor";

export const editorPlugins = [
  headingsPlugin({
    allowedHeadingLevels: [1, 2, 3, 4, 5, 6],
  }),
  listsPlugin(),
  quotePlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "text" }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      css: "CSS",
      text: "Plain Text",
      ts: "TypeScript",
    },
  }),
  markdownShortcutPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin(),
  tablePlugin(),
  diffSourcePlugin(),
];
