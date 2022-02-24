import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
      let {title, description, imageUrl, newsUrl, publishedAt, author} = this.props;
    return (
      <div className='my-3'>
            <div clasNames="card">
                <img src={!imageUrl?'https://images.moneycontrol.com/static-mcnews/2018/09/Cryptocurrency-Bitcoin-770x433.jpg':imageUrl} class="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><b>By {!author?"Unknown": author} on {new Date(publishedAt).toGMTString()}</b></p>
                <a href={newsUrl} target='_blank' className="btn btn-dark">Read More
                </a>
                </div>
            </div>
      </div>
    )
  }
}

export default NewsItems
