import { textAnimation } from "./mod.ts";
const _ta = new textAnimation();

await _ta.count(10, 100);
await _ta.count(10, 100, "Hello World");

await _ta.bar(10, 100);
await _ta.bar(10, 100, "Love you");

console.log("Displaying bar with listener");
_ta.barWithListener(10, "bar", "Love you");
await sleep();
_ta.next("bar")
await sleep();
await sleep();
_ta.next("bar")
await sleep();
_ta.forceEnd("bar");

async function sleep() {
    //sleep 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
}

