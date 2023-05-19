import {
  type PropFunction,
  Slot,
  component$,
  useStylesScoped$,
} from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface Props {
  isModalOpen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  closeModalFn: PropFunction<() => void>;
}

export const Modal = component$(
  ({ isModalOpen = false, size = 'md', closeModalFn }: Props) => {
    useStylesScoped$(ModalStyles);

    return (
      // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
      <div
        onClick$={() => closeModalFn()}
        class={isModalOpen ? 'modal-background' : 'hidden'}
      >
        <div
          onClick$={e => e.stopPropagation()}
          class={[`modal-content modal-${size}`]}
        >
          <div class="mt-3 text-center">
            <h3 class="modal-title">
              <Slot name="title" />
            </h3>

            <div class="mt-2 px-7 py-3">
              <div class="modal-content-text">
                <Slot name="content" />
              </div>
            </div>

            {/* Botton */}
            <div class="items-center px-4 py-3">
              <button
                onClick$={closeModalFn}
                id="ok-btn"
                class="modal-button"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
