import { Request, Response } from 'express';
import { DetalharUsuarioServico } from '../../servico/usuario/DetalharUsuarioServico'; 

class DetalharUsuarioControle {
  async handle(req: Request, res: Response) {
    const usuario_id = req.query.usuario_id as string; 

    const detalharUsuarioServico = new DetalharUsuarioServico();

    const usuario = await detalharUsuarioServico.execute({
      usuario_id,
    });

    return res.json(usuario); 
  }
}

export { DetalharUsuarioControle };