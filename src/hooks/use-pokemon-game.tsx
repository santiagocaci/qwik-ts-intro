import { $, useComputed$, useContext } from '@builder.io/qwik';

import { PokemonGameContext } from '~/context';

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((val: number) => {
    if (pokemonGame.pokemonId + val <= 0) return;
    pokemonGame.pokemonId += val;
  });

  const changeFromBack = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage;
  });
  const toggleVisible = $(() => {
    pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
  });

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),

    nextPokemon: $(() => changePokemonId(1)),
    prevPokemon: $(() => changePokemonId(-1)),

    changeFromBack,
    toggleVisible,
  };
};
