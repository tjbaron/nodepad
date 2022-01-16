import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HomePage } from './pages/HomePage';

const RootComponent = () => {
    return <HomePage />;
};

ReactDOM.render(<RootComponent />, document.getElementById('root'));
