import { parse } from 'node-html-parser'
import { getTokenCount } from '../utils/tokenizer.js'
import type { MCPResponse } from '../types.js'

function estimateTailwindEquivalent(html: string): string {
  const root = parse(html)

  const traverse = (node: any) => {
    if (node.nodeType !== 1) return

    let twClasses: string[] = []
    const tagName = node.tagName?.toLowerCase()

    if (node.hasAttribute('data-layout')) {
      const layout = node.getAttribute('data-layout')
      const gap = node.getAttribute('data-gap') || 'md'
      const pad = node.getAttribute('data-pad') || 'md'

      const gapMap: Record<string, string> = { none: 'gap-0', xs: 'gap-1', sm: 'gap-2', md: 'gap-4', lg: 'gap-6', xl: 'gap-8' }
      const padMap: Record<string, string> = { none: 'p-0', xs: 'p-2', sm: 'p-4', md: 'p-6', lg: 'p-8', xl: 'p-12' }

      if (layout === 'stack') {
        twClasses.push('flex', 'flex-col', gapMap[gap] || 'gap-4')
      }
      else if (layout === 'inline') {
        twClasses.push('flex', 'flex-row', 'items-center', gapMap[gap] || 'gap-4')
      }
      else if (layout === 'cluster') {
        twClasses.push('flex', 'flex-row', 'flex-wrap', 'items-center', gapMap[gap] || 'gap-4')
      }
      else if (layout === 'grid') {
        const cols = node.getAttribute('data-cols') || '3'
        twClasses.push('grid', `grid-cols-${cols}`, gapMap[gap] || 'gap-4')
      }
      else if (layout === 'box') {
        twClasses.push('block', padMap[pad] || 'p-6', 'bg-white', 'border', 'border-gray-200', 'rounded-lg')
      }
      else if (layout === 'center') {
        twClasses.push('flex', 'items-center', 'justify-center')
      }
      else if (layout === 'split') {
        twClasses.push('flex', 'flex-row', 'justify-between', 'items-center', gapMap[gap] || 'gap-4')
      }

      node.removeAttribute('data-layout')
      node.removeAttribute('data-gap')
      node.removeAttribute('data-pad')
      node.removeAttribute('data-align')
      node.removeAttribute('data-justify')
    }

    if (tagName === 'button') {
      const intent = node.getAttribute('data-intent') || 'primary'
      twClasses.push('px-4', 'py-2', 'font-medium', 'rounded-md', 'shadow-sm', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'transition-colors')
      if (intent === 'primary') {
        twClasses.push('bg-blue-600', 'hover:bg-blue-700', 'text-white', 'focus:ring-blue-500')
      }
      else if (intent === 'danger') {
        twClasses.push('bg-red-600', 'hover:bg-red-700', 'text-white', 'focus:ring-red-500')
      }
      else if (intent === 'warning') {
        twClasses.push('bg-amber-500', 'hover:bg-amber-600', 'text-white', 'focus:ring-amber-500')
      }
      else if (intent === 'success') {
        twClasses.push('bg-emerald-600', 'hover:bg-emerald-700', 'text-white', 'focus:ring-emerald-500')
      }
      else if (intent === 'neutral') {
        twClasses.push('bg-gray-100', 'hover:bg-gray-200', 'text-gray-800', 'focus:ring-gray-500')
      }
      else if (intent === 'ghost') {
        twClasses.push('bg-transparent', 'hover:bg-gray-50', 'text-gray-600', 'focus:ring-gray-500', 'shadow-none')
      }
      node.removeAttribute('data-intent')

    }
    else if (tagName === 'aside' && node.hasAttribute('data-intent')) {
      const intent = node.getAttribute('data-intent') || 'info'
      twClasses.push('p-4', 'rounded-md', 'border', 'flex', 'gap-3')
      if (intent === 'danger') {
        twClasses.push('bg-red-50', 'border-red-200', 'text-red-800')
      }
      else if (intent === 'warning') {
        twClasses.push('bg-amber-50', 'border-amber-200', 'text-amber-800')
      }
      else if (intent === 'success') {
        twClasses.push('bg-emerald-50', 'border-emerald-200', 'text-emerald-800')
      }
      else {
        twClasses.push('bg-blue-50', 'border-blue-200', 'text-blue-800')
      }
      node.removeAttribute('data-intent')

    }
    else if (tagName === 'article') {
      twClasses.push('p-6', 'bg-white', 'border', 'border-gray-200', 'rounded-xl', 'shadow-sm', 'flex', 'flex-col', 'gap-4')
    }
    else if (tagName === 'mark' && node.hasAttribute('data-intent')) {
      const intent = node.getAttribute('data-intent') || 'neutral'
      twClasses.push('inline-flex', 'items-center', 'px-2.5', 'py-0.5', 'rounded-full', 'text-xs', 'font-medium')
      if (intent === 'success') {
        twClasses.push('bg-green-100', 'text-green-800')
      }
      else if (intent === 'danger') {
        twClasses.push('bg-red-100', 'text-red-800')
      }
      else if (intent === 'warning') {
        twClasses.push('bg-yellow-100', 'text-yellow-800')
      } else {
        twClasses.push('bg-gray-100', 'text-gray-800')
      }
      node.removeAttribute('data-intent')

    }
    else if (tagName === 'input') {
      twClasses.push('block', 'w-full', 'rounded-md', 'border-gray-300', 'shadow-sm', 'focus:border-blue-500', 'focus:ring-blue-500', 'sm:text-sm', 'px-3', 'py-2', 'border')
    }
    else if (tagName === 'select') {
      twClasses.push('block', 'w-full', 'rounded-md', 'border-gray-300', 'shadow-sm', 'focus:border-blue-500', 'focus:ring-blue-500', 'sm:text-sm', 'px-3', 'py-2', 'border')
    }
    else if (tagName === 'textarea') {
      twClasses.push('block', 'w-full', 'rounded-md', 'border-gray-300', 'shadow-sm', 'focus:border-blue-500', 'focus:ring-blue-500', 'sm:text-sm', 'px-3', 'py-2', 'border')
    }

    if (twClasses.length > 0) {
      const existingClass = node.getAttribute('class')
      if (existingClass) {
        node.setAttribute('class', `${existingClass} ${twClasses.join(' ')}`)
      }
      else {
        node.setAttribute('class', twClasses.join(' '))
      }
    }

    for (const child of node.childNodes) {
      traverse(child)
    }
  }

  traverse(root)
  return root.toString()
}

export function getTokenCost(html: string): MCPResponse {
  const ignixTokens = getTokenCount(html)
  const tailwindEquivalent = estimateTailwindEquivalent(html)
  const tailwindTokens = getTokenCount(tailwindEquivalent)

  const savedTokens = tailwindTokens - ignixTokens
  const savingPercent = tailwindTokens > 0 ? ((savedTokens / tailwindTokens) * 100).toFixed(1) : '0.0'

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          ignix_html: html,
          ignix_tokens: ignixTokens,
          tailwind_html_estimate: tailwindEquivalent,
          tailwind_tokens_estimate: tailwindTokens,
          tokens_saved: Math.max(0, savedTokens),
          savings_percentage: `${savingPercent}%`,
          tokens_used: 15
        })
      }
    ]
  }
}
