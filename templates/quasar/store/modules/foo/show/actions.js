import { retrieveCommon, resetCommon } from '@gen/common/store/show/actions';
import { ENTRYPOINT } from "@gen/config/{{{hashEntry}}}_entrypoint";

export default function(types) {
  const retrieve = (context, id) => retrieveCommon(context, { id, ep: ENTRYPOINT }, { types });

  const reset = context => {
    resetCommon(context, { types });
  };

  return { retrieve, reset };
}
