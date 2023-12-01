import prismaClient from "../../prisma";

interface OrdemRequest{
  usuario_id: string;
}

class DesativarUsuarioServico{
  async execute({ usuario_id }: OrdemRequest){

    const ordem = await prismaClient.usuario.update({
      where:{
        id: usuario_id
      },
      data:{
        situacao: false,
      }
    })

    return ordem;

  }
}

export { DesativarUsuarioServico }