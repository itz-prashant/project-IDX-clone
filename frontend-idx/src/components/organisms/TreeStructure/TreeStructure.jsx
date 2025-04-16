import { useEffect } from "react"
import { useTreeStructureStore } from "../../../store/treeStructureStore"
import { TreeNode } from "../../molecules/TreeNode/TreeNode"


export const TreeStructure = ()=>{
    const {treeStructure, setTreeStructure } = useTreeStructureStore()

    useEffect(()=>{
        if(treeStructure){
            console.log(treeStructure)
        }else{
            setTreeStructure()
        }
    }, [ setTreeStructure,treeStructure])

    return(
        <div>
            <TreeNode filefolderdata={treeStructure}/>
        </div>
    )
}