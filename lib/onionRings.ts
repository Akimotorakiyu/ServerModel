export type Middleware<T> = (
  ctx: T,
  next: () => Promise<void>
) => Promise<void>;

async function theNext<T>(ref: {
  ctx: T;
  index: number;
  middleware: Middleware<T>[];
}) {
  const fn = ref.middleware[ref.index++];
  if (fn)
    await fn(ref.ctx, () => {
      return theNext(ref);
    });
}

export default function onionRings<T>(middleware: Middleware<T>[]) {
  return (ctx: T) => {
    return theNext({
      ctx,
      index: 0,
      middleware
    });
  };
}
