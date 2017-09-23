import React, { Component } from 'react';
import SearchBar from './search-bar';
import CharacterList from './character-list';
import Detail from './details';
import md5 from 'md5';
import $ from 'jquery';

const API_URL = 'https://gateway.marvel.com:443/v1/public';
const publicKey = 'f9a311b963f8eeb8f141d50d42807b2a';
const privateKey = 'c3dfe5a47fd045e1463cb40da30bbc21493b3609';
const ts = '1';
const auth = `ts=${ts}&apikey=${publicKey}&hash=${md5(`${ts}${privateKey}${publicKey}`)}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: null,
      selectedCharacter: null,
    };
    //bu alttakı komutsuzda calısıyor gibi
    this.CharacterSearch = this.CharacterSearch.bind(this);
  }

  componentDidMount = () => {
    this.GetInitialChararcters();
  };

  GetInitialChararcters() {
    $.getJSON(`${API_URL}/characters?${auth}&limit=5`, result => {
      const characters = result.data.results;
      this.setState({ characters });
      //console.log(characters);
    });
  }

  CharacterSearch(term) {
    $.getJSON(`${API_URL}/characters?${auth}&limit=5&nameStartsWith=${term}`, result => {
      const characters = result.data.results;
      this.setState({ characters });
      console.log({ characters });
    });
  }

  handleCharacterSelect = character => {
    console.log(character);
    this.setState({ selectedCharacter: character });
  };

  render() {
    //console.log('result:', this.state.characters, '---', `${API_URL}/characters?${auth}&limit=5`);
    if (!this.state.characters) return <h1>Loading...</h1>;
    return (
      <div className="container">
        <SearchBar onSearchClick={this.CharacterSearch} />
        <SearchBar onSearchClick={term => alert(term)} />
        <SearchBar onSearchClick={term => console.log(term)} />

        <CharacterList
          characters={this.state.characters}
          onCharacterSelect={this.handleCharacterSelect}
        />
        <Detail character={this.state.selectedCharacter || this.state.characters[0]} />
      </div>
    );
  }
}
export default App;
