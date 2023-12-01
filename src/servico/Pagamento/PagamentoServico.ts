import prismaClient from "../../prisma";
import Stripe from 'stripe';
export interface PagamentoRequest {
  usuario_id: string;
  valor: number;
  ordem_id:string;
}
class PagamentoServico {
  async execute({ usuario_id, valor, ordem_id }: PagamentoRequest) {
    const stripe = new Stripe(
      process.env.STRIPE_API_KEY,
      {
        apiVersion: '2023-08-16',
        appInfo: {
          name: 'DigiFood',
          version: '1',
        }
      }
    );

    const encontrarUsuario = await prismaClient.usuario.findFirst({
      where: {
        id: usuario_id
      }
    });

    if (!encontrarUsuario) {
      throw new Error('Usuario não existe.');
    }

    let customerId = encontrarUsuario.stripe_customer_id;

    if (!customerId) {
      const stripeCustomizado = await stripe.customers.create({
        email: encontrarUsuario.email
      });

      await prismaClient.usuario.update({
        where: {
          id: usuario_id
        },
        data: {
          stripe_customer_id: stripeCustomizado.id
        }
      });

      customerId = stripeCustomizado.id;
    }

    
    const checkout = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'brl',
          product_data: {
            name: 'Consumo no DigiFood',
            description: 'Valor total do consumo no restaurante.'
          },
          unit_amount: valor,
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url:process.env.STRIPE_SUCCESS_URL,
      cancel_url:process.env.STRIPE_CANCEL_URL,
      metadata: { 
        ordem_id: ordem_id
    }
    });

    return { sessionId: checkout.id };
  }
}

export { PagamentoServico };