import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router';






const suggestions = [];
const movieList = [];
const apikey = "YOUR_API_KEY_HERE";

function setMovieArr(input) {
    var result_id = '';
    movieList.length = 0;
    for (let i = 0; i < suggestions.length; i++) {
        var cinema = suggestions[i];
        if (cinema.label.toLowerCase() == input.toLowerCase()) {
            result_id = cinema.id;
        }
    }

    if (result_id != '') {

        //in case api is down uncomment below (must choose amk hub)

        // var data = require('./backupjson/allmoviesamk.json');
        // for (let i = 0; i < data.movies.length; i++) {
        //     var movie = data.movies[i];
        //     movieList.push(movie);
        // }

        //api method
        var xhr = new XMLHttpRequest()
        let url = "https://api.internationalshowtimes.com/v4/movies/?cinema_id=" + result_id + "&apikey=" + apikey;
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            var resp = JSON.parse(xhr.responseText);


            for (let i = 0; i < resp.movies.length; i++) {
                var movie = resp.movies[i];
                movieList.push(movie);
            }

        })
        xhr.open('GET', url)
        xhr.send()

    }


}

function checkDisable() {
    if (movieList.length <= 0) {
        return true
    }
    return false
}


function constructCinemasSuggestions() {

    //in case api down uncomment below

    // var data = require('./backupjson/getallcinemas.json');
    // suggestions.length = 0;
    // for (let i = 0; i < data.cinemas.length; i++) {
    //     var cinema = data.cinemas[i];
    //     suggestions.push({
    //         label: cinema.name,
    //         id: cinema.id,
    //         city_id: cinema.city_id,
    //     });
    // }

    //api method
    var xhr = new XMLHttpRequest()
    let url = "https://api.internationalshowtimes.com/v4/cinemas/?apikey=" + apikey;
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        var resp = JSON.parse(xhr.responseText);
        //   this.setState({ results: resp.cinemas[0].location });
        var cinemasArr = [];
        suggestions.length = 0;
        for (let i = 0; i < resp.cinemas.length; i++) {
            var cinema = resp.cinemas[i];
            suggestions.push({
                label: cinema.name,
                id: cinema.id,
                city_id: cinema.city_id,
            });
        }
        console.log(suggestions);

    })
    xhr.open('GET', url)
    xhr.send()

}

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
        <TextField
            name="cinema"
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                    <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                        {part.text}
                    </span>
                ))}
            </div>
        </MenuItem>
    );
}



function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

const useStyles = makeStyles(theme => ({
    root: {
        height: 100,
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: 10,

    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: 250,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
        width: 250,
    },
    suggestion: {
        display: 'block',
        cursor: 'pointer',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        width: 250,
    }
}));



export default function IntegrationAutosuggest() {


    const classes = useStyles();

    const [state, setState] = React.useState({
        single: '',
        popper: '',
        redirect: false,
    });

    const [values, setValues] = React.useState({
        movie: '',
    });


    const [stateSuggestions, setSuggestions] = React.useState([]);



    const handleSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };


    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = name => (event, { newValue }) => {
        setState({
            ...state,
            [name]: newValue,
        });
        setMovieArr(newValue);
    };

    const handleSelectChange = event => {

        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    };

    const autosuggestProps = {
        renderInputComponent,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
    };



    const handleSubmit = event => {
        event.preventDefault();
        console.log("cinema name: ", state.single, "movie: ", values.movie);

        if (values.movie == '') {
            // window.alert('Please enter a valid cinema and movie!');
            document.getElementById("error").innerHTML = "Please enter a valid cinema and movie!";
        } else {
            setState({
                ...state,
                ['redirect']: true,
            });

        }


    }

    if (state.redirect) {
        return (

            <Redirect push from='/' to={{
                pathname: '/showtimes',
                state: {
                    cinema: state.single,
                    movie_id: values.movie,
                }
            }} />

        )
    }




    return (


        <Grid container justify="center">
            {constructCinemasSuggestions()}

            <Grid>
                <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>

                    <FormControl className={classes.formControl} >
                        <Autosuggest

                            {...autosuggestProps}
                            inputProps={{
                                classes,
                                id: 'react-autosuggest-simple',
                                label: 'Cinema',
                                placeholder: 'Search a cinema',
                                value: state.single,
                                onChange: handleChange('single'),
                            }}
                            theme={{
                                container: classes.container,
                                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                suggestionsList: classes.suggestionsList,
                                suggestion: classes.suggestion,
                            }}

                            renderSuggestionsContainer={options => (
                                <Paper {...options.containerProps} square>
                                    {options.children}
                                </Paper>
                            )}
                        />

                        <span id="error" style={{ color: "red" }}></span>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <Select
                            value={values.movie}
                            onChange={handleSelectChange}
                            name="movie"
                            displayEmpty
                            className={classes.selectEmpty}
                            label='Movie'
                            disabled={checkDisable() ? true : null}
                        >
                            <MenuItem value="" disabled>
                                Select Movie
                        </MenuItem>
                            {movieList.map((movie, index) =>
                                <MenuItem key={index} value={movie.id} name="movie" > {movie.title}</MenuItem>
                            )}
                        </Select>

                    </FormControl>

                    <FormControl className={classes.formControl}>

                        <Button variant="contained" color="secondary" className={classes.button} type="submit">
                            Show Showtimes
                </Button>
                    </FormControl>

                </form>
            </Grid>
        </Grid>



    );

}