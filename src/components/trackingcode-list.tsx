import React from 'react'

// Import components
import { TrackingCodeListRow } from './trackingcode-list-row'

// Import styles
import './../styles/trackingcode-list.css'

// Create interfaces
interface CodeUI {
    id: number;
    type: string;
    purpose: string;
    creator: string;
    tracking_code: string;
    url: string;
    created_date: number;
}

interface TrackingCodeListUI {
  codes: CodeUI[];
  loading: boolean;
  handleCodeRemove: (id: number, purpose: string) => void;
}

// Create TrackingCodeList component

export const TrackingCodeList = (props: TrackingCodeListUI) => {
  // Show loading message
  if (props.loading) return <p>Codes table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Type</th>

            <th className="table-head-item">Purpose</th>

            <th className="table-head-item">Creator</th>

            <th className="table-head-item">Tracking Code</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.codes.length > 0 ? (
            props.codes.map((code: CodeUI, idx) => (
              <TrackingCodeListRow
                key={code.id}
                code={code}
                position={idx + 1}
                handleCodeRemove={props.handleCodeRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no tracking codes to show. Create one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}