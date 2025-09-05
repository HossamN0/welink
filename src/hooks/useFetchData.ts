import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseFetchDataReturn<T> {
    component: null;
    error: AxiosError | null;
    isLoading: boolean;
    data: T | undefined;
    refetch: () => void;
    isError: boolean,
    isFetching: boolean
}

const useFetchData = <T,>(
    key: string,
    func: () => Promise<T>,
    options?: Omit<UseQueryOptions<T, AxiosError>, 'queryKey' | 'queryFn'>
): UseFetchDataReturn<T> => {

    const { data, error, isLoading, isFetching, refetch, isError } = useQuery<T, AxiosError, T>({
        queryKey: [key],
        queryFn: func,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: true,
        ...options
    });


    return {
        component: null,
        error: error || null,
        isLoading,
        data,
        refetch,
        isError,
        isFetching
    };
};

export default useFetchData;