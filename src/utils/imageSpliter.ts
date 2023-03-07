
const imageSplitter = (img:string) => {
    return img.split("assets").length > 1 ? img.split("assets")[1] : img.split("assets")[0]
}
export default imageSplitter