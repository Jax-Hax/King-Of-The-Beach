import { loginSchema, signupSchema } from '$lib/form_schemas/root_schemas.js';
import { fail, redirect } from '@sveltejs/kit'
import { message, superValidate, setError } from 'sveltekit-superforms/server';


export async function load({ locals: { getSession } }) {
  const session = await getSession()
  const loginForm = await superValidate(loginSchema);
  const signupForm = await superValidate(signupSchema);

  return { loginForm, signupForm };
}
export const actions = {
  signup: async ({ url, locals, request }) => {
    const signupForm = await superValidate(request, signupSchema);
    if (!signupForm.valid) {
      return fail(400, { signupForm });
    }
    const { error } = await locals.supabase.auth.signUp({
      email: signupForm.data.email,
      password: signupForm.data.password,
      options: {
        emailRedirectTo: `${url.origin}/auth/confirm`,
      },
    })
    
    if (error) {
      console.error(error)
      return setError(signupForm, 'email', error.message);
    }
    return message(signupForm, 'Thank you! We have sent a confirmation email to the inputted email address.');
  },
  login: async ({ locals, request }) => {
    const loginForm = await superValidate(request, loginSchema);
    if (!loginForm.valid) {
      return fail(400, { loginForm });
    }
    const { error } = await locals.supabase.auth.signInWithPassword({
      email: loginForm.data.email,
      password: loginForm.data.password,
    })
    
    if (error) {
      console.error(error)
      return setError(loginForm, 'email', error.message);
    }
    throw redirect(302, `/dashboard`)
  },
}