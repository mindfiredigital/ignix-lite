export default {
  title: 'Components/Toast'
}

export const Basic = () => `
<ix-toast id="toast-basic"></ix-toast>

<button onclick="document.getElementById('toast-basic').show({
  title: 'Saved',
  message: 'Your data has been updated.',
  intent: 'neutral'
})">
  Show Toast
</button>
`
    
export const Intents = () => `
<ix-toast id="toast-intents"></ix-toast>

<button onclick="document.getElementById('toast-intents').show({
  title: 'Default',
  message: 'This is a neutral notification.',
  intent: 'neutral'
})">Neutral</button>

<button onclick="document.getElementById('toast-intents').show({
  title: 'Success',
  message: 'Your profile has been updated.',
  intent: 'success'
})">Success</button>

<button onclick="document.getElementById('toast-intents').show({
  title: 'Error',
  message: 'Unable to complete the action.',
  intent: 'danger'
})">Danger</button>

<button onclick="document.getElementById('toast-intents').show({
  title: 'Warning',
  message: 'Check your inputs carefully.',
  intent: 'warning'
})">Warning</button>

<button onclick="document.getElementById('toast-intents').show({
  title: 'Info',
  message: 'System update available.',
  intent: 'primary'
})">Primary</button>
`

export const Variants = () => `
<ix-toast id="toast-variants"></ix-toast>

<button onclick="document.getElementById('toast-variants').show({
  title: 'Saved',
  message: 'Your data has been updated.',
  variant: 'fade',
  intent: 'neutral'
})">Fade</button>

<button onclick="document.getElementById('toast-variants').show({
  title: 'Saved',
  message: 'Your data has been updated.',
  variant: 'slide',
  intent: 'success'
})">Slide</button>

<button onclick="document.getElementById('toast-variants').show({
  title: 'Error',
  message: 'Something failed.',
  variant: 'pop',
  intent: 'danger'
})">Pop</button>
`

export const Positions = () => `
<ix-toast id="topLeft" data-position="top-left"></ix-toast>
<ix-toast id="bottomRight" data-position="bottom-right"></ix-toast>
<ix-toast id="bottomLeft" data-position="bottom-left"></ix-toast>
<ix-toast id="topRight" data-position="top-right"></ix-toast>

<button onclick="document.getElementById('topLeft').show({
  title: 'Top Left',
  message: 'Danger toast at top left.',
  intent: 'danger'
})">Top Left</button>

<button onclick="document.getElementById('bottomRight').show({
  title: 'Bottom Right',
  message: 'Success toast at bottom right.',
  intent: 'success'
})">Bottom Right</button>

<button onclick="document.getElementById('bottomLeft').show({
  title: 'Bottom Left',
  message: 'Warning toast at bottom left.',
  intent: 'warning'
})">Bottom Left</button>

<button onclick="document.getElementById('topRight').show({
  title: 'Top Right',
  message: 'Primary toast at top right.',
  intent: 'primary'
})">Top Right</button>
`