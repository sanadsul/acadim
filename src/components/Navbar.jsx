import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { BookOpen } from 'lucide-react';
import { AcademicCapIcon, BookOpenIcon, HomeIcon, SearchCircleIcon, UserAddIcon } from '@heroicons/react/solid';
import { Divide as Hamburger } from 'hamburger-react';
import { Book, User2, User2Icon, UserCircle, UserPlus, UserPlus2, UserRoundCheck, UserSquare2Icon, UsersRound} from 'lucide-react';

const HamburgerMenu = ({ isOpen, setOpen }) => {
  const handleLinkClick = () => {
    setOpen(false);
  };
  return (
    <>
    <div className="md:hidden">
      <Hamburger
        color="#dbb578"
        size={20}
        duration={0.4}
        toggled={isOpen}
        toggle={setOpen}
      />
       
      {isOpen && (
        <div className="container absolute top-[71px] left-0 right-0 p-2 border-[#B77D4E] border-b-2 bg-[#08333C] text-zinc-100 font-bold shadow-sm rounded-b-2xl" dir='rtl'>
  <div className='flex flex-col mr-7 mt-1 '>
          <Link to="/courses" className=" rounded-lg font-bold mt-2 mb-3 hover:text-[#B77D4E] " onClick={handleLinkClick}>
          الكورسات
          </Link>
          <Link to="/create-course" className="flex mb-3 mt-1 inlone font-bold hover:text-[#B77D4E]" onClick={handleLinkClick}>
          الرائيسية
          </Link>
          <Link to="/search" className="flex mb-3 mt-1 font-bold hover:text-[#B77D4E] " onClick={handleLinkClick}>البحث
          </Link>
          <Link to="/my-courses" className="flex mb-3 mt-1 font-bold hover:text-[#B77D4E]" onClick={handleLinkClick}>كورساتي
          </Link>
          </div>
          <div className='flex items-start justify-center '>
            <Link to="/login" className='  font-bold pl-14 pr-12 pt-1 pb-2 bg-[#B77D4E] border-white border-[1px] text-[#ffffff] rounded-lg mb-1 hover:scale-105 ' onClick={handleLinkClick}> تسجيل الدخول</Link>
             
             </div>
             
        </div>
      )}
        
    </div>
</>
  );
};

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
    <nav className=" pb-2 pt-2 border-[#B77D4E] border-b-[2px] bg-[#08333C] text-cyan-900 shadow-xl top-[0px] z-50">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between h-16 ">

          {/* قائمة الـ Hamburger للشاشات الصغيرة */}
          <HamburgerMenu isOpen={isOpen} setOpen={setOpen} />

          {/* قائمة الـ Navbar للشاشات الكبيرة */}
          <div className="hidden md:flex ml-14 text-white">
            {/* <Link to="/courses" className="font-semibold hover:scale-105 mt-2 inline-block  "style={{fontSize: '18px'}}>الكورسات</Link>
            <Link to="/create-course" className=" font-semibold hover:scale-105 inline-block mt-2" style={{fontSize: '18px'}}>الرئيسيه</Link> */}
            {/* <Link to="/search" className="  font-semibold hover:scale-105 duration-300 mt-2" style={{fontSize: '18px'}}> التسجيل </Link> */}
            <Link to="/signup" className="flex font-semibold text-white bg-yellow-700 hover:scale-105 duration-300 shadow-lg pr-4 pl-4 pt-[2px] pb-1 mt-2 rounded-md" style={{fontSize: '16px'}}>
              <UserPlus2 className='flex w-[20px] mr-3 '/>
              إنشاء حساب </Link>
            <Link to="/login" className="flex items-center  font-semibold text-white hover:scale-105 duration-300 shadow-lg pr-4 pl-4 pt-[2px] pb-1 mt-2 rounded-md" style={{fontSize: '16px'}}
            >
              <User2 className='w-[20px] mr-3 flex'/>
              تسجل الدخول</Link>

          </div>
          <div className='flex justify-between'>
          <Link to="/" className=" flex items-center  " onClick={() => setOpen(false)}>
            {/* <BookOpenIcon className="absolute w-8 h-9 ml-8 mt-1  " /> */}
            <img className='  w-52 rounded-xl mt-[25px] mb-[15px] mr-[84px]' src='src/public/assets/logo.png' ></img>
            {/* <span className=" text-xl font-black text-cyan-900 border border-cyan-900 pr-1 pl-9 ml-7 rounded-lg">كورساتي</span> */}
          </Link>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;