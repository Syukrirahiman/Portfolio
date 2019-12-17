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

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import axios from 'axios';
import { Redirect } from 'react-router';


import { Table, Jumbotron, Container, Row, Col } from 'react-bootstrap';






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
        // console.log(result_id)

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
        var resp = JSON.parse(xhr.responseText);
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

function checkDisable() {
    if (movieList.length <= 0) {
        return true
    }
    return false
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
        showForm: false,
        planId: '',
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


    const handleIdChange = (event) => {
        const { target: { name, value } } = event;

        setState({
            ...state,
            [name]: value,
        });

    }


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

        if (values.movie == '') {
            // window.alert('Please enter a valid cinema and movie!');
            document.getElementById("error").innerHTML = "Please enter a valid cinema and movie!";
        } else {
            setState({
                ...state,
                ['showForm']: true,
            });

        }


        console.log(state.showForm);

    }


    const handleIdSubmit = event => {
        event.preventDefault();

        console.log("cinema name: ", state.single, "movie: ", values.movie);


        setState({
            ...state,
            ['redirect']: true,
        });


        console.log(state.redirect);

    }



    if (state.showForm) {
        return (
            <Redirect push from='/' to={{
                pathname: '/form',
                state: {
                    cinema: state.single,
                    movie_id: values.movie,
                }
            }} />
        );

    } else if (state.redirect) {
        return (
            <Redirect push from='/' to={{
                pathname: '/plantomeet',
                state: {
                    planid: state.planId,
                }
            }} />
        );
    }



    return (
        <div style={{ paddingTop: "20px" }}>

            <Jumbotron fluid >

                <Container >
                    <div style={{ textAlign: "center" }} ><h2>Plan to Meet</h2></div>
                    <Grid container justify="center">
                        {constructCinemasSuggestions()}

                        <Grid>
                            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>

                                <FormControl className={classes.formControl} >

                                    <Autosuggest

                                        {...autosuggestProps}
                                        inputProps={{
                                            //   style: {display : 'inline'},
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
                                        // style = {{display: 'inline'}}
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

                                    <Button variant="contained" color="secondary" className={classes.button} type="submit" style={{ height: "100%" }}>
                                        Submit
        </Button>


                                </FormControl>

                            </form>

                        </Grid>
                    </Grid>
                </Container>
            </Jumbotron>


            <div style={{ textAlign: "center" }} ><h2>Or</h2></div>
            <br></br>

            <Jumbotron fluid>

                <Container >
                    <div style={{ textAlign: "center" }} ><h2>Enter an existing Plan ID to vote!</h2></div>
                    <Grid container justify="center">


                        <Grid>
                            <form className={classes.root} autoComplete="off" onSubmit={handleIdSubmit}>

                                <FormControl className={classes.formControl} >
                                    <TextField
                                        inputProps={{
                                            //   style: {display : 'inline'},
                                            classes,
                                            id: 'autosuggest',
                                            label: 'Plan ID',
                                            placeholder: 'Enter existing Plan ID',
                                            value: state.planId,
                                            // onChange: handleIdChange('planId'),

                                        }}

                                        name="planId"
                                        onChange={handleIdChange}

                                    />
                                    

                                </FormControl>


                                <FormControl className={classes.formControl}>

                                    <Button variant="contained" color="secondary" className={classes.button} type="submit">
                                        Submit
</Button>
                                </FormControl>

                            </form>

                        </Grid>
                    </Grid>
                </Container>
            </Jumbotron>
        </div>
    );

}