import {Request, Response} from 'express'
import { RemoverItemServico } from '../../servico/ordem/RemoverItemServico'

class RemoverItemControle{
  async handle(req: Request, res: Response){
    const item_id = req.query.item_id as string;

    const removerItemServico = new RemoverItemServico();

    const ordem = await removerItemServico.execute({
      item_id
    });

    return res.json(ordem);

  }
}

export { RemoverItemControle }

