import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$ } from '@builder.io/qwik-city';

import styles from './login.css?inline';

export const useLoginUserAction = routeAction$((data, { cookie }) => {
  cookie.set('jwt', 'estoesmijwt', { secure: true, path: '/' });
  const { email, password } = data;

  return { success: false, email, password };
});

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLoginUserAction();

  return (
    <Form
      action={action}
      class="space-y-4 py-8 text-base  leading-6 text-gray-700 sm:text-lg sm:leading-7"
    >
      <div class="relative">
        <input
          name="email"
          id="email"
          type="text"
          placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>

      <code class="overflow-auto">
        {JSON.stringify(action.value, undefined, 2)}
      </code>
    </Form>
  );
});
