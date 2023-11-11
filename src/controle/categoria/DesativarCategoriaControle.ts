import {Request, Response } from 'express'
import { DesativarCategoriaServico } from '../../servico/categoria/DesativarCategoriaServico'; 

class DesativarCategoriaControle{
  async handle(req: Request, res: Response){
    const { categoria_id } = req.body;

    const desativarCategoriaServico = new DesativarCategoriaServico();

    const produto = await desativarCategoriaServico.execute({
      categoria_id
    })

    return res.json(produto);

  }
}

export { DesativarCategoriaControle }