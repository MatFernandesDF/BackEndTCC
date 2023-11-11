import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from '../../utils/stripe';
import { savePayment } from '../../utils/menagePayment';

class WebhooksControle {
  async handle(request: Request, response: Response) {
    let event: Stripe.Event = request.body;

    let endpointSecret: 'whsec_1462c579e8a6f80a6c04e8526d3c052f73000af3eba8d934b1158da03f3d53a6'

    if (endpointSecret) {
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch(err) {
        console.log("Webhook signature failed", err.message);
        return response.sendStatus(400);
      }
    }

    switch(event.type) {
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        
        const ordem_id = checkoutSession.metadata.ordem_id;  
        await savePayment(
          checkoutSession.id,
          checkoutSession.customer.toString(),
          ordem_id,
          true,

        );
        break;

      // Adicione outros casos de evento conforme necessário

      default:
        console.log(`Evento desconhecido ${event.type}`);
    }

    return response.sendStatus(200);
  }
}

export { WebhooksControle };