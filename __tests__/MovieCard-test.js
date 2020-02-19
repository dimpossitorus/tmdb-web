import React from 'react';
import {shallow} from 'enzyme';
import movieData from './movie'
import MovieCard from '../components/MovieCard';
import {Card, Image, List} from "semantic-ui-react";
import {Link} from "next";


describe('Movie Card Testing', function () {
  it('should render without throwing an error', function () {
    const wrapper = shallow(<MovieCard movie={movieData}/>)

    expect(wrapper.contains(<Link/>)).toBe(true)
    expect(wrapper.find(Image).length).toBe(1)
    expect(wrapper.find(Card).length).toBe(1)
    expect(wrapper.find(Card.Header).length).toBe(1)
    expect(wrapper.find(Card.Content).length).toBe(2)
    expect(wrapper.find(Card.Meta).length).toBe(1)
    expect(wrapper.find(Card.Description).length).toBe(1)

  })

  it('should error when props are not passed', function () {
    expect(() => shallow(<MovieCard/>)).toThrow()
  })

  it('should have contents equals to props data', function () {
    const wrapper = shallow(<MovieCard movie={movieData}/>)
    expect(wrapper.find(Card.Header).render(<Card.Header/>).text()).toEqual(movieData.original_title)
    expect(wrapper.find(Card.Description).render(<Card.Description/>).text()).toEqual(movieData.overview)
    expect(wrapper.find(Card.Meta).render(<Card.Description/>).text()).toEqual(`Popularity: ${movieData.popularity}`)
    expect(wrapper.find(List.Item).length).toEqual(movieData.genres.length)
  })
})
