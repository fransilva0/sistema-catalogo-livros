const LibaryRepositories = require("../repository/libary_repository");
const Question = require("../interfaces/question");
const Screen = require("../interfaces/screen");

const findBookRunAction = async (id, recursion, callback) => {
    const book = (await LibaryRepositories.list()).find((book) => book.id == id);
    if(!book) {
        await Screen.statusMessage("Id não encontrado !", 2);
        const option = await Question.toAsk("Digite 0 para sair ou 1 para tentar novamente");
        if( option == "0") {
            Screen.cleanScreen();
            callback();
            return;
        }
        return await recursion();
    }

    await callback(book);
}

const Libary = {

    registerBook: async () => {
        const title = await Question.toAsk("Digite o titulo do livro: ");
        const description = await Question.toAsk("Digite a descrição do livro");
        const author = await Question.toAsk("Digite o autor do livro: ");
        const language = await Question.toAsk("Digite o idioma do livro: ");
        const gender = await Question.toAsk("Digite o gênero do livro: ");
        const bookImg = await Question.toAsk("Digite o link web de uma imagem de capa desse livro: ");
        const id = new Date().getTime()

        const book = {
            id, title, description, author, language, gender, bookImg,
            status: "pendente"
        }
    
        await LibaryRepositories.register(book);
        await Screen.statusMessage("o livro agora está na sua biblioteca!", 1);
    },

    booksList: async () => {
        Screen.cleanScreen();
        console.log("===== [ Biblioteca ] =====")
        const libary = await LibaryRepositories.list();
        for(book of libary){
            console.log(`
                Id: ${book.id}
                Título: ${book.title}
                Descrição: ${book.description}
                Autor: ${book.author}
                Idioma: ${book.language}
                Gênero: ${book.gender}
                Status: ${book.status}
                -----------------------------------
            `);
        }

        await Question.toAsk("Digite enter para sair");
        Screen.cleanScreen();
    },

    deleteBook: async () => {
        Screen.cleanScreen();
        const id = await Question.toAsk("Digite o id do livro");
        
        await findBookRunAction(id, Libary.deleteBook, async (book) => {
            if(!book) return;

            await LibaryRepositories.delete(book.id);
            await Screen.statusMessage(`Livro "${book.title}" excluído com sucesso`, 3);
        });
    },

    changeBookStatus: async () => {
        Screen.cleanScreen();
        const id = await Question.toAsk("Digite o id do livro");

        await findBookRunAction(id, Libary.changeBookStatus, async (book) => {
            if(!book) return;

            const status = await Question.toAsk("Digite o novo status");
            await LibaryRepositories.changeStatus(book.id, status);
            await Screen.statusMessage(`Status do livro "${book.title}" alterado`, 3);
        });
    },
}

module.exports = Libary;