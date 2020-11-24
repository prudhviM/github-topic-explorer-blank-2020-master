import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import MyCard from './MyCard';
import styled from 'styled-components';
import 'styled-components/macro';

const GET_QUERY_SEARCH_STARGAZERS = gql`
	query($queryString: String!) {
		search(query: $queryString, type: REPOSITORY, first: 25) {
			repositoryCount
			edges {
				node {
					... on Repository {
						name
						descriptionHTML
						stargazers {
							totalCount
						}
						forks {
							totalCount
						}
						updatedAt
					}
				}
			}
		}
	}	
`;

const ListWrapper = styled('section')({
	margin: '15px 10%',
	backgroundColor: '#fafafa',
	borderRight: '2px solid #eee',
	padding: 15,
	display: 'flex',
	height: 'calc(100vh - 4px)',
	overflowY: 'scroll',
});

const renderRepos = (repos) => {
	return (
		repos.map(({ node }) => (
			<MyCard data={node} key={node.updatedAt} />
		))
	)
};

const List = ({ queryString }) => (
	<ListWrapper>
		<Query query={GET_QUERY_SEARCH_STARGAZERS} variables={{ queryString }}>
		{({ data, error, loading }) => (
				<>
					{loading && <div>loading...</div>}
					{error && <div>{JSON.stringify(error)}</div>}
					{data && (
						<>
							<div
								css={{
									alignItems: 'center',
									padding: '0 0 16px',
								}}
							>
								<div css={{ marginLeft: 12 }}>{data.search.repositoryCount}</div>
								{data.search && data.search.edges.length > 0 ? renderRepos(data.search.edges): <div>No Records found</div>}
							</div>
						</>
					)}
				</>
			)}					
		</Query>
	</ListWrapper>
);

export default List;
