import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'


const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)
    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })
    if (route) {
        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333, () => {
    console.log('SERVER ON')
})