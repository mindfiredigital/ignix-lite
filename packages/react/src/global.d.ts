import * as React from "react"

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ix-combobox": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          multiple?: boolean
          "data-intent"?: string
        },
        HTMLElement
      >

      "ix-dropdown": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "data-intent"?: string
        },
        HTMLElement
      >

      "ix-tabs": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "data-variant"?: string
        },
        HTMLElement
      >

    "ix-toast": React.DetailedHTMLProps<
    React.HTMLAttributes<IxToastElement> & {
          "data-position"?: string
        },
        IxToastElement
      >

      "ix-tooltip": React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    content?: string
    "data-intent"?: string
    "data-position"?: string
  },
  HTMLElement
>
    }
  }
}