const meta = {
    title: 'Components/Progress',
}

export default meta 

export const Default = {
    render: () => `
    <progress value="72" max="100"></progress>
    `
}

export const States = {
    render: () => `
    <progress value="0" max="100"></progress>
    <br><br>
    <progress value="50" max="100"></progress>
    <br><br>
    <progress value="100" max="100"></progress>
    `
}