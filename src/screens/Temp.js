import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { ApiUtils } from '../Utils/ApiUtils';

const Temp = () => {

    useEffect(()=>{
        getAllStickersBycatid();
    },[])


    const getAllStickersBycatid = async (catid) => {
        try {
          console.log(catid,"---------------id")
          console.log(ApiUtils.allstickersbycatid+"62c265f88931be4628b71877")
      
            const Res = await axios.get(ApiUtils.allstickersbycatid+"62c265f88931be4628b71877")
            
            
            console.log(Res)
            console.log(Res,"---------------Res")
            // setStickers(Res.data.result)
          } catch (error) {
              console.log(error)
          }
      }    
  


  return (
    <div>Temp</div>
  )
}

export default Temp