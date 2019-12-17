<?php
//  header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header("Access-Control-Allow-Headers: Content-Type, Authorization");

header('Access-Control-Allow-Origin: *');


$resultObj = new stdClass();
$omdbapikey = "9e790f8b"; // api for omdb 
$moviedbapikey = "f355537d3006a3990d191efda19c9d8e"; // api for movie db
$isapikey = "7UiR6NYdJicQiXms2GOxJSqBddHXuivw"; //api for international showtime
$modelmonkeyapi = "6eca72272d553df5928718e275c71d800d498e5d"; //api for model monkey
$imdb_id = $_GET['imdb_id'];


if (true) {
    //getting reviews pass in imdb_id
    // $imdb_id = "tt4154796"; #id=299534 imdb_id=tt4154796
    $url = "https://api.themoviedb.org/3/movie/" . $imdb_id . "/reviews?api_key=" . $moviedbapikey . "&language=en-US&page=1";

    try {
        $content = file_get_contents($url);
        if ($content === FALSE) {
            $rawReviews = "No data!";
        } else {
            $phpObj = json_decode($content);
            $rawReviews = $phpObj->results;
        }
    } catch (Exception $e) {
        $rawReviews = "No data!";
    }

    //get tmdb id from imdb_id
    $url = "https://api.themoviedb.org/3/find/" . $imdb_id . "?api_key=" . $moviedbapikey . "&language=en-US&external_source=imdb_id";
    $content = file_get_contents($url);
    $phpObj = json_decode($content);
    $tmdb_id = $phpObj->movie_results[0]->id;
    //tmdb id is needed for the extraction of recommended and similar movies later on
    //can also get overview etc from here

}

/*populate movie reviews */
$reviews = [];
foreach ($rawReviews as $d) {
    $author = $d->author;
    $content = $d->content;
    array_push($reviews, $content);
}

/*Sentimental Analysis*/
require 'autoload.php';
$ml = new MonkeyLearn\Client($modelmonkeyapi); //300 queries per month only
$input = $reviews;
$model_id = 'cl_MX2qQKNi';
$res = $ml->classifiers->classify($model_id, $input);
$tag = $res->result[0]['classifications'][0]['tag_name'];
$sentimentalScore = $res->result[0]['classifications'][0]['confidence'];

// /*reviews table*/

// $resultObj->avg_rating = $avg_rating;
$resultObj->sentiment_tag = $tag;


if ($tag == 'bad') {
    $resultObj->sentimentalScore = -$sentimentalScore;
    // echo -$sentimentalScore;
} else {
    $resultObj->sentimentalScore = $sentimentalScore;
    // echo $sentimentalScore;
}

$resultObj->rawReviews = $rawReviews;






//getting current showing movies from specific cinema

$url = "https://api.internationalshowtimes.com/v4/movies/?location=1.29,103.82&distance=5&apikey=" . $isapikey;
try {
    $content = file_get_contents($url);
    if ($content === FALSE) {
        $currMovies = "No data!";
    } else {
        $phpObj = json_decode($content);
        $currMovies = $phpObj->movies;
    }
} catch (Exception $e) {
    $data = "No data!";
}




//getting recommended movies
$url = "https://api.themoviedb.org/3/movie/" . $tmdb_id . "/recommendations?api_key=" . $moviedbapikey . "&language=en-US&page=1";
try {
    $content = file_get_contents($url);
    if ($content === FALSE) {
        $rawRecommend = "No data!";
    } else {
        $phpObj = json_decode($content);
        $rawRecommend = $phpObj->results;
    }
} catch (Exception $e) {
    $rawRecommend = "No data!";
}

$resultObj->rawRecommend = $rawRecommend;




//getting similar movies
$url = "https://api.themoviedb.org/3/movie/" . $tmdb_id . "/similar?api_key=" . $moviedbapikey . "&language=en-US&page=1";
try {
    $content = file_get_contents($url);
    if ($content === FALSE) {
        $rawSimilar = "No data!";
    } else {
        $phpObj = json_decode($content);
        $rawSimilar = $phpObj->results;
    }
} catch (Exception $e) {
    $rawSimilar = "No data!";
}

$resultObj->rawSimilar = $rawSimilar;


$jsonObj = json_encode($resultObj);
echo $jsonObj;
