import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";


const uploadImage=async(imageFile)=>{
    const formData=new FormData();
    //Append image file to from data
    formData.append('image',imageFile);

    try {
        const res=await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
            headers:{
                "Content-Type":"multipart/form-data",//set header for file upload
            }
        });
        return res.data;//return response data
    } catch (error) {
        console.error("Error uploading the image :" ,error);
        throw error;//Rethrow error for handling
    }
    
};

export default uploadImage;