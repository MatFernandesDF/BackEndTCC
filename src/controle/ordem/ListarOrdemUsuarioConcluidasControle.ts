import { Request, Response } from 'express';
import { ListarOrdemUsuarioServicos } from '../../servico/ordem/ListarOrdemConcluidaUsuarioServico';

class ListarOrdemUsuarioConcluidasControle {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const listarOrdemUsuarioServicos = new ListarOrdemUsuarioServicos();

    // Você pode passar o user_id para o serviço, se necessário
    const ordens = await listarOrdemUsuarioServicos.execute(user_id);

    return res.json(ordens);
  }
}

export { ListarOrdemUsuarioConcluidasControle };