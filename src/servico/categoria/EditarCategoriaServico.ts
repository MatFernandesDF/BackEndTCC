import prismaClient from "../../prisma";

interface EditarCategoriaRequest {
  id: string;
  nome?: string;
  banner?: string;
}

class EditarCategoriaServico {
  async execute({ id, nome, banner}: EditarCategoriaRequest) {
    const produtoAtual = await prismaClient.categoria.findUnique({
      where: {
        id: id,
      },
    });

    if (!produtoAtual) {
      throw new Error("Categoria não encontrada");
    }

    const atualizacoes: any = {};

    if (nome !== undefined) {
      atualizacoes.nome = nome;
    }
    
    if (banner !== undefined) {
      atualizacoes.banner = banner;
    }

    for (const key in atualizacoes) {
      if (atualizacoes[key] === undefined) {
        atualizacoes[key] = '';
      }
    }

    const categoria = await prismaClient.categoria.update({
      where: {
        id: id,
      },
      data: atualizacoes,
    });

    return categoria;
  }
}

export { EditarCategoriaServico };