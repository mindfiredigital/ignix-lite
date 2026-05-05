export type ToolName =
  | "list_components"
  | "get_manifest"
  | "get_emmet"
  | "validate"

export type ToolRequest = {
  params: {
    name: ToolName
    arguments?: unknown
  }
}

export type MCPResponse = {
  content: {
    type: "text"
    text: string
  }[]
}