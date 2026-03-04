import React, { useState } from 'react'

export default function SeatMap() {
  const [selectedSeats, setSelectedSeats] = useState([])
  
  const handleSeatClick = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    )
  }

  const seats = Array.from({ length: 12 }, (_, i) => `${i + 1}`)

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select Your Seats</h2>
      <div className="grid grid-cols-4 gap-4">
        {seats.map(seat => (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={`w-12 h-12 rounded border-2 font-semibold transition ${
              selectedSeats.includes(seat)
                ? 'bg-blue-500 border-blue-600 text-white'
                : 'bg-gray-200 border-gray-300 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {seat}
          </button>
        ))}
      </div>
      <p className="mt-6 text-lg">Selected: {selectedSeats.join(', ') || 'None'}</p>
    </div>
  )
}