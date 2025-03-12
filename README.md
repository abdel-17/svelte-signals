# Svelte Signals

Svelte Signals is a simple library that wraps Svelte runes with functions.

```svelte
<script>
    import { createState } from "svelte-signals";

    const [count, setCount] = createState(0);

    function increment() {
        setCount(count() + 1);
    }
</script>

<button onclick={increment}>
    You clicked {count()} times
</button>
```

The advantage to this approach is that you can pass the values around without
worrying about losing reactivity, but it does force everything to go through
a function call, rather than treating reactive values as normal variables.

## Installation

```bash
npm install svelte-signals
```

## Usage

### `createState`

Creates deeply reactive state.

```ts
import { createState } from "svelte-signals";

const [items, setItems] = createState<string[]>([]);

function addItem(item: string) {
    items().push(item);
}

function clearItems() {
    setItems([]);
}
```

### `createRawState`

Creates state that is _not_ made deeply reactive — instead of mutating it,
you must set it.

```ts
import { createRawState } from "svelte-signals";

const [items, setItems] = createRawState<string[]>([]);

function addItem(item: string) {
    setItems([...items(), item]);
}
```

### `createDerived`

Creates derived state, i.e. one that depends on other state variables.
The given function should be free of side-effects.

```ts
import { createDerived } from "svelte-signals";

const [count, setCount] = createState(0);
const double = createDerived(() => count() * 2);
```
