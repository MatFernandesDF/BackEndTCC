import {Request, Response} from 'express'
import { DetalharOrdemServico } from '../../servico/ordem/DetalharOrdemServico';



class DetalharOrdemControle{
  async handle(req: Request, res: Response){
    const ordem_id = req.query.ordem_id as string;

    const detalharOrdemServico = new DetalharOrdemServico();

    const orders = await detalharOrdemServico.execute({
      ordem_id
    })

    return res.json(orders);

  }
}

export { DetalharOrdemControle }