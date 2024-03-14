import { useContext } from 'react';
import { assets } from '../../assets/assets';
import './Main.css';
import { Context } from '../../context/Context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {
                    !showResult ? <>
                        <div className="greet">
                            <p>
                                <span>Hello, Ankit.</span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </> : <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {
                                loading ?
                                    <div className='loader'>
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div> :
                                    <div className="" dangerouslySetInnerHTML={{ __html: resultData }}></div>
                            }
                        </div>
                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" name="" id="" placeholder='Enter a prompt here' />
                        <div className="">
                            <img src={assets.gallery_icon} />
                            <img src={assets.mic_icon} />
                            <img onClick={() => onSent()} src={assets.send_icon} />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main