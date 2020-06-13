import firebase from '../../../firebase'
import React, { useState, useCallback } from 'react'
import { List } from '../list'

export const HobbyForm = () => {
	const [hobby, setHobby] = useState()

	const hobbyInput = useCallback(
		(e) => {
			setHobby(e.target.value)
		},
		[setHobby]
	)

	const submitForm = (e) => {
		e.preventDefault()
		const hobbiesRef = firebase.database().ref('hobbies')
		const userHobby = {
			title: hobby,
		}
		hobbiesRef.push(userHobby)
		setHobby('')
	}

	console.log(hobby)

	return (
		<>
			<h3>This is a Firebase test!</h3>
			<p>What is your favorite hobby?</p>
			<form onSubmit={(e) => submitForm(e)}>
				<input name='hobby' value={hobby} onChange={(e) => hobbyInput(e)} />
				<button>Submit</button>
			</form>
			<List />
		</>
	)
}
