import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {IconButton} from "@material-ui/core";
import axios from './Axios';
import {useParams} from 'react-router-dom';
import db from './Firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {
const [seed,setSeed] = useState("");
const [input, setInput] = useState("")
const [roomName,setroomName] = useState("")
const [messages,setMessages] = useState([])
const [{user}] = useStateValue()
const { roomId } = useParams();

useEffect(()=>{
    if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
            console.log("snapshot data",snapshot.data())
            setroomName(snapshot.data().name)
        })
        db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot((snapshot)=>{
        setMessages(snapshot.docs.map(doc=>(
            doc.data()))
        
        )})
    }
},[roomId])

useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000))
    },[]);

    const sendMessage = (e)=>{
        e.preventDefault()

        axios.post('/messages/new',{
            message: input,
            name: "Zayn Malik",
            timestamp: "20/09/2020",
            received:true
        })

        //Save on Input Submission of chat
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen {" "}{new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </ IconButton>
                    <IconButton>
                        <ChatIcon />
                    </ IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </ IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message)=>(
                  <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span> 
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))} 
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input 
                    type="text" 
                    value= {input} 
                    onChange = {e=>setInput(e.target.value)}
                     placeholder="Type a Message"/>
                    <button type="submit" onClick = {sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
