// const serverurl = "http://159.65.155.102:8801/stickerapi/";
// const imageurl = "http://159.65.155.102:8801/stickerapi/";

const serverurl = `${process.env.REACT_APP_BASE_URL}`;
const imageurl = `${process.env.REACT_APP_IMG_URL}`;

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





























