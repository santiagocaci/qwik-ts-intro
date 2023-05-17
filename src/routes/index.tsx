import { $, component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';

import { PokemonGameContext } from '~/context';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
  const nav = useNavigate();
  const pokemonGame = useContext(PokemonGameContext);
  // const pokemonId = useSignal<number>(1);
  // const showBackImage = useSignal<boolean>(false);
  // const isPokemonVisible = useSignal<boolean>(false);

  const changePokemonId = $((val: number) => {
    if (pokemonGame.pokemonId + val <= 0) return;
    pokemonGame.pokemonId += val;
  });

  const goToPokemon = $((id: number) => nav(`pokemon/${id}`));

  return (
    <>
      <span class="text-3xl">Buscador simple</span>
      <span class="text-6xl">{pokemonGame.pokemonId}</span>

      <div onClick$={() => goToPokemon(pokemonGame.pokemonId)}>
        <PokemonImage
          id={pokemonGame.pokemonId}
          isBack={pokemonGame.showBackImage}
          isVisible={pokemonGame.isPokemonVisible}
        />
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <button
          disabled={pokemonGame.pokemonId <= 1}
          onClick$={() => changePokemonId(-1)}
          class="btn btn-primary"
        >
          anterior
        </button>
        <button
          onClick$={() => changePokemonId(+1)}
          class="btn btn-primary"
        >
          siguientes
        </button>
        <button
          onClick$={() =>
            (pokemonGame.showBackImage = !pokemonGame.showBackImage)
          }
          class="btn btn-primary"
        >
          voltear
        </button>
        <button
          onClick$={() =>
            (pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible)
          }
          class="btn btn-primary"
        >
          {pokemonGame.isPokemonVisible ? 'esconder' : 'revelar'}
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
