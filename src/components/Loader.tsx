import React from 'react'
import Box from '@mui/material/Box'
import { Puff } from 'react-loader-spinner'
import Typography from '@mui/material/Typography'

const Loader = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0, 0, 0, 0.2)',
				zIndex: 99,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<Typography
				component={'h2'}
				sx={{
					fontSize: '1.9rem',
					color: 'lightblue',
				}}
			>
				Loading...
			</Typography>
			<Puff
				height='90'
				width='90'
				radius={2}
				color='lightblue'
				ariaLabel='puff-loading'
			/>
		</Box>
	)
}

export default Loader
