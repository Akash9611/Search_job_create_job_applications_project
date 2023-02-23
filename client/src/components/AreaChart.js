import React from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from 'recharts';

const AreaChartComponent = ({data}) => {   //todo:data is coming from monthlyApplications [date,count] with those two values
  return (
    <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data} margin={{top:50}}>
            <CartesianGrid strokeDasharray='3 3' /> {/*this are background grid-lines */}
            <XAxis dataKey='date' /> {/*//!date comes here on x-axis */}
            <YAxis allowDecimals={false}/> {/*Y axis no. comes as decimal and with point to resolve that issue set as false*/}
            <Tooltip/>
            <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />{/*//!count comes here as a bar [set in dataKey]*/}
        </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent