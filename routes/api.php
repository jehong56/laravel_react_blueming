<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix'=>'friend', 'namespace'=>'App\Http\Controllers\Api'], function(){
    Route::post('/show', 'FriendController@show');
    //Route::get('/show', 'FriendController@show');
    Route::post('/store', 'FriendController@store');
    Route::post('/{id}/delete', 'FriendController@delete')->where('id', '[0-9]+');
});