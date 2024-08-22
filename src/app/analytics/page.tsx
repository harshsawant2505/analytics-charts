
"use client"
import React, { useState } from 'react'

import axios from 'axios' 
import { useEffect } from 'react'
import Card from '../components/Card';
import { CgProfile } from "react-icons/cg";
import { CiBellOn } from "react-icons/ci";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Switch } from "@/components/ui/switch"
import { IoLogoCodepen } from "react-icons/io";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { ChartTooltip } from "@/components/ui/chart"

import { type ChartConfig } from "@/components/ui/chart"

import { DonutChart, Legend } from '@tremor/react';
import { FaSearch } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Loading from './loading';
import { FaceIcon } from '@radix-ui/react-icons';





function Analytics() {
  

 


  interface Goal {
    goalId: string;
    goalName: string;
    completions: number;
  }
  
  interface Conversions {
    total: number;
    conversionRate: string;
    goals: Goal[];
  }
  
  interface TrafficSources {
    organicSearch: number;
    direct: number;
    referral: number;
    social: number;
    email: number;
  }
  
  interface MonthlyDeviceUsage {
    desktop: number;
    mobile: number;
  }
  
  interface DeviceUsage {
    month: MonthlyDeviceUsage[];
  }
  
  interface GeoLocation {
    country: string;
    city: string;
  }
  
  interface Event {
    eventId: string;
    eventName: string;
    eventCount: number;
  }
  
  interface Analytics {
    sessions: number;
    prevsessions: number;
    pageViews: number;
    prevpageViews: number;
    startDate: string;
    currentDate: string;
    averageSessionDuration: string;
    prevaverageSessionDuration: string;
    bounceRate: number;
    prevbounceRate: number;
    conversions: Conversions;
    trafficSources: TrafficSources;
    deviceUsage: DeviceUsage;
    geolocation: GeoLocation;
    events: Event[];
  }
  
  interface UserData {
    userId: string;
    userName: string;
    email: string;
    analytics: Analytics;
  }

  const [data, setData] = useState<UserData>();

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getdata');
        setData(response.data)
        console.log(response.data)
        setloaded(true)
      } catch (error:any) {
        console.log(error)
      }
        
        
    }
    useEffect(() => {
        fetchData()
    
    }, [])

    const datahero = [
      {
        name: 'Organic Search',
        value: data?data.analytics.trafficSources.organicSearch:0,
      },
      {
        name: 'Direct',
        value:  data?data.analytics.trafficSources.direct:0,
      },
      {
        name: 'Email',
        value:  data?data.analytics.trafficSources.email:0,
      },
      {
        name: 'Referral',
        value: data?data.analytics.trafficSources.referral:0, 
      },
      {
        name: 'Social',
        value: data?data.analytics.trafficSources.social:0,
      },
      
    ];
    

    const chartData = [
      { month: "January", desktop: data?.analytics.deviceUsage.month[0].desktop, mobile: data?.analytics.deviceUsage.month[0].mobile },
      { month: "February", desktop: data?.analytics.deviceUsage.month[1].desktop, mobile: data?.analytics.deviceUsage.month[1].mobile },
      { month: "March", desktop: data?.analytics.deviceUsage.month[2].desktop, mobile: data?.analytics.deviceUsage.month[2].mobile },
      { month: "April", desktop: data?.analytics.deviceUsage.month[3].desktop, mobile: data?.analytics.deviceUsage.month[3].mobile },
      { month: "May", desktop: data?.analytics.deviceUsage.month[4].desktop, mobile: data?.analytics.deviceUsage.month[4].mobile },
      { month: "June", desktop: data?.analytics.deviceUsage.month[5].desktop, mobile: data?.analytics.deviceUsage.month[5].mobile },
      { month: "July", desktop: data?.analytics.deviceUsage.month[6].desktop, mobile: data?.analytics.deviceUsage.month[6].mobile },
      { month: "August", desktop: data?.analytics.deviceUsage.month[7].desktop, mobile: data?.analytics.deviceUsage.month[7].mobile },
      { month: "September", desktop: data?.analytics.deviceUsage.month[8].desktop, mobile: data?.analytics.deviceUsage.month[8].mobile },
      { month: "October", desktop: data?.analytics.deviceUsage.month[9].desktop, mobile: data?.analytics.deviceUsage.month[9].mobile },
    ];
  
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "#2563eb",
      },
      mobile: {
        label: "Mobile",
        color: "#60a5fa",
      },
    } satisfies ChartConfig
  

    const valueFormatter = (number: number) =>
      `${Intl.NumberFormat('us').format(number).toString()} searches`;
    const [ loaded, setloaded ] = useState(false);
    
   
    
  if (!loaded) {
      return <Loading />;
  }else{
  return (
    <div className='bg-gray-100 w-full min-h-screen text-black flex p-2'>

      <div className='bg-transparent flex w-full gap-2'>


        <div className='bg-white min-w-[15%] flex flex-col py-4 items-center justify-start font-semibold text-lg h-full rounded-sm'>
          <div className='flex gap-x-1 items-center'><IoLogoCodepen className='text-4xl' />Weblitics</div>

        <div className='mt-7 flex flex-col gap-4'>

   
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Home" />
            </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Coming soon.</SelectItem>
            
          </SelectContent>
        </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Customization" />
            </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">All</SelectItem>
            
          </SelectContent>
        </Select>

        <hr className='mt-3' />
       
        </div>
          
        </div>

        <div className='flex flex-col gap-1 w-full '>

          <div className='w-full h-16   px-5 flex justify-between rounded-sm bg-white'>
        <div className='flex items-center gap-3'>
        

        </div>
        <div className='  flex items-center gap-x-6'>
          <FaSearch className='text-md ' />
          <CiBellOn className='text-xl ' />
          <CgProfile className='text-3xl' />
        </div>
          </div>

          <div className='w-full h-12 rounded-sm bg-white font-bold text-xl px-4 justify-between text-gray-600 flex items-center'>
            <h3 className='ml-1 text-lg'>Analytics Audience Home</h3>
            <div className= 'w-fit flex items-center gap-6 '>
                <p className='text-[13.5px]'><span className='font-normal'>Date:  </span> {data?.analytics.startDate} <span className='font-normal'>-</span> {data?.analytics.currentDate} </p>
                <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Device" />
            </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">All</SelectItem>
            <SelectItem value="dark">Mobile</SelectItem>
            <SelectItem value="system">Desktop</SelectItem>
          </SelectContent>
        </Select>

            </div>
       
            </div>


          <div className='bg-transparent  p-5 flex flex-wrap gap-3'>

            <Card title='Sessions' main={data?.analytics.sessions}  tagline = "vs prev month" percentage = {data?(data?.analytics.sessions - data?.analytics.prevsessions)/data.analytics.prevsessions:0}/>
            <Card title='Page Views' main={data?.analytics.pageViews} tagline = "vs prev month" percentage = {data?(data?.analytics.pageViews - data?.analytics.prevpageViews)/data.analytics.prevpageViews:0}  />
            <Card title='Average Session Duration' main={data?.analytics.averageSessionDuration } tagline = "vs prev month" percentage = 'none'  />
            <Card title='Bounce Rate' main={data?.analytics.bounceRate} tagline = "vs prev month" percentage = {data?(data?.analytics.bounceRate - data?.analytics.prevbounceRate)/data.analytics.prevbounceRate:0} />
           

            <div className='w-[40%] h-[300px]   p-0 flex flex-col justify-between items-center bg-white rounded-sm'>
              <div className='w-full flex flex-col item-start ml-6 font-bold text-gray-500 mt-5  mb-5'>
                <h2 className='text-gray-500 text-sm mb-2'>Device Usage Desktop vs Mobile</h2>
                <hr className='text-blacks w-[90%]' />
              </div>
              <ChartContainer config={chartConfig} className="h-[200px] w-[80%]">
                <BarChart accessibilityLayer data={chartData}>
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
            

            <div className="flex flex-col items-center gap-1 justify-start  w-[350px] bg-white rounded-sm border">
            <div className='w-full flex flex-col item-start ml-6 font-bold text-gray-500 mt-5  mb-5'>
                <h2 className='text-gray-500 text-sm mb-2'>Traffic Sources</h2>
                <hr className='text-blacks w-[90%]' />
              </div>
              <DonutChart
                data={datahero}
                category="value"
                index="name"
                valueFormatter={valueFormatter}
                variant="donut"
                colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
                className="w-40 "
              />
              <Legend
              categories={['Organic Search', 'Direct', 'Email', 'Referrals', 'Social']}
              colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
              className="max-w-xs"
              />

            </div>

          </div>
        </div>

      </div>

    </div>
  )
}
}

export default Analytics