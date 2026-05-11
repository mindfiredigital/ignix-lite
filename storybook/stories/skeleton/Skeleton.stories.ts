const meta = {
    title: 'Components/Skeleton',
}

export default meta

export const Shapes = {
    render: () => `
        <span role="status" aria-busy="true" aria-label="loading" data-shape="text"></span>
        <br><br>
        <span role="status" aria-busy="true" aria-label="loading" data-shape="rect"></span>
        <br><br>
        <span role="status" aria-busy="true" aria-label="loading" data-shape="circle"></span>
    `,
}

export const Lines = {
    render: () => `
        <span role="status" aria-busy="true" aria-label="loading" data-shape="text" data-lines="3"></span>
        <span role="status" aria-busy="true" aria-label="loading" data-shape="text"></span>
        <span role="status" aria-busy="true" aria-label="loading" data-shape="text"></span>
    `
}