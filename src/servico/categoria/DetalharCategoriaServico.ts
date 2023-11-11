import prismaClient from "../../prisma";

interface DetalharCategoriaRequest {
  categoria_id: string;
}

class DetalharCategoriaServico {
  async execute({ categoria_id }: DetalharCategoriaRequest) {
    const usuario = await prismaClient.categoria.findUnique({
      where: {
        id: categoria_id,
      },
    });

    return usuario;
  }
}

export { DetalharCategoriaServico };