export const setTab = (tab: string) => {
    return {
        type: 'SET_TAB',
        payload: tab,
    }
}

export const setStatus = (status: string) => {
    return {
        type: 'SET_STATUS',
        payload: status
    }
}