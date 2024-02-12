import React from 'react'
import './App.css'
import _LOW_RES_LOGO from './assets/LOWRES.png'
import _NOISE from './assets/noise.svg'
import { Svg } from './assets/Svg'
import CentralView from './components/CentralView'
import { GeneralContext } from './context/GeneralContext'

/*VANTA.CELLS({
    el: "#-background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    color1: 0x712fc0,
    color2: 0x712fc0,
    size: 8.00,
    speed: 0.40
})*/
/**
VANTA.FOG({
            el: "#-background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xcfcfcf,
            midtoneColor: 0xcfcfcf,
            lowlightColor: 0xcfcfcf,
            baseColor: 0x0,
            blurFactor: 0.17,
            speed: 0.10,
            zoom: .045
        })
 */

function App() {
    let backgroundRef = React.useRef(null);
    const [vantaRef, setVantaRef] = React.useState(null)
    const [menu, setMenu] = React.useState(false);
    const {panel} = React.useContext(GeneralContext);

    const goTo = (goto) => {
        if (goto) {
            if (goto.indexOf("-") !== -1) {
                let to = document.querySelector(`[data-id="${goto.slice(1)}"]`)
                setTimeout(() => {
                    if (to) {
                        to.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                }, 100)
            } else {
                let to = document.querySelector(`#${goto.slice(1)}`);
                setTimeout(() => {
                    if (to) {
                        to.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                }, 100)
            }
        }
    }

    React.useEffect(() => {
        function extractPartFromURL(url) {
            var regex = /\/nss\/([^\/]+)/;
            var match = url.match(regex);
            if (match && match.length > 1) {
                return match[1];
            } else {
                return null;
            }
        }

        const goto = extractPartFromURL(window.location.href);

        goTo(goto);

        setVantaRef(VANTA.FOG({
            el: "#-background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0x767676,
            midtoneColor: 0x767676,
            lowlightColor: 0x767676,
            baseColor: 0x0,
            blurFactor: 0.17,
            speed: 0.10,
            zoom: .045
        }));
    }, [])

    return (
        <>
            <div id="navbar" className='bd-blur w-[100%] h-16 relative top-0 left-0 z-10 flex justify-center items-center flex-col'>
                <div className='w-[100%] h-[calc(60%-1px)] my-[20%] flex justify-between box-border px-4 lg:px-16'>
                    <img
                        src={_LOW_RES_LOGO}
                        className='h-[100%]'
                        draggable="false"
                    />
                    <button className={`menu ${menu ? "opened" : ""} lg:hidden`} aria-expanded={menu} onClick={() => {setMenu(p => !p)}} aria-label="Main Menu">
                        <svg height="100%" viewBox="0 0 100 100">
                            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                            <path className="line line2" d="M 20,50 H 80" />
                            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                        </svg>
                    </button>
                    <div className='items-center gap-12 hidden lg:flex'>
                        <button onClick={() => goTo("#mods")} className={`${panel.value.panelTitle === "mods" ? "active" : ""} lg-button flex flex-col items-center f-main font-normal text-lg text-[var(--accent)]`}>
                            <div className='flex items-center gap-1'>
                                <Svg name="mods" height="1.1rem"/>
                                Mods
                            </div>
                            <div className='lg-underline w-full h-[1px]'></div>
                        </button>
                        <button onClick={() => goTo("#tools")} className={`${panel.value.panelTitle === "tools" ? "active" : ""} lg-button flex flex-col items-center f-main font-normal text-lg text-[var(--accent)]`}>
                            <div className='flex items-center gap-1'>
                                <Svg name="tools" height="1.1rem"/>
                                Tools
                            </div>
                            <div className='lg-underline w-full h-[1px]'></div>
                        </button>
                        <button onClick={() => goTo("#servers")} className={`${panel.value.panelTitle === "servers" ? "active" : ""} lg-button flex flex-col items-center f-main font-normal text-lg text-[var(--accent)]`}>
                            <div className='flex items-center gap-1'>
                                <Svg name="servers" height="1.1rem"/>
                                Servers
                            </div>
                            <div className='lg-underline w-full h-[1px]'></div>
                        </button>
                        <button onClick={() => goTo("#contact")} className={`${panel.value.panelTitle === "contact" ? "active" : ""} lg-button flex flex-col items-center f-main font-normal text-lg text-[var(--accent)]`}>
                            <div className='flex items-center gap-1'>
                                <Svg name="contact" height="1.1rem"/>
                                Contact
                            </div>
                            <div className='lg-underline w-full h-[1px]'></div>
                        </button>
                    </div>
                </div>
                {/*<div id="cusbor" className='w-[95%] h-[1px] absolute bottom-0'></div>*/}
            </div>
            <div className='flex w-full bd-blur h-max flex-col absolute top-[calc(4rem+1px)] basis-auto'>
                
                <div id="menu" className={`w-full bd-blur z-50 box-content pt-4 lg:hidden flex flex-col justify-between items-start gap-4 duration-150 ${menu ? "open" : "closed"}`}>
                    <button onClick={() => goTo("#mods")} className='flex items-center gap-1 f-main font-normal text-lg text-[var(--accent)] w-[95%] ml-[2.5%] text-left duration-75 hover:indent-1'>
                        <Svg name="mods" height="1.1rem"/>
                        Mods
                    </button>
                    <button onClick={() => goTo("#tools")} className='flex items-center gap-1 f-main font-normal text-lg text-[var(--accent)] w-[95%] ml-[2.5%] text-left duration-75 hover:indent-1'>
                        <Svg name="tools" height="1.1rem"/>
                        Tools
                    </button>
                    <button onClick={() => goTo("#servers")} className='flex items-center gap-1 f-main font-normal text-lg text-[var(--accent)] w-[95%] ml-[2.5%] text-left duration-75 hover:indent-1'>
                        <Svg name="servers" height="1.1rem"/>
                        Servers
                    </button>
                    <button onClick={() => goTo("#contact")} className='flex items-center gap-1 f-main font-normal text-lg text-[var(--accent)] w-[95%] ml-[2.5%] text-left duration-75 hover:indent-1'>
                        <Svg name="contact" height="1.1rem"/>
                        Contact
                    </button>
                    <div id="cusbor" className='w-[100%] h-[1px] opacity-65'></div>
                </div>
            </div>
            {/** 4 rem is the height of the navbare */}
            <CentralView vantaRef={vantaRef} menuOpen={menu}/>
            <div className='absolute border-y lg:border h-[calc(100%-8rem)] w-full lg:w-[calc(100%-8rem)] left-0 lg:left-16 top-16 pointer-events-none border-[var(--accent)]'></div>
            <div className='hidden lg:block bd-blur absolute top-16 left-0 h-[calc(100%-8rem)] z-10 w-16'></div>
            <div className='hidden lg:block bd-blur absolute top-16 right-0 h-[calc(100%-8rem)] z-10 w-16'></div>
            <div className='bd-blur absolute bottom-0 left-0 w-full h-16 z-10'></div>
            <div id="-scanlines" className='pointer-events-none'></div>
            <div className="-nbg pointer-events-none"></div>
            <div id="-background" ref={backgroundRef} className='-background pointer-events-none w-[100%] h-[100%] min-h-[100%] absolute z-[144] top-0 left-0'></div>

        </>
    )
}


/**
 * <button className='f-main font-semibold text-lg text-[var(--accent)] w-[95%] ml-[2.5%] text-left duration-75 hover:indent-1'>
                        Tools
                    </button>
                    <button className='f-main font-semibold text-lg text-[var(--accent)] w-[95%] ml-[2.5%] text-left duration-75 hover:indent-1'>
                        Servers
                    </button>
                    <button className='f-main font-semibold text-lg text-[var(--accent)] w-[95%] ml-[2.5%] text-left duration-75 hover:indent-1'>
                        Contact
                    </button>
 */

export default App
