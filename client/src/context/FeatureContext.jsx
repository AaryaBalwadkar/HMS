import { createContext, useContext } from "react";

export const FeatureContext = createContext()

export const useFeatureContext = () => {
    return useContext(FeatureContext)
}

export const FeatureContextProvider = ({ children }) => {
    const [ feature, setFeature ] = useState('')

    return <FeatureContext.Provider value ={{ feature, setFeature }}>
        {children}
    </FeatureContext.Provider>
}