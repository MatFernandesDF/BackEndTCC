import { Request, Response } from 'express'
import { DetalheDeUsuarioServico } from '../../servico/usuario/DetalheDeUsuarioServico'


class DetalheDeUsuarioControle{
    async handle(req:Request, res:Response){
        const user_id = req.user_id;
       
        const detalheDeUsuarioServico = new DetalheDeUsuarioServico();

        const user = await detalheDeUsuarioServico.execute(user_id);

        return res.json(user);

    }
}
export { DetalheDeUsuarioControle }