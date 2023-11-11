import { Request, Response } from 'express';
import { DetalharProdutoServico } from '../../servico/produto/DetalharProdutoServico'; 

class DetalharProdutoControle {
  async handle(req: Request, res: Response) {
    const produto_id = req.query.produto_id as string; 

    const detalharProdutoServico = new DetalharProdutoServico();

    const produto = await detalharProdutoServico.execute({
      produto_id,
    });

    return res.json(produto); // Retorne os detalhes do usuário como JSON
  }
}

export { DetalharProdutoControle };