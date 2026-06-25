import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema
} from '@modelcontextprotocol/sdk/types.js'

import type { MCPResponse } from './types.js'
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
  applyHandoff,
  buildValidated,
  manifests,
  getTokenCost
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
  version?: string
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
      tools: {},
      resources: {},
      prompts: {}
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
          version: {
            type: 'string',
            description: 'The expected schema version of the handoff snapshot'
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
    },
    {
      name: 'build_validated',
      description:
        'Generate ignix-lite UI from plain English description, validate rules, audit accessibility, and optionally preview in one round-trip.',
      inputSchema: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            description:
              'The natural language description of the UI layout or component to build'
          },
          options: {
            type: 'object',
            properties: {
              preview: {
                type: 'boolean',
                description: 'Whether to generate a visual PNG preview'
              },
              width: {
                type: 'number',
                description: 'Width of the preview viewport'
              },
              theme: {
                type: 'string',
                description: 'Theme scheme for preview (light or dark)'
              },
              scale: {
                type: 'number',
                description: 'Device scale factor'
              }
            }
          }
        },
        required: ['description']
      }
    },
    {
      name: 'get_token_cost',
      description:
        'Compare the token cost (footprint) of Ignix-Lite vs. a utility-first (Tailwind CSS) equivalent.',
      inputSchema: {
        type: 'object',
        properties: {
          html: {
            type: 'string',
            description: 'The Ignix-Lite HTML markup to analyze'
          }
        },
        required: ['html']
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

    case 'build_validated': {
      const compositeArgs = args as {
        description: string
        options?: {
          width?: number
          theme?: string
          scale?: number
          preview?: boolean
        }
      }
      response = await buildValidated(compositeArgs)
      break
    }

    case 'get_token_cost': {
      const costArgs = args as { html: string }
      response = getTokenCost(costArgs.html ?? '')
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

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'manifests://all',
      name: 'All Component Manifests',
      description:
        'Single bundled resource containing manifests for all 28 Ignix-Lite components',
      mimeType: 'application/json'
    }
  ]
}))

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params
  if (uri === 'manifests://all') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(manifests)
        }
      ]
    }
  }
  throw new Error(`Resource not found: ${uri}`)
})

server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: [
    {
      name: 'ignix-rules',
      description:
        'System instructions and guidelines to configure an agent to generate valid, semantic, classless Ignix-Lite HTML markup.'
    }
  ]
}))

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name } = request.params
  if (name === 'ignix-rules') {
    return {
      description: 'System instructions for generating valid Ignix-Lite HTML.',
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              'Here are the core rules for generating valid Ignix-Lite HTML markup:',
              '1. **Classless & Semantic Tags**: Do NOT use class attributes. Always use semantic tags for components:',
              '   - `<button>` for buttons',
              '   - `<aside>` for alerts',
              '   - `<details>` & `<summary>` for accordions',
              '   - `<mark>` or `span[role=status]` for badges',
              '   - `<img>` / `span` for avatars',
              '   - `<article>` for cards',
              '   - `<progress>` for progress indicators',
              '   - `<meter>` for scalar progress measurements',
              '   - `<dialog>` for modal dialogs',
              '   - `<hr>` for dividers',
              '   - `pre > code` for codeblocks',
              '   - `ix-dropdown`, `ix-combobox`, `ix-tabs`, `ix-tooltip`, `ix-toast` for advanced components',
              '2. **Visual Intent & Sizing**: Use custom data attributes instead of CSS utility classes:',
              '   - `data-intent="primary|danger|warning|success|neutral|ghost"` for colors',
              '   - `data-size="sm|md|lg"` for sizes',
              '3. **Layout Primitives**: Structure pages and groups using `data-layout` elements:',
              '   - `<div data-layout="stack" data-gap="lg">` for vertical lists',
              '   - `<div data-layout="inline" data-gap="md">` for horizontal rows',
              '   - `<div data-layout="grid" data-cols="3">` for grids',
              '   - `<div data-layout="box" data-pad="md">` for padded blocks/panels',
              '   - `<div data-layout="split">` for title-actions headers',
              '4. **Accessibility (WCAG AA)**: Always wrap `<input>` and `<textarea>` inside `<label>` elements. Always provide alternative text (`alt` attribute) on `<img>` avatar elements. Dialogs require unique `id` attributes.'
            ].join('\n')
          }
        }
      ]
    }
  }
  throw new Error(`Prompt not found: ${name}`)
})

async function start() {
  console.error('API loaded')
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Ignix MCP started')
}

start()
