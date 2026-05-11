const meta = {
    title: 'Components/Meter',
}

export default meta

export const Default = {
    render: () => `
    <meter value="20" min="0" max="100" low="30" high="70" optimum="100"></meter>
    `
}

export const States = {
    render: () => `
    <meter value="20" min="0" max="100" low="30" high="70" optimum="100"></meter>
    <meter value="40" min="0" max="100" low="30" high="70" optimum="100"></meter>
    <meter value="80" min="0" max="100" low="30" high="70" optimum="100"></meter>
    `
}