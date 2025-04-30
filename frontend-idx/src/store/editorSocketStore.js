import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";

export const useEditorSocketStore = create((set) => ({

  editorSocket: null,

  setEditorSocket: (incomingSocket) => {

    const activeFileTabStore  = useActiveFileTabStore.getState().setActiveFileTab
    const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;

    incomingSocket?.on("readFileSuccess", (data) => {
      console.log("data", data);
      const fileExtension = data.path.split('.').pop()
      activeFileTabStore(data.path, data.data, fileExtension);
    });

    incomingSocket?.on("writeFileSuccess", (data)=>{
      console.log("write File", data)
      // incomingSocket.emit("readFile", {
      //   pathToFileOrFolder: data.path
      // })
    })

    incomingSocket?.on("deleteFileSuccess", ()=>{
      console.log("delete File success")
      projectTreeStructureSetter()
    })

    set({
      editorSocket: incomingSocket,
    });
  },
}));
