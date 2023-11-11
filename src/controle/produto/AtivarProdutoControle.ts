import {Request, Response } from 'express'
import { DesativarProdutoServico } from '../../servico/produto/AtivarProdutoServico'; 

class AtivarProdutoControle{
  async handle(req: Request, res: Response){
    const { produto_id } = req.body;

    const desativarProdutoServico = new DesativarProdutoServico();

    const produto = await desativarProdutoServico.execute({
      produto_id
    })

    return res.json(produto);

  }
}

export { AtivarProdutoControle }