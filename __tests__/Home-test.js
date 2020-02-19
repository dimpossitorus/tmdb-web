import React from 'react';
import {mount, shallow} from 'enzyme';
import discover from './discover'
import MovieCard from "../components/MovieCard";
import Home from "../pages";
import {Card, CardGroup} from "semantic-ui-react";

const pagination = {
  currentPage: discover.page,
  totalPages: discover.total_pages,
}

describe('Home Page Testing', function () {
  it('should render without throwing an error', function () {
    const props = {movies: discover, pagination: pagination, activePage: discover.page}
    const wrapper = mount(<Home {...props}/>)

    expect(wrapper.find(MovieCard).length).toEqual(discover.results.length)
    expect(wrapper.find(CardGroup).length).toEqual(1)
  })

  it('should have equal title on first item of card and response', function () {
    const props = {movies: discover, pagination: pagination, activePage: discover.page}
    const wrapper = mount(<Home {...props}/>)
    expect(wrapper.find(MovieCard).first().find(Card.Header).text()).toEqual(discover.results[0].original_title)
  })

  it('should error when props are not passed', function () {
    expect(() => shallow(<Home/>)).toThrow()
  })
})
