import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, search) {
        let data = this.#database[table] ?? []
        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
        return data
    }
    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
        return data
    }
    selectById(table, id) {
        let data = this.#database[table] ?? []
        return data.filter(e => e.id == id)[0]
    }
    update(table, id, data) {
        const { title, description } = data
        const index = this.#database[table].findIndex(e => e.id == id)
        if (index > -1) {
            this.#database[table][index].title = title ? title : this.#database[table][index].title
            this.#database[table][index].description = description ? description : this.#database[table][index].description
            this.#persist()
        }
    }
}