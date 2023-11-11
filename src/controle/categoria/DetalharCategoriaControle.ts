import { Request, Response } from 'express';
import { DetalharCategoriaServico } from '../../servico/categoria/DetalharCategoriaServico'; 

class DetalharCategoriaControle {
  async handle(req: Request, res: Response) {
    const categoria_id = req.query.categoria_id as string; 

    const detalharCategoriaServico = new DetalharCategoriaServico();

    const produto = await detalharCategoriaServico.execute({
      categoria_id,
    });

    return res.json(produto);
  }
}

export { DetalharCategoriaControle };