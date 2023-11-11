import prismaClient from "../../prisma";

interface CategoriaRequest{
    nome:string;
    banner: string;
}

class CriarCategoriaServico{
    async execute({nome,banner}:CategoriaRequest){

       if (nome== '') {
            throw new Error('Nome invalido')
       } 
       const categoria = await prismaClient.categoria.create({
        data:{
            nome:nome,
            banner:banner,
        },
        select:{
            id:true,
            nome:true,
            banner:true,
        }   
        })
        return categoria;
    }
}

export { CriarCategoriaServico }