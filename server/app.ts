import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRouter } from './routers/expenses'
const app = new Hono()

app.use('*', logger())

app.route('/api/expenses', expensesRouter)

export default app
