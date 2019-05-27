import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEventByTitle } from '../../actions';
import { Article } from '../../styled-components/global-theme';
import { Img, Section, SpanHeader } from '../../styled-components/Details-events-Page-theme';

class EventDetailsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount = () => {
   const title = this.props.match.params.title.replace(/_/g, ' ')
   this.props.getEventByTitle(title)
  }

  componentDidUpdate = (prevProps) => {
    // To prevent loadig the same data during substitution 
   if (this.props.singleEvent !== prevProps.singleEvent) {
      this.setState({data: this.props.singleEvent})
    }
  }

  render() {
    return (
      <Article>
        {this.state.data ? 
          <Section>
            <SpanHeader>{this.state.data.title}</SpanHeader>
            <p>{this.state.data.desc}</p>
            <Img src={this.state.data.imageUrl} />
            <p>Location: {this.state.data.location}</p>
            <p>Date event: {this.state.data.date}</p>
            <p>Organizers by {this.state.data.organization}</p>
          </Section> :
          <h1>Loading...</h1> 
         }  
      </Article>
    )
  }
}

const mapStateToProps = state => ({
  singleEvent: state.singleEvent,
  loading:  state.loading
})

export default connect(mapStateToProps, {getEventByTitle})(EventDetailsContainer)