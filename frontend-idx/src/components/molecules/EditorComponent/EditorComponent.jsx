import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";

const EditorComponent = () => {
  const [editorState, setEditorState] = useState({
    theme: null,
  });

  const {editorSocket} = useEditorSocketStore()

  const {activeFileTab,setActiveFileTab} = useActiveFileTabStore()

  function handleEditorTheme(editor, monaco) {
    monaco.editor.defineTheme("dracula", editorState.theme);
    monaco.editor.setTheme("dracula");
  }

  editorSocket?.on("readFileSuccess", (data) => {
    console.log("data", data);
    setActiveFileTab(data.path, data.data);
  });

  useEffect(() => {
    fetch("/Dracula.json")
      .then((response) => response.json())
      .then((data) =>
        setEditorState((prev) => ({
          ...prev,
          theme: data,
        }))
      );

  }, [editorSocket, setActiveFileTab]);

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
          value={activeFileTab?.value || '// Welcome to the playground'}
          onMount={handleEditorTheme}
        />
      )}
    </>
  );
};

export default EditorComponent;
