import {Request, Response} from 'express'
import { AdItemServico } from '../../servico/ordem/AdItemServico'

class AdItemControle{
  async handle(req: Request, res: Response){
    const { ordem_id, produto_id, quantia} = req.body;

    const addItem = new AdItemServico();

    const ordem = await addItem.execute({
      ordem_id,
      produto_id,
      quantia
    });

    return res.json(ordem);

  }
}

export { AdItemControle }