import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

function BluemingCount(props) {
    const [timerTime, setTimerTime] = useState(0);
    const [sort, setSort] = useState("ASC");

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimerTime(new Date().getTime());
        }, 1000);
        return () => clearInterval(countdown);
    }, [parseInt(timerTime * 0.001)]);
    let remainingTimeCount = (endTimeStamp, nowTime) => {
        //  const [timeRemaining, setTimeRemaining] = useState(null);
        let timeRemaining = endTimeStamp - nowTime;
        timeRemaining = parseInt(timeRemaining * 0.001);
        let hour = parseInt(timeRemaining / 3600);
        let minutes = parseInt((timeRemaining - hour * 3600) / 60);
        let second = timeRemaining % 60;
        let strReturn = "";
        if (hour > 0) {
            strReturn += hour + "시 ";
        }
        if (minutes != 0 || hour != 0) {
            strReturn += minutes + "시 ";
        }
        strReturn += second + "초 ";
        return strReturn;
    };
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
                        return (
                            <div key={"bluming-item-" + storageIndex}>
                                [{storage.name} 블루밍케이지]
                                <br />
                                gemRank : {storage.gemRank}
                                <br />
                                skillRank : {storage.skillRank}
                                <br />
                                isFloweryCage : {storage.isFloweryCage}
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
