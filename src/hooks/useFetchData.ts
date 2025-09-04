import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseFetchDataReturn<T> {
    component: null;
    error: AxiosError | null;
    isLoading: boolean;
    data: T | undefined;
}

const useFetchData = <T,>(
    key: string,
    func: () => Promise<T>,
    options?: Omit<UseQueryOptions<T, AxiosError>, 'queryKey' | 'queryFn'>
): UseFetchDataReturn<T> => {

    const { data, error, isLoading } = useQuery<T, AxiosError, T>({
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
    };
};

export default useFetchData;