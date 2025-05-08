import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";
import { usePortStore } from "./portStore";

export const useEditorSocketStore = create((set) => ({

  editorSocket: null,

  setEditorSocket: (incomingSocket) => {

    const activeFileTabStore  = useActiveFileTabStore.getState().setActiveFileTab
    const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;
    const portSetter = usePortStore.getState().setPort;

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

    incomingSocket.on("getPortSuccess", ({port})=>{
      console.log("Port data recieve", port)
      portSetter(port)
    })

    set({
      editorSocket: incomingSocket,
    });
  },
}));
