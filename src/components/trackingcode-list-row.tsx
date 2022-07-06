import React from 'react'

// Create interfaces
interface TrackingCodeListRowUI {
  position: number;
  code: {
    id: number;
    type: string;
    purpose: string;
    creator: string;
    tracking_code: string;
    url: string;
    created_date: number;
  }
  handleCodeRemove: (id: number, purpose: string) => void;
}

// Create TrackingCodeListRow component

export const TrackingCodeListRow = (props: TrackingCodeListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.position}
    </td>

    <td className="table-item">
      {props.code.type}
    </td>

    <td className="table-item">
      {props.code.purpose}
    </td>

    <td className="table-item">
      {props.code.creator}
    </td>

    <td className="table-item">
      {props.code.tracking_code}
    </td>

    <td className="table-item">
      {props.code.url}
    </td>

    <td className="table-item">
      {props.code.created_date}
    </td>

    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleCodeRemove(props.code.id, props.code.purpose)}>
        Remove Tracking Code
      </button>
    </td>
  </tr>
)