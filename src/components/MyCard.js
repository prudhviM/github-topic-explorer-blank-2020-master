import React from 'react';
import 'styled-components/macro';
import Card from './Card';

const MyCard = ({ data }) => {
	return (
		<Card>
			<p css={{
						color: 'rgb(50,205,50)',
						fontSize: 18,
						marginTop: 12,
					}}>{data.name}</p>
			<div dangerouslySetInnerHTML={{__html: data.descriptionHTML}}></div>
			<p>{data.updatedAt}</p>
			<p>{data.stargazers.totalCount}</p>
		</Card>
	);
};

export default MyCard;
