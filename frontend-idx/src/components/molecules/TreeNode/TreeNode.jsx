import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/FileIcon";

export const TreeNode = ({ filefolderdata }) => {
  const [visibility, setVisibility] = useState({});

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
              paddingTop: "15px",
              fontSize: "16px",
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
            alignItems:"center"
          }}>
            <FileIcon extension={computeExtension(filefolderdata)}/>
            <p
              style={{
                paddingTop: "5px",
                fontSize: "15px",
                cursor: "pointer",
                marginLeft: "5px",
                color: "white",
              }}
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
