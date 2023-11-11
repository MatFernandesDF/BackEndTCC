import prismaClient from "../../prisma";

interface OrdemRequest{
  user_id: string;
}

class AtivarUsuarioServico{
  async execute({ user_id }: OrdemRequest){

    const ordem = await prismaClient.usuario.update({
      where:{
        id: user_id
      },
      data:{
        situacao: true,
      }
    })

    return ordem;

  }
}

export { AtivarUsuarioServico }