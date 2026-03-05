import React from 'react'

const MovieCard = () => {
const { poster, title, rating, description } = props;

return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <img src={poster} alt={title} className="w-full h-64 object-cover" />
        <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <div className="flex items-center mb-2">
                <span className="text-yellow-400 font-semibold">{rating}</span>
                <span className="text-gray-400 text-sm ml-2">/ 10</span>
            </div>
            <p className="text-gray-300 text-sm line-clamp-3">{description}</p>
        </div>
    </div>
)
}

export default MovieCard
