import { Box } from "@mui/material";
import { Situation } from "../components/Situation";
import situations from '../data/situations.json';
import './styles.scss'

export const Main = () => {
  return (
    <Box className={'container'}>
      {situations.map((el, idx) => (
        <Situation key={idx} {...el} />
      ))}
    </Box>
  )
}
