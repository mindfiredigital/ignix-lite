export default {
  title: 'Components/Tabs'
}


export const Default = () => `
<ix-tabs>
  <button slot="tab">Overview</button>
  <button slot="tab">Analytics</button>
  <button slot="tab">Settings</button>
</ix-tabs>
`

export const Underline = () => `
<ix-tabs data-variant="underline">
  <button slot="tab">Profile</button>
  <button slot="tab">Activity</button>
  <button slot="tab">Security</button>

</ix-tabs>
`

export const Pill = () => `
<ix-tabs data-variant="pill">
  <button slot="tab">Files</button>
  <button slot="tab">Shared</button>
  <button slot="tab">Starred</button>

</ix-tabs>
`


export const Gradient = () => `
<ix-tabs data-variant="gradient">
  <button slot="tab">Home</button>
  <button slot="tab">Dashboard</button>
  <button slot="tab">Reports</button>
</ix-tabs>
`
