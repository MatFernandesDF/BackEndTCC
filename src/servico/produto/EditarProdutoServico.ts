import prismaClient from "../../prisma";

interface EditarProdutoRequest {
  id: string;
  nome?: string;
  valor?: string;
  descricao?: string;
  banner?: string;
  categoria_id?: string;
}

class EditarProdutosServico {
  async execute({ id, nome, banner, valor, descricao, categoria_id }: EditarProdutoRequest) {
    const produtoAtual = await prismaClient.produto.findUnique({
      where: {
        id: id,
      },
    });

    if (!produtoAtual) {
      throw new Error("Produto não encontrado");
    }

    const atualizacoes: any = {};

    if (nome !== undefined) {
      atualizacoes.nome = nome;
    }
    if (valor !== undefined) {
      atualizacoes.valor = valor;
    }
    if (descricao !== undefined) {
      atualizacoes.descricao = descricao;
    }
    if (banner !== undefined) {
      atualizacoes.banner = banner;
    }
    if (categoria_id !== undefined) {
      atualizacoes.categoria_id = categoria_id;
    }


    for (const key in atualizacoes) {
      if (atualizacoes[key] === undefined) {
        atualizacoes[key] = '';
      }
    }

    const produto = await prismaClient.produto.update({
      where: {
        id: id,
      },
      data: atualizacoes,
    });

    return produto;
  }
}

export { EditarProdutosServico };