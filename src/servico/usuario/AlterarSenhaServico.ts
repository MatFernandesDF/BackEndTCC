import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class AlterarSenhaServico {
  async execute({ usuario_id, novasenha, confirmarsenha }: { usuario_id: string; novasenha: string; confirmarsenha: string }) {
    if (novasenha !== confirmarsenha) {
      throw new Error("A nova senha e a confirmação de senha não correspondem.");
    }


    const senhaHash = await bcrypt.hash(novasenha, 10);


    await prisma.usuario.update({
      where: { id: usuario_id },
      data: { senha: senhaHash },
    });

    return {
      message: "Senha alterada com sucesso.",
    };
  }
}

export {AlterarSenhaServico};