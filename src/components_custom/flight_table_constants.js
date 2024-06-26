export const dummyData = {
    "Flights": [
      { id: 1, flight_no: 'BA123', scheduled_departure: new Date('2024-06-27T08:00:00Z'), scheduled_arrival: new Date('2024-06-27T12:00:00Z'), departure_airport: 'LHR', arrival_airport: 'JFK', status: 'Scheduled', aircraft_code: 'B777', actual_departure: '', actual_arrival: '' },
      { id: 2, flight_no: 'LH456', scheduled_departure: new Date('2024-06-27T10:00:00Z'), scheduled_arrival: new Date('2024-06-27T15:00:00Z'), departure_airport: 'FRA', arrival_airport: 'ORD', status: 'On Time', aircraft_code: 'A380', actual_departure: '', actual_arrival: '' },
      { id: 3, flight_no: 'AF789', scheduled_departure: new Date('2024-06-28T12:00:00Z'), scheduled_arrival: new Date('2024-06-28T18:00:00Z'), departure_airport: 'CDG', arrival_airport: 'HND', status: 'Delayed', aircraft_code: 'B787', actual_departure: '', actual_arrival: '' },
    ],
    "Tickets": [
      { id: 1, ticket_no: '12345', book_ref: 'BOOK001', passenger_id: 'PAX001' },
      { id: 2, ticket_no: '67890', book_ref: 'BOOK002', passenger_id: 'PAX002' },
      { id: 3, ticket_no: '24680', book_ref: 'BOOK003', passenger_id: 'PAX003' },
    ],
    "Ticket Flights": [
      { id: 1, ticket_no: '12345', flight_id: '1', fare_conditions: 'Economy', amount: 300 },
      { id: 2, ticket_no: '67890', flight_id: '2', fare_conditions: 'Business', amount: 1200 },
      { id: 3, ticket_no: '24680', flight_id: '3', fare_conditions: 'First Class', amount: 2500 },
    ],
    "Boarding Passes": [
      { id: 1, ticket_no: '12345', flight_id: '1', boarding_no: 'A23', seat_no: '12A' },
      { id: 2, ticket_no: '67890', flight_id: '2', boarding_no: 'B45', seat_no: '5C' },
      { id: 3, ticket_no: '24680', flight_id: '3', boarding_no: 'C67', seat_no: '1A' },
    ]
  };
  
export const columnsByTable = {
    "Flights": [
      { field: 'flight_no', headerName: 'Flight No', width: 130, type: 'string' },
      { field: 'scheduled_departure', headerName: 'Scheduled Departure', width: 200, type: 'dateTime' },
      { field: 'scheduled_arrival', headerName: 'Scheduled Arrival', width: 200, type: 'dateTime' },
      { field: 'departure_airport', headerName: 'Departure Airport', width: 150, type: 'string' },
      { field: 'arrival_airport', headerName: 'Arrival Airport', width: 150, type: 'string' },
      { field: 'status', headerName: 'Status', width: 120, type: 'string' },
      { field: 'aircraft_code', headerName: 'Aircraft Code', width: 130, type: 'string' },
      { field: 'actual_departure', headerName: 'Actual Departure', width: 200, type: 'string' },
      { field: 'actual_arrival', headerName: 'Actual Arrival', width: 200, type: 'string' },
    ],
    "Tickets": [
      { field: 'ticket_no', headerName: 'Ticket No', width: 150, type: 'string' },
      { field: 'book_ref', headerName: 'Booking Reference', width: 200, type: 'string' },
      { field: 'passenger_id', headerName: 'Passenger ID', width: 200, type: 'string' },
    ],
    "Ticket Flights": [
      { field: 'ticket_no', headerName: 'Ticket No', width: 160, type: 'string' },
      { field: 'flight_id', headerName: 'Flight ID', width: 100, type: 'string' },
      { field: 'fare_conditions', headerName: 'Fare Conditions', width: 150, type: 'string' },
      { field: 'amount', headerName: 'Amount', width: 100, type: 'number' },
    ],
    "Boarding Passes": [
      { field: 'ticket_no', headerName: 'Ticket No', width: 160, type: 'string' },
      { field: 'flight_id', headerName: 'Flight ID', width: 100, type: 'string' },
      { field: 'boarding_no', headerName: 'Boarding Number', width: 150, type: 'string' },
      { field: 'seat_no', headerName: 'Seat Number', width: 120, type: 'string' },
    ]
  };
  