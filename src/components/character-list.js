import React, { Component } from 'react';
import _ from 'lodash';
import CharacterListItem from './character-list-item';

class CharacterList extends Component {
  render() {
    console.log(this.props.characters);
    //this demediğimizde hata verdi
    return (
      <div className="col-md-4">
        {_.map(this.props.characters, character => (
          <CharacterListItem
            key={character.id}
            character={character}
            onCharacterSelect={this.props.onCharacterSelect}
          />
        ))}
      </div>
    );
  }
}

export default CharacterList;
