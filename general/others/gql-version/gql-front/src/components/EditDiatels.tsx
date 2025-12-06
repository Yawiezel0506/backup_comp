import { Alert, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { styleButton } from "../style/login&Signin";
import { ToastContainer, toast } from "react-toastify";
import { setUserName } from "../rtk/userNameSlice";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { Edit } from '../interfaces/users'
import EditNoteIcon from '@mui/icons-material/EditNote';
import { gql, useMutation } from "@apollo/client";

interface Props {
    close: () => void
}

const EditDetails: FC<Props> = ({ close }) => {
    const [openAlertEmail, setOpenAlertEmail] = useState(false);

    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState<Edit>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    const dispatch = useAppDispatch();

    const userFromRTK = useAppSelector((state) => state.userName)

    useEffect(() => {
        setDetails((prev) => ({ ...prev, firstName: userFromRTK.firstName }))
        setDetails((prev) => ({ ...prev, lastName: userFromRTK.lastName, }))
        setDetails((prev) => ({ ...prev, username: userFromRTK.userName }))
        setDetails((prev) => ({ ...prev, email: userFromRTK.email }))
    }, [userFromRTK])

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const notify = () => {
        toast.success("The details have been successfully changed!", {
            theme: "colored"
        })
    }

    const REGISTER_USER = gql`
        mutation Edit($oldUser: UserRegisterInput!, $newUser: UserRegisterInput!) {
            edit(oldUser: $oldUser, newUser: $newUser) {
                firstName
                lastName
                username
                email
                password
            }
        }
    `;

    const [login] = useMutation(REGISTER_USER)

    const handelSubmit = async () => {
        if (details.email && validateEmail(details.email)) {
            const oldUser = {
                firstName: userFromRTK.firstName,
                lastName: userFromRTK.lastName,
                username: userFromRTK.userName,
                email: userFromRTK.email,
                password: '',
                confirmPassword: ''
            }
            login({ variables: { oldUser, newUser: details } }).then(({ data }) => {
                if (data) {
                    const userName = data.edit;                   
                    Object.assign(userName, { _id: userFromRTK.userId })
                    dispatch(setUserName(userName));
                    localStorage.setItem('email', details.email)
                    notify()
                    setOpen(false)
                    close()
                }
            }).catch((error) => {
                console.error(error);
            })
        }
        if (details.email && !validateEmail(details.email)) {
            setOpenAlertEmail(true);
        }
    };

    return (
        <>
            <IconButton onClick={() => setOpen(true)} >
                <EditNoteIcon />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle style={{ textAlign: 'center' }}>EDIT DETAILS</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(e) => setDetails((prev) => ({ ...prev, firstName: e.target.value }))}
                        value={details.firstName}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="first name"
                        type="name"
                        fullWidth
                        required
                        error={!details.firstName}
                        helperText={
                            !details.firstName ? "This is a required field." : ""
                        }
                    />
                    <TextField
                        onChange={(e) => setDetails((prev) => ({ ...prev, lastName: e.target.value }))}
                        value={details.lastName}
                        margin="dense"
                        id="name"
                        label="last name"
                        type="name"
                        fullWidth
                        required
                        error={!details.lastName}
                        helperText={
                            !details.lastName ? "This is a required field." : ""
                        }
                    />
                    <TextField
                        onChange={(e) => setDetails((prev) => ({ ...prev, username: e.target.value }))}
                        value={details.username}
                        margin="dense"
                        id="name"
                        label="user name"
                        type="name"
                        fullWidth
                        required
                        error={!details.username}
                        helperText={
                            !details.username ? "This is a required field." : ""
                        }
                    />
                    <TextField
                        onChange={(e) => {
                            setDetails((prev) => ({ ...prev, email: e.target.value }))
                            setOpenAlertEmail(false);
                        }}
                        value={details.email}
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        required
                        error={!details.email}
                        helperText={!details.email ? "This is a required field." : ""}
                    />
                    <Collapse in={openAlertEmail}>
                        <Alert severity="error" sx={{ margin: "0.5em" }}>
                            Invalid email
                        </Alert>
                    </Collapse>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" sx={styleButton} onClick={() => setOpen(false)}>cancel</Button>
                    <Button variant="contained" sx={styleButton} onClick={handelSubmit}>submit</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default EditDetails