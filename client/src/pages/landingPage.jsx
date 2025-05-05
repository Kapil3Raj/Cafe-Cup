
import { useNavigate } from 'react-router-dom';
import logobg from "../assets/beansbg.png";
import logo from "../assets/logo.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <div className="w-full h-[100vh] p-2 bg-cover bg-center flex justify-center flex-col items-center" style={{ backgroundImage: `url(${logobg})` }}>
        
        <div className='w-[90%] md:w-[70%] flex flex-col items-center justify-center gap-5 backdrop-blur-sm p-5 border-4 border-white'>
          <div className='flex flex-col items-center justify-center gap-1'>
            <h2 className="amatic text-2xl md:text-3xl text-center mb-6 leading-tight text-brown bg-white px-2 py-1 rounded-xl">
              Welcome to 
            </h2>
            <img src={logo} alt="Cafe Cup Logo" className='w-26 h-26 md:w-48 md:h-48 object-contain bg-white rounded-full p-2' />
          </div>

          <h3 className="amatic text-4xl md:text-5xl text-white text-center">
            Where Every Sip <span className="text-6xl md:text-8xl">Tells a Story</span>
          </h3>

          <p className="text-md md:text-lg text-white mt-2 m max-w-2xl mx-auto patrick text-center">
            Dive into the world of freshly brewed coffee, handcrafted treats, and unforgettable conversations. 
            Taste the art. Savor the moment. Celebrate the little joys — one sip at a time ☕.
          </p>
          <div className='w-[50%] flex flex-col md:flex-row items-center justify-between gap-5 mt-5'>
            <button className='cartoon-black-button amatic text-2xl' onClick={()=>navigate("/menu")}>Menu</button>
            <button className='cartoon-black-button amatic text-2xl' onClick={()=>navigate("/manageaccess")}>Manage Items</button>
            <button className='cartoon-black-button amatic text-2xl' onClick={()=>navigate("/bills")}>Bills</button>
            

          </div>
        </div>
        
        
      </div>

     
    </div>
  );
};

export default Landing;
