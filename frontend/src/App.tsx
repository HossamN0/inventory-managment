import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import InventoryPage from './pages/InventoryPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const theme = createTheme({
  primaryColor: 'teal',
  fontFamily: 'Inter, sans-serif',
  colors: {
    brand: [
      '#F0FDF4',
      '#DCFCE7',
      '#BBF7D0',
      '#86EFAC',
      '#4ADE80',
      '#10B981',
      '#059669',
      '#047857',
      '#065F46',
      '#064E3B',
    ],
    darkNavy: [
      '#E2E8F0',
      '#CBD5E1',
      '#94A3B8',
      '#64748B',
      '#475569',
      '#334155',
      '#1E293B',
      '#0F172A',
      '#020617',
      '#000000',
    ]
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      }
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      }
    },
    Card: {
      defaultProps: {
        radius: 'md',
      }
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Layout>
          <InventoryPage />
        </Layout>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
