import { Request, Response } from "express";
import recuperarSenhaServico from '../../servico/usuario/RecuperarSenhaServico';

class RecuperarSenhaControle {
  async handle(req: Request, res: Response) {
    const { email } = req.body;

    try {
      await recuperarSenhaServico.execute({ email });
      return res.json({ message: "E-mail enviado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { RecuperarSenhaControle };