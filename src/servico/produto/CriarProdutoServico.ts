import prismaClient from "../../prisma";

interface ProdutoRequest{
  nome: string;
  valor: string;
  descricao: string;
  banner: string;
  categoria_id: string;
}

class CriarProdutoServico{
  async execute({nome, valor, descricao, banner, categoria_id}: ProdutoRequest){

    const produto = await prismaClient.produto.create({
        data:{
            nome:nome,
            valor:valor,
            descricao:descricao,
            banner:banner,
            categoria_id:categoria_id,
        }
    })
    return produto;

  }
}

export { CriarProdutoServico }