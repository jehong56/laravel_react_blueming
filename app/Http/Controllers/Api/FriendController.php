<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiBaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Models\Friend;

class FriendController extends ApiBaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function show(Request $request) {
        /*
        $offset = 0;
        if($request->input('page') == null) {
            $offset = 0;
        } else {
            $offset = 5 * ($request->input('page') - 1);
        }
        */
        //$friends = Friend::offset($offset)->limit(5)->select('id', 'name', 'tribe', 'guild', 'likeable')->get();
        //$total = Friend::count();
        //https://laravel.kr/docs/8.x/eloquent
        //https://laravel.kr/docs/8.x/eloquent-relationships
        $friends = Friend::select('id', 'name', 'tribe', 'guild', 'likeable')->get();
        $responseData  = [
            'state' => '200',
            'body' => [
                'friends' => $friends
            ]
        ];
        return response()->json($responseData);
    }

    public function store(Request $request) {
        /*
        Friend::where('tribe', '알 수 없음')->update(['tribe' => '자이언트']);
        */
        /*
        Friend::where('tribe', '인간')->delete();
        */
        /*
        $friend = Friend::where('name', $request->input('name'))->first();
        if(!is_null($friend )) {
            $friend->delete();
        }
        //first는 하나만 가져옴 (정렬 순에서 가장 빠른)
        //get은 여러개 가져오는데 배열 처럼 가져옴
        */
        //dd("aa");
        $friend = Friend::where('name', $request->input('name'))->first(); // 기존 데이터를 조회해서 가져오면 update
        if(is_null($friend )) {
            $friend = new Friend(); //insert
        }
        //id가 있으면 update / id가 없으면 insert
        $friend->name = $request->input('name');
        $friend->tribe = $request->input('tribe');
        $friend->guild = $request->input('guild');
        $friend->likeable = $request->input('likeable');
        $friend->save();
        $responseData  = [
            'state' => '200'
        ];
        return response()->json($responseData);
    }

    public function delete($id, Request $request ) {
        Friend::where('id', $id)->delete();
        $responseData  = [
            'state' => '200'
        ];
        return response()->json($responseData);
    }
}
