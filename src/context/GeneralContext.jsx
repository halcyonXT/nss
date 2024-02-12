import React from 'react'

const GeneralContext = React.createContext();



const GeneralContextProvider = (props) => {
    const [performanceMode, setPerformanceMode] = React.useState(false);

    const [panel, setPanel] = React.useState({
        panelTitle: null,
        panelSubtitle: null
    })


    return (
        <GeneralContext.Provider value={{
            performanceMode,
            panel: {
                value: panel,
                set: setPanel
            }
        }}>
            {props.children}
        </GeneralContext.Provider>
    )
}

export {GeneralContextProvider, GeneralContext}