import './FileContextButton.css'
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useEditorSocketStore } from '../../../store/editorSocketStore';


export const FileContextMenu = ({
    x, 
    y,
    path
})=>{
    const {setIsOpen} = useFileContextMenuStore()

    const {editorSocket} = useEditorSocketStore()

    function handleFileDelete(e){
        e.preventDefault();
        console.log("Deleting file at", path)
        editorSocket.emit("deleteFile", {
            pathToFileOrFolder: path
        })
    }

    return (
        <div className='fileContextOptionWrapper'
        onMouseLeave={()=>{
            console.log("Mouse left")
            setIsOpen(false)
        }}
        style={{
            left: x,
            top: y,
        }}>
            <button className='fileContextButton'
            onClick={handleFileDelete}>
                Delete file
            </button>
            <button className='fileContextButton'>
                Rename file
            </button>
        </div>
    )
}