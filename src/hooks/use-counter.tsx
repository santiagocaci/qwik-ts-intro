import { $, useComputed$, useSignal } from '@builder.io/qwik';

export const useCounter = (initialValue = 0) => {
  const counter = useSignal<number>(initialValue);

  const increment = $(() => {
    counter.value++;
  });

  const decrement = $(() => {
    counter.value--;
  });
  return { counter: useComputed$(() => counter.value), increment, decrement };
};
