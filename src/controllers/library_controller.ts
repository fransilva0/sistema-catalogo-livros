import { Request, Response } from "express";
import { Book } from "../models/book";

export const LibraryController = {
    index: async (req: Request, res: Response) => {
        try {
            const books = await Book.listarTodos();
            res.render("biblioteca/index", { books });
        } catch (error) {
            res.status(500).send("Erro ao buscar livros");
        }
    },

    novo: async (req: Request, res: Response) => {
        res.render("biblioteca/novo");
    },

    criar: async (req: Request, res: Response) => {
        try {
            const {title, description, author, language, gender, bookImg } = req.body;
            await new Book(title, description, author, language, gender, bookImg).salvar();
            res.redirect("/biblioteca");
        } catch (error) {
            res.status(500).send("Erro ao adicionar livro");
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await Book.deletar(Number(id));
            res.redirect("/biblioteca");
        } catch (error) {
            res.status(500).send("Erro ao excluir livro");
        }
    }
};