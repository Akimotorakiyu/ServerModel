type Middleware<T> = (ctx: T, next: () => Promise<void>) => Promise<void>;

export default function onionRings<T>(middleware: Middleware<T>[]) {
  async function theNext(ref: { ctx: T; index: number }) {
    const fn = middleware[ref.index++];
    if (fn)
      await fn(ref.ctx, () => {
        return theNext(ref);
      });
  }

  return (ctx: T) => {
    return theNext({
      ctx,
      index: 0
    });
  };
}
