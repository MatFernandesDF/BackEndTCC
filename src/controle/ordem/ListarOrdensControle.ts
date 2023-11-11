import {Request, Response} from 'express'
import { ListarOrdemServicos } from '../../servico/ordem/ListarOrdemServicos'; 

class ListarOrdensControle{
  async handle(req: Request, res: Response){
    const listarOrdemServicos = new ListarOrdemServicos()

    const ordens = await listarOrdemServicos.execute();

    return res.json(ordens);

  }
}

export { ListarOrdensControle }