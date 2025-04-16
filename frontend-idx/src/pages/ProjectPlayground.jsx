import { useParams } from "react-router-dom"
import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../components/atoms/EditorButton/EditorButton.jsx"
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure.jsx";
import { useTreeStructureStore } from "../store/treeStructureStore.js";
import { useEffect } from "react";

const ProjectPlayground = () => {

    const {projectId: projectIdFromUrl} = useParams();

    const {projectId, setProjectId} = useTreeStructureStore()

    useEffect(()=>{
      setProjectId(projectIdFromUrl)
    },[projectIdFromUrl, setProjectId])

  return (
    <>
      Project Id: {projectId}
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
      <EditorButton isActive={false}/>
      <EditorButton isActive={true}/>
    </>
  )
}

export default ProjectPlayground
