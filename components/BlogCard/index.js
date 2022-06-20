import Link from 'next/link';
import {Card, CardHeader, CardMedia, Typography, CardContent, Grid} from '@mui/material';

export const BlogCard = ({title, author, coverPhoto, datePublished, slug, content}) => {
    const {avatar, name} = author;

    return (
        <div style={{margin: 15}}>
            <Link href={'/psots/' + slug}>
                <Card sx={{ width: 345, height: 'auto' }}>
                    <CardHeader
                        avatar={
                            <img src={avatar.url} alt="avatar" style={{width: 40, height: 40, borderRadius: '50%'}} />
                        }
                        title={name}
                        subheader={datePublished}
                    />
                    <CardContent>
                        <Typography>{title}</Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        height="194"
                        image={coverPhoto.url}
                        alt="Paella dish"
                    />
                </Card>
            </Link>
        </div>
    )
}