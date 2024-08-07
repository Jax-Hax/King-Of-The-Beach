import { fail, redirect } from '@sveltejs/kit'
import { setError, superValidate } from 'sveltekit-superforms/server';

export async function load({ url, cookies, locals: { supabase, getSession } }) {
    const session = await getSession()
    if (!session) {
        throw redirect(302, '/')
    }
    const userID = session.user.id
    return {userID}
}
export const actions = {
    signout: async ({ cookies, locals: { supabase } }) => {
        await supabase.auth.signOut()
        cookies.delete('svk-p-s-629542', { path: '/' });
        throw redirect(303, '/')
    }
}
