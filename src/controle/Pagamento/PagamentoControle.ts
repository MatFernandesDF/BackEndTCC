import { Request, Response } from 'express';
import { PagamentoServico } from '../../servico/Pagamento/PagamentoServico';

class PagamentoControle {
  async handle(req: Request, res: Response) {
    const { user_id, valor,ordem_id } = req.body;

    try {
      const pagamentoServico = new PagamentoServico();
      const result = await pagamentoServico.execute({ user_id, valor,ordem_id  });

      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao iniciar pagamento:", error);
      res.status(500).json({ error: "Ocorreu um erro ao iniciar o pagamento." });
    }
  }
}

export { PagamentoControle };