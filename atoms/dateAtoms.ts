import { atom } from "jotai";

const rangeDateAtom = atom({
  from: "",
  to: "",
});

const singleDateAtom = atom("");

export { rangeDateAtom, singleDateAtom };
