import { ApolloProvider } from '@apollo/client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { client } from './apollo';
import { HomePage } from './pages/HomePage';

const RootComponent = () => {
    return <ApolloProvider client={client}>
        <HomePage />
    </ApolloProvider>
};

ReactDOM.render(<RootComponent />, document.getElementById('root'));
