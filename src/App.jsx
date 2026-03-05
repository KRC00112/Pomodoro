import './App.css'
import {useEffect, useState} from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function MainCard({mainTabType}){



            switch (mainTabType) {
                case 'timer':
                    return <TimerTab/>
                case 'tasks':
                    return <TasksTab/>
                case 'stats':
                    return <StatsTab/>
                default:
                    return <TimerTab/>
            }

}


function TimerTab(){
    // const originalTime=60;

    const presetList={
        focus:{'classic':1500,'deep':3000,'sprints':900},
        short_break:{'classic':300,'deep':600,'sprints':180},
        long_break:{'classic':900,'deep':1200,'sprints':600},

    }
    const [durationType, setDurationType] = useState('classic');

    const [timerType, setTimerType] = useState('focus');
    const [timerState, setTimerState] = useState('not_started');
    const [timeLeft, setTimeLeft] = useState(presetList[timerType][durationType]);

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

        console.log(timerState);

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



    return (
        <div className="card timer-tab">
            <ul className='timer-type-task'>
                <li><button className={timerType==='focus'?'focus-type-tab-selected-btn':''} onClick={()=>setTimerType('focus')}>Focus</button></li>
                <li><button className={timerType==='short_break'?'not-focus-type-tab-selected-btn':''} onClick={()=>setTimerType('short_break')}>Short break</button></li>
                <li><button className={timerType==='long_break'?'not-focus-type-tab-selected-btn':''} onClick={()=>setTimerType('long_break')}>Long break</button></li>
            </ul>
            <div style={{width:'100px'}}>
                <CircularProgressbar
                    value={timeLeft}
                    minValue={0}
                    maxValue={presetList[timerType][durationType]}
                    counterClockwise={true}
                    strokeWidth={5}
                    text={`${Math.floor(timeLeft/60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}/>
            </div>
            <div className='timer-ops'>
                <button className='reset-btn'  onClick={()=>{setTimeLeft(presetList[timerType][durationType]);setTimerState('not_started')}}>
                    <img src="/reset.svg" alt="reset button"/>
                </button>
                <button className={`${timerType==='focus'?'start-btn':'start-btn-green'}`} onClick={onClickChangeTimerStateBtn}>{timerState==='started'?'pause':'start'}</button>
            </div>
            <label>DURATION PRESETS</label>
            <ul className='duration-presets-list'>
                <li>
                    <button className={durationType==='classic'?'duration-type-btn-selected':''} onClick={()=>{setDurationType('classic');}}>
                        <div>Classic</div>
                        <div>{presetList[timerType]['classic']/60}m</div>
                    </button>
                </li>
                <li>
                    <button  className={durationType==='deep'?'duration-type-btn-selected':''} onClick={()=>{setDurationType('deep');}}>
                        <div>Deep</div>
                        <div>{presetList[timerType]['deep']/60}m</div>
                    </button>
                </li>
                <li>
                    <button className={durationType==='sprints'?'duration-type-btn-selected':''}  onClick={()=>{setDurationType('sprints');}}>
                        <div>Sprints</div>
                        <div>{presetList[timerType]['sprints']/60}m</div>
                    </button>
                </li>
            </ul>
        </div>
    )
}

function TasksTab(){
    return (
        <div className="card tasks-tab">
            <>tasks</>
        </div>
    )
}

function StatsTab(){
    return (
        <div className="card stats-tab">
            <>stats</>
        </div>
    )
}



function App() {

    const [mainTabType, setMainTabType] = useState('timer');

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
                <div>
                    <div className='app-title'>Pomodoro</div>
                    <div className='date-time'>{formattedDate(new Date())}</div>
                </div>
                <div>
                    <div>today</div>
                    <div>0 🍅</div>
                </div>
            </header>
            <ul className='main-tabs'>
                <li><button className={mainTabType==='timer'?'main-tab-selected':''} onClick={()=>setMainTabType('timer')}>Timer</button></li>
                <li><button className={mainTabType==='tasks'?'main-tab-selected':''} onClick={()=>setMainTabType('tasks')}>Tasks</button></li>
                <li><button className={mainTabType==='stats'?'main-tab-selected':''} onClick={()=>setMainTabType('stats')}>Stats</button></li>
            </ul>
            {mainTabType && <MainCard mainTabType={mainTabType}/>}
        </section>
    </section>
  )
}

export default App
