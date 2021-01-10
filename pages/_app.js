import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import '../styles/globals.css'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
