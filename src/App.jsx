import './App.css'
import {useEffect, useState} from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useLocalStorage from "use-local-storage";


function MainCard({ roundCount, mainTabType, timerState, timerType, timeLeft, durationType, presetList, handleSetTimerType, handleResetBtn, handleSetDurationType, onClickChangeTimerStateBtn, addTask, closeTask, completeTask, removeAllCompletedTasks, tasksList, input,handleSetInput }) {


            switch (mainTabType) {
                case 'timer':
                    return <TimerTab
                        roundCount={roundCount}
                        timerState={timerState}
                        timerType={timerType}
                        timeLeft={timeLeft}
                        durationType={durationType}
                        presetList={presetList}
                        handleSetTimerType={handleSetTimerType}
                        handleResetBtn={handleResetBtn}
                        handleSetDurationType={handleSetDurationType}
                        onClickChangeTimerStateBtn={onClickChangeTimerStateBtn}/>
                case 'tasks':
                    return <TasksTab
                        input={input}
                        tasksList={tasksList}
                        addTask={addTask}
                        closeTask={closeTask}
                        completeTask={completeTask}
                        removeAllCompletedTasks={removeAllCompletedTasks}
                        handleSetInput={handleSetInput}/>
                // case 'stats':
                //     return <StatsTab/>
                default:
                    return <TimerTab
                        roundCount={roundCount}
                        timerState={timerState}
                        timerType={timerType}
                        timeLeft={timeLeft}
                        durationType={durationType}
                        presetList={presetList}
                        handleSetTimerType={handleSetTimerType}
                        handleResetBtn={handleResetBtn}
                        handleSetDurationType={handleSetDurationType}
                        onClickChangeTimerStateBtn={onClickChangeTimerStateBtn}/>
            }

}


