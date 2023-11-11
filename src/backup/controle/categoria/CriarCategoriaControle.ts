import { Request, Response } from "express"
import { CriarCategoriaServico } from "../../servico/categoria/CriarCategoriaServico"

class CriarCategoriaControle{
    async handle(req:Request, res:Response){
       const {nome} = req.body;
       const criarCategoriaServico = new CriarCategoriaServico();
       const categoria = await criarCategoriaServico.execute({
        nome
       });


       return res.json(categoria);
    }
}

export { CriarCategoriaControle }