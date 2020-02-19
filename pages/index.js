import {getDiscoverMovies} from "../network/ApiService";
import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import MovieCard from '../components/MovieCard'
import {
  Button,
  CardGroup,
  Container,
  Dimmer,
  Form,
  FormDropdown,
  FormField,
  FormGroup,
  Grid,
  GridColumn,
  GridRow,
  Loader,
  Pagination
} from "semantic-ui-react";
import Router from "next/router";
import {DateInput} from "semantic-ui-calendar-react";

export default class Home extends React.Component {

  sortOptions = [
    {key: "1", text: "Popularity Ascending", value: "popularity.asc"},
    {key: "2", text: "Popularity Descending", value: "popularity.desc"},
    {key: "3", text: "Release Date Ascending", value: "release_date.asc"},
    {key: "4", text: "Release Date Descending", value: "release_date.desc"},
    {key: "5", text: "Vote Count Ascending", value: "vote_count.asc"},
    {key: "6", text: "Vote Count Descending", value: "vote_count.desc"}
  ];

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      loading: false,
      dateBefore: '',
      dateAfter: '',
      sort: this.sortOptions[0].value,
      sortParams: '',
      activePage: 1
    }
  }

  static async getInitialProps({ctx, query}) {
    let page = query.page ? query.page : 1
    const res = await getDiscoverMovies(page)
    const pagination = {
      currentPage: res.page,
      totalPages: res.total_pages,
    }
    return {movies: res, pagination: pagination, activePage: res.page}
  }

  handleChangePage = async (event, {activePage}) => {
    await this.setState({
      loading: true,
      activePage: activePage
    })
    let dateBefore = null
    let dateAfter = null
    let sort = null
    if (this.state.dateBefore !== '') {
      dateBefore = new Date(this.state.dateBefore).toISOString()
    }
    if (this.state.dateAfter !== '') {
      dateAfter = new Date(this.state.dateAfter).toISOString()
    }
    if (this.state.sortParams !== '') {
      sort = this.state.sortParams
    }
    const res = await getDiscoverMovies(this.state.activePage, sort, dateAfter, dateBefore)
    const pagination = {
      currentPage: res.page,
      totalPages: res.total_pages,
    }
    await this.setState({
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

  handleDateChange = async (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      await this.setState({[name]: value});
    }
  }

  filterDate = async () => {
    this.reloadData()
  }

  sort = async (event, {name, value}) => {
    await this.setState({
      sort: value,
      sortParams: value
    })
    console.log(this.state)
    this.reloadData()
  }

  reset = async () => {
    await this.setState({
      dateBefore: '',
      dateAfter: '',
      sort: this.sortOptions[0].value,
      sortParams: ''
    })
    this.reloadData(true)
  }

  reloadData = async (reset) => {
    await this.setState({
      loading: true
    })
    let res
    if (reset) {
      res = await getDiscoverMovies(this.state.pagination.currentPage)
    } else {
      let dateBefore = null
      let dateAfter = null
      let sort = null
      if (this.state.dateBefore !== '') {
        dateBefore = new Date(this.state.dateBefore).toISOString()
      }
      if (this.state.dateAfter !== '') {
        dateAfter = new Date(this.state.dateAfter).toISOString()
      }
      if (this.state.sortParams !== '') {
        sort = this.state.sortParams
      }
      console.log(sort)
      res = await getDiscoverMovies(this.state.activePage, sort, dateAfter, dateBefore)
    }
    const pagination = {
      currentPage: res.page,
      totalPages: res.total_pages,
    }
    await this.setState({
      movies: res,
      pagination: pagination,
      loading: false
    })
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
        <Container>
          <Grid stackable>
            <GridRow>
              <GridColumn width={10}>
                <Form onSubmit={this.filterDate}>
                  <FormGroup>
                    <DateInput
                      name="dateAfter"
                      placeholder="Release After"
                      value={this.state.dateAfter}
                      iconPosition="left"
                      onChange={this.handleDateChange}
                    />
                    <DateInput
                      name="dateBefore"
                      placeholder="Release Before"
                      value={this.state.dateBefore}
                      iconPosition="left"
                      onChange={this.handleDateChange}
                    />
                    <Button type='submit'>Filter</Button>
                  </FormGroup>
                </Form>
              </GridColumn>
              <GridColumn width={5}>
                <Form>
                  <FormField inline>
                    <label>Sort By </label>
                    <FormDropdown
                      name="popularity"
                      value={this.state.sort}
                      onChange={this.sort}
                      options={this.sortOptions}/>
                  </FormField>
                </Form>
              </GridColumn>
              <GridColumn width={1}>
                <Button onClick={this.reset}>Reset</Button>
              </GridColumn>
            </GridRow>
          </Grid>
        </Container>
        <CardGroup centered>
          {movies.results.map((movie, idx) => (
            <MovieCard key={idx} movie={movie}/>
          ))
          }
        </CardGroup>
      </Container>
    )
  }
}
