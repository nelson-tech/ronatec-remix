import { CollectionAfterChangeHook, PayloadRequest } from "payload/types"
import { checkRole } from "../../../../access/checkRole"
import removeCartFromUser from "../../utils/removeCartFromUser"
import { Cart, User } from "payload/generated-types"

const updateUserHook: CollectionAfterChangeHook<Cart> = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update'
}) => {
  if (req.user) {
    const user = (req as PayloadRequest<User>).user

    const currentOwner = typeof doc.user === "object" ? doc.user.id : doc.user
    const previousOwner =
      typeof previousDoc.user === "object"
        ? previousDoc?.user.id
        : previousDoc.user

    const newOwner = previousOwner !== currentOwner

    if (newOwner && user) {
      const isAdmin = checkRole(["admin"], user)

      // remove cart from previous owner if exists
      if (previousOwner && (isAdmin || previousOwner === user.id)) {
        await removeCartFromUser(previousOwner, req.payload)
      }

      // add cart to new owner if admin or actual user
      if (currentOwner && (isAdmin || user.id === currentOwner)) {
        await req.payload.update({
          collection: "users",
          id: currentOwner,
          data: { cart: doc.id },
        })
      }
    }
  }

  return doc
}

export default updateUserHook
