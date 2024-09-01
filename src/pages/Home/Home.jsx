import "./home.css"
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'
import RightSidebar from "../../components/RightSidebar/RightSidebar"
import { useContext } from "react"
import { ThemeContext } from "../../App"

const Home = () => {
  const {darkTheme} = useContext(ThemeContext)
  return (
    <div className={`home ${darkTheme ? 'dark-theme' : ''}`}>
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
