import prismaClient from "../../prisma";
import Stripe from 'stripe';
export interface PagamentoRequest {
  user_id: string;
  valor: number;
  ordem_id:string;
}
class PagamentoServico {
  async execute({ user_id, valor, ordem_id  }: PagamentoRequest) {
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

    // Buscar o usuário e cadastrar ele no Stripe caso não tenha cadastrado
    const findUser = await prismaClient.usuario.findFirst({
      where: {
        id: user_id
      }
    });

    if (!findUser) {
      throw new Error('User not found.');
    }

    let customerId = findUser.stripe_customer_id;

    if (!customerId) {
      // Caso não tenha, criamos como cliente lá no Stripe
      const stripeCustomer = await stripe.customers.create({
        email: findUser.email
      });

      await prismaClient.usuario.update({
        where: {
          id: user_id
        },
        data: {
          stripe_customer_id: stripeCustomer.id
        }
      });

      customerId = stripeCustomer.id;
    }

    
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
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
      success_url: `${process.env.STRIPE_SUCCESS_URL}?status=success`,
      cancel_url: `${process.env.STRIPE_CANCEL_URL}?status=failed`,
      metadata: { // Adicione o metadado aqui
        ordem_id: ordem_id
    }
    });

    return { sessionId: stripeCheckoutSession.id };
  }
}

export { PagamentoServico };