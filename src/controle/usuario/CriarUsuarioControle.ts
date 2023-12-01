import { Request, Response } from "express";
import { CriarUsuarioServico } from '../../servico/usuario/CriarUsuarioServico';

class CriarUsuarioControle {
    async handle(req: Request, res: Response) {
        const { nome, email, senha, confirmarSenha, id } = req.body;

        const criarUsuarioServico = new CriarUsuarioServico();

        try {
            const usuario = await criarUsuarioServico.execute({ nome, email, senha, confirmarSenha, id });
            return res.json(usuario);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CriarUsuarioControle };