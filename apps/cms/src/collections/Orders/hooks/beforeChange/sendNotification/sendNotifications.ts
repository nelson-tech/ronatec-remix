// sync user purchases and delete their cart when they place an order

import { BeforeChangeHook } from "payload/dist/collections/config/types"
import { Order } from "payload/generated-types"
import type { SendMailOptions } from "nodemailer"
import receipt from "./html/receipt"
import adminNotification from "./html/adminNotification"

const sendNotification: BeforeChangeHook<Order> = async ({
  req,
  data,
  originalDoc,
  // operation
}) => {
  if (!data.notified) {
    if (originalDoc?.notified) {
      // update notification
      console.log("Should send an update notification.")
    } else {
      // first notification
      // notify customer
      const customerEmail: SendMailOptions = {
        to: data.orderedBy?.email,
        subject: `Ronatec C2C | Order #${data.orderNumber} received!`,
        html: receipt(data),
      }
      req.payload.sendEmail(customerEmail)

      // notify admin

      const adminEmail: SendMailOptions = {
        to: (await req.payload.findGlobal({ slug: "settings" })).orders
          .adminEmail,
        subject: `New order placed! | Order #${data.orderNumber}`,
        html: adminNotification(data),
      }
      req.payload.sendEmail(adminEmail)

      // set order as notified
      data.notified = true
    }
  }
}

export default sendNotification
