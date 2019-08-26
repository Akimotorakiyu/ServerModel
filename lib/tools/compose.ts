export default function (middleware: any[]) {
    return function (ctx: any) {
        let index = 0;
        async function theNext(deep: number) {
            let fn = middleware[deep];
            // if (!fn) {
            //     return
            // }
            // await fn(ctx, theNext.bind(null, ++index));
            fn ? await fn(ctx, theNext.bind(null, ++index)) : "";
        }
        return theNext(index);
    }
}