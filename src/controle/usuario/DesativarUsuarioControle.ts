import {Request, Response } from 'express'
import { DesativarUsuarioServico } from '../../servico/usuario/DesativarUsuarioServico'; 

class DesativarUsuarioControle{
  async handle(req: Request, res: Response){
    const { usuario_id } = req.body;

    const desativarUsuarioServico = new DesativarUsuarioServico();

    const ordem = await desativarUsuarioServico.execute({
      usuario_id
    })

    return res.json(ordem);

  }
}

export { DesativarUsuarioControle }