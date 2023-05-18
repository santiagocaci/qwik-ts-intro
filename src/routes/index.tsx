import { $, component$ } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export default component$(() => {
  const nav = useNavigate();
  const {
    // props
    showBackImage,
    isPokemonVisible,
    pokemonId,
    // functions
    nextPokemon,
    prevPokemon,
    toggleVisible,
    changeFromBack,
  } = usePokemonGame();

  const goToPokemon = $((id: number) => nav(`pokemon/${id}`));

  return (
    <>
      <span class="text-3xl">Buscador simple</span>
      <span class="text-6xl">{pokemonId.value}</span>

      <div onClick$={() => goToPokemon(pokemonId.value)}>
        <PokemonImage
          id={pokemonId.value}
          isBack={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <button
          disabled={pokemonId.value <= 1}
          onClick$={() => prevPokemon()}
          class="btn btn-primary"
        >
          anterior
        </button>
        <button
          onClick$={() => nextPokemon()}
          class="btn btn-primary"
        >
          siguientes
        </button>
        <button
          onClick$={changeFromBack}
          class="btn btn-primary"
        >
          voltear
        </button>
        <button
          onClick$={toggleVisible}
          class="btn btn-primary"
        >
          {isPokemonVisible.value ? 'esconder' : 'revelar'}
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'My first Qwik App!',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
