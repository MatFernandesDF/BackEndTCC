import {Request, Response} from 'express'
import {ListarCategoriaServico} from '../../servico/categoria/ListarCategoriaServico'

class ListarCategoriaControle{
    async handle(req:Request, res:Response){
        const listarCategoriaServico=new ListarCategoriaServico();


        const categoria = await listarCategoriaServico.execute();


        return res.json(categoria);
    }
   
}

export {ListarCategoriaControle}