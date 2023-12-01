import prismaClient from "../../prisma";

class DetalheDeUsuarioServico{
    async execute(usuario_id: string){
        const usuario = await prismaClient.usuario.findFirst({
         where:{
            id:usuario_id
         },
         select:{
          id:true,
          nome:true,
          email:true,
          nivel_acesso:true,
         }
        })
           return usuario;
         }
       }
export { DetalheDeUsuarioServico }