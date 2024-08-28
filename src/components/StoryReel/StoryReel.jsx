import "./storyReel.css"
import Story from '../Story/Story';

const StoryReel = () => {
  return (
    <div className="story-reel">
      <Story 
        image="https://images.pexels.com/photos/2048434/pexels-photo-2048434.jpeg?auto=compress&cs=tinysrgb&w=600"
        profileSrc="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcROlQut4me4mu3EbFdI49JzoBsl8AHJ3GI3dmX0B4XYzp5Xeoyp"
        title="Olivia Thompson"
      />
      <Story 
        image="https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=600"
        profileSrc="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ1JkNawPPyMSXWGfM3CuCvcD6qlBX9-TJii6k3sCh_B8dYK90h"
        title="Ethan Mitchell"
      />
      <Story 
        image="https://images.pexels.com/photos/1590511/pexels-photo-1590511.jpeg?auto=compress&cs=tinysrgb&w=600"
        profileSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8zFZAFhM6lXVCYKRRVLuKM3aY5U463Oajq5xbmzdEwlKvLe3f"
        title="Sophia Lee"
      />
      
      <Story 
        image="https://images.pexels.com/photos/1271620/pexels-photo-1271620.jpeg?auto=compress&cs=tinysrgb&w=600"
        profileSrc="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRtLRX350fFpG36jdTpl2wKu363p141Hch092errCuDJ8PJaXC8"
        title="Ava Patel"
      />
      <Story 
        image="https://images.pexels.com/photos/1122639/pexels-photo-1122639.jpeg?auto=compress&cs=tinysrgb&w=600"
        profileSrc="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRfX8rIo2aEoKLYdQlM0JPxWwA66UQQ6Su5qPWptJ9NlUCs9KWT"
        title="Jackson Rivera"
      />
    </div>
  );
};

export default StoryReel;
