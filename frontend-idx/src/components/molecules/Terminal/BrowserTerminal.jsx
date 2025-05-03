import {Terminal} from '@xterm/xterm'
import {FitAddon} from '@xterm/addon-fit'
import "@xterm/xterm/css/xterm.css"
import { useEffect, useRef } from 'react';
import {AttachAddon} from "@xterm/addon-attach"
import { useTerminalSocketStore } from '../../../store/terminalSocketStore';

const BrowserTerminal = () => {

  const terminalRef = useRef(null);

  const socket = useRef(null)

const {terminalSocket} = useTerminalSocketStore()

  useEffect(()=>{
    if (!terminalSocket) return;
    const term = new Terminal({ // Created xterm object
      cursorBlink: true,
      theme:{
        background: "#282a37",
        foreground: "#f8f8f3",
        cursor: "#f8f8f3",
        cursorAccent: "#282a37",
        red: "#ff5544",
        green:"#50fa7c",
        yellow: "#f1fa8c",
        cyan: "#8be9fc"
      },
      fontFamily: "Fira Code",
      fontSize: 16,
      convertEol: true // convert CRLF to LF
    })

    term.open(terminalRef.current)
    let fitAddon = new FitAddon() // Properly allign xterm in parent div
    term.loadAddon(fitAddon)
    fitAddon.fit()

    
      terminalSocket.onopen = ()=>{
        const attachAddon = new AttachAddon(terminalSocket) // xterm jo browser me hai usko terminal(docker / local machine terminal) se attach kr deta hai
        term.loadAddon(attachAddon);
        socket.current = terminalSocket
      }
  

      return () => {
        term.dispose();
        if (socket.current) {
          socket.current.close(); // correct way to close a WebSocket
        }
      };
      
  },[terminalSocket])

  return (
    <div
    ref={terminalRef}
      style={{
        height: "25vh",
        overflow: "auto"
      }}
      className='terminal'
      id='terminal-container'
    >
    </div>
  )
}

export default BrowserTerminal
