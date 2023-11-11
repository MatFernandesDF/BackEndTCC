import {Request, Response} from 'express'
import { ListarPorCategoriaServico } from '../../servico/produto/ListarPorCategoriaServico'

class ListarPorCategoriaControle{
  async handle(req: Request, res: Response){
    const categoria_id = req.query.categoria_id as string;

    const produtoPorCategoria = new ListarPorCategoriaServico();

    const produto = await produtoPorCategoria.execute({
      categoria_id
    });

    return res.json(produto);

  }
}

export {ListarPorCategoriaControle}