import {
  $,
  component$,
  useContext,
  useOnDocument,
  // useStore,
  useTask$,
} from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';

import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
// import type { SmallPokemon } from '~/types';

// interface PokemonPageState {
//   currentPage: number;
//   pokemons: SmallPokemon[];
//   isLoading: boolean;
// }

export default component$(() => {
  //* Se cambio useStore por un useContext
  // const pokemonState = useStore<PokemonPageState>({
  //   currentPage: 0,
  //   pokemons: [],
  //   // si usara useVisibleTask$ tendria que setearlo en false
  //   isLoading: false,
  // });

  const pokemonListContext = useContext(PokemonListContext);

  //* Se ejecuta solo desp de que el component fue creado
  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);
  //   const pokemons = await getSmallPokemons({
  //     offset: pokemonState.currentPage * 10,
  //   });
  //   pokemonState.pokemons = pokemons;
  // });

  //* Se ejecuta una vez antes de que el componente sea creado y desp tmb
  useTask$(async ({ track }) => {
    track(() => pokemonListContext.currentPage);

    pokemonListContext.isLoading = true;

    const pokemons = await getSmallPokemons({
      offset: pokemonListContext.currentPage * 10,
      limit: 20,
    });
    pokemonListContext.pokemons = [...pokemonListContext.pokemons, ...pokemons];

    pokemonListContext.isLoading = false;
  });
  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      if (currentScroll + 50 >= maxScroll && !pokemonListContext.isLoading) {
        pokemonListContext.isLoading = true;
        pokemonListContext.currentPage++;
      }
    })
  );

  return (
    <>
      <div class="flex flex-col items-center gap-2">
        <span class="my-5 text-4xl">Status</span>
        <span>Pagina actual: {pokemonListContext.currentPage}</span>
        <span>Cargando pagina: </span>
      </div>
      <div class="mt-10 space-x-3">
        {/* <button
          onClick$={() => pokemonState.currentPage--}
          class="btn btn-primary cursor-pointer"
        >
          Anteriores
        </button>
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary cursor-pointer"
        >
          Siguientes
        </button> */}
      </div>

      <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {pokemonListContext.pokemons.map(pokemon => (
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
  title: 'Client - List',
};
