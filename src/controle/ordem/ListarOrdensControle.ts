import {Request, Response} from 'express'
import { ListarOrdemServicos } from '../../servico/ordem/ListarOrdemServicos'; 

class ListarOrdensControle{
  async handle(req: Request, res: Response){
    const listarOrdemServicos = new ListarOrdemServicos()

    const ordem = await listarOrdemServicos.execute();

    return res.json(ordem);

  }
}

export { ListarOrdensControle }