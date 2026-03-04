import './App.css'
import {useEffect, useState} from "react";


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
    const originalTime=120;
    const [timerTypeTab, setTimerTypeTab] = useState('focus');
    const [timerState, setTimerState] = useState('not_started');
    const [timeLeft, setTimeLeft] = useState(originalTime);
    const onClickChangeTimerStateBtn=()=>{
        if(timerState==='not_started'){
            setTimeLeft(originalTime);
            setTimerState('started');
        }else if(timerState==='started'){
            setTimerState('paused');
        }else if(timerState==='paused'){
            setTimerState('started');
        }
    }

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
                <li><button className={timerTypeTab==='focus'?'focus-tab-selected-btn':''} onClick={()=>setTimerTypeTab('focus')}>Focus</button></li>
                <li><button className={timerTypeTab==='shortb'?'focus-tab-selected-btn':''} onClick={()=>setTimerTypeTab('shortb')}>Short break</button></li>
                <li><button className={timerTypeTab==='longb'?'focus-tab-selected-btn':''} onClick={()=>setTimerTypeTab('longb')}>Long break</button></li>
            </ul>
            <div>{`${Math.floor(timeLeft/60)}`.padStart(2,'0')}:{`${timeLeft%60}`.padStart(2,'0')}</div>
            <div>
                <button onClick={()=>{setTimeLeft(originalTime);setTimerState('not_started')}}>reset</button>
                <button className='start-btn' onClick={onClickChangeTimerStateBtn}>{timerState==='started'?'pause':'start'}</button>
            </div>
            <label>DURATION PRESET</label>
            <ul className='duration-presets-list'>
                <li><button>Classic</button></li>
                <li><button>Deep</button></li>
                <li><button>Sprints</button></li>
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
