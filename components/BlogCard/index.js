import Link from 'next/link';
import {Card, CardHeader, CardMedia, Typography, CardContent} from '@mui/material';
import styles from '../../styles/BlogCard.module.css'

export const BlogCard = ({title, author, coverPhoto, datePublished, slug, content}) => {
    const {avatar, name} = author;

    return (
        <div className={styles.cardContainer}>
            <Link href={'/posts/' + slug}>
                <Card className={styles.card}>
                    <CardHeader
                        avatar={
                            <img src={avatar.url} alt="avatar" className={styles.avatarImg} />
                        }
                        title={name}
                        subheader={datePublished}
                    />
                    <CardContent>
                        <Typography>{title}</Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        height="200"
                        image={coverPhoto.url}
                        alt="Paella dish"
                    />
                </Card>
            </Link>
        </div>
    )
}