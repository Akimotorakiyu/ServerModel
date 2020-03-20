type Middleware<T> = (ctx: T, next: () => void) => Promise<void>;

export default function onionRings<T>(middleware: Middleware<T>[]) {
  return (ctx: T) => {
    let index = 0;

    async function theNext() {
      const fn = middleware[index++];
      if (fn) await fn(ctx, theNext);
    }

    return theNext();
  };
}
