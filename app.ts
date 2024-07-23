import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRouter } from './routers/expense'
const app = new Hono()

app.use('*', logger())

app.get('/', (c) => c.text('Hello, from Hono!'))
app.route('/api/expenses', expensesRouter)

export default app
