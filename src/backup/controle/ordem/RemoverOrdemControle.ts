import {Request, Response} from 'express'
import { RemoverOrdemServico } from '../../servico/ordem/RemoverOrdemServico'

class RemoverOrdemControle{
  async handle(req: Request, res: Response){
    const ordem_id = req.query.ordem_id as string;

    const removerOrdem = new RemoverOrdemServico();

    const ordem = await removerOrdem.execute({
      ordem_id
    });

    return res.json(ordem);

  }
}

export { RemoverOrdemControle }

