import { component$, useSignal, useTask$ } from '@builder.io/qwik';

type Props = {
  id: number;
  size?: number;
  isBack?: boolean;
  isVisible?: boolean;
};

export const PokemonImage = component$(
  ({ id, size = 250, isBack = false, isVisible = false }: Props) => {
    const imageLoaded = useSignal<boolean>(false);

    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    const backPath = isBack ? `/back/${id}` : `${id}`;

    return (
      <div
        class={`flex flex-col items-center justify-center w-[${size}px] h-[${size}px]`}
      >
        {!imageLoaded.value && <span>Cargando...</span>}
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${backPath}.png`}
          alt={`pokemon ${id}`}
          width={size}
          height={size}
          onLoad$={() => (imageLoaded.value = true)}
          class={{
            hidden: !imageLoaded.value,
            'brightness-0': isVisible,
          }}
        />
      </div>
    );
  }
);
