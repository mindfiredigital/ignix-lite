import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  ListToolsRequestSchema,
  CallToolRequestSchema
} from '@modelcontextprotocol/sdk/types.js'

import { listComponents } from './tools/list-components.js'
import { getManifest } from './tools/get-manifests.js'
import { getEmmet } from './tools/get-emmet.js'
import { validate } from './tools/validator.js'
import { howToBuild } from './tools/intent-engine.js'

type ValidateArgs = {
  html?: string
}

type IntentArgs = {
  description?: string
}

const server = new Server(
  {
    name: 'ignix-lite',
    version: '2.0.0'
  },

  {
    capabilities: {
      tools: {}
    }
  }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'list_components',
      description: 'List all ignix-lite components',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    },

    {
      name: 'get_manifest',
      description: 'Get component manifest',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          }
        },

        required: ['name']
      }
    },

    {
      name: 'get_emmet',
      description: 'Get emmet pattern',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          }
        },
        required: ['name']
      }
    },

    {
      name: 'validate',
      description: 'Validate ignix-lite html',
      inputSchema: {
        type: 'object',
        properties: {
          html: {
            type: 'string'
          }
        },
        required: ['html']
      }
    },

    {
      name: 'how_to_build',
      description: 'Convert plain english to ignix-lite UI',
      inputSchema: {
        type: 'object',
        properties: {
          description: {
            type: 'string'
          }
        },
        required: ['description']
      }
    }
  ]
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  switch (name) {
    case 'list_components':
      return listComponents()

    case 'get_manifest':
      return getManifest(args)

    case 'get_emmet':
      return getEmmet(args)

    case 'validate': {
      const validateArgs = args as ValidateArgs

      return validate(validateArgs.html ?? '')
    }

    case 'how_to_build': {
      const intentArgs = args as IntentArgs

      return howToBuild(intentArgs.description ?? '')
    }

    default:
      return {
        content: [
          {
            type: 'text',

            text: JSON.stringify({
              error: `Unknown tool: ${name}`
            })
          }
        ]
      }
  }
})

async function start() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.log('Ignix MCP started')
}
start()
