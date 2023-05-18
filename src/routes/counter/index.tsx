import { component$ } from '@builder.io/qwik';
import { useCounter } from '~/hooks/use-counter';

export default component$(() => {
  const { counter, increment, decrement } = useCounter(20);
  return (
    <>
      <h1 class="text-4xl">Counter</h1>
      <span class="mt-4 text-6xl">{counter.value}</span>

      <div class="mt-4 space-x-2">
        <button
          onClick$={() => decrement()}
          class="btn btn-primary"
        >
          -1
        </button>
        <button
          onClick$={() => increment()}
          class="btn btn-primary"
        >
          +1
        </button>
      </div>
    </>
  );
});
