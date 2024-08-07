import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { getSession }, cookies }) => {
  const { session, user } = await getSession()

  return {
    session,
    user,
    cookies: cookies.getAll(),
  }
}