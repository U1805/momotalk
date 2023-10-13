const waitTime = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, time)
    })
}

const waitClick = (elements: NodeList) => {
    return new Promise((resolve) => {
        function handleClick(event: Event) {
            elements.forEach((element) => {
                element.removeEventListener('click', handleClick)
            })
            resolve((event.target as HTMLDivElement).innerText)
            // Disable virtual keyboard pop-up
            const activeEle = document.activeElement as HTMLDivElement
            activeEle.blur()
        }
        elements.forEach((element) => element.addEventListener('click', handleClick))
    })
}

export { waitClick, waitTime }
