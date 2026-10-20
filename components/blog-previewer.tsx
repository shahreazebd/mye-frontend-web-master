"use client";

import { MDXEditor } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import "@/styles/mdx-editor-overrides.css";
import { editorPlugins } from "@/config/editor-plugins";

export function BlogPreviewer({ content }: { content: string }) {
  return <MDXEditor plugins={editorPlugins} markdown={content} readOnly />;
}
