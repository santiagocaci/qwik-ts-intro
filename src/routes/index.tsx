import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <span class="text-5xl">Hello Qwik!</span>
    </>
  );
});

export const head: DocumentHead = {
  title: "My first Qwik App!",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
