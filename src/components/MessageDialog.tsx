import {Dialog, DialogTitle, Paper} from "@mui/material"

interface Props {
    onClose: () => void
    open: boolean
    message: string
    title: string
}

const MessageDialog = ({onClose, open, title, message}: Props) => {

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            <Paper sx={{p: 3}}>{message}</Paper>
        </Dialog>
    )
}

export default MessageDialog