
import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { addElipsis } from '../../../utils/common-utils';


const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    height: 350px;
    display: flex;
    align-items: center;
    flex-direction: column;
    & > p {
      padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
   width: '100%',
   borderRadius: '5px 5 px 0 0 ',
   objectFit: 'cover',
   height: '150px'

});

const Text = styled(Typography)`
   color: #878787;
   font-size: 12px;
`;

const Heading = styled(Typography)`
   font-size: 18px;
   font-weight: 600;
`;

const Details = styled(Typography)`
   font-size: 14px;
   word-break: break-word;
`



const Post = ({ post }) => {

  const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
   
  return (
     <Container>
        <Image src={url} alt="blog" />
        <Text>{post.categories}</Text>
        <Heading>{addElipsis(post.title, 20)}</Heading>
        <Text>{post.username}</Text>
        <Details>{addElipsis(post.description, 100)}</Details>

     </Container>
  )
}

export default Post
