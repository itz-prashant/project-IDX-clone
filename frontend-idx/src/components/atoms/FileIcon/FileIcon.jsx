import { FaCss3, FaHtml5, FaJs } from "react-icons/fa"
import { GrReactjs } from "react-icons/gr"

export const FileIcon = ({extension})=>{

    const iconStyle ={
        height: "20px",
        width: "20px",
    }

    const IconMapper = {
        "js" : <FaJs color="yellow" style={iconStyle}/>,
        "jsx" : <GrReactjs color="#61dfbf" style={iconStyle}/>,
        "css" : <FaCss3 color="#3c99dc" style={iconStyle}/>,
        "html" : <FaHtml5 color="orange" style={iconStyle}/>,
    }

    return (
        <>
            {IconMapper[extension]}
        </>
    )
}