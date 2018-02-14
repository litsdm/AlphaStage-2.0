import { ApolloClient, createNetworkInterface } from 'react-apollo';

const uri = process.env.NODE_ENV === 'production'
  ? 'https://alphastage-be.herokuapp.com/graphql'
  : 'http://localhost:3001/graphql';

const networkInterface = createNetworkInterface({ uri });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}; // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
});

export default client;
