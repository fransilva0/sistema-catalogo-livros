const fs = require('fs');
const filePath = "database/libary_database.json";

const LibaryRepositories = {

    register: async (book) => {
        const libary = await LibaryRepositories.list();
        libary.push(book);
        await fs.writeFileSync(filePath, JSON.stringify(libary), 'utf8');
    },

    list: async () => {
        const libaryJSON = await fs.readFileSync(filePath, 'utf8');
        return JSON.parse(libaryJSON);
    },

    delete: async (id) => {
        const libary = await LibaryRepositories.list();
        const index = libary.findIndex((b) => b.id == id);
        libary.splice(index, 1);
        await fs.writeFileSync(filePath, JSON.stringify(libary), 'utf8');
    },

    changeStatus: async (id, status) => {
        const libary = await LibaryRepositories.list();
        const book = libary.find((b) => b.id == id);
        if(book){
            book.status = status;
            await fs.writeFileSync(filePath, JSON.stringify(libary), 'utf8');
        }
    },
}

module.exports = LibaryRepositories;