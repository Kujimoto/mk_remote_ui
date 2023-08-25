import {useState, useEffect} from 'react';
import {Button, Card} from '@mui/material';
import { Typography } from '@mui/material';

export default function Heater(){
    return (
        <Card sx={{ maxWidth: 345, p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Heater Name
            </Typography>
            <Typography variant="h6" component="div">
                Target temp.
            </Typography>
             <Typography variant="h6" component="div">
                Current temp.
            </Typography>
            
            <Button variant="contained">On</Button>
        </Card>
    )
}