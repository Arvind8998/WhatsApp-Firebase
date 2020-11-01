import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton} from "@material-ui/core";
import SideBarChat from'./SideBarChat';
import db from './Firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {

const [rooms,setRooms] = useState([]);
const [{user}, setUser] = useStateValue()

    useEffect(() => {
       const unsubscribe = db.collection('rooms').onSnapshot(snapshot=>{
          setRooms(snapshot.docs.map(doc=>(
           {
            id: doc.id,
            data: doc.data()
           }
          )))
        })
        return ()=>{
            unsubscribe();
        }
       }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
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
            <div className="sidebar___search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined />
                        <input placeholder="Search or start new Chat" type="text"/>
                    </div>
            </div>
            <div className="sidebar__chats">
            <SideBarChat addnewChat/>
                {rooms.map(room=>(
                    <SideBarChat key={room.id} id ={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
