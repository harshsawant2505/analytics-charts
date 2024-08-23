
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
import { useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Loading from './loading';
import { FaceIcon } from '@radix-ui/react-icons';

import moment from 'moment';




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

  interface sessionsData{
    startDate: Date;
    currentDate: Date;
    currentSessions: number;
    previousSessions: number
  }
  interface pageViews{
    startDate: string,
    currentDate: string,
    currentPageViews: number,
    previousPageViews: number
  }
  interface sessiondurationdata{
    startDate: string,
    currentDate: string,
    currentAverageSessionDuration: string,
    previousAverageSessionDuration: string
  }
  interface bounceRatedata{
    startDate: string,
    currentDate: string,
    currentBounceRate: number,
    previousBounceRate: number
   
  }
  interface deviceUsageData{
    startDate: string,
    currentDate: string,
    desktop: number,
    mobile: number
   
  }
  interface trafficSourcesData{
      startDate: string,
      currentDate: string,
      organicSearch: number,
      direct: number,
      referral: number,
      social: number,
      email: number
   
  }

  const searchParams = useSearchParams()
  
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')


// Format the date to get the month name and year
const formattedStartDate = moment(startDate).format('MMMM, D YYYY');
const formattedEndDate = moment(endDate).format('MMMM, D YYYY');

  const [data, setData] = useState<UserData>();
  const [sessions, setsessions] = useState<sessionsData[]>();
  const [pageViews, setpageviews] = useState<pageViews[]>();
  const [sessionduration, setsessionduration] = useState<sessiondurationdata[]>();
  const [bouncerate, setbouncerate] = useState<bounceRatedata[]>();
  const [deviceusage, setdeviceusage] = useState<deviceUsageData[]>();
  const [trafficsources, settrafficsources] = useState<trafficSourcesData[]>();

  function getCurrentMonth() {
    const date = new Date(formattedEndDate);
    const month = date.getMonth();
    return month;
  }

    const fetchData = async () => {
      try {
        const response1 = await axios.get('/api/getSesions');
        const response2 = await axios.get('/api/getPageViews');
        const response3 = await axios.get('/api/getSessionDuration');
        const response4 = await axios.get('/api/getBounce');
   
        setsessions(response1.data.sessions)
        console.log(response1.data)
        setpageviews(response2.data.pageviews)
        console.log(response2.data)
        setsessionduration(response3.data.sessionduration)
        console.log(response3.data)
        setbouncerate(response4.data.bouncerate)
        console.log(response4.data)

        if(response1.data && response2.data && response3.data && response4.data){
            getCharts()
        }

      } catch (error:any) {
        console.log(error.message)
      }
        
        
    }
    useEffect(() => {
      console.log(formattedStartDate)
      console.log(formattedEndDate)
      getCurrentMonth()
      fetchData()
    
    }, [])

   async function getCharts(){
      try {
        const response1 = await axios.get('/api/getDeviceUsage')
        const response2 = await axios.get('/api/getTrafficSources')
        setdeviceusage(response1.data.deviceusage)
        console.log(response1.data)
        settrafficsources(response2.data.trafficsources)
        console.log(response2.data)

        if(response1.data && response2.data){
          setloaded(true)
        }
        
      } catch (error:any) {
        console.log(error.message)
        
      }
      
    }



    const datahero:any = trafficsources?trafficsources[getCurrentMonth()]:[{name: 'Organic Search', value: 1}, {name: 'Direct', value: 0}, {name: 'Email', value: 0}, {name: 'Referrals', value: 0}, {name: 'Social', value: 0}]
  

    const chartData = deviceusage&&deviceusage.filter(record => {
      const recordStartDate = new Date(record.startDate);
      const recordEndDate = new Date(record.currentDate);
      return recordStartDate.getMonth() >= (new Date(formattedStartDate)).getMonth() && (recordEndDate).getMonth() <= (new Date(formattedEndDate)).getMonth();
    });
     
    

      useEffect(() => {
       console.log(chartData)
      }, [chartData])
      


  
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
                <p className='text-[13.5px]'><span className='font-normal'>Date:  </span> {formattedStartDate} <span className='font-normal'>-</span> {formattedEndDate} </p>
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

            <Card title='Sessions' main={sessions?sessions[getCurrentMonth()].currentSessions:0}  tagline = "vs prev month" percentage = {sessions?(sessions[getCurrentMonth()].currentSessions - sessions[getCurrentMonth()].previousSessions)/sessions[getCurrentMonth()].previousSessions:0}/>
            <Card title='Page Views' main={pageViews?pageViews[getCurrentMonth()].currentPageViews:0} tagline = "vs prev month" percentage = {pageViews?(pageViews[getCurrentMonth()].currentPageViews - pageViews[getCurrentMonth()].previousPageViews)/pageViews[getCurrentMonth()].previousPageViews:0}  />
            <Card title='Average Session Duration' main={sessionduration?sessionduration[getCurrentMonth()].currentAverageSessionDuration:'' } tagline = "vs prev month" percentage = 'none'  />
            <Card title='Bounce Rate' main={bouncerate?bouncerate[getCurrentMonth()].currentBounceRate:0} tagline = "vs prev month" percentage = {bouncerate?(bouncerate[getCurrentMonth()].currentBounceRate - bouncerate[getCurrentMonth()].previousBounceRate)/bouncerate[getCurrentMonth()].previousBounceRate:0} />
           

            <div className='w-[40%] h-[300px]   p-0 flex flex-col justify-between items-center bg-white rounded-sm'>
              <div className='w-full flex flex-col item-start ml-6 font-bold text-gray-500 mt-5  mb-5'>
                <h2 className='text-gray-500 text-sm mb-2'>Device Usage Desktop vs Mobile</h2>
                <hr className='text-blacks w-[90%]' />
              </div>
              <ChartContainer config={chartConfig} className="h-[200px] w-[80%]">
                <BarChart accessibilityLayer data={chartData}>
                  <XAxis
                    dataKey="startDate"
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
              categories={['Organic Search', 'Direct', 'Referrals', 'Social', 'Email']}
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