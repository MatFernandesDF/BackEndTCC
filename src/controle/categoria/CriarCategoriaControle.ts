import { Categoria } from './../../../node_modules/.prisma/client/index.d';
import {Request, Response } from 'express'
import { CriarCategoriaServico } from '../../servico/categoria/CriarCategoriaServico'


class CriarCategoriaControle{
  async handle(req: Request, res: Response){
    const { nome } = req.body;


    const criarCategoriaServico = new CriarCategoriaServico();

    if(!req.file){
        throw new Error("error upload file")
    }else{

        const {originalname,filename:banner} = req.file;

        const categoria = await criarCategoriaServico.execute({
            nome,
            banner,
          });
      
          return res.json(categoria)
      
    }

  }
}

export { CriarCategoriaControle }