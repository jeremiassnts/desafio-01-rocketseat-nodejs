import fs from 'node:fs'
import { parse } from 'csv-parse'

const filePath = new URL('./import.csv', import.meta.url)
const parser = fs.createReadStream(filePath).pipe(parse({
    from_line: 2
}))

for await (const chunk of parser) {
    const [title, description] = chunk
    await fetch('http://localhost:3333/tasks', {
        body: JSON.stringify({ title, description }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}