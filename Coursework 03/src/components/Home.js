import React from 'react'
import CardField from './CardField'
import SearchField from './SearchField'
import '../style/Home.css'

export default function Home(props) {
	return (
		<div>
			<SearchField />
			<CardField />
		</div>
	);
}
