import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { extensionToFileType } from "../../../utils/extentionToFileType";

const EditorComponent = () => {
  const [editorState, setEditorState] = useState({
    theme: null,
  });

  let timerId = null

  const {activeFileTab} = useActiveFileTabStore()

  const {editorSocket} = useEditorSocketStore()

  function handleEditorTheme(editor, monaco) {
    monaco.editor.defineTheme("dracula", editorState.theme);
    monaco.editor.setTheme("dracula");
  }

  function handleChange(value){

    if(timerId != null){
      clearInterval(timerId)
    }

    timerId = setTimeout(()=>{

      const editorContent = value
      editorSocket.emit("writeFile", {
        data: editorContent,
        pathToFileOrFolder: activeFileTab?.path
      })

    },2000)
  }

  useEffect(() => {
    fetch("/Dracula.json")
      .then((response) => response.json())
      .then((data) =>
        setEditorState((prev) => ({
          ...prev,
          theme: data,
        }))
      );

  }, []);

  return (
    <>
      {editorState.theme && (
        <Editor
          height={"80vh"}
          width={"100%"}
          defaultLanguage={undefined}
          options={{
            fontSize: 18,
            fontFamily: "monospace",
          }}
          language={extensionToFileType(activeFileTab?.extension)}
          onChange={handleChange}
          value={activeFileTab?.value || '// Welcome to the playground'}
          onMount={handleEditorTheme}
        />
      )}
    </>
  );
};

export default EditorComponent;
