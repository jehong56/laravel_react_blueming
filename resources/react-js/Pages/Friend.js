import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import BluemingCount from "./BluemingCount";

function Friend() {
    const [insertName, setInsertName] = useState("");
    const [inserTribe, setInserTribe] = useState("알 수 없음");
    const [insertGuild, setInsertGuild] = useState("");
    const [insertLikeable, setInsertLikeable] = useState(100);
    const [myFriends, setMyFriends] = useState([]);
    let [isLoad, setIsLoad] = useState(false);

    const getFriends = () => {
        console.log("getFriends");
        $.ajax({
            url: "/api/friend/show", // 요청 할 주소
            type: "POST", // GET, PUT
            data: {
                page: 2,
            },
            dataType: "json", // xml, json, script, html
            success: function (data) {
                setMyFriends(data.body.friends);
            },
        });
    };

    if (isLoad == false) {
        setIsLoad(true);
        getFriends();
    }

    return (
        <React.Fragment>
            <div className="container border rounded mt-2">
                <div className="p-3">
                    <label>친구 이름</label>
                    <input
                        className="form-control"
                        value={insertName}
                        onChange={(event) => {
                            setInsertName(event.target.value);
                        }}
                    />
                    <label>친구 종족</label>
                    <select
                        className="form-control"
                        value={inserTribe}
                        onChange={(event) => {
                            setInserTribe(event.target.value);
                        }}
                    >
                        <option value="알 수 없음">알 수 없음</option>
                        <option value="인간">인간</option>
                        <option value="엘프">엘프</option>
                        <option value="자이언트">자이언트</option>
                    </select>
                    <label>친구 길드</label>
                    <input
                        className="form-control"
                        value={insertGuild}
                        onChange={(event) => {
                            setInsertGuild(event.target.value);
                        }}
                    />
                    <label>친밀도</label>
                    <input
                        type="number"
                        className="form-control"
                        value={insertLikeable}
                        onChange={(event) => {
                            setInsertLikeable(event.target.value);
                        }}
                    />
                    <button
                        className="btn btn-primary w-100 mt-2"
                        onClick={() => {
                            $.ajax({
                                url: "/api/friend/store", // 요청 할 주소
                                type: "POST", // GET, PUT
                                data: {
                                    name: insertName,
                                    tribe: inserTribe,
                                    guild: insertGuild,
                                    likeable: insertLikeable,
                                },
                                dataType: "json", // xml, json, script, html
                                beforeSend: function (jqXHR) {}, // 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
                                success: function (jqXHR) {
                                    getFriends();
                                }, // 요청 완료 시
                                error: function (jqXHR) {}, // 요청 실패.
                                complete: function (jqXHR) {}, // 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
                            });
                        }}
                    >
                        친구 추가
                    </button>
                </div>
            </div>

            <div className="container border rounded mt-2">
                <div className="p-3">
                    {myFriends.map((myFriend, myFriendIndex) => {
                        return (
                            <p key={"my-friend-" + myFriendIndex}>
                                {myFriend.name} - {myFriend.tribe}
                                <button
                                    className="ml-2 btn btn-danger btn-sm"
                                    onClick={() => {
                                        $.ajax({
                                            url:
                                                "/api/friend/" +
                                                myFriend.id +
                                                "/delete", // 요청 할 주소
                                            type: "POST", // GET, PUT
                                            dataType: "json", // xml, json, script, html
                                            success: function (jqXHR) {
                                                getFriends();
                                            }, // 요청 완료 시
                                        });
                                    }}
                                >
                                    친삭
                                </button>
                            </p>
                        );
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}
export default Friend;
