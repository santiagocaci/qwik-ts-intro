import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) redirect(301, '/');
  if (id <= 0) redirect(301, '/');
  if (id > 1000) redirect(301, '/');
  return id;
});

export default component$(() => {
  const pokemonId = usePokemonId();
  // const loc = useLocation();
  // const id = loc.params.id;
  return (
    <>
      <div>Hello Pokemon Id: {pokemonId}</div>
      <PokemonImage id={pokemonId.value} />
    </>
  );
});
