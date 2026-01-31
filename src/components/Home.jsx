export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center items-center  bg-gradient-to-t from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 transition-all min-h-screen">
      <h1 className="text-4xl font-bold mb-4 animate-bounce text-gray-900 dark:text-white">Welcome to User Management App</h1>
      <p className="text-lg animate-pulse flex flex-col justify-center items-center text-center">
  <span className="text-blue-500">React-based User Management App</span> displaying users with  
  <span className="text-green-500"> names, emails, and avatars.</span>  
  <span className="text-purple-500">Click a user to view detailed profile.</span>  
  <span className="text-pink-500">Features dark mode, smooth animations, and responsive design.</span>
</p>

    </div>
  );
}
