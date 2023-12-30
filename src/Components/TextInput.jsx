import React from 'react';
import { Box, InputAdornment,  TextField,  Typography } from '@mui/material';
import { colors } from '../style/colors';


export const TextInput = (props) => {
  const {
    title,
    textFieldStyle,
    style,
    type,
    onChange,
    value,
    error,
    helperText,
    name,
    placeholder,
    required,
    children,
    select,
    StartIcon,
    EndIcon,
    onKeyDown,
    inputProps,
    id,
  } = props;
  return (
    <Box sx={{ ...style }}>
      {title && (
        <Typography
          sx={{ color: colors.gray[300] }}
          variant='body2'
          lineHeight='140%'
          mb='6px'
          textAlign='left'
          textTransform='capitalize'
        >
          {title}
        </Typography>
      )}
      <TextField
        onKeyDown={onKeyDown}
        sx={{ ...textFieldStyle, caretColor: colors.basics.primary }}
        type={type}
        onChange={(e) => onChange && onChange(e)}
        value={value}
        error={error}
        helperText={helperText}
        name={name}
        placeholder={placeholder}
        required={required}
        select={select}
        id={id}
        inputProps={inputProps}
        InputProps={{
          readOnly: false,
          endAdornment: EndIcon ? (
            <InputAdornment position='end' sx={{ p: '1px' }}>
              <Box display='flex'>{EndIcon}</Box>
            </InputAdornment>
          ) : (
            <></>
          ),
          startAdornment: StartIcon ? (
            <InputAdornment position='end' sx={{ p: '1px' }}>
              <Box display='flex'>{StartIcon}</Box>
            </InputAdornment>
          ) : (
            <></>
          ),
        }}
      >
        {children}
      </TextField>
    </Box>
  );
};

export default TextInput;
