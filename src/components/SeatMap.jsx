import React, { useState } from 'react'

export default function SeatMap() {
  const [selectedSeats, setSelectedSeats] = useState([])
  
  const handleSeatClick = (seatId) => {
    export default function SeatMap() {
      const [selectedSeats, setSelectedSeats] = useState([])

      const reservedSeats = ['B2', 'C3'] // example reserved seats

      const handleSeatClick = (seatId) => {
        if (reservedSeats.includes(seatId)) return

        setSelectedSeats(prev =>
          prev.includes(seatId)
            ? prev.filter(id => id !== seatId)
            : [...prev, seatId]
        )
      }

      const rows = ['A', 'B', 'C', 'D']
      const cols = [1, 2, 3] // 4 rows x 3 cols = 12 seats

      return (
        <div className="p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Pick Your Seats</h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-gray-200 border border-gray-300" />
              <span className="text-sm text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-blue-500" />
              <span className="text-sm text-gray-600">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-gray-400 opacity-70" />
              <span className="text-sm text-gray-600">Reserved</span>
            </div>
          </div>

          <div className="space-y-3">
            {rows.map(row => (
              <div key={row} className="flex items-center">
                <div className="w-6 text-sm font-medium text-gray-700">{row}</div>

                <div className="flex gap-3 ml-4">
                  {cols.map(col => {
                    const seatId = `${row}${col}`
                    const isSelected = selectedSeats.includes(seatId)
                    const isReserved = reservedSeats.includes(seatId)

                    const base =
                      'w-14 h-12 flex items-center justify-center rounded-md font-semibold transition transform'
                    const variant = isReserved
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed opacity-80'
                      : isSelected
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105'

                    return (
                      <button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId)}
                        disabled={isReserved}
                        aria-pressed={isSelected}
                        className={`${base} ${variant}`}
                        title={isReserved ? `${seatId} (reserved)` : `Seat ${seatId}`}
                      >
                        {col}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Selected ({selectedSeats.length}):{' '}
              <span className="font-medium">{selectedSeats.join(', ') || 'None'}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedSeats([])}
                disabled={selectedSeats.length === 0}
                className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Clear
              </button>
              <button
                onClick={() => alert(`Reserved: ${selectedSeats.join(', ') || 'None'}`)}
                disabled={selectedSeats.length === 0}
                className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      )
    }
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