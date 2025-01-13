import React from 'react'
import CampaignTable from '../Components/CampaignTable'
import { useState } from 'react'

const Campaigns = () => {
    const [file, setfile] = useState("")
    return (
        <div className='flex items-center justify-center h-[100vh] w-[100vw]'>
            <CampaignTable refresh={file} />
        </div>
    )
}

export default Campaigns
