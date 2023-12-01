import {Request, Response } from 'express'
import { FinalizarOrdemServico } from '../../servico/ordem/FinalizarOrdemServico';

class FinalizarOrdemControle{
  async handle(req: Request, res: Response){
    const { ordem_id } = req.body;

    const finalizarOrdemServico = new FinalizarOrdemServico();

    const ordem = await finalizarOrdemServico.execute({
      ordem_id
    })

    return res.json(ordem);

  }
}

export { FinalizarOrdemControle }