import React, {useEffect, useState} from 'react';
import DrawAnnotations from "./app/DrawAnnotations";
import {createTheme} from "@mui/material/styles";
import {Button, Divider, Paper, ThemeProvider, Typography} from "@mui/material";
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

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: `10px 10px 0px 0px #09859020,0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.07)`
                }
            }
        }
    },
});
export const App = () => {
    const [images, setImages] = useState([])
    const [activeImage, setActiveImage] = useState(null)


    const annotate = (image) => {
        setActiveImage(image)
    }

    const setImage = (image) => {
        if (image) {
            let URL = window.webkitURL || window.URL;
            let url = URL.createObjectURL(image);
            let img = new Image();
            img.src = url;
            img.onload = () => {
                setImages(images.concat({image, src: url, img, annotations: [], id: images.length}))
            }
        }
    }

    const onAnnotationChange = (annotations) => {
        setImages(
            images.map((item, i) => {
                if (item.id === activeImage.id) return {...item, annotations}
                return item
            })
        )
    }

    return (
        <ThemeProvider theme={theme}>

            <div className='flex flex-col items-center text-center space-y-24 p-4 sm:p-8'>
                {activeImage &&
                <Paper className='self-center shadow rounded-none'>
                    <DrawAnnotations
                        onAnnotationChange={onAnnotationChange}
                        onBack={() => setActiveImage(null)}
                        prev_annotations={activeImage.annotations}
                        image={activeImage.img}/>
                </Paper>
                }

                {!activeImage &&
                <Paper className='shadow w-full max-w-xl rounded-none p-4 text-left' style={{
                    backgroundColor: '#fff',
                    display: 'block',
                    margin: 'auto',
                    overflow: 'hidden'
                }}>
                    <Typography className='text-left text-lg font-600' style={{fontSize: 18, fontWeight: 600}}>
                        Images to Annotate (History)
                    </Typography>
                    <Typography
                        hidden={images.length > 0}
                        className='text-left text-lg font-600 pb-4'
                        color='textSecondary'>
                        No Images, Please upload one
                    </Typography>

                    {images.map(image => (
                        <div className='flex flex-col -mx-4 mb-4'>
                            <div className='flex flex-row w-full p-4 items-center space-x-8'>
                                <img src={image.src} className='h-32 w-32'/>
                                <div className='flex-1 text-end space-y-4'>
                                    <Typography>{image.image.name}</Typography>
                                    <Button size={"small"} color='primary' variant='outlined' onClick={() => annotate(image)}>
                                        Annotate
                                    </Button>
                                </div>
                            </div>
                            <Divider/>
                        </div>
                    ))}


                    <input type='file' onChange={e => setImage(e.target.files[0])}/>
                </Paper>
                }
            </div>
        </ThemeProvider>
    );
};

