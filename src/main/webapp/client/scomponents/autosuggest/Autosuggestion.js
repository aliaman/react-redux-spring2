import React from 'react'

export default class Autosuggestion extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            suggestions: this.props.suggestions
        };

        document.getElementById(this.props.rel).innerHTML = "<ul><li>aaa</li></ul>";
        // $("#"+this.props.rel + " ul").html(this.state.suggestions.map(function(suggestion){
        //     return (
        //         <li key={Math.random()}>{suggestion.name}</li>
        //     )
        // }));
    }
    filterAutosuggestList(){

    }
    render(){
        return(
          <div>
              <input type="text" onChange={this.filterAutosuggestList.bind(this)} />
          </div>
        );
    }
}