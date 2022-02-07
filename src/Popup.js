import { DialogTitle } from '@material-ui/core';
import React from 'react'
import { Dialog } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import './Form.css'




const useStyles = makeStyles(theme => ({
    dialogWrapper : {
        padding : theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        width: '50%'
    },
    dialogTitle:{
        paddingRight : '0px'
    }
}))

export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();
    return (
    <Dialog open={openPopup} classes={{paper : classes.dialogWrapper}}>
            <DialogTitle classname={classes.dialogTite}>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" compnent="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                    <button className="popbtn" onClick={() => setOpenPopup(false)}> X </button>
                </div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}