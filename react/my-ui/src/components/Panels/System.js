import {useState, useEffect} from 'react';
import {Button, ToggleButton, ToggleButtonGroup} from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import StopIcon from '@mui/icons-material/Stop';
import HomeIcon from '@mui/icons-material/Home';

import { Typography } from '@mui/material';

export default function System(condition){

    return (
        <div>
            <ToggleButtonGroup 
            color="primary"
            aria-label="system"
    >
      <ToggleButton value="On" aria-label="bold">
        <PowerSettingsNewIcon />
      </ToggleButton>
      <ToggleButton value="Homing" aria-label="italic">
        <HomeIcon />
      </ToggleButton>
      <ToggleButton value="Pause" aria-label="underlined">
        <PauseIcon />
      </ToggleButton>
      <ToggleButton value="Stop" aria-label="color" disabled>
        <StopIcon />
      </ToggleButton>
    </ToggleButtonGroup>
    </div>
  );
}
