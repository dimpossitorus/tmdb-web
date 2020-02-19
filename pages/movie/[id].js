import React from 'react'
import Head from 'next/head'
import Nav from '../../components/nav'
import {Constant} from "../../util/Constant";
import {
  Container,
  Divider,
  Flag,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Image,
  List,
  ListContent,
  ListIcon,
  Responsive,
  Segment,
  SegmentGroup
} from "semantic-ui-react";
import {getMovieDetail} from "../../network/ApiService";
import {convertFriendlyTime} from "../../util/Utils";

const Movie = ({movie}) => (

  <Container>
    <Head>
      <title>{movie.original_title} - The Movie Database</title>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <Nav/>

    <Image src={`${Constant.BACKDROP_BASE_URL}${movie.backdrop_path}`} centered/>

    <Responsive minWidth={768}>
      <SegmentGroup horizontal>
        <Segment textAlign={'center'}>Duration: {convertFriendlyTime(movie.runtime)}</Segment>
        <Segment textAlign={'center'}>Release Date: {(new Date(movie.release_date)).toLocaleDateString('id-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</Segment>
        <Segment textAlign={'center'}>Vote Avg: {movie.vote_average}</Segment>
        <Segment textAlign={'center'}>Vote Count: {movie.vote_count}</Segment>
        <Segment textAlign={'center'}>Popularity : {movie.popularity}</Segment>
      </SegmentGroup>
    </Responsive>

    <Divider horizontal/>

    <Grid columns={2}>
      <GridRow>
        <Grid.Column width={4}>
          <Image src={`${Constant.POSTER_BASE_URL}${movie.poster_path}`} centered={true}/>
          <Divider horizontal/>

          <Responsive maxWidth={767}>
            <SegmentGroup vertical>
              <Segment textAlign={'center'}>Duration: {convertFriendlyTime(movie.runtime)}</Segment>
              <Segment textAlign={'center'}>Release Date: {(new Date(movie.release_date)).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</Segment>
              <Segment textAlign={'center'}>Vote Avg: {movie.vote_average}</Segment>
              <Segment textAlign={'center'}>Vote Count: {movie.vote_count}</Segment>
              <Segment textAlign={'center'}>Popularity : {movie.popularity}</Segment>
            </SegmentGroup>
          </Responsive>
        </Grid.Column>
        
        <Divider horizontal/>

        <GridColumn width={12}>
          <Header as={'h1'}>{movie.original_title}</Header>
          <p>{movie.overview}</p>

          <Divider horizontal/>

          <Grid stackable>
            <GridColumn mobile={16} tablet={8} computer={4}>
              <Header as={'h4'}>Genres</Header>
              <List>
                {
                  movie.genres.map((genre, idx) => (
                    <List.Item key={idx}>{genre.name}</List.Item>
                  ))
                }
              </List>
            </GridColumn>

            <GridColumn mobile={16} tablet={8} computer={4}>
              <Header as={'h4'}>Language</Header>
              <List>
                {
                  movie.spoken_languages.map((language, idx) => (
                    <List.Item key={idx}>
                      <ListIcon><Flag name={language.iso_639_1 === 'en' ? 'uk' : language.iso_639_1}/></ListIcon>
                      <ListContent>{language.name}</ListContent>
                    </List.Item>
                  ))
                }
              </List>
            </GridColumn>

            <GridColumn mobile={16} tablet={8} computer={4}>
              <Header as={'h4'}>Production Company</Header>
              <List>
                {
                  movie.production_companies.map((company, idx) => (
                    <List.Item key={idx}>{company.name}</List.Item>
                  ))
                }
              </List>
            </GridColumn>

            <GridColumn mobile={16} tablet={8} computer={4}>
              <Header as={'h4'}>Other Details</Header>
              <p>Revenue: {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(movie.revenue)}
                <br/>
                Movie Homepage: <a href={movie.homepage}>{movie.homepage}</a>
              </p>
            </GridColumn>
          </Grid>
        </GridColumn>
      </GridRow>
    </Grid>
  </Container>
)

Movie.getInitialProps = async ({query}) => {
  let movieId = query.id
  const movie = await getMovieDetail(movieId)
  return {movie: movie}
}

export default Movie
