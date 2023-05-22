import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import styles from './styles.css?inline';

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

  return <Slot />;
});
