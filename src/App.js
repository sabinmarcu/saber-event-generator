import React from 'react';
import { Card, CardHeader, CardContent, TextField, Typography } from '@material-ui/core';
import { DateFormatInput, TimeFormatInput } from 'material-ui-next-pickers';
import styles from './App.module.css';
import useEditor from './logic';

const App = () => {
  const {
    output, 
    title, setTitle, 
    username, setUsername,
    startTime, setStartTime, startDate, setStartDate,
  } = useEditor();
  const handlerMap = {
    'title': setTitle, 
    'username': setUsername,
    'startDate': setStartDate,
    'startTime': setStartTime,
  };
  const handleRawOnChange = prop => 
    (value) =>
      handlerMap[prop](value);
  const handleOnChange = prop => 
    ({ target: { value } }) => 
      handleRawOnChange(prop)(value);
  return (
    <div className="app">
      <Card className={styles.card}>
        <CardHeader title="Generate Event" />
        <CardContent className={styles.container}>
          <div className={styles.editor}>
            <TextField
              fullWidth={true}
              className={styles.input}
              label={'Event Title'}
              value={title}
              onChange={handleOnChange('title')}
            />
            <TextField
              fullWidth={true}
              className={styles.input}
              label={'Event Host'}
              value={username}
              onChange={handleOnChange('username')}
            />
            <div className={styles.dateField}>
              <DateFormatInput 
                className={styles.input}
                label="Start Date"
                {...(startDate ? {
                  value: startDate,
                } : {})}
                onChange={handleRawOnChange('startDate')}
                okToConfirm={true}
              />
              <TimeFormatInput 
                className={styles.input}
                label="Start Time"
                {...(startTime ? {
                  value: startTime,
                } : {})}
                onChange={handleRawOnChange('startTime')}
                okToConfirm={true}
              />
            </div>
          </div>
          <div className={styles.preview}>
            <Typography>{output ? 'Output' : 'Invalid Info'}</Typography>
            {output && <TextField 
              disabled
              value={output}
              multiline
              fullWidth
            />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
