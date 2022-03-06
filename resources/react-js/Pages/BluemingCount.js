import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

function BluemingCount(props) {
    const [timerTime, setTimerTime] = useState(0);
    const [sort, setSort] = useState("ASC");

    useEffect(() => {
        //1초에 1번이상 실행x
        const countdown = setInterval(() => {
            setTimerTime(new Date().getTime());
        }, 1000);
        return () => clearInterval(countdown);
    }, [parseInt(timerTime * 0.001)]);

    let remainingTimeCount = (endTimeStamp, nowTime) => {
        let timeRemaining = endTimeStamp - nowTime;
        timeRemaining = parseInt(timeRemaining * 0.001);
        let hour = parseInt(timeRemaining / 3600);
        let minutes = parseInt((timeRemaining - hour * 3600) / 60);
        let second = timeRemaining % 60;
        let strReturn = "";
        if (timeRemaining > 0) {
            if (hour > 0) {
                strReturn += hour + "시간 ";
            }
            if (minutes != 0 || hour != 0) {
                strReturn += minutes + "분 ";
            }
            strReturn += second + "초 남았습니다.";
        } else {
            strReturn += "블루밍 케이지 부화가 완료되었습니다!";
        }
        return strReturn;
    };

    //알람체크
    let isAlertCheck = (bluemingStorage) => {
        let time = new Date().getTime();
        let newList = [];
        let isNowCompleted = false;
        let name = "";

        bluemingStorage.map((thisStorage, storageIndex) => {
            let isAlert =
                thisStorage.endTimeStamp - time < 0 && //남은시간이 0 미만이고
                thisStorage.isAlert == false; //알람을 울리지 않은 상태일때
            if (isAlert == true) {
                //isAlert 두 조건이 모두 맞을경우
                isNowCompleted = true;
                thisStorage.isAlert = true;
                name = thisStorage.name;
            }
            newList.push(thisStorage);
        });

        if (isNowCompleted) {
            new Notification("블루밍 부화 완료!", {
                body: name + "케이지의 부화가 완료되었습니다!",
            });
            props.setBluemingStorage(newList, false);
            return true;
        }
        return false;
    };
    isAlertCheck(props.bluemingStorage);

    //view, 정렬
    let nowTime = new Date().getTime();
    let viewDatas = [];
    props.bluemingStorage.map((storage) => {
        viewDatas.push(storage);
    });

    if (sort == "ASC") {
        viewDatas = viewDatas.sort(function (a, b) {
            if (a.endTimeStamp > b.endTimeStamp) {
                return 1;
            }
            if (a.endTimeStamp < b.endTimeStamp) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
    } else if (sort == "DESC") {
        viewDatas = viewDatas.sort(function (a, b) {
            if (a.endTimeStamp > b.endTimeStamp) {
                return -1;
            }
            if (a.endTimeStamp < b.endTimeStamp) {
                return 1;
            }
            // a must be equal to b
            return 0;
        });
    }

    //랜더링
    return (
        <div className="blueming-storage-board-area">
            <div className="storage-title">케이지 목록</div>
            <div className="blueming-storage-board">
                <div className="blueming-storage p-3">
                    <span
                        className={
                            "" + (sort == "ASC" ? " active " : " text-muted ")
                        }
                        onClick={() => {
                            setSort("ASC");
                        }}
                    >
                        오름차순
                    </span>{" "}
                    |{" "}
                    <span
                        className={
                            "" + (sort == "DESC" ? " active " : " text-muted ")
                        }
                        onClick={() => {
                            setSort("DESC");
                        }}
                    >
                        내림차순
                    </span>
                    {viewDatas.map((storage, storageIndex) => {
                        //isAlertCheck;
                        return (
                            <div key={"bluming-item-" + storageIndex}>
                                [{storage.name} 블루밍케이지]
                                <br />
                                gemRank : {storage.gemRank}
                                <br />
                                skillRank : {storage.skillRank}
                                <br />
                                케이지 종류 :{" "}
                                {storage.isFloweryCage ? "플라워리" : "일반"}
                                <br />
                                시작시간 : {storage.start}
                                <br />
                                종료시간: {storage.end}
                                <br />
                                {remainingTimeCount(
                                    storage.endTimeStamp,
                                    nowTime
                                )}
                                <br />
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        let newList = [];
                                        props.bluemingStorage.map(
                                            (insertItem) => {
                                                if (
                                                    insertItem.id == storage.id
                                                ) {
                                                    return;
                                                }
                                                newList.push(insertItem);
                                            }
                                        );
                                        props.setBluemingStorage(newList);
                                    }}
                                >
                                    삭제
                                </button>
                                <hr />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default BluemingCount;
