export default {
	methods: {
		calculateSavings(plan) {
			const sum = plan?.sum
			const income = plan?.income
			let tempWhileSum = 0
			let monthCount = 1
			let daysToSave = 0
			let saved
			let tempDays
			let inAll = 0

			const date = new Date(plan.created_at)

			tempDays = Date.now() - date.getTime()
			tempDays = Math.ceil(tempDays / (24 * 60 * 60 * 1000))

			const posts = this.activePosts
			const count = posts?.length
			if (count > 0) {
				inAll = posts.reduce(function (prev, cur) {
					return prev + cur?.sum
				}, 0)
			} else {
				inAll = 0
			}

			const avgPerDay = inAll > 0 ? inAll / count : 0
			const avgPerMonth = avgPerDay * 30
			if (avgPerMonth > income) monthCount = Math.ceil(avgPerMonth / income)
			else monthCount = 1

			const tempIncome = monthCount * income
			const tempLeftAMonth = tempIncome - avgPerMonth

			if (tempLeftAMonth < sum) {
				tempWhileSum = sum

				while (tempWhileSum >= sum) {
					monthCount++
					tempWhileSum = sum - tempLeftAMonth
				}

				if (tempWhileSum !== 0) {
					daysToSave = tempWhileSum / avgPerDay
				}
			}
			if (avgPerMonth < sum) {
				daysToSave =
					avgPerMonth > 0 ? Math.ceil(sum / avgPerMonth) : monthCount * 30
			} else daysToSave = tempDays + monthCount * 30

			saved = ((income / 30) * tempDays - inAll).toFixed(2)
			if (saved < 0) {
				saved = 0
			}
			const dateTilSaved = new Date()
			dateTilSaved.setDate(dateTilSaved.getDate() + daysToSave)
			const data = {
				leftToSave: sum - saved < 0 ? this.plan.sum : sum - saved,
				saved,
				dateTilSaved,
			}

			this.$store.commit('user/setSavingsData', data)
		},
	},
}
