import {getDiscoverMovies} from "../network/ApiService";
import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import MovieCard from '../components/MovieCard'
import {CardGroup, Container, Dimmer, Loader, Pagination} from "semantic-ui-react";
import Router from "next/router";

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      loading: false,
      dateBefore:'',
      dateAfter:'',
    }
  }

  static async getInitialProps({ctx, query}) {
    let page = query.page ? query.page : 1
    const res = await getDiscoverMovies(page)
    const pagination = {
      currentPage: res.page,
      totalPages: res.total_pages,
    }
    return {movies: res, pagination: pagination}
  }

  handleChangePage = async (event, {activePage}) => {
    this.setState({
      loading: true
    })
    const res = await getDiscoverMovies(activePage)
    const pagination = {
      currentPage: res.page,
      totalPages: res.total_pages,
    }
    this.setState({
      movies: res,
      pagination: pagination,
      loading: false
    })
    if (activePage === 1) {
      await Router.push('/')
    } else {
      await Router.push({
        pathname: '/',
        query: {page: activePage},
      })
    }
  }

  render() {
    let {movies, pagination, loading} = this.state
    return (
      <Container fluid>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <Nav/>
        <Pagination
          widths={12}
          activePage={pagination.currentPage}
          totalPages={pagination.totalPages}
          siblingRange={1}
          fixed={'bottom'}
          onPageChange={this.handleChangePage}
        />
        {loading && <Dimmer active>
          <Loader/>
        </Dimmer>
        }
        <CardGroup centered className="padded">
          {movies.results.map(movie => (
            <MovieCard movie={movie}/>
          ))
          }
        </CardGroup>
        <style jsxz>{`
          .padded {
            padding-bottom: '5em';
          }
        `}</style>
      </Container>
    )
  }
}
