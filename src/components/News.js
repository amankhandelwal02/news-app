import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
  };

  static = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `News - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  async updateNews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({
      loading: true,
    });
    this.props.setProgress(10);
    let data = await fetch(url);
    this.props.setProgress(40);
    let pasredData = await data.json();
    this.props.setProgress(70);
    this.setState({
      article: pasredData.articles,
      totalResults: pasredData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    console.log("next btn clicked");
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {

    // }
    // else {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a1979ffaeafd44ef8794c3528c4513a6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //     {this.setState({
    //         loading: true
    //     })}
    //     let data = await fetch(url)
    //     let pasredData = await data.json()

    //     this.setState({
    //         page: this.state.page + 1,
    //         article: pasredData.articles,
    //         loading: false
    //     })
    // }
    this.updateNews();
    this.setState({
      page: this.state.page + 1,
    });
  };

  handlePrevClick = async () => {
    // console.log("previous btn clicked")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a1979ffaeafd44ef8794c3528c4513a6&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // {this.setState({
    //     loading: true
    // })}
    // let data = await fetch(url)
    // let pasredData = await data.json()

    // this.setState({
    //     page: this.state.page - 1,
    //     article: pasredData.articles,
    //     loading: false
    // })
    this.updateNews();
    this.setState({
      page: this.state.page - 1,
    });
  };

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let pasredData = await data.json();
    this.setState({
      article: this.state.article.concat(pasredData.articles),
      totalResults: pasredData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h3 className="container" style={{ marginTop: "70px" }}>
          Top Headlines From {this.capitalizeFirstLetter(this.props.category)}
        </h3>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.article.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 90) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 150)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      publishedAt={element.publishedAt}
                      author={element.author}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="contanier d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div> */}
      </>
    );
  }
}

export default News;
