import {Request, Response} from 'express'
import {ListarCategoriaServico} from '../../servico/categoria/ListarCategoriaServicoFuncionario'

class ListarCategoriaControleFuncionario{
    async handle(req:Request, res:Response){
        const listarCategoriaServico=new ListarCategoriaServico();


        const categoria = await listarCategoriaServico.execute();


        return res.json(categoria);
    }
   
}

export {ListarCategoriaControleFuncionario}