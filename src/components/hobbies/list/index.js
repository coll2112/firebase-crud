import React, { useState, useEffect, useCallback } from 'react'
import { database } from '../../../firebase/firebase'
import {
	Container,
	Row,
	Col,
	Button,
	Input,
	Form,
	FormGroup,
	InputGroup,
	InputGroupAddon,
	Card,
	CardTitle,
	CardBody,
} from 'reactstrap'

export const List = () => {
	const [hobbies, setHobbies] = useState([])
	const [editHobby, setEditHobby] = useState('')

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
			<Col key={hobby.id} lg='3' style={{ padding: '1rem' }}>
				<Card>
					<CardBody>
						<Row>
							<Col>
								<h4 style={{ textTransform: 'capitalize', textAlign: 'center' }}>
									{hobby.title}
								</h4>
							</Col>
						</Row>
						<InputGroup>
							<Input
								name='editInput'
								value={editHobby}
								onChange={(e) => hobbyInput(e)}
							/>{' '}
							<InputGroupAddon addonType='append'>
								<Button
									disabled={editHobby.length < 1}
									color='secondary'
									onClick={(e) => updateHobby(e, hobby.id)}
								>
									Edit
								</Button>
							</InputGroupAddon>
						</InputGroup>
						<Button
							style={{ marginTop: '1rem' }}
							block
							outline
							color='danger'
							onClick={(e) => removeHobby(hobby.id)}
						>
							Remove Hobby
						</Button>
					</CardBody>
				</Card>
			</Col>
		))
	}

	return (
		<>
			<Row>
				<Col>
					{hobbies.length > 1 ? <h3>Your hobbies include:</h3> : undefined}
				</Col>
			</Row>
			<Row>{hobbyMap}</Row>
		</>
	)
}
