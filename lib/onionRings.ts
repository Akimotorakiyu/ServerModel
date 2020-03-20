type Middleware<T> = (ctx: T, next: () => void) => Promise<void>;

export default function onionRings<T>(middleware: Middleware<T>[]) {
  return (ctx: T) => {
    let index = 0;

    async function theNext(deep: number) {
      const fn = middleware[deep];
      if (fn) await fn(ctx, theNext.bind(null, ++index));
    }

    return theNext(index);
  };
}
