import { html, nothing } from 'lit'
import { customElement } from 'lit/decorators.js'
import { A2uiLitElement, A2uiController, A2uiSurface, basicCatalog } from '@a2ui/lit/v0_9'
import { MessageProcessor as A2uiMessageProcessor, Catalog } from '@a2ui/web_core/v0_9'
import { MyCardApi } from './my-card-api.ts'
import '../../core/ignix-lite.min.css'

//1. Define Custom Surface component.
@customElement('ignix-a2ui-surface')
export class IgnixA2uiSurface extends A2uiSurface {
  createRenderRoot() {
    return this
  }
}

//2. Define Custom Card component.

@customElement('ignix-card')
export class IgnixCardElement extends A2uiLitElement<typeof MyCardApi> {
  protected createController() {
    return new A2uiController(this, MyCardApi)
  }

  createRenderRoot() {
    return this
  }

  render() {
    const props = this.controller.props
    if (!props) return nothing

    return html`
      <article>
        <span slot="title">${props.title}</span>
        <p slot="body">${props.body}</p>
        ${props.onClick
        ? html`
              <div slot="action">
                <button data-intent="primary" @click=${props.onClick}>
                  Action Button
                </button>
              </div>
            `
        : nothing}
      </article>
    `
  }
}

// 3. Register Custom Card Component
export const IgnixCard = {
  ...MyCardApi,
  tagName: 'ignix-card'
}

const customCatalog = new Catalog(
  'default',
  [
    ...Array.from(basicCatalog.components.values()),
    IgnixCard
  ],
  Array.from(basicCatalog.functions.values()),
  basicCatalog.themeSchema
)

// 4. Initialize A2UI Message Processor and Handle Actions
const processor = new A2uiMessageProcessor([customCatalog], (action: any) => {
  console.log('Action received from element:', action)
  if (action.name === 'cardClicked' || action.event?.name === 'cardClicked') {
    alert('Ignix A2UI button clicked!')
  }
})

// 5. Create the Surface Model
processor.processMessages([
  {
    version: '0.9',
    createSurface: {
      surfaceId: 'main-surface',
      catalogId: 'default'
    }
  } as any
])

// 6. Bind the HTML Element to the Surface Model
customElements.whenDefined('ignix-a2ui-surface').then(() => {
  const surfaceEl = document.getElementById('main-surface') as any
  if (surfaceEl) {
    surfaceEl.surface = processor.model.getSurface('main-surface')
    console.log('Main surface bound successfully.')
  } else {
    console.error('Could not find #main-surface element!')
  }
})

// 7. Render Card by Sending Component Update Message
processor.processMessages([
  {
    version: '0.9',
    updateComponents: {
      surfaceId: 'main-surface',
      components: [
        {
          id: 'root',
          component: 'IgnixCard',
          title: 'Welcome to Ignix Lite + A2UI',
          body: 'This card is rendered dynamically from A2UI JSON messages and automatically styled by Ignix-Lite classless CSS.',
          onClick: {
            event: {
              name: 'cardClicked'
            }
          }
        }
      ]
    }
  } as any
])

