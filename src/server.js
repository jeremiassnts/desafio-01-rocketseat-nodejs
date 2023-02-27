import http from 'node:http'

const server = http.createServer((req, res) => {

})

server.listen(3333, () => {
    console.log('SERVER ON')
})