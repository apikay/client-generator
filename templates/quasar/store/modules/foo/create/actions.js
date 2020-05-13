import { createCommon, resetCommon } from '@gen/common/store/create/actions';
import { ENTRYPOINT } from "@gen/config/{{{hashEntry}}}_entrypoint";

const page = '{{{name}}}';

export default function(types) {
  const create = (context, values) =>
    createCommon(context, { page, values, ep: ENTRYPOINT }, { types });

  const reset = context => resetCommon(context, { types });

  return { create, reset };
}
