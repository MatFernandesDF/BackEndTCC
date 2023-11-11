import prismaClient from "../../prisma";
interface OrdemRequest{
    mesa:number;
    nome:string;

}

class CriarOrdemServico{
    async execute({nome, mesa}:OrdemRequest){

        const ordem = await prismaClient.ordem.create({
            data:{
                mesa:mesa,
                nome:nome
            }
        })
    
        return ordem;

    }


    }

export{CriarOrdemServico}