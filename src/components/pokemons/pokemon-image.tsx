import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';

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

    const imageUrl = useComputed$(() => {
      return isBack
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    });

    return (
      <div
        class={`flex flex-col items-center justify-center w-[${size}px] h-[${size}px]`}
        style={{ width: `${size}px`, height: size + 'px' }}
      >
        {!imageLoaded.value && <span>Cargando...</span>}
        <img
          src={imageUrl.value}
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
