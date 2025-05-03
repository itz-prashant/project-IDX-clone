import { useParams } from "react-router-dom"
import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../components/atoms/EditorButton/EditorButton.jsx"
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure.jsx";
import { useTreeStructureStore } from "../store/treeStructureStore.js";
import { useEffect } from "react";
import { useEditorSocketStore } from "../store/editorSocketStore.js";
import {io} from "socket.io-client"
import BrowserTerminal from "../components/molecules/Terminal/BrowserTerminal.jsx";
import { useTerminalSocketStore } from "../store/terminalSocketStore.js";

const ProjectPlayground = () => {

    const {projectId: projectIdFromUrl} = useParams();

    const {projectId, setProjectId} = useTreeStructureStore()

    const {setEditorSocket, editorSocket} = useEditorSocketStore();

    const {setTerminalSocket} = useTerminalSocketStore();

    function fetchPort(){
      editorSocket.emit("getPort")
    }

    useEffect(()=>{
      if(projectIdFromUrl){
        setProjectId(projectIdFromUrl)
      const editorSocketConnetion = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
        query:{
          projectId: projectIdFromUrl
        }
      });
      if(editorSocketConnetion){
        const ws = new WebSocket("ws://localhost:3000/terminal?projectId="+projectIdFromUrl)
        setTerminalSocket(ws)
        setEditorSocket(editorSocketConnetion)
      }
      }
    },[projectIdFromUrl, setProjectId, setEditorSocket, setTerminalSocket])

  return (
    <>
      <div style={{display:"flex"}}>
        {projectId && (
          <div 
            style={{
              backgroundColor: "#333254",
              paddingRight: "10px",
              paddingTop: "0.3vh",
              minWidth: "250px",
              maxWidth: "25%",
              height: "99.7vh",
              overflow: "auto"
            }}
          >
            <TreeStructure />
          </div>
        )}
        <EditorComponent />
      </div>
      <EditorButton isActive={false}/>
      <EditorButton isActive={true}/>
      <div>
        <button
          onClick={fetchPort}
        >
          Get port
        </button>
      </div>
      <div>
        <BrowserTerminal />
      </div>
    </>
  )
}

export default ProjectPlayground
