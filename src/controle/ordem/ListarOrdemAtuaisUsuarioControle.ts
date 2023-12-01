import { Request, Response } from 'express';
import { ListarOrdemUsuarioServicos } from '../../servico/ordem/ListarOrdemAtuaisUsuarioServico';

class ListarOrdemAtuaisUsuarioControle {
  async handle(req: Request, res: Response) {
    const { usuario_id } = req;

    const listarOrdemUsuarioServicos = new ListarOrdemUsuarioServicos();

    const ordem = await listarOrdemUsuarioServicos.execute(usuario_id);

    return res.json(ordem);
  }
}

export { ListarOrdemAtuaisUsuarioControle };