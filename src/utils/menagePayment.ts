import { stripe } from './stripe';
import prismaClient from '../prisma/index';

export async function savePayment(
  paymentId: string,
  customerId: string,
  ordem_id: string,
  Atualizar: boolean = false,
) {
  try {

    const findUser = await prismaClient.usuario.findFirst({
      where: {
        stripe_customer_id: customerId,
      },
    });

    if (!findUser) {
      console.error('User not found for this customer ID:', customerId);
      return;
    }

  
    const session = await stripe.checkout.sessions.retrieve(paymentId);
    const amountPaid = session.amount_total / 100; 
    const currency = session.currency;

    if (Atualizar) {
 
      await prismaClient.ordem.update({
        where: {
          id: ordem_id,
        },
        data: {
          rascunho: false,
          valor_pago: amountPaid.toString(), 
          
        },
      });

   

      console.log("Atualização bem-sucedida e valor pago atualizado no banco de dados");
    }
  } catch (err) {
    console.log("ERRO NA ATUALIZAÇÃO");
    console.error(err);
  }
}