import React from 'react'
import { render } from 'react-dom'

// Import components
import { TrackingCode} from './components/trackingcode'

// Import styles
import './styles/styles.css'

// Find div container
const rootElement = document.getElementById('root')

// Render TrackingCode component in the DOM
render(<TrackingCode />, rootElement)