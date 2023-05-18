import {
  Slot,
  component$,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import {
  PokemonGameContext,
  type PokemonGameState,
} from './pokemon-game.context';
import {
  PokemonListContext,
  type PokemonListState,
} from './pokemon-list.context';

export const PokemonProvider = component$(() => {
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

  return <Slot />;
});
