import { $, component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
  const pokemonId = useSignal<number>(1);
  const showBackImage = useSignal<boolean>(false);
  const isPokemonVisible = useSignal<boolean>(false);
  const nav = useNavigate();

  const changePokemonId = $((val: number) => {
    if (pokemonId.value + val <= 0) return;
    pokemonId.value += val;
  });

  const goToPokemon = $((id: number) => nav(`pokemon/${id}`));

  return (
    <>
      <span class="text-3xl">Buscador simple</span>
      <span class="text-6xl">{pokemonId}</span>

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
          onClick$={() => (showBackImage.value = !showBackImage.value)}
          class="btn btn-primary"
        >
          voltear
        </button>
        <button
          onClick$={() => (isPokemonVisible.value = !isPokemonVisible.value)}
          class="btn btn-primary"
        >
          {isPokemonVisible.value ? 'revelar' : 'esconder'}
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
