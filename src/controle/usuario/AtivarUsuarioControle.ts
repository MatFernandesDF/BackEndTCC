import {Request, Response } from 'express'
import { AtivarUsuarioServico } from '../../servico/usuario/AtivarUsuarioServico'; 

class AtivarUsuarioControle{
  async handle(req: Request, res: Response){
    const { usuario_id } = req.body;

    const ativarUsuarioServico = new AtivarUsuarioServico();

    const ordem = await ativarUsuarioServico.execute({
      usuario_id
    })

    return res.json(ordem);

  }
}

export { AtivarUsuarioControle }