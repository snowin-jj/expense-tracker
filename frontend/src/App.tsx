import { ThemeProvider } from '@/components/theme-provider'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './components/ui/card'
import { useEffect, useState } from 'react'
import { formatCurrency } from './lib/utils'

export default function App() {
	const [totalSpent, setTotalSpent] = useState(0)

	useEffect(() => {
		async function getTotalSpent() {
			const res = await fetch('/api/expenses/total-spent')
			const data = await res.json()
			setTotalSpent(data.total)
		}
		getTotalSpent()
	}, [])

	return (
		<ThemeProvider>
			<Card className="mx-auto max-w-md">
				<CardHeader>
					<CardTitle>Total Spent</CardTitle>
					<CardDescription>The total amount you're spent</CardDescription>
				</CardHeader>
				<CardContent>{formatCurrency(totalSpent, 'en-IN', 'INR')}</CardContent>
			</Card>
		</ThemeProvider>
	)
}
