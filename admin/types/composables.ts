import type { ComputedRef, Ref } from "@vue/runtime-core";

export interface UseAsyncState<Arg = void, Response = void> {
  loading: Ref<boolean>;
  error: Ref<unknown | null>;
  execute(arg: Arg): Promise<Response>;
}

export interface ComposableLoad<Query> {
  (data?: Query): Promise<void>;
}
export interface ComposableUpdate<EntityData> {
  (data: EntityData): Promise<void>;
}
export interface ComposableCreate<EntityData> {
  (data: EntityData): Promise<void>;
}
export interface ComposableDelete {
  (id?: string): Promise<void>;
}

export interface ComposableLoadingState {
  load: boolean;
  update: boolean;
  create: boolean;
  delete: boolean;
  [propName: string]: boolean;
}

export interface ComposableError {
  load: object;
  update: object;
  create: object;
  delete: object;
  [propName: string]: object;
}

export interface Composable<Entity> {
  load: ComposableLoad<Entity>;
  update: ComposableUpdate<Entity>;
  create: ComposableCreate<Entity>;
  loading: ComputedRef<ComposableLoadingState>;
  error: ComputedRef<ComposableError>;
}
