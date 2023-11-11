import { Request, Response } from "express";
import ContatoEstabelecimentoServico from '../../servico/usuario/ContatoEstabelecimentoServico'; 

class ContatoEstabelecimentoControle {
  async handle(req: Request, res: Response) {
    const { nome, email, mensagem } = req.body;

    try {
     
      if (!nome || !email  || !mensagem) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      const contactRequest = { nome, email, mensagem };

      await ContatoEstabelecimentoServico.sendEmail(contactRequest);

      return res.status(200).json({ message: 'Mensagem enviada com sucesso.' });
    } catch (error) {
      console.error('Erro ao processar a solicitação de contato:', error);
      return res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação.' });
    }
  }
}

export { ContatoEstabelecimentoControle };