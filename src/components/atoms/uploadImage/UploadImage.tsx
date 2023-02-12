import {useState} from "react";


const UploadImage = () => {
    const [highlight, setHighlight] = useState(false);
    const [preview, setPreview] = useState("");
    const [drop, setDrop] = useState(false);

    const handleEnter = (e:Event | any) => {
        e.preventDefault();
        e.stopPropagation();
        preview === "" && setHighlight(true);
    };

    const handleOver = (e:Event | any) => {
        e.preventDefault();
        e.stopPropagation();

        preview === "" && setHighlight(true);
    };

    const handleLeave = (e:Event | any) => {
        e.preventDefault();
        e.stopPropagation();
        setHighlight(false);
    };

    const handleUpload = (e:Event | any) => {
        e.preventDefault();
        e.stopPropagation();

        setHighlight(false);
        setDrop(true);
        const [file] = e.target.files || e.dataTransfer.files;

        uploadFile(file);
    };

    function uploadFile(file:File) {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = () => {
            const fileRes = window.btoa(`${reader.result}`);
            setPreview(`data:image/jpg;base64,${fileRes}`);
        };
    }

    return (
        <>
            <div
                onDragEnter={(e) => handleEnter(e)}
                onDragLeave={(e) => handleLeave(e)}
                onDragOver={(e) => handleOver(e)}
                onDrop={(e) => handleUpload(e)}
                className={`upload${
                    highlight ? " is-highlight" : drop ? " is-drop" : ""
                }`}
                style={{ backgroundImage: `url(${preview})` }}
            >
                <form className="my-form">
                    <p>Drop image here</p>
                    <div className="upload-button">
                        <input
                            type="file"
                            className="upload-file"
                            accept="image/*"
                            onChange={(e) => handleUpload(e)}
                        />
                        <button className="button">Upload Here</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UploadImage