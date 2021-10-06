import React, {useEffect, useState} from 'react';
import DrawAnnotations from "./app/DrawAnnotations";
import {createTheme} from "@mui/material/styles";
import {Button, Paper, ThemeProvider} from "@mui/material";
import './index.css'

const theme = createTheme({
    palette: {
        primary: {
            main: '#098590',
        },
        secondary: {
            main: '#444444',
        },
    },

    components:{
        MuiButton:{
            styleOverrides:{
                root:{
                    borderRadius: 0,

                }
            }
        }
    },
});
export const App = () => {
    const [image, setImage] = useState(null)
    const [img, setImg] = useState(null)

    const annotate = () => {
        if (image) {
            let URL = window.webkitURL || window.URL;
            let url = URL.createObjectURL(image);
            let img = new Image();
            img.src = url;
            img.onload = () => {
                setImg(img)
            }
        }
    }
    return (
        <ThemeProvider theme={theme}>

            <div className='flex flex-col items-center text-center space-y-24'>
                <Paper className='self-center shadow rounded-none'>
                    <DrawAnnotations image={img} clear={()=>setImg(null)}/>
                </Paper>
                {!img &&
                    <div style={{
                        backgroundColor: '#fff',
                        padding: 10,
                        width: 600,
                        display: 'block',
                        margin: 'auto',
                        overflow: 'hidden'
                    }}>
                        <input type='file' onChange={e => setImage(e.target.files[0])}/>
                        {image && <Button variant='outlined' color={img?"primary":"secondary"} onClick={annotate}>Annotate</Button>}
                    </div>
                }
            </div>
        </ThemeProvider>
    );
};

