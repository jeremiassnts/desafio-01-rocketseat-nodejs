import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'
import { randomUUID } from 'node:crypto'

const database = new Database()
export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks')
            return res.end(JSON.stringify(tasks))
        }
    }, {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            if (!title || !description) {
                return res.writeHead(400).end("É necessário enviar o título e descrição da task")
            }

            const task = {
                id: randomUUID(),
                title: title,
                description: description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date()
            }
            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    }
]