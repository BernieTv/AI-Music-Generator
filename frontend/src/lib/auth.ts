import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "~/server/db";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "03b02167-191a-4c0d-b2b6-bdb564ca01b0",
              slug: "small",
            },
            {
              productId: "d41cce00-ecb4-440f-b84b-aaa6d214323c",
              slug: "medium",
            },
            {
              productId: "b36a1e20-2ca2-4cbb-b992-c494e7a76c22",
              slug: "large",
            },
          ],
          successUrl: "/",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer ID found.");
              throw new Error("No external customer id found.");
            }

            const productId = order.data.productId;

            let creditsToAdd = 0;

            switch (productId) {
              case "03b02167-191a-4c0d-b2b6-bdb564ca01b0":
                creditsToAdd = 10;
                break;
              case "d41cce00-ecb4-440f-b84b-aaa6d214323c":
                creditsToAdd = 25;
                break;
              case "b36a1e20-2ca2-4cbb-b992-c494e7a76c22":
                creditsToAdd = 50;
                break;
            }

            await db.user.update({
              where: { id: externalCustomerId },
              data: {
                credits: {
                  increment: creditsToAdd,
                },
              },
            });
          },
        }),
      ],
    }),
  ],
});
