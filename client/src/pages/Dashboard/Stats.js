import React,{useEffect} from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer, ChartsContainer,Loading } from '../../components'
const Stats = () => {
  const {isLoading, showStats, monthlyApplications} = useAppContext()

  useEffect(()=>{
    showStats()
  },[])

  if(isLoading){
    return <Loading center/>
  }

  return (
    <>
    <StatsContainer/>
    {monthlyApplications.length > 0 && <ChartsContainer/>}   {/*if monthlyApplications are greater than 0 ,then only show ChartContainer*/}
    </>


  )
}

export default Stats