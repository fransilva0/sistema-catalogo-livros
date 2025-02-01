const Question = require("./question");
const Libary = require("../services/libary_services");
const Screen = require("../interfaces/screen");

const menu = async () => {
    let exit = 0;
    while (exit == 0) {
        console.log(`
            1 - Cadastrar livro
            2 - Visualizar minha biblioteca
            3 - Excluir livro
            4 - Alterar status de livro
            5 - Sair
        `)

        let option = await Question.toAsk('Digite uma das opções abaixo: ');

        Screen.cleanScreen();

        switch (option) {
            case "1":
                await Libary.registerBook()
                break;
            case "2":
                await Libary.booksList();
                break;
            case "3":
                await Libary.deleteBook();
                break;
            case "4":
                await Libary.changeBookStatus();
                break;
            case "5":
                console.log("Saindo ...");
                exit = 1;
                break;
            default:
                console.log(`Opção inválida`);
                break;
        }
    }
};

module.exports = menu;