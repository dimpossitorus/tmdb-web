import {getDiscoverMovies, getMovieDetail} from "../network/ApiService";
import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import MovieCard from '../components/MovieCard'
import {CardGroup, Container, Pagination} from "semantic-ui-react";

const Home = ({movies, pagination}) => (
  <Container fluid>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <Nav/>
    <CardGroup centered>
    {movies.results.map(movie => (
      <MovieCard movie={movie}/>
    ))
    }
    </CardGroup>
  </Container>
)

Home.getInitialProps = async ({ctx, query}) => {
  let page = query.page ? query.page : 1
  const res = await getDiscoverMovies(page)
  const pagination = {
    currentPage: res.page,
    totalPages: res.total_pages,
  }
  return {movies: res, pagination: pagination}
}

export default Home
