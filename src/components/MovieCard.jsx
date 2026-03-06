import React from 'react'

const MovieCard = () => {
const { poster, title, rating, description } = props;

return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition-all duration-200">
        <div className="flex">
            <div className="w-36 sm:w-48 relative flex-shrink-0">
                <img
                    src={poster || '/placeholder-movie.png'}
                    alt={title || 'Movie poster'}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-white opacity-90"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between">
                        <h3 className="text-white text-lg sm:text-xl font-semibold">{title || 'Untitled'}</h3>
                        <div className="ml-4 inline-flex items-center bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-sm font-semibold">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 20.202 4.665 24 6 15.596 0 9.748l8.332-1.73z" />
                            </svg>
                            <span>{rating ?? 'N/A'}</span>
                        </div>
                    </div>

                    <p className="text-gray-300 mt-2 text-sm sm:text-base line-clamp-4">
                        {description || 'No description available.'}
                    </p>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md text-sm">
                        Details
                    </button>
                    <button className="border border-gray-600 text-gray-200 px-3 py-1 rounded-md text-sm hover:bg-gray-700">
                        Watch Trailer
                    </button>
                    <span className="ml-auto text-gray-400 text-xs">/10 rating scale</span>
                </div>
            </div>
        </div>
    </div>
)
}

export default MovieCard
