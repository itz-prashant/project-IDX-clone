import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/FileIcon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";

export const TreeNode = ({ filefolderdata }) => {
  const [visibility, setVisibility] = useState({});

  const {editorSocket} = useEditorSocketStore()

  const {setFile,
    setIsOpen: setFileContextMenuIsOpen,
    setX: setFileContextMenuX,
    setY: setFileContextMenuY,
   } = useFileContextMenuStore()

  function toggleVisibility(name) {
    setVisibility({
      ...visibility,
      [name]: !visibility[name],
    });
  }

  function computeExtension(filefolderdata) {
    const names = filefolderdata.name.split('.')
    return names[names.length -1] ;
  }

  function handleDoubleClick(filefolderdata){
    console.log(filefolderdata)
    editorSocket.emit("readFile", {
      pathToFileOrFolder: filefolderdata.path
    })
  }

  function handleContextMenuForFiles(e, path){
    e.preventDefault()
    console.log("Right clicked on", path, e)
    setFile(path)
    setFileContextMenuX(e.clientX)
    setFileContextMenuY(e.clientY)
    setFileContextMenuIsOpen(true)
  }

  return (
    filefolderdata && (
      <div
        style={{
          paddingLeft: "15px",
          color: "white",
        }}
      >
        {filefolderdata.children ? (
          <button
            onClick={() => toggleVisibility(filefolderdata.name)}
            style={{
              border: "none",
              cursor: "pointer",
              outline: "none",
              color: "white",
              backgroundColor: "transparent",
              padding: "15px",
              fontSize: "16px",
              marginTop:"10px"
            }}
          >
            {visibility[filefolderdata.name] ? (
              <IoIosArrowDown style={{ height: "10px", width: "10px" }} />
            ) : (
              <IoIosArrowForward style={{ height: "10px", width: "10px" }} />
            )}
            {filefolderdata.name}
          </button>
        ) : (
          <div style={{
            display: "flex",
            alignItems:"center",
            justifyContent:"start",
          }}>
            <FileIcon extension={computeExtension(filefolderdata)}/>
            <p
              style={{
                paddingTop: "15px",
                paddingBottom: "15px",
                fontSize: "15px",
                cursor: "pointer",
                marginLeft: "18px",
                color: "white",
                marginTop:"8px"
              }}
              onContextMenu={(e)=> handleContextMenuForFiles(e, filefolderdata.path)}
              onDoubleClick={()=> handleDoubleClick(filefolderdata)}
            >
              {filefolderdata.name}
            </p>
          </div>
        )}
        {visibility[filefolderdata.name] &&
          filefolderdata.children &&
          filefolderdata.children.map((child) => (
            <TreeNode filefolderdata={child} key={child.name} />
          ))}
      </div>
    )
  );
};
