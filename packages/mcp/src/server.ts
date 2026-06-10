import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  ListToolsRequestSchema,
  CallToolRequestSchema
} from '@modelcontextprotocol/sdk/types.js'

import type { MCPResponse } from './types.js'
import { apiContext } from './context/api-context.js'
import {
  listComponents,
  getManifest,
  getEmmet,
  validateHtml,
  howToBuild,
  generateTheme,
  auditA11y,
  preview,
  getTokenSummary,
  recordCall,
  createHandoff,
  applyHandoff
} from '@mindfiredigital/ignix-lite-engine'

type ValidateArgs = {
  html?: string
}

type IntentArgs = {
  description?: string
}

type A11yArgs = {
  html?: string
}

type PreviewArgs = {
  input: string
  options?: {
    width?: number
    theme?: string
    scale?: number
  }
}

type CreateHandoffArgs = {
  rendered_html: string
  metadata?: Record<string, unknown>
}

type ApplyHandoffArgs = {
  handoff_id: string
  changes: Array<{
    selector: string
    action: 'update' | 'add' | 'remove'
    emmet?: string
    html?: string
  }>
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
    },
    {
      name: 'generate_theme',
      description: 'Generate ignix theme tokens',
      inputSchema: {
        type: 'object',
        properties: {
          prompt: {
            type: 'string'
          }
        },
        required: ['prompt']
      }
    },
    {
      name: 'check_a11y',
      description: 'Check accessibility',
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
      name: 'preview',
      description: 'Render visual preview to PNG',
      inputSchema: {
        type: 'object',
        properties: {
          input: {
            type: 'string'
          },
          options: {
            type: 'object',
            properties: {
              width: {
                type: 'number'
              },
              theme: {
                type: 'string'
              },
              scale: {
                type: 'number'
              }
            }
          }
        },
        required: ['input']
      }
    },
    {
      name: 'get_token_summary',
      description: 'Get session token summary and budget details',
      inputSchema: {
        type: 'object',
        properties: {
          context_window: {
            type: 'number',
            description: 'Optional model context window size'
          }
        }
      }
    },
    {
      name: 'create_handoff',
      description: 'Create multi-agent handoff snapshot',
      inputSchema: {
        type: 'object',
        properties: {
          rendered_html: {
            type: 'string'
          },
          metadata: {
            type: 'object'
          }
        },
        required: ['rendered_html']
      }
    },
    {
      name: 'apply_handoff',
      description: 'Apply changes to an existing handoff snapshot',
      inputSchema: {
        type: 'object',
        properties: {
          handoff_id: {
            type: 'string'
          },
          changes: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                selector: {
                  type: 'string'
                },
                action: {
                  type: 'string',
                  enum: ['update', 'add', 'remove']
                },
                emmet: {
                  type: 'string'
                },
                html: {
                  type: 'string'
                }
              },
              required: ['selector', 'action']
            }
          }
        },
        required: ['handoff_id', 'changes']
      }
    }
  ]
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params
  console.error('TOOL CALLED:', name)
  let response: MCPResponse

  switch (name) {
    case 'list_components':
      response = listComponents()
      break

    case 'get_manifest':
      response = getManifest(args)
      break

    case 'get_emmet':
      response = getEmmet(args)
      break

    case 'validate': {
      const validateArgs = args as ValidateArgs
      const result = validateHtml(validateArgs.html ?? '')
      response = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              ...result,
              tokens_used: 50
            })
          }
        ]
      }
      break
    }

    case 'how_to_build': {
      const intentArgs = args as IntentArgs
      response = await howToBuild(intentArgs.description ?? '')
      break
    }

    case 'generate_theme':
      response = generateTheme(args)
      break

    case 'check_a11y': {
      const a11yArgs = args as A11yArgs
      const result = auditA11y(a11yArgs.html ?? '')
      response = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              ...result,
              tokens_used: Math.min(60, 20 + result.issues.length * 3)
            })
          }
        ]
      }
      break
    }

    case 'preview': {
      const previewArgs = args as PreviewArgs
      response = await preview(previewArgs)
      break
    }

    case 'get_token_summary': {
      const tokenArgs = args as { context_window?: number }
      response = getTokenSummary(tokenArgs)
      break
    }

    case 'create_handoff': {
      const handoffArgs = args as CreateHandoffArgs
      response = createHandoff(handoffArgs)
      break
    }

    case 'apply_handoff': {
      const applyArgs = args as ApplyHandoffArgs
      response = applyHandoff(applyArgs)
      break
    }

    default:
      response = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: `Unknown tool: ${name}`
            })
          }
        ]
      }
      break
  }

  // Intercept and record tokens_used if present in the response
  if (
    response &&
    response.content &&
    response.content[0] &&
    response.content[0].text
  ) {
    try {
      const parsed = JSON.parse(response.content[0].text)
      if (parsed && typeof parsed.tokens_used === 'number') {
        recordCall(name, parsed.tokens_used)
      }
    } catch {
      // Ignore if response text is not valid JSON
    }
  }

  return response
})

async function start() {
  console.error('API loaded')
  console.error(apiContext.length)
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Ignix MCP started')
}

start()