function TimerTab({roundCount, timerType, timerState, timeLeft, durationType, presetList, handleSetTimerType, handleResetBtn, handleSetDurationType, onClickChangeTimerStateBtn }) {    // const originalTime=60;








    return (
        <div className="card timer-tab">
            <ul className='timer-type-task'>
                <li><button className={timerType==='focus'?'focus-type-tab-selected-btn':''} onClick={()=>{handleSetTimerType('focus')}}>Focus</button></li>
                <li><button className={timerType==='short_break'?'not-focus-type-tab-selected-btn':''} onClick={()=>{handleSetTimerType('short_break')}}>Short break</button></li>
                <li><button className={timerType==='long_break'?'not-focus-type-tab-selected-btn':''} onClick={()=>{handleSetTimerType('long_break')}}>Long break</button></li>
            </ul>
            <div style={{ width: '150px', position: 'relative' }}>
                <CircularProgressbar
                    value={timeLeft}
                    minValue={0}
                    maxValue={presetList[timerType][durationType]}
                    counterClockwise={true}
                    strokeWidth={5}
                    styles={{
                        text: {
                            fill: '#000000',
                            fontSize: '20px',
                        },
                        path: {
                            stroke: timerType === 'focus' ? '#c33928' : '#27ae60',
                        },
                        trail: {
                            stroke: '#d6d6d6',
                        },
                    }}
                    text={`${Math.floor(timeLeft/60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}
                />
                {timerType==='focus' &&<div style={{
                    position: 'absolute',
                    top: '62%',
                    width: '100%',
                    textAlign: 'center',
                    letterSpacing: 4,
                    fontSize: '10px',
                    color: '#666'
                }}>
                    ROUND {roundCount+1}
                </div>}
            </div>
            <div className='timer-ops'>
                <button className='reset-btn'  onClick={handleResetBtn}>
                    <img src="/reset.svg" alt="reset button"/>
                </button>
                <button className={`${timerType==='focus'?'start-btn':'start-btn-green'}`} onClick={onClickChangeTimerStateBtn}>{timerState==='started'?'pause':'start'}</button>
            </div>
            <label className='duration-presets-label'>DURATION PRESETS</label>
            <ul className='duration-presets-list'>
                <li>
                    <button className={durationType==='classic'?'duration-type-btn-selected':''} onClick={()=>{handleSetDurationType('classic');}}>
                        <div>Classic</div>
                        <div>{Math.floor(presetList[timerType]['classic']/60)}m</div>
                    </button>
                </li>
                <li>
                    <button  className={durationType==='deep'?'duration-type-btn-selected':''} onClick={()=>{handleSetDurationType('deep');}}>
                        <div>Deep</div>
                        <div>{Math.floor(presetList[timerType]['deep']/60)}m</div>
                    </button>
                </li>
                <li>
                    <button className={durationType==='sprints'?'duration-type-btn-selected':''}  onClick={()=>{handleSetDurationType('sprints');}}>
                        <div>Sprints</div>
                        <div>{Math.floor(presetList[timerType]['sprints']/60)}m</div>
                    </button>
                </li>
            </ul>
        </div>
    )
}

function TasksTab({addTask, closeTask, completeTask, removeAllCompletedTasks, tasksList, input,handleSetInput}){
    return (
        <div className="card tasks-tab">
            <div className='task-addition-section'>
                <input className='task-input' type='text' placeholder='Add a task...' onChange={e=>handleSetInput(e.target.value)} value={input}></input>
                <button className='add-task' onClick={addTask}>Add</button>
            </div>
            {tasksList.length>0?<section className='task-section'>
                {tasksList.map((task)=>{
                    return(
                        <div key={task.id} className='task-item' onClick={()=>completeTask(task.id)} >
                            <div className='task-item-left'>
                                <input title='Mark as Completed' className='task-item-checkbox' type='checkbox' checked={task.status==="complete"}></input>
                                <div className={`${task.status==='complete'?'task-title-completed':'task-title'}`}>{task.title}</div>
                            </div>
                            <button onClick={(e)=>closeTask(task.id,e)}>close</button>
                        </div>
                    )
                })}
            </section>:<div className='empty-placeholder-msg'>No tasks yet. Add one above.</div>}
            <button className='clear-completed-tasks' onClick={removeAllCompletedTasks}>Clear Completed</button>

        </div>
    )
}

// function StatsTab(){
//     return (
//         <div className="card stats-tab">
//             <>stats</>
//         </div>
//     )
// }



function App() {
    const presetList={
        focus:{'classic':1500,'deep':3000,'sprints':900},
        short_break:{'classic':300,'deep':600,'sprints':180},
        long_break:{'classic':900,'deep':1200,'sprints':600},

    }

    const handleSetTimerType=(type)=>{
        setTimerType(type);
    }

    const handleResetBtn=()=>{
        setTimeLeft(presetList[timerType][durationType]);
        setTimerState('not_started')
    }

    const handleSetDurationType=(type)=>{
        setDurationType(type);
    }

    const [durationType, setDurationType] = useState('classic');

    const [timerType, setTimerType] = useState('focus');

    const [mainTabType, setMainTabType] = useState('timer');
    const [roundCount, setRoundCount] = useState(0);
    const [timerState, setTimerState] = useState('not_started');
    const [timeLeft, setTimeLeft] = useState(presetList[timerType][durationType]);


    const [input, setInput]=useState('')
    const [tasksList, setTasksList] = useState([])


    const handleSetInput=(input)=>{
        setInput(input)
    }
    const addTask=()=>{
        if(input) {
            setTasksList([
                ...tasksList,
                {id: Date.now(), title: input, status:'not_complete'},
            ])
            setInput('')
        }
    }

    const closeTask=(id,e)=>{
        e.stopPropagation();
        setTasksList(
            tasksList.filter(task=>task.id !== id)
        )
    }

    const completeTask=(id)=>{
        setTasksList(
            tasksList.map((task)=>{
                if(task.id === id){
                    if(task.status==='not_complete') {
                        return {...task, status: 'complete'}
                    }else{
                        return {...task, status: 'not_complete'};

                    }
                }
                return task;
            })
        )
    }

    const removeAllCompletedTasks=()=>{
        setTasksList(
            tasksList.filter(task=>task.status === 'not_complete')
        )
    }

    const onClickChangeTimerStateBtn=()=>{
        if(timerState==='not_started'){
            setTimeLeft(presetList[timerType][durationType]);
            setTimerState('started');
        }else if(timerState==='started'){
            setTimerState('paused');
        }else if(timerState==='paused'){
            setTimerState('started');
        }
    }

    useEffect(() => {
        setTimeLeft(presetList[timerType][durationType]);
        setTimerState('not_started')

    }, [durationType,timerType]);
    useEffect(()=>{


        const intervalId = setInterval(() => {
            if(timerState==='started') {
                setTimeLeft(prev=>{

                    if(prev<=0){
                        clearInterval(intervalId);
                        setTimerState('not_started');
                        return 0;
                    }

                    return prev-1;
                })
            }

        },1000)

        return () => {clearInterval(intervalId);};
    },[timerState]);


    useEffect(()=>{

        if(timerType==='focus' && timeLeft===0 && timerState==='started'){
            setRoundCount(p=>p+1);
        }

    },[timeLeft])

    const formattedDate=(date)=>{
        let d=new Intl.DateTimeFormat('en-US',{
            weekday: 'long',
            month: 'long',
            day: 'numeric',

        }).format(date);


        return d;
    }


  return (
    <section className='app'>
        <section className='main-body'>

            <header>
                <div className='header-left'>
                    <div className='app-title'>Pomodoro</div>
                    <div className='date-time'>{formattedDate(new Date())}</div>
                </div>
                <div className='header-right'>
                    <div className='rounds-badge'>
                        <span className='rounds-label'>ROUNDS COMPLETED: </span>
                        <span className='rounds-count'>{roundCount}</span>
                    </div>
                </div>
            </header>
            <ul className='main-tabs'>
                <li><button className={mainTabType==='timer'?'main-tab-selected':''} onClick={()=>setMainTabType('timer')}>Timer</button></li>
                <li><button className={mainTabType==='tasks'?'main-tab-selected':''} onClick={()=>setMainTabType('tasks')}>Tasks</button></li>
                {/*<li><button className={mainTabType==='stats'?'main-tab-selected':''} onClick={()=>setMainTabType('stats')}>Stats</button></li>*/}
            </ul>
            {mainTabType && <MainCard
                roundCount={roundCount}
                mainTabType={mainTabType}
                timerState={timerState}
                timerType={timerType}
                timeLeft={timeLeft}
                durationType={durationType}
                presetList={presetList}
                handleSetTimerType={handleSetTimerType}
                handleResetBtn={handleResetBtn}
                handleSetDurationType={handleSetDurationType}
                onClickChangeTimerStateBtn={onClickChangeTimerStateBtn}
                input={input}
                tasksList={tasksList}
                addTask={addTask}
                closeTask={closeTask}
                completeTask={completeTask}
                removeAllCompletedTasks={removeAllCompletedTasks}
                handleSetInput={handleSetInput}/>}
        </section>
    </section>
  )
}

export default App
