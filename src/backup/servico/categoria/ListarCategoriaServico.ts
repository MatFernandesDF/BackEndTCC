import prismaClient from "../../prisma";

class ListarCategoriaServico{
    async execute() {
        const categoria = await prismaClient.categoria.findMany({
            select:{
                id:true,
                nome:true,
            }
        })

        return categoria;
    }

}
export {ListarCategoriaServico}