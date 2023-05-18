import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
} from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { PokemonGameContext, PokemonListContext } from '~/context';
import type { PokemonGameState, PokemonListState } from '~/context';
import Navbar from '~/components/shared/navbar/navbar';
import Footer from '~/components/shared/footer/footer';

import styles from './styles.css?inline';
// import { PokemonListContext } from '~/context/pokemon/pokemon-list.context';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);

  // Context //
  const pokemonGame = useStore<PokemonGameState>({
    isPokemonVisible: true,
    pokemonId: 4,
    showBackImage: false,
  });
  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });
  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);
  // END Context

  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
