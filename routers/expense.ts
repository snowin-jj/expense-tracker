import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import z from 'zod'

const expenseSchema = z.object({
	id: z.number().int().min(1).positive(),
	title: z.string().min(3),
	amount: z.number().int().positive(),
})

const createPostSchema = expenseSchema.omit({ id: true })

type Expense = z.infer<typeof expenseSchema>

const fakeExpenses: Expense[] = [
	{
		id: 1,
		title: 'invoice',
		amount: 667.06,
	},
	{
		id: 2,
		title: 'withdrawal',
		amount: 712.42,
	},
	{
		id: 3,
		title: 'withdrawal',
		amount: 231.79,
	},
	{
		id: 4,
		title: 'payment',
		amount: 711.03,
	},
	{
		id: 5,
		title: 'invoice',
		amount: 283.68,
	},
]

export const expensesRouter = new Hono()
	.get('/', (c) => {
		return c.json({
			expenses: fakeExpenses,
		})
	})
	.post('/', zValidator('json', createPostSchema), async (c) => {
		const expense = await c.req.valid('json')
		fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 })
		c.status(201)
		return c.json(expense)
	})
	.get('/:id{[0-9]+}', (c) => {
		const id = parseInt(c.req.param('id'))
		const expense = fakeExpenses.find((ex) => ex.id === id)
		if (!expense) {
			return c.notFound()
		}
		return c.json(expense)
	})
	.delete('/:id{[0-9]+}', (c) => {
		const id = parseInt(c.req.param('id'))
		const index = fakeExpenses.findIndex((ex) => ex.id === id)
		if (index == -1) {
			return c.notFound()
		}
		const deletedExpense = fakeExpenses.splice(index, 1)[0]
		return c.json({ expense: deletedExpense })
	})
	.put('/', (c) => {
		return c.json({})
	})
