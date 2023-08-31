import { readBody } from "h3";
import handlers from "~/server/graphql";

export default defineEventHandler(async (event): Promise<unknown> => {
  const body = await readBody(event);
  const method: string = event.context.params.method;
  if (!(method in handlers)) {
    throw Error(`Handler for method "${method}" not implemented!`);
  }
  return handlers[method](event, body ?? {}).catch((e: any) => {
    // TODO: format error
    console.error(e);
    return {
      error: {
        stack: e,
        message: e?.message ?? e.errors[0]?.message ?? e.errors?.message ?? e?.errors
      }
    }
  });
});
