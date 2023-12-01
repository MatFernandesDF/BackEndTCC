import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'
 
interface AutenticarRequest{
    email:string;
    senha:string;
}
class AutenticarUsuarioServico{
    async execute({email,senha}: AutenticarRequest){
        console.log(email);
        const usuario =  await prismaClient.usuario.findFirst({
            where:{
                email:email,
                situacao: true
            }

        })
        if(!usuario){
            throw new Error ("Usuario ou senha incorreto")
        }
        const senhaMatch = await compare(senha, usuario.senha)

        if (!senhaMatch){
            throw new Error ("Usuario ou senha incorreto")
        }

        const token = sign(
            {
                nome:usuario.nome,
                email:usuario.email

            },
                process.env.JWT_SECRET,
                {
                    subject:usuario.id,
                    expiresIn:'30d'
                }
        )

        return{
            id:usuario.id,
            nome:usuario.nome,
            email:usuario.email,
            nivel_acesso:usuario.nivel_acesso,
            token:token
    

        }
    }
}

export { AutenticarUsuarioServico };