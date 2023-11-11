import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserRequest {
    nome: string;
    email: string;
    senha: string;
    dataNascimento: string;
    confirmarSenha: string; // Adicionando o campo de confirmação de senha
    id: string;
}

class CriarUsuarioServico {
    async execute({ id, nome, email, senha, confirmarSenha,dataNascimento }: UserRequest) {
        if (!id) {
            throw new Error("id incorreto");
        }

        if (senha !== confirmarSenha) {
            throw new Error("A senha e a confirmação de senha não coincidem");
        }

        const userAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                id: id,
            },
        }); 
        const passwordHash = await hash(senha, 8);

        if (userAlreadyExists) {
            throw new Error("Usuário já existe");
        }

        const user = await prismaClient.usuario.create({
            data: {
                id: id,
                nome: nome,
                email: email,
                senha: passwordHash,
                dataNascimento:dataNascimento
            },
            select: {
                nome: true,
                email: true,
            },
        });

        console.log("Usuário cadastrado com sucesso");

        return user;
    }
}

export { CriarUsuarioServico };