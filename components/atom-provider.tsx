"use client";

import { ReactNode } from "react";
import { Provider } from "jotai";

export default function AtomProvider(props: { children: ReactNode }) {
  return <Provider>{props.children}</Provider>;
}
