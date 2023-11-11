import {Request, Response } from 'express'
import { CriarProdutoServico } from '../../servico/produto/CriarProdutoServico'


class CriarProdutoControle{
  async handle(req: Request, res: Response){
    const { nome, valor, descricao, categoria_id } = req.body;


    const criarProdutoServico = new CriarProdutoServico();

    if(!req.file){
        throw new Error("error upload file")
    }else{

        const {originalname,filename:banner} = req.file;

        const product = await criarProdutoServico.execute({
            nome,
            valor,
            descricao,
            banner,
            categoria_id
          });
      
          return res.json(product)
      
    }

  }
}

export { CriarProdutoControle }