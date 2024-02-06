import { useEffect, useState } from "react";

export const useFetch = (url: string, options?: RequestInit) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: null,
    });

    const getFetch = async () => {
        setState({
            ...state,
            isLoading: true,
        });

        try {
            const resp = await fetch(url, options);
            const data = await resp.json();

            setState({
                data,
                isLoading: false,
                hasError: null,
            });
        } catch (error: any) {
            setState({
                ...state,
                isLoading: false,
                hasError: error?.message || 'Error during fetch',
            });
        }
    };

    useEffect(() => {
        getFetch();
    }, [url, options]);

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    };
};
