import {GraphQLClient, gql} from 'graphql-request'
import styles from '../../styles/Slug.module.css'

const graphcms = new GraphQLClient('https://api-eu-central-1.graphcms.com/v2/cl4lthtkd703x01yr8jkdeje7/master');

const QUERY = gql`
query Post($slug: String) {
  post(where: {slug: $slug}) {
    id
    title
    slug
    datePublished
    author {
      id
      name
      avatar {
        url
      }
    }
    content {
      html
    }
    coverPhoto {
      url
      id
    }
  }
}
`;

const SLUG_LIST = gql`{
    posts{
        slug
    }
}`

export async function getStaticPaths() {
    const {posts} = await graphcms.request(SLUG_LIST);
    return {
        paths: posts.map(({slug}) => ({params: { slug }})),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const {slug} = params;
    const {post} = await graphcms.request(QUERY, {slug});
    return {
        props: {
            post,
        },
        revalidate: 10
    }
}
const Blogpost = ({post}) => {
    console.log('post ', post )
    return (
        <main>
            <img src={post.coverPhoto.url} alt="coverPhoto" style={styles.coverImg}/>
            <div>
                <img src={post.author.avatar.url} alt="coverPhoto" style={styles.coverImg}/>
                <div>
                    <h6>By {post.author.name}</h6>
                    <h6>{post.datePublished}</h6>
                </div>
            </div>
            <h2>{post.title}</h2>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: post.content.html}}></div>
        </main>
    )
}

export default Blogpost
