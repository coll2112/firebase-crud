import React, { useState, useEffect, useCallback } from 'react'
import { database } from '../../../firebase/firebase'

export const List = () => {
	const [hobbies, setHobbies] = useState([])
	const [editHobby, setEditHobby] = useState()

	const hobbyInput = useCallback(
		(e) => {
			setEditHobby(e.target.value)
		},
		[setEditHobby]
	)

	useEffect(() => {
		const hobbiesRef = database.ref('hobbies')

		hobbiesRef.on('value', (snapshot) => {
			let userHobbies = snapshot.val()
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

	const updateHobby = (e, hobbyId) => {
		e.preventDefault()
		const hobbyRef = database.ref(`/hobbies/${hobbyId}`)
		hobbyRef.update({ title: editHobby })
		setEditHobby('')
	}

	const removeHobby = useCallback(
		(hobbyId) => {
			const hobbyRef = database.ref(`/hobbies/${hobbyId}`)
			hobbyRef.remove()
		},
		[hobbies, setHobbies]
	)

	let hobbyMap
	if (hobbies !== undefined) {
		hobbyMap = hobbies.map((hobby) => (
			<div key={hobby.id}>
				<h4>{hobby.title}</h4>
				<input
					name='editInput'
					value={editHobby}
					onChange={(e) => hobbyInput(e)}
				/>{' '}
				<button onClick={(e) => updateHobby(e, hobby.id)}>Edit</button>
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
