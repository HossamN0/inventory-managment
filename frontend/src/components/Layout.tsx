import React from 'react';
import { AppShell, Title, Text, Group, NavLink, Box, Avatar } from '@mantine/core';
import { IconDashboard, IconPackages, IconClipboardList, IconChartBar, IconSettings } from '@tabler/icons-react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <AppShell
            header={{ height: 75 }}
            navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: true } }}
            padding="xl"
            styles={{
                main: {
                    backgroundColor: '#F8F9FA',
                    minHeight: '100vh',
                    width: '100%',
                },
            }}
        >
            <AppShell.Header withBorder={false} style={{ borderBottom: '1px solid #E2E8F0' }}>
                <Group h="100%" px="xl" justify="space-between">
                    <Group>
                        <Box
                            bg="#0F172A"
                            w={32}
                            h={32}
                            style={{ borderRadius: '8px' }}
                        />
                        <Title order={3} c="#0F172A" style={{ fontWeight: 800 }}>
                            Company
                        </Title>
                    </Group>

                    <Group gap="sm">
                        <Text size="sm" fw={500} c="dimmed">Admin User</Text>
                        <Avatar color="gray" radius="xl">AU</Avatar>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md" bg="white" withBorder={false} style={{ borderRight: '1px solid #E2E8F0' }}>
                <AppShell.Section grow mt="xl">
                    <Box px="xs">
                        <NavLink
                            label="Dashboard"
                            leftSection={<IconDashboard size="1.2rem" stroke={1.5} />}
                            styles={{ label: { fontWeight: 500, color: '#64748B' } }}
                            mb={4}
                        />
                        <NavLink
                            label="Inventory"
                            leftSection={<IconPackages size="1.2rem" stroke={1.5} />}
                            active
                            color="teal.0"
                            variant="filled"
                            styles={{
                                root: { backgroundColor: '#E6F6F5', borderRadius: '12px' },
                                label: { fontWeight: 600, color: '#0D9488' },
                                section: { color: '#0D9488' }
                            }}
                            mb={4}
                        />
                        <NavLink
                            label="Orders"
                            leftSection={<IconClipboardList size="1.2rem" stroke={1.5} />}
                            styles={{ label: { fontWeight: 500, color: '#64748B' } }}
                            mb={4}
                        />
                        <NavLink
                            label="Reports"
                            leftSection={<IconChartBar size="1.2rem" stroke={1.5} />}
                            styles={{ label: { fontWeight: 500, color: '#64748B' } }}
                            mb={4}
                        />
                        <NavLink
                            label="Settings"
                            leftSection={<IconSettings size="1.2rem" stroke={1.5} />}
                            styles={{ label: { fontWeight: 500, color: '#64748B' } }}
                            mb={4}
                        />
                    </Box>
                </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main>
                <Box w="100%">
                    {children}
                </Box>
            </AppShell.Main>
        </AppShell>
    );
};

export default Layout;
