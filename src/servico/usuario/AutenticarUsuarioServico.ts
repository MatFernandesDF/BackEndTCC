import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'
 
interface AuthRequest{
    email:string;
    senha:string;
}
class AutenticarUsuarioServico{
    async execute({email,senha}: AuthRequest){
        console.log(email);
        const user =  await prismaClient.usuario.findFirst({
            where:{
                email:email,
                situacao: true
            }

        })
        if(!user){
            throw new Error ("Usuario ou senha incorreto")
        }
        const passwordMatch = await compare(senha, user.senha)

        if (!passwordMatch){
            throw new Error ("Usuario ou senha incorreto")
        }

        const token = sign(
            {
                nome:user.nome,
                email:user.email

            },
                process.env.JWT_SECRET,
                {
                    subject:user.id,
                    expiresIn:'30d'
                }
        )

        return{
            id:user.id,
            nome:user.nome,
            email:user.email,
            nivel_acesso:user.nivel_acesso,
            token:token
    

        }
    }
}

export { AutenticarUsuarioServico };