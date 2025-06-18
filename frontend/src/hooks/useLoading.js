import { useState, createContext , useContext} from 'react'

const LoadingContext = createContext({});

export const LoadingProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    return (
        <LoadingContext.Provider value={{loading, startLoading, stopLoading}}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);