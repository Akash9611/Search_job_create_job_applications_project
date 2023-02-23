import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const BarChartComponent = ({ data }) => {   //todo:data is coming from monthlyApplications [date,count] with those two values
    return (
        <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data} margin={{ top: 50 }}>
                <CartesianGrid strokeDasharray='3 3' />{/*this are background grid-lines */}
                <XAxis dataKey='date' />  {/*//!date comes here on x-axis */}
                <YAxis allowDecimals={false} />{/*Y axis no. comes as decimal and with point to resolve that issue set as false*/}
                <Tooltip />
                <Bar dataKey='count' fill='#2cb1bc' barSize={75} />{/*//!count comes here as a bar */}
            </BarChart>

        </ResponsiveContainer>
    )
}

export default BarChartComponent