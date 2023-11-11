import { Request, Response } from 'express';
import { DetalharUsuarioServico } from '../../servico/usuario/DetalharUsuarioServico'; 

class DetalharUsuarioControle {
  async handle(req: Request, res: Response) {
    const usuario_id = req.query.usuario_id as string; // Altere o nome do parâmetro para 'usuario_id'

    const detalharUsuarioServico = new DetalharUsuarioServico(); // Crie uma instância do serviço de detalhar usuário

    const usuario = await detalharUsuarioServico.execute({
      usuario_id,
    });

    return res.json(usuario); // Retorne os detalhes do usuário como JSON
  }
}

export { DetalharUsuarioControle };