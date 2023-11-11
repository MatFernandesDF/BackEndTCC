import { Request, Response } from 'express';
import { ListarProdutosClienteServico } from '../../servico/produto/ListarProdutosClienteServico';

class ListarProdutosClienteControle {
  async handle(req: Request, res: Response) {
    try {
      const listarProdutosClienteServico = new ListarProdutosClienteServico();
      const produtos = await listarProdutosClienteServico.execute();


      const produtosSelecionados = produtos.map((produto) => ({
        id: produto.id,
        nome: produto.nome,
        email: produto.valor,
        nivel: produto.descricao,
        banner:produto.banner,
        valor:produto.valor,
        disponibilidade:produto.disponibilidade
      }));

      return res.json(produtosSelecionados);
    } catch (error) {
      // Trate os erros aqui, por exemplo:
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
  }
}

export { ListarProdutosClienteControle };