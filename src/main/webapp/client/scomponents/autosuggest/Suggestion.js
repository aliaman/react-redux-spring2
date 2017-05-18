import React from 'react'
import Autosuggest from 'react-autosuggest'



export default class Suggestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            value: this.props.value,
            completelist: this.props.suggestions,
            suggestions: this.getSuggestions('')
        };

        this.onChange = this.onChange.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    }

    getSuggestions(value) {
        const escapedValue = value.trim(); // See: https://github.com/moroshko/react-autosuggest/blob/master/demo/src/components/utils/utils.js#L2-L4

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return this.state.completelist.filter(suggestion => regex.test(suggestion.name));
    }

    getSuggestionValue(suggestion) { // when suggestion selected, this function tells
        return suggestion.name;                 // what should be the value of the input
    }

    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }


    onChange(event, { newValue, method }) {
        if (method === 'type') {
            this.setState({
                value: newValue,
                suggestions: this.getSuggestions(newValue)
            });
        } else {
            this.setState({
                value: newValue
            });
        }
    }

    onBlur(event, { highlightedSuggestion }){
        this.props.reportChange(this.state.id, this.state.value);
    }

    // When suggestion is selected, we need to update `suggestions` so that,
    // if user presses Up or Down to reveal suggestions,
    // they would see the updated list.
    onSuggestionSelected(event, { suggestionValue }) {
        this.setState({
            suggestions: this.getSuggestions(suggestionValue)
        }, function(){
            this.props.reportChange(this.state.id, this.state.value);
        });
    }

    onSuggestionsFetchRequested(value){
        return value;
    }

    onSuggestionsClearRequested(value){
        return value;
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: '',
            value,
            onChange: this.onChange,
            onBlur: this.onBlur.bind(this),
        };

        return (
            <Autosuggest suggestions={suggestions}
                         id={this.props.id}
                         getSuggestionValue={this.getSuggestionValue.bind(this)}
                         renderSuggestion={this.renderSuggestion.bind(this)}
                         inputProps={inputProps}
                         onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                         onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                         onSuggestionSelected={this.onSuggestionSelected.bind(this)} />
        );
    }
}