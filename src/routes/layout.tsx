import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
} from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { type PokemonGameState, PokemonGameContext } from '~/context';
import Navbar from '~/components/shared/navbar/navbar';
import Footer from '~/components/shared/footer/footer';

import styles from './styles.css?inline';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  const pokemonGame = useStore<PokemonGameState>({
    isPokemonVisible: true,
    pokemonId: 4,
    showBackImage: false,
  });
  useContextProvider(PokemonGameContext, pokemonGame);
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
