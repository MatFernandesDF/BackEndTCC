import {Request, Response } from 'express'
import { DesativarUsuarioServico } from '../../servico/usuario/DesativarUsuarioServico'; 

class DesativarUsuarioControle{
  async handle(req: Request, res: Response){
    const { user_id } = req.body;

    const desativarUsuarioServico = new DesativarUsuarioServico();

    const order = await desativarUsuarioServico.execute({
      user_id
    })

    return res.json(order);

  }
}

export { DesativarUsuarioControle }