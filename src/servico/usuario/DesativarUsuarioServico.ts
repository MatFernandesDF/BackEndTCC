import prismaClient from "../../prisma";

interface OrdemRequest{
  user_id: string;
}

class DesativarUsuarioServico{
  async execute({ user_id }: OrdemRequest){

    const ordem = await prismaClient.usuario.update({
      where:{
        id: user_id
      },
      data:{
        situacao: false,
      }
    })

    return ordem;

  }
}

export { DesativarUsuarioServico }