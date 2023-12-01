import prismaClient from "../../prisma";

interface OrdemRequest{
  usuario_id: string;
}

class AtivarUsuarioServico{
  async execute({ usuario_id }: OrdemRequest){

    const ordem = await prismaClient.usuario.update({
      where:{
        id: usuario_id
      },
      data:{
        situacao: true,
      }
    })

    return ordem;

  }
}

export { AtivarUsuarioServico }