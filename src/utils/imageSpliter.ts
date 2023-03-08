
const imageSplitter = (img:string | undefined) => {
    if (img){
        return img.split("assets").length > 1 ? img.split("assets")[1] : img.split("assets")[0]
    }
    return ""
}
export default imageSplitter