import React, {useEffect, useState} from 'react';
import DrawAnnotations from "./app/DrawAnnotations";

export const App = () => {
    const [image, setImage] = useState(null)
    const [img, setImg] = useState(null)
    useEffect(()=>{
        if(image) {
            let URL = window.webkitURL || window.URL;
            let url = URL.createObjectURL(image);
            let img = new Image();
            img.src = url;
            img.onload = () => {
                setImg(img)
            }
        }
    }, [image])
  return (
      <div style={{flexDirection:'column', alignItems:'center', justifyItems:'center',width:'100%'}}>
          <DrawAnnotations image={img}/>
          <div style={{backgroundColor:'#fff', padding:10,width:600, display:'block', margin:'auto',overflow:'hidden'}}>
              <input type='file' onChange={e=>setImage(e.target.files[0])}/>
              <button>Annotate</button>
          </div>
          <div style={{backgroundColor:'#fff', padding:10,width:600, display:'block', margin:'auto',overflow:'hidden'}}>
              <button>Save</button>
          </div>
      </div>
  );
};

