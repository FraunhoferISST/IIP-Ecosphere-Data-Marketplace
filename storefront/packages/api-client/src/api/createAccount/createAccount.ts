import createAccountMutation from "./createAccountMutation";

export const createAccount = async (context: Record<any, any>, params: Record<any, any>): Promise<void> =>
  context.client.mutate({
    mutation: createAccountMutation,
    variables: params,
  });
