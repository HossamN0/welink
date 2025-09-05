import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

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
    func: () => Promise<AxiosResponse<T>>,
    options?: Omit<UseQueryOptions<AxiosResponse<T>, AxiosError>, 'queryKey' | 'queryFn'>
): UseFetchDataReturn<T> => {

    const { data, error, isLoading, isFetching, refetch, isError } = useQuery<AxiosResponse<T>, AxiosError, AxiosResponse<T>>({
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
        data: data?.data,
        refetch,
        isError,
        isFetching
    };
};

export default useFetchData;