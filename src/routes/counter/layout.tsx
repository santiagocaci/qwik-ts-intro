import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="mt-10 flex flex-col items-center justify-center">
      <Slot />
      <Link
        class="mt-10 hover:underline"
        href="/"
      >
        Regresar
      </Link>
    </div>
  );
});
