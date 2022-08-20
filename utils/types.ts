export type OptionalFieldsOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;

export type OptionalOf<T extends object> = Pick<T, OptionalFieldsOf<T>>;
