import { Request, Response } from "express";
import {AlterarSenhaServico} from "../../servico/usuario/AlterarSenhaServico";

class AlterarSenhaControle {
  async handle(req: Request, res: Response) {
    const { user_id, novasenha,confirmarsenha } = req.body;

    try {
      const servico = new AlterarSenhaServico();
      const result = await servico.execute({ user_id, novasenha,confirmarsenha });

      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      res.status(500).json({ error: "Ocorreu um erro ao alterar a senha." });
    }
  }
}

export {AlterarSenhaControle};