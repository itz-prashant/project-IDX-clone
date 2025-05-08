import { Input, Row } from "antd";
import { useEffect, useRef } from "react";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { usePortStore } from "../../../store/portStore";
import { IoReload } from "react-icons/io5";

export const Browser = ({projectId})=>{

    const browserRef = useRef(null)
    const {port} = usePortStore()

    const {editorSocket} = useEditorSocketStore()

    useEffect(()=>{
        if(!port){
            editorSocket?.emit("getPort", {containerName: projectId})
        }
    },[editorSocket, port])

    if(!port){
        return <div>Loading......</div>
    }

    function handleRefresh(){
        if(browserRef.current){
            const oldAddress = browserRef.current.src;
            browserRef.current.src = oldAddress
        }
    }

    return(
        <Row
            style={{
                backgroundColor: "#22212b"
            }}
        >
            <Input 
                style={{
                    width: "100%",
                    height: "30px",
                    color: "white",
                    fontFamily: "Fira Code",
                    backgroundColor: "#282a35"
                }}
                prefix={<IoReload onClick={handleRefresh}/>}
                defaultValue={`http://localhost:${port}`}
            />
            <iframe 
                ref={browserRef}
                src={`http://localhost:${port}`}
                style={{
                    width: "100%",
                    height: "95vh",
                    border: "none"
                }}
            />
        </Row>
    )
}