# bar

Create bar with deno

# Use
```ts
import { textAnimation } from "https://deno.land/x/bar/mod.ts";
const _ta = new textAnimation();
```

## Counter
### Only counter
count 1-10 | interval : 100ms
```ts
await _ta.count(10, 100);
```

### Counter + Text
count 1-10 | interval : 100ms | Text: Hello World
```ts
await _ta.count(10, 100, "Hello World");
```

## Bar

## Simple bar: 
count 1-10 | interval : 100ms
```ts
await _ta.bar(10, 100);
```
## Bar + text
count 1-10 | interval : 100ms | Text: Love you
```ts
_ta.barWithListener(10, "bar", "Love you");
```

## Bar dynamic
This bar is a progess bar where your can call the "next" step yourself. This bar support Pre-text integration<br>
count: 10 | barName | Text
```ts
_ta.barWithListener(10, "bar", "Love you");
```
> DO NOT USE AWAIT FOR THIS BAR !

Ok so at this step we have a 10 sections empty bar, now we wanna enable next point:
```ts
_ta.next("bar")
[.. Do something instresting]
_ta.next("bar")
[..]
```
AND NOW 10 is to much and you need to end this bar, use: 
```ts
_ta.forceEnd("bar");
```


# Thanks
Alice :3




