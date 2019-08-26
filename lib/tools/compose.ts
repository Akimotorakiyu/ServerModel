export default function (middleware: any[]) {
    return function (ctx: any) {
        let index = 0;
        async function theNext(deep: number) {
            console.log("go next", index)
            let fn = middleware[deep];
            console.log("fn", fn)
            if (!fn) {
                return
            }
            await fn(ctx, theNext.bind(null, ++index));
        }
        console.log("runing")
        return theNext(index);
    }
}