import React, { useState } from 'react';
import './Form.css'
import Grid from "@material-ui/core/Grid";
import { InputLabel, ListItem, MenuItem, Select } from '@material-ui/core';
import FormControl from "@mui/material/FormControl";
import SantaTable from './SantaTable';
import Popup from './Popup';
import nameList from './data/nameList.json';
import selectionNameList from './data/selectionName.json';


const members = nameList;
const membersForSelect = selectionNameList;

  const santa = [];
  const columns = [
    { id: "name", label: "Secret Santa" },
    { id: "give_present_to", label: "Gift Receiver" }
];


export default function Form() {

    const [selectName, setSelectName] = useState("");
    const [assignedName, setAssignedName] = useState("Name is not selected yet");
    const [openPopup, setOpenPopup] = useState(false);

    const handleChange = async (event) => {
        let name = members[event.target.value].name;
        await santaWork(event.target.value, name);
        setSelectName(name);
        
    };

    function openInPopupUpdate(){
        setOpenPopup(true);
    }

    function getRand(max){
        return Math.floor((Math.random() * max) + 0);
    }

    async function santaWork(selectId, name){

        let randValue;

        if(membersForSelect.length > 2){
            randValue = await getRand(membersForSelect.length -1);
            while(name === membersForSelect[randValue].name){
                randValue = await getRand(membersForSelect.length -1);
            }
        }else if(membersForSelect.length == 2){
        
            if(selectId == 0){
                if(members[0].name == membersForSelect[0].name || members[1].name == membersForSelect[1].name){
                    randValue = 1;
                }else if(members[1].name == membersForSelect[0].name || members[0].name == membersForSelect[1].name){
                    randValue = 0;
                }else{
                    randValue = await getRand(membersForSelect.length -1);
                }
            }else if(selectId == 1){
                if(members[0].name == membersForSelect[0].name || members[1].name == membersForSelect[1].name){
                    randValue = 0;
                }else if(members[1].name == membersForSelect[0].name || members[0].name == membersForSelect[1].name){
                    randValue = 1;
                }else{
                    randValue = await getRand(membersForSelect.length -1);
                }
            }   
        }else {
            randValue = 0;
        }


        var santaChoiceName = membersForSelect[randValue].name;

        var santachoice = { 
                            "name" : name,
                            "give_present_to" : santaChoiceName
                        };

        santa.push(santachoice);
        console.log(santa);
        members.splice(selectId, 1);
        membersForSelect.splice(randValue, 1);
        setAssignedName(santaChoiceName);

        
    }

    return (
        <div>
            <button 
                    className="santabtn"
                    onClick={() => {
                        openInPopupUpdate();
                    }}  
                    >
                        Secret 
                    </button>
            <div className = "txt topic">
                <h1 style={{ paddingTop : "10px", paddingBottom : "10px" }}>Welcome to Secret Santa Gift Exchange! </h1>
            </div> 
            
            <form className = "form">
            
            
            <Grid container spacing={2}>
                <Grid item xs={4} className="txt" style={{ marginRight : "50px" }}>
                    <ListItem >
                        <label style={{ paddingTop : "10px", paddingBottom : "10px" }} >Select your Name</label>
                    </ListItem>
                </Grid>
                <Grid item xs={4} className="txt">
                <FormControl >
                <Select style={{ minWidth : "100px", paddingTop : "10px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectName}
                  label="Names"
                  onChange={handleChange}
                >
                  {members.map( (member, index) => {
                      
                    return (
                      <MenuItem key={index} value={index}>
                        {member.name}
                      </MenuItem>
                      
                    );
                  })}
                </Select>
                </FormControl>
                    
                </Grid>
                
                <Grid item xs={10}>
                    <div className = "parg txt">
                        <p style={{ paddingTop : "5px" }}>Hi {selectName}, </p>
                        <p style={{ paddingBottom : "5px" }}>You are assigned as a Secret Santa to give a present to : </p>
                    </div> 
                </Grid>
                <Grid item xs={6}>
                    <div className="txt name" > 
                        <p style={{ paddingTop : "10px", paddingBottom : "10px" }}>{assignedName}</p>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className="txt happy"> 
                        <h2 style={{ paddingTop : "15px", paddingBottom : "15px" }}>Happy Gift Hunting !</h2>
                    </div>
                </Grid>
            </Grid>
            </form>
            <Popup
            title="Secret Santa"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            >
                <SantaTable
                    santa={santa}
                    columns={columns}
                />
            </Popup>
        </div>
    )
}
