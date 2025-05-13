import React from 'react';

// Define the expected structure of the data prop
type Props = {
  data: {
    id: string;
    trackingNumber: string;
    phoneNumber: string;
    status: string;
    addressDetail: string;
    district: string;
    khoroo: string;
    accuracy: number;
    lat?: number;
    lng?: number;
  }[];
};

const DataTable: React.FC<Props> = ({ data }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th>Tracking Number</th>
          <th>Phone Number</th>
          <th>Status</th>
          <th>Address Detail</th>
          <th>District</th>
          <th>Khoroo</th>
          <th>Accuracy</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.trackingNumber}</td>
            <td>{row.phoneNumber}</td>
            <td>{row.status}</td>
            <td>{row.addressDetail}</td>
            <td>{row.district}</td>
            <td>{row.khoroo}</td>
            <td>{row.accuracy}</td>
            <td>{row.lat}</td>
            <td>{row.lng}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
