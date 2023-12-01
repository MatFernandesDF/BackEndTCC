import { Request, Response } from 'express';
import { ListarOrdemUsuarioServicos } from '../../servico/ordem/ListarOrdemConcluidaUsuarioServico';

class ListarOrdemUsuarioConcluidasControle {
  async handle(req: Request, res: Response) {
    const { usuario_id } = req;

    const listarOrdemUsuarioServicos = new ListarOrdemUsuarioServicos();


    const ordem = await listarOrdemUsuarioServicos.execute(usuario_id);

    return res.json(ordem);
  }
}

export { ListarOrdemUsuarioConcluidasControle };