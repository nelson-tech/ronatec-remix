import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser"

import { ParsedTabs } from "."
import { Link } from "@remix-run/react"

export const htmlParserOptions: HTMLReactParserOptions =
  typeof window === "undefined"
    ? {}
    : {
        replace: (domNode) => {
          if (domNode instanceof Element) {
            if (
              domNode.attributes.find((a) => a.name === "class")?.value ===
              "menu-link"
            ) {
              const url = domNode.attribs.href
              const title = domNode.attribs.title

              return (
                <div className="text-highlight hover:text-accent transition px-2 underline">
                  <Link to={url} title={title}>
                    {domToReact(domNode.children, htmlParserOptions)}
                  </Link>
                </div>
              )
            } else if (
              domNode.attributes.find((a) => a.name === "class")?.value ===
              "tab-group"
            ) {
              return <ParsedTabs domNode={domNode} />
            }
          }
        },
      }

export default parse
