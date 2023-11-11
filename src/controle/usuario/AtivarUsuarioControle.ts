import {Request, Response } from 'express'
import { AtivarUsuarioServico } from '../../servico/usuario/AtivarUsuarioServico'; 

class AtivarUsuarioControle{
  async handle(req: Request, res: Response){
    const { user_id } = req.body;

    const ativarUsuarioServico = new AtivarUsuarioServico();

    const order = await ativarUsuarioServico.execute({
      user_id
    })

    return res.json(order);

  }
}

export { AtivarUsuarioControle }