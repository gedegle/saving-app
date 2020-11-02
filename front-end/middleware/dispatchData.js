export default async function ({ store }) {
	await store.dispatch('user/signInUser', {
		email: 'olin.rippin@example.com',
		password: 'password',
	})
}
