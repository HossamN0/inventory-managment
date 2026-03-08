import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as inventoryApi from '../api/inventoryApi';

export const useItems = () => {
    return useQuery({
        queryKey: ['items'],
        queryFn: inventoryApi.getItems,
    });
};

export const useCreateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: inventoryApi.createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};

export const useUpdateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: inventoryApi.updateItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};

export const useDeleteItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: inventoryApi.deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};
