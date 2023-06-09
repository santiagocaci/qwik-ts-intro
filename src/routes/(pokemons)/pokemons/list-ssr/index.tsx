import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  // useVisibleTask$,
} from '@builder.io/qwik';
import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared/modal/modal';
import { getFunFactAboutPokemon } from '~/helpers/get-chat-gpt-response';

import { getSmallPokemons } from '~/helpers/get-small-pokemons';

import type { SmallPokemon } from '~/types';

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset') || '0');

    if (offset < 0 || isNaN(offset)) redirect(301, pathname);

    const pokemons = await getSmallPokemons({ offset });
    return pokemons;
  }
);

export default component$(() => {
  const location = useLocation();
  const pokemons = usePokemonList();

  const isModalOpen = useSignal<boolean>(false);
  const pokemonFact = useSignal<string>('');
  const modalInfoPokemon = useStore({
    id: '',
    name: '',
  });

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search);
    const offsetNumber = Number(offsetString.get('offset'));
    return offsetNumber;
  });

  const showModal = $((id: string, name: string) => {
    modalInfoPokemon.id = id;
    modalInfoPokemon.name = name;
    isModalOpen.value = true;

    //! Esto funciona si quitas useVisibleTask
    getFunFactAboutPokemon(modalInfoPokemon.name).then(
      resp => (pokemonFact.value = resp)
    );
  });

  const closeModal = $(() => {
    isModalOpen.value = false;

    //! Esto funciona si quitas useVisibleTask
    pokemonFact.value = '';
  });

  //* Otra manera de hacerlo con useVisibleTask
  // useVisibleTask$(({ track }) => {
  //   track(() => modalInfoPokemon.name);
  //   pokemonFact.value = '';
  //   if (modalInfoPokemon.name.length > 0) {
  //     getFunFactAboutPokemon(modalInfoPokemon.name).then(
  //       resp => (pokemonFact.value = resp)
  //     );
  //   }
  // });

  return (
    <>
      <div class="flex flex-col items-center gap-2">
        <span class="my-5 text-4xl">Status</span>
        <span>Pagina actual: {currentOffset.value}</span>
        <span>Cargando pagina: {location.isNavigating ? 'si' : 'no'}</span>
      </div>
      <div class="mt-10 space-x-3">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary cursor-pointer"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary cursor-pointer"
        >
          Siguientes
        </Link>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
        {pokemons.value.map(({ name, id }) => (
          <div
            key={name}
            onClick$={() => showModal(id, name)}
            class="text-center capitalize"
          >
            <PokemonImage id={Number(id)} />
            {name}
          </div>
        ))}
      </div>

      <Modal
        isModalOpen={isModalOpen.value}
        closeModalFn={closeModal}
        size="md"
      >
        <div q:slot="title">{modalInfoPokemon.name}</div>
        <div
          q:slot="content"
          class="flex flex-col items-center justify-center"
        >
          <PokemonImage id={Number(modalInfoPokemon.id)} />
          <span class="text-lg">
            {pokemonFact.value === ''
              ? 'Preguntando a OpenAi'
              : pokemonFact.value}
          </span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: 'SSR - List',
};
