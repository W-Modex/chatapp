import React, {useState, useEffect} from 'react'
import Chat from '../../components/chat/Chat'
import Header from '../../components/header/Header'
import MobileChat from '../../components/chat/MobileChat'

function Chats() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='bg-[#1C1C21]'>
      <Header />
      {windowWidth > 768 ? <Chat /> : <MobileChat />}  
    </div>
  )
}

export default Chats