import Stripe from "stripe";

export const stripe = Stripe(process.env.STRIPE_SK);

//since stripe returns price in lowest currency unit so its returing amount in paisa and we are converting it to rupee like below
export const formatAmount = (price) => "₹ " + price / 100;
