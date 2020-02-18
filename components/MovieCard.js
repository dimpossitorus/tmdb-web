import {Card, Image, List} from "semantic-ui-react";
import React from "react";
import {Constant} from "../util/Constant";
import Link from "next/link";

const MovieCard = (props) => (
  <Card>
    <Image src={`${Constant.BACKDROP_BASE_URL}${props.movie.poster_path}`} wrapped ui={false}/>
    <Card.Content>
      <Card.Header><Link href='movie/[movieId]' as={`/movie/${props.movie.id}`}>{props.movie.title}</Link></Card.Header>
      <Card.Meta>
        <span className='date'>Popularity: {props.movie.popularity}</span>
      </Card.Meta>
      <Card.Description>
        {props.movie.overview}
      </Card.Description>
    </Card.Content>
    <Card.Content extra textAlign='center'>
      <List horizontal>
        {props.movie.genres.map(genre => (
          <List.Item>{genre}</List.Item>
        ))
        }
      </List>
    </Card.Content>
  </Card>
)

export default MovieCard
