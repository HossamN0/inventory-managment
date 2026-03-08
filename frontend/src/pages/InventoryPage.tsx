import React, { useState } from 'react';
import {
    Card, Table, Group, Text, Title, TextInput, NumberInput, Button,
    Modal, ActionIcon, Badge, Loader, Center, Stack, Container
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
    IconPlus, IconSearch, IconEdit, IconTrash,
    IconFilter
} from '@tabler/icons-react';
import { useItems, useCreateItem, useUpdateItem, useDeleteItem } from '../hooks/useInventory';

const InventoryPage: React.FC = () => {
    const { data: items, isLoading } = useItems();
    const createMutation = useCreateItem();
    const updateMutation = useUpdateItem();
    const deleteMutation = useDeleteItem();

    const [search, setSearch] = useState('');
    const [modalOpened, setModalOpened] = useState(false);
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    const form = useForm({
        initialValues: {
            name: '',
            category: '',
            quantity: 0,
            price: 0,
            description: '',
        },
        validate: {
            name: (value: any) => (value.length < 2 ? 'Name should have at least 2 letters' : null),
            category: (value: any) => (!value ? 'Category is required' : null),
            quantity: (value: any) => (value < 0 ? 'Quantity must be positive' : null),
            price: (value: any) => (value < 0 ? 'Price must be positive' : null),
        },
    });

    const handleOpenModal = (item?: any) => {
        if (item) {
            setEditingItem(item);
            form.setValues({
                name: item.name,
                category: item.category || '',
                quantity: item.quantity,
                price: item.price,
                description: item.description || '',
            });
        } else {
            setEditingItem(null);
            form.reset();
        }
        setModalOpened(true);
    };

    const handleSubmit = (values: any) => {
        if (editingItem) {
            updateMutation.mutate({ id: editingItem._id, data: values }, {
                onSuccess: () => setModalOpened(false),
            });
        } else {
            createMutation.mutate(values, {
                onSuccess: () => setModalOpened(false),
            });
        }
    };

    const handleDelete = () => {
        if (itemToDelete) {
            deleteMutation.mutate(itemToDelete._id, {
                onSuccess: () => setDeleteModalOpened(false),
            });
        }
    };

    const filteredItems = items?.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusBadge = (quantity: number) => {
        if (quantity === 0) return <Badge variant="light" color="red" radius="xl" size="sm" px="lg">Out of Stock</Badge>;
        if (quantity <= 10) return <Badge variant="light" color="orange" radius="xl" size="sm" px="lg">Low Stock</Badge>;
        return <Badge variant="light" color="teal" radius="xl" size="sm" px="lg">In Stock</Badge>;
    };

    return (
        <Container size="xl" px={0}>
            <Title order={2} mb="xl" style={{ fontWeight: 800 }}>Inventory Items</Title>

            <Group justify="space-between" mb="xl">
                <Group gap={8}>
                    <TextInput
                        placeholder="Search..."
                        leftSection={<IconSearch size="1.1rem" stroke={1.5} color="#64748B" />}
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        styles={{ input: { height: 44, width: 335, borderRadius: '12px', border: '1px solid #E2E8F0' } }}
                    />
                </Group>

                <Group gap="sm">
                    <Button
                        variant="outline"
                        color="gray"
                        leftSection={<IconFilter size="1rem" />}
                        styles={{ root: { height: 44, borderRadius: '12px', color: '#64748B', borderColor: '#E2E8F0' } }}
                    >
                        Filter
                    </Button>
                    <Button
                        leftSection={<IconPlus size="1rem" />}
                        bg="#0F172A"
                        styles={{ root: { height: 44, borderRadius: '12px' } }}
                        onClick={() => handleOpenModal()}
                    >
                        Add Item
                    </Button>
                </Group>
            </Group>

            <Card withBorder={false} padding={0} radius="lg" shadow="xs" style={{ overflow: 'hidden' }}>
                {isLoading ? (
                    <Center h={400}><Loader type="dots" color="teal" /></Center>
                ) : (
                    <Table verticalSpacing="md" highlightOnHover withRowBorders horizontalSpacing="lg">
                        <Table.Thead bg="#F9FAFB">
                            <Table.Tr>
                                <Table.Th c="#64748B" fw={600} style={{ textTransform: 'uppercase', fontSize: '11px' }}>SKU</Table.Th>
                                <Table.Th c="#64748B" fw={600} style={{ textTransform: 'uppercase', fontSize: '11px' }}>Name</Table.Th>
                                <Table.Th c="#64748B" fw={600} style={{ textTransform: 'uppercase', fontSize: '11px' }}>Category</Table.Th>
                                <Table.Th c="#64748B" fw={600} style={{ textTransform: 'uppercase', fontSize: '11px' }}>Quantity</Table.Th>
                                <Table.Th c="#64748B" fw={600} style={{ textTransform: 'uppercase', fontSize: '11px' }}>Price</Table.Th>
                                <Table.Th c="#64748B" fw={600} style={{ textTransform: 'uppercase', fontSize: '11px' }}>Status</Table.Th>
                                <Table.Th c="#64748B" fw={600} style={{ textTransform: 'uppercase', fontSize: '11px' }} align="center">Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody bg="white">
                            {filteredItems?.map((item: any) => (
                                <Table.Tr key={item._id}>
                                    <Table.Td>
                                        <Badge variant="filled" bg="#F1F5F9" c="#64748B" radius="sm" style={{ fontWeight: 600 }}>
                                            {item.sku}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td fw={500} c="#0F172A">{item.name}</Table.Td>
                                    <Table.Td c="#64748B">{item.category}</Table.Td>
                                    <Table.Td c="#0F172A">{item.quantity?.toLocaleString()}</Table.Td>
                                    <Table.Td c="#0F172A" fw={500}>SAR {item.price?.toFixed(2)}</Table.Td>
                                    <Table.Td>
                                        {getStatusBadge(item.quantity)}
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap={8} justify="center">
                                            <ActionIcon
                                                size={32}
                                                variant="outline"
                                                color="#CBD5E1"
                                                styles={{ root: { color: '#64748B', borderColor: '#E2E8F0', borderRadius: '4px' } }}
                                                onClick={() => handleOpenModal(item)}
                                            >
                                                <IconEdit size="1rem" />
                                            </ActionIcon>
                                            <ActionIcon
                                                size={32}
                                                variant="outline"
                                                color="#CBD5E1"
                                                styles={{ root: { color: '#64748B', borderColor: '#E2E8F0', borderRadius: '4px' } }}
                                                onClick={() => {
                                                    setItemToDelete(item);
                                                    setDeleteModalOpened(true);
                                                }}
                                            >
                                                <IconTrash size="1rem" />
                                            </ActionIcon>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                            {filteredItems?.length === 0 && (
                                <Table.Tr>
                                    <Table.Td colSpan={7}>
                                        <Text ta="center" c="dimmed" p="xl">No items found in your inventory</Text>
                                    </Table.Td>
                                </Table.Tr>
                            )}
                        </Table.Tbody>
                    </Table>
                )}
            </Card>

            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title={editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
                radius="lg"
                size="md"
                centered
                styles={{
                    title: { fontWeight: 700, fontSize: '1.2rem' },
                    header: { padding: '24px' },
                    body: { padding: '24px' }
                }}
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                        {editingItem && (
                            <TextInput
                                label="SKU"
                                value={editingItem.sku}
                                disabled
                                radius="md"
                            />
                        )}
                        <TextInput label="Item Name" placeholder="Enter name" {...form.getInputProps('name')} withAsterisk radius="md" />
                        <TextInput label="Category" placeholder="e.g. Raw Materials" {...form.getInputProps('category')} withAsterisk radius="md" />
                        <Group grow>
                            <NumberInput label="Quantity" min={0} {...form.getInputProps('quantity')} withAsterisk radius="md" />
                            <NumberInput
                                label="Price (SAR)"
                                min={0}
                                decimalScale={2}
                                fixedDecimalScale
                                {...form.getInputProps('price')}
                                withAsterisk
                                radius="md"
                            />
                        </Group>
                        <TextInput label="Description" placeholder="Optional notes" {...form.getInputProps('description')} radius="md" />
                        <Group justify="flex-end" mt="xl">
                            <Button variant="subtle" color="gray" onClick={() => setModalOpened(false)}>Cancel</Button>
                            <Button type="submit" bg="#0F172A" radius="md" loading={createMutation.isPending || updateMutation.isPending}>
                                {editingItem ? 'Update Item' : 'Create Item'}
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>

            <Modal
                opened={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                title="Confirm Deletion"
                centered
                radius="lg"
            >
                <Stack>
                    <Text size="sm">
                        Are you sure you want to delete <Text span fw={700}>{itemToDelete?.name}</Text>?
                        This action cannot be undone.
                    </Text>
                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" color="gray" onClick={() => setDeleteModalOpened(false)}>Cancel</Button>
                        <Button color="red" radius="md" onClick={handleDelete} loading={deleteMutation.isPending}>Delete</Button>
                    </Group>
                </Stack>
            </Modal>
        </Container>
    );
};

export default InventoryPage;
