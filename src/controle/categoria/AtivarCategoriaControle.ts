import {Request, Response } from 'express'
import { AtivarCategoriaServico } from '../../servico/categoria/AtivaCategoriaServico'; 

class AtivarCategoriaControle{
  async handle(req: Request, res: Response){
    const { categoria_id } = req.body;

    const ativarCategoriaServico = new AtivarCategoriaServico();

    const produto = await ativarCategoriaServico.execute({
      categoria_id
    })

    return res.json(produto);

  }
}

export { AtivarCategoriaControle }