const serverurl = "http://ec2-13-126-2-209.ap-south-1.compute.amazonaws.com:3000/api/";
const imageurl = "http://ec2-13-126-2-209.ap-south-1.compute.amazonaws.com:3000/";

// const serverurl = "http://localhost:3000/api/";
// const imageurl = "http://localhost:3000/";

export const ApiUtils = {
    allcategories:`${serverurl}getAllCategory`,
    categoryById:`${serverurl}getCategoryById/`,
    addCategory:`${serverurl}admin/createCat`,
    updateCategory:`${serverurl}admin/updateCat/`,
    deleteCategory:`${serverurl}deleteCategory/`,
    allstickersbycatid:`${serverurl}getStickerByCategoryId/`,
    stickerById:`${serverurl}getStickerById/`,
    createSticker:`${serverurl}admin/createSticker`,
    updateSticker:`${serverurl}admin/updateSticker/`,
    deleteSticker:`${serverurl}deleteSticker/`,
}

export const ApiUtilsImage = {
    stickerImage:`${imageurl}stickers/`,
    categoryImage:`${imageurl}category/`,
}





























