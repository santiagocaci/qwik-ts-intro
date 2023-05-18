import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Navbar from '~/components/shared/navbar/navbar';
import Footer from '~/components/shared/footer/footer';

import styles from './styles.css?inline';
import { PokemonProvider } from '~/context';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);

  //* Se cambio por un PokemonProvider para sacar la logica del layout
  // // Context //
  // const pokemonGame = useStore<PokemonGameState>({
  //   isPokemonVisible: true,
  //   pokemonId: 4,
  //   showBackImage: false,
  // });
  // const pokemonList = useStore<PokemonListState>({
  //   currentPage: 0,
  //   isLoading: false,
  //   pokemons: [],
  // });
  // useContextProvider(PokemonGameContext, pokemonGame);
  // useContextProvider(PokemonListContext, pokemonList);
  // // END Context

  return (
    <PokemonProvider>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
      <Footer />
    </PokemonProvider>
  );
});
