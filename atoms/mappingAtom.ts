import { atom } from "jotai";

const mappingAtom = atom({
  channelUUid: "",
  localProductId: 0 as number,
  remoteProductId: 0 as number,
  isSmartMappingProductModalOpen: false,
});

export default mappingAtom;
