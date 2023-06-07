import {FC, memo, useMemo, useState} from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  id: string | null;
  speciality: string | null;
  theme_param: string | null;
  case_content_json: string | null;
}

interface IContentJSON {
  id: string;
  text: string;
  code: number | null;
  level: number;
  number: string;
  name: string;
  answer?: Array<{ id: string, is_correct: boolean; text: string; justification: string; letter: string }>
}

export const Situation: FC<IProps> = memo(({ id, theme_param, speciality, case_content_json }) => {
  const [allAnswersVisible, setAllAnswersVisible] = useState(false);

  const content = useMemo<Array<IContentJSON> | null>(() => case_content_json && JSON.parse(case_content_json), [case_content_json]);

  console.log((content ?? [])[2]);

  const toggleAllQuestionsVisible = () => {
    setAllAnswersVisible(prev => !prev)
  }

  const info = (content ?? [])[1];

  return (
    <Box sx={{ width: '100%' }}>
      <Card sx={{ minWidth: 275, width: '100%', marginBlock: '8px' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {speciality}
          </Typography>
          <Typography variant="h5" component="div">
            {theme_param}
          </Typography>
          <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
            Level: {info?.level ?? ''}
          </Typography>
          <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
            {info?.name ?? ''}:
          </Typography>
          <Typography variant="body2">
            {info?.text ?? ''}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={toggleAllQuestionsVisible}>Open questions</Button>
        </CardActions>
      </Card>
      <Dialog
        open={allAnswersVisible}
        onClose={toggleAllQuestionsVisible}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Questions
          <IconButton
            aria-label="close"
            onClick={toggleAllQuestionsVisible}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content?.map((el, idx) => idx > 1 && (
              <Card key={el.id} sx={{ width: '100%', marginBlock: '8px' }}>
                <CardContent>
                  <Typography key={el.id}>
                    {el.text}
                  </Typography>
                  <List dense>
                    {el.answer?.map(el => (
                      <ListItem key={el.id} divider>
                        <ListItemIcon>
                          {el.is_correct ? (
                            <CheckIcon color="success" />
                          ) : (
                            <CloseIcon color="error" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={`${el.letter}: ${el.text}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Accordion elevation={0} TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Объяснение</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {el.answer?.find(el => el.is_correct)?.justification ?? ''}
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  )
})
