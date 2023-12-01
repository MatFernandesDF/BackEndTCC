import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UsuarioRequest {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    id: string;
}

class CriarUsuarioServico {
    async execute({ id, nome, email, senha, confirmarSenha }: UsuarioRequest) {
        if (!id) {
            throw new Error("id incorreto");
        }

        if (senha !== confirmarSenha) {
            throw new Error("A senha e a confirmação de senha não coincidem");
        }
        const emailJaExiste = await prismaClient.usuario.findFirst({
            where: {
                email: email,
            },
        });

        if (emailJaExiste) {
            throw new Error("Email já está em uso");
        }


        const usuarioJaExiste = await prismaClient.usuario.findFirst({
            where: {
                id: id,
            },
        }); 
        const senhaHash = await hash(senha, 8);

        if (usuarioJaExiste) {
            throw new Error("Usuário já existe");
        }

        const usuario = await prismaClient.usuario.create({
            data: {
                id: id,
                nome: nome,
                email: email,
                senha: senhaHash,
            },
            select: {
                nome: true,
                email: true,
            },
        });

        console.log("Usuário cadastrado com sucesso");

        return usuario;
    }
}

export { CriarUsuarioServico };