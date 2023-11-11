import prismaClient from "../../prisma";

interface DetalharUsuarioRequest {
  usuario_id: string;
}

class DetalharUsuarioServico {
  async execute({ usuario_id }: DetalharUsuarioRequest) {
    const usuario = await prismaClient.usuario.findUnique({
      where: {
        id: usuario_id,
      },
    });

    return usuario;
  }
}

export { DetalharUsuarioServico };