import {useState, useEffect} from 'react';
import {Button, Card} from '@mui/material';
import { Typography } from '@mui/material';

export default function Joint(name){
    const [position, setPosition] = useState(0.0)
    return (
        <Card sx={{ maxWidth: 345, m: 20 }}>
            <Typography variant="h5" gutterBottom>
                {name.name}
            </Typography>
            <Typography variant="h6" component="div">
                {position}
            </Typography>

        </Card>
    )
}