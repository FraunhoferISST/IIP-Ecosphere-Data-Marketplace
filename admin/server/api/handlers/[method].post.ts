import { useBody } from "h3";
import handlers from "~/server/graphql";

export default defineEventHandler(async (event): Promise<unknown> => {
  const body = await useBody(event);
  const method = event.context.params.method;
  if (!(method in handlers)) {
    throw Error(`Handler for method "${method}" not implemented!`);
  }
  return handlers[method](event, body ?? {}).catch((e) => {
    // TODO: format error
    console.error(e);
    throw Error(
      e?.message ?? e.errors[0]?.message ?? e.errors?.message ?? e?.errors
    );
  });
});
