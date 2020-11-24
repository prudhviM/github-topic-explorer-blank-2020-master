import React, { useState } from 'react';
import Login from './Login';
import {ApolloClient} from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import Sidebar from './components/Sidebar';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import SearchBar from './components/SearchBar';
import {createGlobalStyle} from 'styled-components';
import List from './components/List';
import 'styled-components/macro';

const accessToken = localStorage.getItem('token');

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const Global = createGlobalStyle({
  '*':{
    boxSizing: 'border-box',
  },
  body: {
    backgroundColor: '#fff',
    color:'#444',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto"',
    padding: 0,
    margin: 0,
    borderTop: '4px solid rgb(210, 54, 105)',
  },
});

const App = () => {
  const [queryString, setqueryString] = useState('');
  const onSearchSubmit = (term) => {
    setqueryString('language:' + term + ' stars:>10000');
  };
  return (
    <>
        <Global/>
        {
          accessToken ? 
          <ApolloProvider client={client}>
            <Sidebar/>
            <SearchBar onSubmit = {onSearchSubmit}/>
            {
              queryString ? <List queryString={queryString}/> : <div>Please Enter Topic name and press Enter</div>
            }
          </ApolloProvider> : <Login/>
        }
    </>
  )
};

export default App;
