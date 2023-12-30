import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material'
import React from 'react'

const AddCartModal = ({ children, isOpen, handleClose, buttonText, modalHeading, addToCartHandle }) => {

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });


    return (
        <>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth={'lg'}
                scroll={'body'}
                // sx={{
                //     '& .MuiPaper-elevation ': {
                //         backgroundColor: colors.gray[300]
                //     }
                // }}
            >
                {modalHeading && <DialogTitle
                    sx={{
                        fontSize: '30px',
                        fontWeight: '600',
                        borderBottom: '1px solid #000',
                        marginBottom: '30px'
                    }}>
                    {modalHeading}
                </DialogTitle>}
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions sx={{
                    borderTop: '1px solid #000',
                }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    {buttonText && <Button onClick={()=> {addToCartHandle()
                     handleClose()}}>{buttonText}</Button>}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCartModal
