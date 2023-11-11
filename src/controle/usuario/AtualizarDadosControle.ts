import { Request, Response } from "express";
import { AtualizarUsuarioServico } from "../../servico/usuario/AtualizarUsuarioServico";

class AtualizarUsuarioControle {
  async handle(req: Request, res: Response) {
    const { id, nome, email, senha, nivel_acesso } = req.body;
    const atualizarUsuario = new AtualizarUsuarioServico();

    try {
      
      const usuario = await atualizarUsuario.execute({ id, nome, email, nivel_acesso, senha });
      return res.json(usuario);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { AtualizarUsuarioControle };