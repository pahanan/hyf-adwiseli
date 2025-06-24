import React from 'react'
import Lottie from 'lottie-react'
import animation from './animation.json'

const AIAnimation = () => (
	<Lottie
		animationData={animation}
		loop={true}
		style={{
			flex: 1,
		}}
	/>
)

export default AIAnimation
