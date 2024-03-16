import Header from "./Header";

function Home() {
    return (
        <>
        <Header/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-800 dark:bg-black ">
        
        
        <h1 className="text-5xl font-bold">
          Welcome to Our Website!
        </h1>
        <p className="text-xl mt-6 text-center px-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8 rounded">
          Send your mail 
        </button>
      </div>
      </>
    );
  }
  
  export default Home;