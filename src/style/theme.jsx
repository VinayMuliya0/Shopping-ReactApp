import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

const typographyOptions = {
  fontFamily: 'Poppins',
  lineHeight:'1.5',
  h1: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 28,
    color: colors.basics.white,
    textAlign: 'center',
  },
  h2: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 24,
    color: colors.basics.white,
    textAlign: 'center',
  },
  body1: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 20,
    color: colors.basics.white,
  },
  body2: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 16,
    color: colors.basics.white,
  },
  subtitle1: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: '-0.02em',
    textTransform: 'capitalize',
    color: colors.basics.white,
  },
  subtitle2: {
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "600",
    letterSpacing: "0em",
    textAlign: "left",
    color: colors.basics.white,
  }
};

const componentOptions = {
  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },
    styleOverrides: {
      root: {
        boxSizing: 'border-box',
        borderRadius: 8,
        textTransform: 'capitalize',
        padding:'10px 35px',
      },
      contained: ({ theme }) => ({
        boxShadow: theme.shadows[0],
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        alignItems: 'center',
        color: colors.basics.black,
        background: colors.basics.white,
        '&:hover': {
          boxShadow: theme.shadows[0],
        },
        '&:disabled': {
          background: colors.basics.theme,
          color: colors.basics.theme,
        },
      }),
      whiteBtn: ({theme}) => ({
         fontSize:'16px',
         backgroundColor: colors.basics.white,
         color: colors.basics.black,
         '&:hover' :{
          backgroundColor: colors.gray[300]
         }
      }),
      outlined: ({ theme }) => ({
        boxShadow: theme.shadows[0],
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        alignItems: 'center',
        color: colors.basics.white,
        border: `1px solid ${colors.basics.white}`,
        background: colors.dark[800],
        '&:hover': {
          boxShadow: theme.shadows[0],
          background: colors.dark[800],
          border: `1px solid ${colors.basics.theme}`,
        },
        '&:disabled': {
          color: colors.basics.primary,
        },
      }),
      text: ({ theme }) => ({
        maxHeight: '24px',
        minWidth: 0,
        height: '100%',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '24px',
        alignItems: 'center',
        color: colors.basics.primary,

        '& .MuiButtonBase-root': {
          p: 0,
          background: 'red',
        },
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        width: '100%',
        maxHeight: '52px',
        height: '100%',
        border: '0',
        borderRadius: '8px',
        background: colors.dark[600],
        '& fieldset': {
          maxHeight: '52px',
          borderWidth: '0',
          height: '100%',
        },
        '& input::placeholder': {
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: '180%',
          alignItems: 'center',
          color: colors.gray[500],
          opacity:1
        },
        '&:active': {
          outline: 'none',
        },
        '&:focus': {
          outline: 'none',
        },
        '& .MuiOutlinedInput-input': {
          padding: '15px 20px',
          '& fieldset': {
            borderWidth: 0,
          },
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: '24px',
          color: colors.basics.white,
        },

        '& .MuiOutlinedInput-root': {
          paddingRight: '0',
          paddingLeft: '0',
        },
        '& .Mui-focused fieldset': {
          border: 'none',
        },
      }),
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: ({ theme }) => ({
        width: 60,
        height: 30,
        padding: 0,
        borderRadius: '80px',
        background: '#343434',
        '& .MuiSwitch-switchBase': {
          padding: 3,
          margin: 2,

          '&.Mui-checked': {
            width: '80%',
            color: '#fff',
          },
        },
        '& .MuiSwitch-thumb': {
          width: 20,
          height: 20,
          p: 0,
        },
        '& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
          background: colors.basics.theme,
        },
      }),
    },
  },

  MuiMenu: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        '& .MuiMenuItem-root': {
          background: colors.dark[600],
          padding: 0,
        },
        '& .MuiMenu-paper': {
          boxShadow: 'none',
          maxHeight: '30% !important',
          borderRadius: '6px',
          marginTop: '10px',
          background: colors.dark[600],
        },
        '& .MuiMenu-list': {
          borderRadius: '10px',
          paddingTop: '5px',
          paddingBottom: '5px',
          paddingRight: '20px !important',
          paddingLeft: '20px !important',
          // background: colors.dark[600],
          '& li': {
            paddingTop: '14px',
            paddingBottom: '14px',
            background: colors.dark[600],
            borderBottom: `1px solid ${colors.dark[100]} `,
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            height: '100%',
            maxHeight: '240px',
            '&:last-child': {
              borderBottom: 'none',
            },
          },
        },
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        background: `${colors.dark[600]} !important`,
        '&:hover': {
          background: colors.dark[600],
        },
        '&.Mui-selected:hover': {
          background: colors.dark[600],
        },
        '&.Mui-selected': {
          background: colors.dark[600],
        },
        '&.Mui-focusVisible': {
          background: colors.dark[600],
        },
      }),
    },
  },
};

const theme = createTheme({
  typography: typographyOptions,
  components: componentOptions,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 992,
      lg: 1024,
      xl: 1200,
    },
  },
  palette :{
    primary : {
      main: '#ddd',
    } 
  }
});

export default theme ;
