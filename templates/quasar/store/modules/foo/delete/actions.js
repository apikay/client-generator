import { delCommon, resetCommon } from '@gen/common/store/delete/actions';
import { ENTRYPOINT } from "@gen/config/{{{hashEntry}}}_entrypoint";

export default function(types) {
  const del = (context, item) => delCommon(context, { item, ep: ENTRYPOINT }, { types });
  const reset = context => {
    resetCommon(context, { types });
  };

  return { del, reset };
}
