export default async function ({ store }) {
	await store.dispatch('user/signInUser', {
		email: 'gregory.robel@example.org',
		password: 'password',
	})
}
