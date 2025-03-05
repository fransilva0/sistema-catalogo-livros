import { prisma } from "../config/database";

export class Book {
    id?: number;
    title: string;
    description: string;
    author: string;
    language: string;
    gender: string;
    bookImg: string;

    constructor(title?: string, description?: string, author?: string, language?: string, gender?: string, bookImg?: string, id? : number,) {
        this.id = id;
        this.title = title || "";
        this.description = description || "";
        this.author = author || "";
        this.language = language || "";
        this.gender = gender || "";
        this.bookImg = bookImg || "";
    }

    static async listarTodos(): Promise<Book[]> {
        const books = await prisma.book.findMany();
        return books.map((b : any) => new Book(b.title, b.description, b.author, b.language, b.gender, b.bookImg));
    }

    static async buscarPorId(id: number): Promise<Book | null> {
        const book = await prisma.book.findUnique({
            where: { id }
        });
        return book ? new Book(book.title, book.description, book.author, book.language, book.gender, book.bookImg) : null;
    }

    async salvar(): Promise<Book> {
        const bookCriado = await prisma.book.create({
            data: {
                title: this.title,
                description: this.description,
                author: this.author,
                language: this.language,
                gender: this.gender,
                bookImg: this.bookImg
            }
        });
        return new Book(bookCriado.title, bookCriado.description, bookCriado.author, bookCriado.language, bookCriado.gender, bookCriado.bookImg);
    }

    static async deletar(id: number): Promise<void> {
        await prisma.book.delete({
            where: { id }
        });
    }
}