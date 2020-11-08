export default async function ({ store }) {
	await store.dispatch('user/setUser')
}
