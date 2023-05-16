import { component$, useComputed$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/types';

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset') || '0');

    if (offset < 0 || isNaN(offset)) redirect(301, pathname);

    const pokemons = await getSmallPokemons({ offset });
    return pokemons;
  }
);

export default component$(() => {
  const location = useLocation();
  const pokemons = usePokemonList();
  // console.log(pokemons);

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search);
    const offsetNumber = Number(offsetString.get('offset'));

    return offsetNumber;
  });

  return (
    <>
      <div class="flex flex-col items-center gap-2">
        <span class="my-5 text-4xl">Status</span>
        <span>Pagina actual: {currentOffset.value}</span>
        <span>Cargando pagina: {location.isNavigating ? 'si' : 'no'}</span>
      </div>
      <div class="mt-10 space-x-3">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary cursor-pointer"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary cursor-pointer"
        >
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-1 mt-10 gap-4 sm:grid-cols-2 md:grid-cols-5">
        {pokemons.value.map(pokemon => (
          <div
            class="text-center capitalize"
            key={pokemon.name}
          >
            <PokemonImage id={Number(pokemon.id)} />
            {pokemon.name}
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'SSR - List',
};
