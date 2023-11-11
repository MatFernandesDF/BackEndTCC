import { Request,Response } from "express";
import { AutenticarUsuarioServico } from '../../servico/usuario/AutenticarUsuarioServico'

class AutenticarUsuarioControle{
    async handle(req:Request, res:Response){
        const{email,senha} = req.body;
            const autenticarUsuarioServico = new AutenticarUsuarioServico();

            const auth = await autenticarUsuarioServico.execute({
                email,
                senha
            })

            return res.json(auth);

    }
}

export { AutenticarUsuarioControle }