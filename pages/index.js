import {GraphQLClient, gql} from 'graphql-request'
import {BlogCard} from '../components/BlogCard'
import {Grid} from "@mui/material";

const graphcms = new GraphQLClient('https://api-eu-central-1.graphcms.com/v2/cl4lthtkd703x01yr8jkdeje7/master');

const QUERY = gql`{
    posts{
        id
        title
        datePublished
        slug
        content{
            html
        }
        author{
            name
            avatar{
                url
            } 
        }
        coverPhoto{
            url
        }
    }
}`

export async function getStaticProps() {
    const {posts} = await graphcms.request(QUERY);
    return {
        props: {
            posts,
        },
        revalidate: 10
    }
}


export default function Home({posts}) {
  return (
      <Grid container justifyContent='center'>
          <Grid container justifyContent='flex-start' style={{width: '90vw'}}>
              {posts.map(post => (
                  <BlogCard key={post.id} {...post}/>
              ))}
          </Grid>
      </Grid>
  )
}
