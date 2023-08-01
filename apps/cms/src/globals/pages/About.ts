import { GlobalConfig } from "payload/types"
import CardsArrayField from "../../fields/cardsArray"

const AboutPage: GlobalConfig = {
  slug: "about",
  access: {
    read: () => true,
  },
  admin: {
    group: "Pages",
  },
  versions: true,
  fields: [CardsArrayField],
}

export default AboutPage
