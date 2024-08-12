import Messagesender from "../MessageSender/Messagesender";
import Post from "../Post/Post";
import StoryReel from "../StoryReel/StoryReel";
import "./feed.css";

const Feed = () => {
  return (
    <div className="feed">
      <StoryReel/>
      <Messagesender/>
      <Post/>
    </div>
  )
}

export default Feed
