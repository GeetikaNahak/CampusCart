import { Request, Response } from "express";
import Stripe from "stripe";
import Store, { MenuItemType } from "../models/store";
import { create } from "domain";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;

    }[];
    storeId: string;

}

const createCheckoutSession = async (req: Request, res: Response):Promise<any> => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;
        const store = await Store.findById(checkoutSessionRequest.storeId);
        if (!store) {
            throw new Error("Store not found");
        }
        const lineItems = createLineItems(checkoutSessionRequest, store.items);
        const session=await createSession(lineItems,"TEST_ORDER_ID",store.id.toString());
        if(!session.url){
            return res.status(500).json({message:"Error Creating Stripe Session"});
        }
        res.json({url:session.url});
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.raw.message });
    }
}

const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[]) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString())
        if (!menuItem) {
            throw new Error(`menu item not found: ${cartItem.menuItemId}`);}
            const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
                price_data: {
                    currency: "gbp",
                    unit_amount: menuItem?.price,
                    product_data: {
                        name: menuItem.name,
                    },
                },
                quantity: parseInt(cartItem.quantity),
            }
            
        return line_item;
    })
    return lineItems;

}

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  storeId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    metadata: {
      orderId,
      storeId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${storeId}?cancelled=true`,
  });

  return sessionData;
};

export default{
    createCheckoutSession,
}