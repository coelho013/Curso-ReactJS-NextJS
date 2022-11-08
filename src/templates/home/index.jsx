import { Component } from 'react';
import './styles.css'
import { Posts } from '../../components/Posts/index';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextImput';


export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage), //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      allPosts: postsAndPhotos,

    });
  };

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage
    const NextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage)
    posts.push(...NextPosts);

    this.setState({ posts, page: nextPage })
  }

  HandleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
      :
      posts; //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}
          {/* https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators */}

          <TextInput searchValue={searchValue} HandleChange={this.HandleChange} />
        </div>
        {filteredPosts.length > 0 && (<Posts posts={filteredPosts} />)}
        {filteredPosts.length == 0 && (<p>Não existem posts</p>)}
        <div className="button-container">
          {!searchValue && <Button
            text="load more posts"
            onClick={this.loadMorePosts}
            disabled={false}
          />}
          {/* https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators */}
        </div>
      </section>
    );
  }
}
export default Home;
