import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

export default class LoginForm extends Component {
	
	constructor(props) {
	    super(props);
	    this.state = { nickname: '', socket: props.socket };

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.verify = this.verify.bind(this)
	}

	componentWillMount(){
	}

	//uses the response from the server to verify user
	verify(user){
		if(!user.error){	
			this.props.verified(user)
		}else{
			console.log(user.error.message);
		}
	}

	//updates form inputs
	handleChange(event){
		this.setState({ nickname:event.target.value })
	}

	//Sends emit to socket for verification 
	handleSubmit(event){
		event.preventDefault()
		const { nickname } = this.state
		if(this.isValidName(nickname)){
			this.props.setUser({id:1, name:nickname})
		}else{
			console.log("Not long enough name");
		}
	}
	
	//check if the username is valid
	isValidName(name){
		if(name.length > 0){
			return true
		}
		return false
	}

	render() {
		const { nickname } = this.state 
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form">

			          <label 
			          		className="col s12" 
			          		htmlFor="nickname">
			          		<h1 style={{textAlign:"center"}}>
			          			<FormattedMessage 
				          			id="LoginForm__nickname"
				          			description="Nickname the user will go by."
				          			defaultMessage="Got a Nickname?"
			          			/>
			          		</h1>
			          </label>
			          
			          <input 
			          		id="nickname" 
			          		className="col s12" 
			          		type="text"
			          		value={nickname}
			          		onChange={this.handleChange}
			          		placeholder={this.randomPlaceholder()} 
			          		/>
				</form>
			</div>
		);
	}
	
	randomPlaceholder(){
		const randNames = ["VeryCleverNickNameThatsProbablyAlreadyTaken", "CrotchRocket69", "MadDog33", "L4ser9374", "UmmmMyName134", "YouDontNayOmi","SimpleName", "SexyCat99", "LightYear111"]
		return randNames[Math.floor(Math.random()*3000) % randNames.length]
	}
}

LoginForm.propTypes = {
	socket: PropTypes.object,
	verified:PropTypes.func.isRequired
}
