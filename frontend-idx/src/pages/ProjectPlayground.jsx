import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../components/atoms/EditorButton/EditorButton.jsx";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure.jsx";
import { useTreeStructureStore } from "../store/treeStructureStore.js";
import { useEffect, useState } from "react";
import { useEditorSocketStore } from "../store/editorSocketStore.js";
import { io } from "socket.io-client";
import BrowserTerminal from "../components/molecules/Terminal/BrowserTerminal.jsx";
import { useTerminalSocketStore } from "../store/terminalSocketStore.js";
import { Browser } from "../components/organisms/Browser/Browser.jsx";
import { Button } from "antd";
import { Allotment } from "allotment";
import "allotment/dist/style.css"

const ProjectPlayground = () => {
  const { projectId: projectIdFromUrl } = useParams();

  const { projectId, setProjectId } = useTreeStructureStore();

  const { setEditorSocket } = useEditorSocketStore();

  const { setTerminalSocket, terminalSocket } = useTerminalSocketStore();

  const [loadBrowser, setLoadBrowser] = useState(false);

  useEffect(() => {
    if (projectIdFromUrl) {
      setProjectId(projectIdFromUrl);
      const editorSocketConnetion = io(
        `${import.meta.env.VITE_BACKEND_URL}/editor`,
        {
          query: {
            projectId: projectIdFromUrl,
          },
        }
      );
      if (editorSocketConnetion) {
        try {
          const ws = new WebSocket(
            "ws://localhost:4000/terminal?projectId=" + projectIdFromUrl
          );
          setTerminalSocket(ws);
        } catch (error) {
          console.log(error);
        }
        setEditorSocket(editorSocketConnetion);
      }
    }
  }, [projectIdFromUrl, setProjectId, setEditorSocket, setTerminalSocket]);

  return (
    <>
      <div style={{ display: "flex" }}>
        {projectId && (
          <div
            style={{
              backgroundColor: "#333254",
              paddingRight: "10px",
              paddingTop: "0.3vh",
              minWidth: "250px",
              maxWidth: "25%",
              height: "100vh",
              overflow: "auto",
            }}
          >
            <TreeStructure />
          </div>
        )}
        <div
          style={{
            width: "100vh",
            height: "100vh",
          }}
        >
          <Allotment>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                backgroundColor: "#282a36",
              }}
            >
              <div>
                <EditorComponent />
              </div>
              <div>
              <BrowserTerminal />
              </div>
            </div>
            <div>
              <Button onClick={() => setLoadBrowser(true)}>Load Browser</Button>
              {loadBrowser && projectIdFromUrl && terminalSocket && (
                <Browser projectId={projectIdFromUrl} />
              )}
            </div>
          </Allotment>
        </div>
      </div>
      {/* <EditorButton isActive={false} />
      <EditorButton isActive={true} /> */}
    </>
  );
};

export default ProjectPlayground;
