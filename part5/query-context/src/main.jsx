import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlogContextProvider } from './context/BlogContext'
import { UserContextProvider } from './context/UserContext'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <BlogContextProvider>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </UserContextProvider>
  </BlogContextProvider>
)
