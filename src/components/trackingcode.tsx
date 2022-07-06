// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { TrackingCodeList } from './trackingcode-list'

// Import styles
import './../styles/trackingcode.css'

// Create TrackingCode component
export const TrackingCode = () => {
// Prepare states
const [type, setType] = useState('')
const [purpose, setPurpose] = useState('')
const [creator, setCreator] = useState('')
const [tracking_code, setTracking_code] = useState('')
const [codes, setCodes] = useState([])
const [loading, setLoading] = useState(true)

// Fetch all Tracking Codes on initial render
useEffect(() => {
  fetchCodes()
}, [])

// Fetch all tracking codes 
const fetchCodes = async () => {
  // Send GET request to 'codes/all' endpoint
  axios
    .get('http://localhost:4001/codes/all')
    .then(response => {
      // Update the codes state
      setCodes(response.data)

      // Update loading state
      setLoading(false)
    })
    .catch(error => console.error(`There was an error retrieving the tracking code list: ${error}`))
}

// Reset all input fields
const handleInputsReset = () => {
  setType('')
  setPurpose('')
  setCreator('')
  setTracking_code('')
}

// Create new code
const handleCodeCreate = () => {
  // Send POST request to 'codes/create' endpoint
  axios
    .post('http://localhost:4001/codes/create', {
      type: type,
      purpose: purpose,
      creator: creator,
      tracking_code: tracking_code,

    })
    .then(res => {
      console.log(res.data)

      // Fetch all codes to refresh
      // the codes on the tracking code list
      fetchCodes()
    })
    .catch(error => console.error(`There was an error creating the ${tracking_code} code: ${error}`))
}

// Submit new code
const handleCodeSubmit = () => {
  // Check if all fields are filled
  if (type.length > 0 && purpose.length > 0 && creator.length > 0 && tracking_code.length > 0) {
    // Create new code
    handleCodeCreate()

    console.info(`Tracking Code ${tracking_code} for ${purpose} added.`)

    // Reset all input fields
    handleInputsReset()
  }
}

// Remove code
const handleCodeRemove = (id: number, title: string) => {
  // Send PUT request to 'codes/delete' endpoint
  axios
    .put('http://localhost:4001/codes/delete', { id: id })
    .then(() => {
      console.log(`code ${title} removed.`)

      // Fetch all codes to refresh
      // the codes on the codeshelf list
      fetchCodes()
    })
    .catch(error => console.error(`There was an error removing the ${title} code: ${error}`))
}

// Reset code list (remove all codes)
const handleListReset = () => {
  // Send PUT request to 'codes/reset' endpoint
  axios.put('http://localhost:4001/codes/reset')
  .then(() => {
    // Fetch all codes to refresh
    // the codes on the codeshelf list
    fetchCodes()
  })
  .catch(error => console.error(`There was an error resetting the code list: ${error}`))
}

return (
  <div className="code-list-wrapper">
    <h1>Demo Tracker Thingy Using SQL-Lite</h1>
{/* Form for creating new code */}
<div className="code-list-form">
  <div className="form-wrapper" onSubmit={handleCodeSubmit}>
      <fieldset>
        <label className="form-label" htmlFor="type">Enter Type:</label>
        <input className="form-input" type="text" id="type" name="type" value={type} onChange={(e) => setType(e.currentTarget.value)} />
      </fieldset>

      <fieldset>
        <label className="form-label" htmlFor="purpose">Enter Purpose:</label>
        <input className="form-input" type="text" id="purpose" name="purpose" value={purpose} onChange={(e) => setPurpose(e.currentTarget.value)} />
      </fieldset>
      <fieldset>
        <label className="form-label" htmlFor="creator">Enter Creater Name:</label>
        <input className="form-input" type="text" id="creator" name="creator" value={creator} onChange={(e) => setCreator(e.currentTarget.value)} />
      </fieldset>

      <fieldset>
        <label className="form-label" htmlFor="rating">Enter Tracking:</label>
        <input className="form-input" type="text" id="tracking_code" name="tracking_code" value={tracking_code} onChange={(e) => setTracking_code(e.currentTarget.value)} />
      </fieldset>

      <button onClick={handleCodeSubmit} className="btn btn-add">Add the code</button>
  </div>
</div>

{/* Render tracking code list component */}

<TrackingCodeList codes={codes} loading={loading} handleCodeRemove={handleCodeRemove} />

{/* Show reset button if list contains at least one code */}

{codes.length > 0 && (
  <button className="btn btn-reset" onClick={handleListReset}>Reset codes list.</button>
)}
</div>
)
}