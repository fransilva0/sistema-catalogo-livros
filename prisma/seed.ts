import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.book.createMany({
        data: [
            {
                title: "O Senhor dos Anéis: A Sociedade do Anel",
                description: "A Sociedade do Anel é a primeira parte da trilogia O Senhor dos Anéis, de J.R.R. Tolkien. Nela, o autor apresenta o mundo de fantasia da Terra-média e conta a história de um grupo de nove personagens que partem em uma jornada para destruir o Um Anel, um artefato mágico que concede poder a seu portador e que foi forjado pelo Senhor das Trevas, Sauron.",
                author: "J.R.R. Tolkien", 
                language: "Português",
                gender: "Fantasia",
                bookImg: "https://m.media-amazon.com/images/I/81hCVEC0ExL._AC_UF1000,1000_QL80_.jpg" 
            },
            {
                title: "Alice no País das Maravilhas",
                description: "Alice no País das Maravilhas é um livro de fantasia escrito por Lewis Carroll.",
                author: "Lewis Carroll",
                language: "Português",
                gender: "Fantasia",
                bookImg: "https://grupoautentica.f1cdn.com.br/view/1080/1080/false/true/208.jpg?MjA4LQ=="
            }
        ]
    });

    console.log("Seed executado com sucesso!");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});