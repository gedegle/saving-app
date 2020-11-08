export default function ({ redirect, $auth, route }) {
	if ($auth.user.planCount === 0 && route.path !== '/naujas-planas') {
		redirect('/naujas-planas')
	}
}
