import prismaClient from "../../prisma";

class DetalheDeUsuarioServico{
    async execute(user_id: string){
        const user = await prismaClient.usuario.findFirst({
         where:{
            id:user_id
         },
         select:{
          id:true,
          nome:true,
          email:true,
          nivel_acesso:true,
         }
        })
           return user;
         }
       }
export { DetalheDeUsuarioServico }