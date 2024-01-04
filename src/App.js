import React, { useState } from 'react'
import './App.scss'
import chatGPT from './asserts/chatGPT.png'
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GPT from './asserts/chatGPT.jpeg'
import { sendMsgToOpenAI } from './openai'

const App = () => {
  const [input, setInput] = useState("")

  const handelSend = async (e) => {
    e.preventDefault()
    const response = await sendMsgToOpenAI(input)
    console.log(response);
  }


  return (
    <div className='App'>
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={chatGPT} className='logo' alt="" />
            <span className='brand'>chatGPT</span></div>
          <button className='midBtn'><AddIcon />New Chat</button>
          <div className="upperSideBottom">
            <button className="query"><ChatBubbleOutlineIcon className='chatIcon' />What is Programing ?</button>
            <button className="query"><ChatBubbleOutlineIcon className='chatIcon' />What is an API ?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <div><HomeRoundedIcon className='Icons' />Home</div>
            <div><BookmarkRoundedIcon className='Icons' />Saved</div>
            <div><RocketLaunchRoundedIcon className='Icons' />Upgrade to Pro</div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          <div className="chat">
            <PersonRoundedIcon className='userIcon' />
            <p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, deserunt.</p>
          </div>
          <div className="chat bot">
            <img src={GPT} className='logo' alt="" />
            <p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, autem. Nisi suscipit unde iusto. Iste sit magnam saepe non sapiente doloremque possimus accusamus quibusdam, alias molestias reiciendis soluta. Tempora iste quae at adipisci odit quas voluptas omnis maxime modi reprehenderit ab accusamus ducimus possimus architecto quibusdam nisi totam fugit, error autem? Ipsam illo quisquam odio facere nesciunt rerum natus ad sed facilis, eligendi at cum. Voluptatibus id accusantium, minima doloribus, obcaecati sequi iusto alias laborum unde sunt ducimus numquam qui vero dolorem voluptate commodi porro incidunt aut, repellendus reprehenderit voluptates ab eius fugit velit. Sint provident minima id odio illum!</p>
          </div>
        </div>
        <div className="chatFooter">
          <form className="inp">
            <input type="text" placeholder='send message' value={input} onChange={(e) => { setInput(e.target.value) }} />
            <button className='send' onClick={handelSend} ><SendRoundedIcon className='sendIcon' /></button>
          </form>
          <p>Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 3 Version</p>
        </div>
      </div>
    </div>
  )
}

export default App
