import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const loc = useLocation();
  const id = loc.params.id;
  return <div>Hello Pokemon Id: {id}</div>;
});
