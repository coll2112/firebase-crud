import React, { useState, useEffect, useCallback } from 'react'
import firebase from '../../../firebase'

export const List = () => {
	const [hobbies, setHobbies] = useState([])

	useEffect(() => {
		const hobbiesRef = firebase.database().ref('hobbies')

		hobbiesRef.on('value', (snapshot) => {
			let userHobbies = snapshot.val()
			// let hobbyState = []
			// console.log(userHobbies)
			// for (let hobby in userHobbies) {
			// 	hobbyState.push({
			// 		id: hobby,
			// 		...userHobbies[hobby],
			// 	})
			// }

			console.log(userHobbies)

			if (userHobbies) {
				setHobbies(
					Object.entries(userHobbies).map(([id, data]) => ({
						...data,
						id,
					}))
				)
			} else {
				setHobbies([])
			}
		})

		return () => hobbiesRef.off('value')
	}, [])

	// const [hobbies, setHobbies] = useState([])

	// useEffect(() => {
	// 	const hobbiesRef = firebase.database().ref('hobbies')

	// 	if (hobbiesRef) {
	// 		var updateState = (snapshot) => {
	// 			setHobbies(
	// 				Object.entries(snapshot.val().hobbies).map(([id, data]) => ({
	// 					...data,
	// 					id,
	// 				}))
	// 			)
	// 		}
	// 		hobbiesRef.on('value', updateState)
	// 		return () => hobbiesRef.off('value', updateState)
	// 	}
	// }, [])

	const removeHobby = useCallback(
		(hobbyId) => {
			const hobbyRef = firebase.database().ref(`/hobbies/${hobbyId}`)
			hobbyRef.remove()
		},
		[hobbies, setHobbies]
	)

	console.log()

	let hobbyMap
	if (hobbies !== undefined) {
		hobbyMap = hobbies.map((hobby) => (
			<div key={hobby.id}>
				<h4>{hobby.title}</h4>
				<button onClick={(e) => removeHobby(hobby.id)}>Remove Hobby</button>
			</div>
		))
	}

	return (
		<>
			<h3>Your hobbies include:</h3>
			{hobbyMap}
		</>
	)
}
