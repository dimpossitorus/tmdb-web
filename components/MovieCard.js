import {Card, Image, List} from "semantic-ui-react";
import React from "react";
import {Constant} from "../util/Constant";
import Link from "next/link";

const MovieCard = (props) => (
  <Link href='/movie/[movieId]' as={`/movie/${props.movie.id}`}>
    <Card>
      <Image src={`${Constant.BACKDROP_BASE_URL}${props.movie.poster_path}`} wrapped ui={false}/>
      <Card.Content>
        <Card.Header>{props.movie.title}</Card.Header>
        <Card.Meta>
          <span>Popularity: {props.movie.popularity}</span>
        </Card.Meta>
        <Card.Description>
          {props.movie.overview}
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign='center'>
        <List horizontal>
          {props.movie.genres.map((genre, idx) => (
            <List.Item key={idx}>{genre}</List.Item>
          ))
          }
        </List>
      </Card.Content>
    </Card>
  </Link>
)

export default MovieCard
