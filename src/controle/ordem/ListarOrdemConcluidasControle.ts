import {Request, Response} from 'express'
import { ListarOrdemConcluidasServico } from '../../servico/ordem/ListarOrdemConcluidaServico'; 

class ListarOrdemConcluidasControle{
  async handle(req: Request, res: Response){
    const listarOrdemConcluidasServico = new ListarOrdemConcluidasServico()

    const ordem = await listarOrdemConcluidasServico.execute();

    return res.json(ordem);

  }
}

export { ListarOrdemConcluidasControle }