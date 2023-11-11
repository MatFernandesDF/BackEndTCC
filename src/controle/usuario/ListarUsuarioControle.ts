import { Request, Response } from 'express';
import { ListarUsuariosServico } from '../../servico/usuario/ListarUsuariosServico';

class ListarUsuariosControle {
  async handle(req: Request, res: Response) {
    try {
      const listarUsuariosServico = new ListarUsuariosServico();
      const usuarios = await listarUsuariosServico.execute();

      // Selecione apenas os campos desejados
      const usuariosSelecionados = usuarios.map((usuario) => ({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        nivel: usuario.nivel_acesso,
        situacao:usuario.situacao
      }));

      return res.json(usuariosSelecionados);
    } catch (error) {
      // Trate os erros aqui, por exemplo:
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
  }
}

export { ListarUsuariosControle };