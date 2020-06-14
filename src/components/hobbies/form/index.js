import React, { useState, useCallback } from 'react'
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
} from 'reactstrap'
import { List } from '../list'
import { database } from '../../../firebase/firebase'

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
		const hobbiesRef = database.ref('hobbies')
		const userHobby = {
			title: hobby,
		}
		hobbiesRef.push(userHobby)
		setHobby('')
	}

	return (
		<Container>
			<Row>
				<Col lg='12'>
					<h3>This is a Firebase test!</h3>
				</Col>
				<Col lg='12'>
					<p>What is your favorite hobby?</p>
				</Col>
			</Row>
			<Form onSubmit={(e) => submitForm(e)}>
				<FormGroup row>
					<Col lg='6'>
						<InputGroup>
							<Input name='hobby' value={hobby} onChange={(e) => hobbyInput(e)} />
							<InputGroupAddon addonType='append'>
								<Button disabled={hobby === undefined}>Submit</Button>
							</InputGroupAddon>
						</InputGroup>
					</Col>
				</FormGroup>
			</Form>
			<List />
		</Container>
	)
}
