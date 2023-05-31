import {
  $,
  component$,
  useComputed$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const formState = useStore({ email: '', password: '', formPosted: false });
  const emailError = useComputed$(() => {
    if (!formState.formPosted || formState.email.includes('@')) return;
    return 'not-valid';
  });
  const passwordError = useComputed$(() => {
    if (!formState.formPosted || formState.password.length > 6) return;
    return 'not-valid';
  });
  const onSubmit = $(() => {
    formState.formPosted = true;
  });
  const isFormValid = useComputed$(() => {
    if (
      emailError.value === 'not-valid' ||
      passwordError.value === 'not-valid'
    ) {
      return false;
    }
    return true;
  });

  return (
    <form
      class="login-form"
      preventdefault:submit
      onSubmit$={onSubmit}
    >
      <div class="relative">
        <input
          value={formState.email}
          onInput$={event => {
            formState.email = (event.target as HTMLInputElement).value;
          }}
          name="email"
          id="email"
          type="text"
          placeholder="Email address"
          class={emailError}
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          value={formState.password}
          onInput$={event => {
            formState.password = (event.target as HTMLInputElement).value;
          }}
          class={passwordError}
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button
          disabled={!isFormValid.value}
          type="submit"
        >
          Ingresar
        </button>
      </div>

      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </form>
  );
});
