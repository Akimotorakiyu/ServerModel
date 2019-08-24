import tsKoa from "../lib/index"

const app = new tsKoa({ port: "8080" });

app.listen("8080", () => {
    console.log("tsKoa serveing...")
})