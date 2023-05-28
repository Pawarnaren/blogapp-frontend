import React from 'react'
import { Box, styled, Typography } from '@mui/material'


const Image = styled(Box)`
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg);
    background-size: cover;
    background-position: center;
    position: relative;
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Outerheading = styled(Box)`
    display: flex;
    background: rgb(0 0 0 / 48%);
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1;
`

const SubHeading = styled(Typography)`
    font-size: 20px;
    margin-top: 10px;
    color:#fff;
`


const Banner = () => {
    return (
        <Image>
            <Outerheading>
                <Heading>Blog</Heading>
                <SubHeading>Blog from Narender Singh Pawar</SubHeading>
            </Outerheading>
        </Image>
    )
}

export default Banner
