const meta = {
  title: 'Components/Code',
}

export default meta

export const JavaScript = {
  render: () => `
    <pre><code data-lang="js">
function greet() {
  console.log("Hello world")
}
    </code></pre>
  `,
}

export const Python = {
  render: () => `
    <pre><code data-lang="python">
def greet():
  print("Hello")
    </code></pre>
  `,
}

export const Bash = {
  render: () => `
    <pre><code data-lang="bash">
npm install ignix-lite
    </code></pre>
  `,
}




