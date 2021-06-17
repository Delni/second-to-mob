import React, { Component } from 'react';
import './Mob.scss';

type MobState = {
	mobbers: string[]
}
export class Mob extends Component<any, MobState> {
	constructor(props: any) {
		super(props)
		this.state = {
			mobbers: []
		}	
	}

	addMobber(mobber: string) {
		const { mobbers } = this.state
		mobbers.push(mobber)
		this.setState({
			mobbers
		})
	}

	render() {
		const { mobbers } = this.state
		return <div className="mob"> 
			<header>
				<h1>Mob</h1>
				<button className="add-button">+</button>
			</header>
			<ul>
				{
					// mobbers.map(mobber => {<Mobber mobber/>})
					mobbers.map(mobber => 
						<li key={mobber}>
							<figure className="avatar"></figure>
							<div className="name active">{mobber}</div>
							<div className="role-buttons">
								<button>N</button>
								<button>D</button>
							</div>
						</li>
					)
				}
			</ul>
		</div>
	}
}