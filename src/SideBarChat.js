import React, { useEffect, useState } from 'react'
import './Sidebarchat.css'
import {Avatar, IconButton} from '@material-ui/core';
import db from './Firebase';
import { Link } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';

export default function SideBarChat({id='',name='',addnewChat=false}) {
const [seed,setSeed] = useState("");
const [messages,setMessages] = useState([])

useEffect(()=>{
    if(id){
        db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp","desc")
        .onSnapshot(snapshot=>{
            setMessages(snapshot.docs.map(doc=>
                  doc.data()
                )
            )
        })
    }
},[id])

useEffect(()=>{
setSeed(Math.floor(Math.random()*5000))
},[]);

const createChat = ()=>{
   const roomName =  prompt("Please enter name for chat")
   if(roomName){
       db.collection('rooms').add({
           name: roomName,

       })
       //do clever stuff
   }
}

    return !addnewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className ="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    )
    :
    <div onClick = {createChat} className="sidebarChat">
        <IconButton>
            <ChatIcon />
        </ IconButton>
        <h2>Add new chat room</h2>
    </div>
}
