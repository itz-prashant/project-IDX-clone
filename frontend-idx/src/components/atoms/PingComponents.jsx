import usePing from "../../hooks/apis/queries/usePing"

const PingComponents = () => {
  
    const {isLoading, data} = usePing()

    if(isLoading){
      return(
        <>
          Loading.......
        </>
      )
    }
  
    return (
      <>
       Hello {data.message}
      </>
    )
}

export default PingComponents
