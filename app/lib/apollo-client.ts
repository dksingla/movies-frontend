import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export function createApolloClient() {
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_LINK}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}