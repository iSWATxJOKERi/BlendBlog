export const clearInputs = (elements: HTMLCollectionOf<HTMLInputElement>) => {
    for(let i: number = 0; i < elements.length; i++) {
        elements[i].value = "";
    }
}