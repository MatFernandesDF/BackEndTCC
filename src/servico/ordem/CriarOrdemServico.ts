import prismaClient from "../../prisma";
interface OrdemRequest{
    mesa?:number;
    nome:string;
    usuario_id:string;
}

class CriarOrdemServico{
    async execute({nome, mesa,usuario_id}:OrdemRequest){

        const ordem = await prismaClient.ordem.create({
            data:{
                mesa:mesa,
                nome:nome,
                usuario_id
            }
        })
    
        return ordem;

    }


    }

export{CriarOrdemServico}