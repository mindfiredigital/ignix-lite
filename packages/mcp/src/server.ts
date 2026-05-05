import { Server } from "@modelcontextprotocol/sdk/server"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio"

import type { ToolRequest, MCPResponse } from "./types.js"

import { listComponents } from "./tools/list-components.js"
import { getManifest } from './tools/get-manifests.js'
import { getEmmet } from "./tools/get-emmet.js"
import { validate } from "./tools/validator.js"

const server = new Server(
  {
    name: "ignix-lite",
    version: "2.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
)

server.setRequestHandler(
  "tools/call" as unknown as never,
  async (request: ToolRequest): Promise<MCPResponse> => {
    const { name, arguments: args } = request.params

switch (name) {
  case "list_components":
    return listComponents()

  case "get_manifest":
    return getManifest(args)

  case "get_emmet":
    return getEmmet(args)

  case "validate":   
    if (typeof args !== "string") {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "validate expects HTML string",
              tokens_used: 1
            })
          }
        ]
      }
    }

    return validate(args)

  default:
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            error: `Unknown tool: ${name}`,
            tokens_used: 1
          })
        }
      ]
    }
}
  }
)

async function start() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

start()