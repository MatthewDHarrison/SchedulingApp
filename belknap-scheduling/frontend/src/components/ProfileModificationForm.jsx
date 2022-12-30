import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, InputLabel, Select, MenuItem, Collapse } from "@mui/material";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

function ProfileModificationForm({ submit }) {
    const navigate = useNavigate();
    const [fname, setFname] = React.useState('');
    const [lname, setLname] = React.useState('');
    const [position, setPosition] = React.useState('');
    const [yac, setYac] = React.useState(0);
    const [div, setDiv] = React.useState('');
    const [showErrBlock, setShowErrBlock] = React.useState(false);
    const [lifeguard, setLifeguard] = React.useState(false);
    const [ropes, setRopes] = React.useState(false);
    const [boat, setBoat] = React.useState(false);
    const [lund, setLund] = React.useState(false);
    const [eddie, setEddie] = React.useState(false);
    const [bill, setBill] = React.useState(false);
    const [nymcah, setNymcah] = React.useState(false);
    const [wfa, setWfa] = React.useState(false);


    const onSubmit = (e) => {
        e.preventDefault();
        setLund(boat && lund);
        setEddie(boat && eddie);
        setBill(boat && bill);
        setNymcah(boat && nymcah);

        let body = {fname: fname,
                    lname: lname,
                    position: position,
                    yac: yac,
                    div: div,
                    lifeguard: lifeguard,
                    ropes: ropes,
                    boat: boat,
                    lund: lund && boat,
                    eddie: eddie && boat,
                    bill: bill && boat,
                    nymcah: nymcah && boat,
                    wfa: wfa
        };
        submit(body);
    };

    const validateForm = () => {
        return fname.length > 0 && lname.length > 0 && yac > 0 && position.length > 0
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                padding="40px"
                borderRadius="10px"
                backgroundColor="#ddd"
                >
                <Typography
                    style={{ textAlign: "center" }}
                    component="h1"
                    variant="h5"
                >
                    Please enter the following information carefully and correctly.
                </Typography>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            className="inputRounded"
                            required
                            fullWidth
                            id="fname"
                            label="First Name"
                            name="fname"
                            autoComplete="First Name"
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className="inputRounded"
                            required
                            fullWidth
                            id="lname"
                            label="Last Name"
                            name="lname"
                            autoComplete="Last Name"
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="position">Position</InputLabel>
                        <Select
                            labelId="position"
                            id="position"
                            value={position}
                            label="Position"
                            required
                            onChange={(e) => {setPosition(e.target.value)}}
                        >
                            <MenuItem value={"LIT"}>L.I.T.</MenuItem>
                            <MenuItem value={"1L"}>1st-Year Leader</MenuItem>
                            <MenuItem value={"2L"}>2nd-Year Leader</MenuItem>
                            <MenuItem value={"3L"}>3rd-Year Leader</MenuItem>
                            <MenuItem value={"ADH"}>A.D.H.</MenuItem>
                            <MenuItem value={"DH"}>D.H.</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className="inputRounded"
                            required
                            fullWidth
                            onBlur={(e) => {/^\d+$/.test(e.target.value) ? setShowErrBlock(false) : setShowErrBlock(true)}}
                            id="yac"
                            label="Years at Camp"
                            name="lname"
                            autoComplete="Last Name"
                            onChange={(e) => setYac(parseInt(e.target.value))}
                        />
                    </Grid>
                    <Container component="main" maxWidth="xs">
                        <Collapse in={showErrBlock}>
                            <Alert severity="error">This value must be a positive, whole number</Alert>
                        </Collapse>
                    </Container>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="div">Division</InputLabel>
                            <Select
                                labelId="div"
                                id="div"
                                value={div}
                                label="Division"
                                required
                                onChange={(e) => {setDiv(e.target.value)}}
                            >
                                <MenuItem value={"C"}>Cadets</MenuItem>
                                <MenuItem value={"J"}>Juniors</MenuItem>
                                <MenuItem value={"M"}>Middlers</MenuItem>
                                <MenuItem value={"B"}>Besserers</MenuItem>
                                <MenuItem value={"S"}>Seniors</MenuItem>
                                <MenuItem value={"K"}>Kitchen</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                </Grid>
                </Box>
            </Container>
            <Container component="main" maxWidth="xs">
                <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                padding="40px"
                borderRadius="10px"
                backgroundColor="#ddd"
                >
                    <Typography
                    style={{ textAlign: "center" }}
                    component="h1"
                    variant="h5"
                    >
                        Certifications
                    </Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={() => {setLifeguard(!lifeguard)}} color="secondary"/>} label="Lifeguard" />
                        <FormControlLabel control={<Checkbox onChange={() => {setRopes(!ropes)}} color="secondary"/>} label="Ropes/Tower" />
                        <FormControlLabel control={<Checkbox onChange={() => {setBoat(!boat)}} color="secondary"/>} label="Boat License" />
                        <FormControlLabel control={<Checkbox disabled={!boat} onChange={() => {setLund(!lund)}} color="secondary"/>} label="Lund Checks" />
                        <FormControlLabel control={<Checkbox disabled={!boat} onChange={() => {setEddie(!eddie)}} color="secondary"/>} label="Fast Eddie Checks" />
                        <FormControlLabel control={<Checkbox disabled={!boat} onChange={() => {setBill(!bill)}} color="secondary"/>} label="Wild Bill Checks" />
                        <FormControlLabel control={<Checkbox disabled={!boat} onChange={() => {setNymcah(!nymcah)}} color="secondary"/>} label="NYMCAH Checks" />
                        <FormControlLabel control={<Checkbox onChange={() => {setWfa(!wfa)}} color="secondary"/>} label="WFA/WFR" />

                    </FormGroup>
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!validateForm()}
                    size="large"
                    style={{ borderRadius: 50 }}
                    onClick={onSubmit}
                >
                    Confirm
                </Button>
            </Container>
        </>
    );
}

export default ProfileModificationForm;
