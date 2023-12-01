import { stripe } from './stripe';
import prismaClient from '../prisma/index';

export async function salvarPagamento(
  paymentId: string,
  customerId: string,
  ordem_id: string,
  Atualizar: boolean = false,
) {
  try {

    const encontrarUsuario = await prismaClient.usuario.findFirst({
      where: {
        stripe_customer_id: customerId,
      },
    });

    if (!encontrarUsuario) {
      console.error('Usuário não encontrado para este ID de cliente:', customerId);
      return;
    }

  
    const sessão = await stripe.checkout.sessions.retrieve(paymentId);
    const quantiaPaga = sessão.amount_total / 100; 
    const currency = sessão.currency;

    if (Atualizar) {
 
      await prismaClient.ordem.update({
        where: {
          id: ordem_id,
        },
        data: {
          rascunho: false,
          valor_pago: quantiaPaga.toString(), 
          
        },
      });

   

      console.log("Atualização bem-sucedida e valor pago atualizado no banco de dados");
    }
  } catch (err) {
    console.log("ERRO NA ATUALIZAÇÃO");
    console.error(err);
  }
}