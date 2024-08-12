import "./home.css"
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'
import RightSidebar from "../../components/RightSidebar/RightSidebar"

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className='home-body'>
        <Sidebar/>
        <Feed/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Home
