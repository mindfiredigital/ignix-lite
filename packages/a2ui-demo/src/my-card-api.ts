import { z } from 'zod'
import { CommonSchemas } from '@a2ui/web_core/v0_9'

export const MyCardApi = {
  name: 'IgnixCard',
  schema: z.object({
    title: CommonSchemas.DynamicString,
    body: CommonSchemas.DynamicString,
    onClick: CommonSchemas.Action.optional()
  })
}
