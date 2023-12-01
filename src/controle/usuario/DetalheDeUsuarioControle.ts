import { Request, Response } from 'express'
import { DetalheDeUsuarioServico } from '../../servico/usuario/DetalheDeUsuarioServico'


class DetalheDeUsuarioControle{
    async handle(req:Request, res:Response){
        const usuario_id = req.usuario_id;
       
        const detalheDeUsuarioServico = new DetalheDeUsuarioServico();

        const usuario = await detalheDeUsuarioServico.execute(usuario_id);

        return res.json(usuario);

    }
}
export { DetalheDeUsuarioControle }