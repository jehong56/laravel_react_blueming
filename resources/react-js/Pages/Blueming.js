import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import BluemingCount from "./BluemingCount";

function Index() {
    const skillRanks = [
        { id: 1, rank: "1", decrease: 0.7 },
        { id: 2, rank: "2", decrease: 0.72 },
        { id: 3, rank: "3", decrease: 0.74 },
        { id: 4, rank: "4", decrease: 0.76 },
        { id: 5, rank: "5", decrease: 0.78 },
        { id: 6, rank: "6", decrease: 0.8 },
        { id: 7, rank: "7", decrease: 0.82 },
        { id: 8, rank: "8", decrease: 0.84 },
        { id: 9, rank: "9", decrease: 0.86 },
        { id: 10, rank: "A", decrease: 0.88 },
        { id: 11, rank: "B", decrease: 0.9 },
        { id: 12, rank: "C", decrease: 0.92 },
        { id: 13, rank: "D", decrease: 0.94 },
        { id: 14, rank: "E", decrease: 0.96 },
        { id: 15, rank: "F", decrease: 0.98 },
        { id: 16, rank: "연습", decrease: 1 },
    ];
    const fynnyGems = [
        { id: 1, rank: "A", time: 86400 },
        { id: 2, rank: "B", time: 64800 },
        { id: 3, rank: "C", time: 43200 },
        { id: 4, rank: "D", time: 21600 },
        { id: 5, rank: "E", time: 10800 },
    ];

    const [bluemingStorage, setBluemingStorage] = useState(
        localStorage.getItem("bluemingStorage") == null
            ? []
            : JSON.parse(localStorage.getItem("bluemingStorage"))
    );
    const [cageName, setCageName] = useState("");
    const [nowSkillRank, setNowSkillRank] = useState(skillRanks[0]);
    const [nowFynnyGem, setNowFynnyGem] = useState(fynnyGems[0]);
    const [isFloweryCage, setIsFloweryCage] = useState(false);

    /*
    let nowDate = new Date().getTime();
    console.log("now : " + new Date(nowDate));
    console.log(tempTime);
    console.log(
        Math.floor(tempTime / 3600) +
            "시간 " +
            Math.round((tempTime % 3600) / 60) +
            "분"
    );
    console.log("completed " + new Date(nowDate + tempTime * 1000));
*/

    const processSetBluemingStorage = (newBluemingStorage) => {
        localStorage.setItem(
            "bluemingStorage",
            JSON.stringify(newBluemingStorage)
        );
        setBluemingStorage(newBluemingStorage);
    };
    let pushButton = () => {
        let remainingTime =
            nowFynnyGem.time *
            nowSkillRank.decrease *
            (isFloweryCage ? 0.9 : 1);
        let tempArray = [...bluemingStorage];
        let today = new Date();
        let currentTime = today.getTime(); //시작 timestamp
        let completed = new Date(currentTime + remainingTime * 1000); //종료 timestamp
        //저장해야할 것 : currentTime, tempTime
        let start =
            today.getFullYear() +
            "년 " +
            (today.getMonth() + 1) +
            "월 " +
            today.getDate() +
            "일 " +
            today.getHours() +
            "시 " +
            today.getMinutes() +
            "분 " +
            today.getSeconds() +
            "초";
        let end =
            completed.getFullYear() +
            "년 " +
            (completed.getMonth() + 1) +
            "월 " +
            completed.getDate() +
            "일 " +
            completed.getHours() +
            "시 " +
            completed.getMinutes() +
            "분 " +
            completed.getSeconds() +
            "초";

        let endTimeStamp = completed.getTime();
        // "부화가 완료되기까지 " +
        // Math.floor(tempTime / 3600) +
        // "시간 " +
        // Math.round((tempTime % 3600) / 60) +
        // "분 남았습니다.";
        //  setBluemingStorage([start, end, remainingTime]);
        let insertCageName = cageName;
        if (insertCageName == "") {
            insertCageName = tempArray.length + 1 + "번째";
        }
        tempArray.push({
            id:
                tempArray.length +
                1 +
                "-" +
                parseInt(Math.random() * (99999 - 10000) + 10000) +
                "-" +
                new Date().getTime() +
                "-blueming",
            name: insertCageName,
            gemRank: nowFynnyGem.rank,
            skillRank: nowSkillRank.rank,
            isFloweryCage: isFloweryCage,
            start: start,
            end: end,
            inertTime: currentTime,
            endTimeStamp: endTimeStamp,
        });
        processSetBluemingStorage(tempArray);
    };
    console.log("Render Bluming.js");
    return (
        <div className="container ">
            <div className="section-box">
                <div className="section-title">블루밍!💫</div>
                <div>
                    <Link to="/"> Go Index</Link>
                    <br />
                </div>
                <label>케이지 이름</label>
                <input
                    className="form-control"
                    value={cageName}
                    onChange={(event) => {
                        setCageName(event.target.value);
                    }}
                />
                <label>스킬 랭크</label>
                <select
                    className="form-control"
                    value={nowSkillRank.id}
                    onChange={(event) => {
                        let selectSkillRank = null;
                        skillRanks.map((skillRank, skillRankIndex) => {
                            if (skillRank.id == event.target.value) {
                                selectSkillRank = skillRank;
                            }
                        });
                        if (selectSkillRank == null) {
                            return;
                        }
                        setNowSkillRank(selectSkillRank);
                    }}
                >
                    {skillRanks.map((skillRank, skillRankIndex) => {
                        return (
                            <option
                                key={"skill-rank-option-" + skillRankIndex}
                                value={skillRank.id}
                            >
                                {skillRank.rank}
                            </option>
                        );
                    })}
                </select>

                <label>피니젬 랭크</label>
                <select
                    className="form-control"
                    value={nowFynnyGem.id}
                    onChange={(event) => {
                        let selectFynnyGem = null;
                        fynnyGems.map((fynnyGem, fynnyGemIndex) => {
                            if (fynnyGem.id == event.target.value) {
                                selectFynnyGem = fynnyGem;
                            }
                        });
                        if (selectFynnyGem == null) {
                            return;
                        }
                        setNowFynnyGem(selectFynnyGem);
                    }}
                >
                    {fynnyGems.map((fynnyGem, fynnyGemIndex) => {
                        return (
                            <option
                                key={"fynnyGem-option-" + fynnyGemIndex}
                                value={fynnyGem.id}
                            >
                                {fynnyGem.rank}
                            </option>
                        );
                    })}
                </select>

                <label>케이지 타입</label>
                <input
                    type="checkbox"
                    name="isFloweryCage"
                    value="true"
                    checked={isFloweryCage}
                    onChange={(event) => {
                        setIsFloweryCage(!isFloweryCage);
                    }}
                />
                <br />
                <button type="button" onClick={pushButton}>
                    저장!
                </button>
            </div>
            <BluemingCount
                bluemingStorage={bluemingStorage}
                setBluemingStorage={processSetBluemingStorage}
            />
        </div>
    );
}
export default Index;
