import React from 'react'
import { Svg } from '../assets/Svg'
import _HIGH_RES from '../assets/main.png'
import _FLINTLOCK_IMG from '../assets/flintlock.png'
import { GeneralContext } from '../context/GeneralContext';
import _LOWRES from '../assets/LOWRES.png'
import _UIDESIGNER_IMG from '../assets/uidesigner.png'
import _EUDS_IMG from '../assets/euds.png'
import _HLC_IMG from '../assets/hlc.png'
import _UIDESIGNER_INACTION_PNG from '../assets/uidesigneraction.png'
import {CustomRouter, Route} from '../CustomRouter'

let currentSnappedElement = "top";

const THROTTLE_HISTORY_MS = 50;
let debounceHistoryTimer = null;

const newHistory = (hist) => {
    clearTimeout(debounceHistoryTimer);
    debounceHistoryTimer = null;
    debounceHistoryTimer = setTimeout(() => {
        window.history.replaceState(null, null, hist);
    }, THROTTLE_HISTORY_MS)
}

export default function CentralView(props) {
    const mainRef = React.useRef(null);

    const [page, setPage] = React.useState({
        "mods-flintlock": [1, 3],
        "tools-HUID": [1, 3],
        "servers-EUDS": [1, 1],
        "servers-HLC": [1, 1]
    });

    const [currentColor, setCurrentColor] = React.useState("#767676");
    const {panel} = React.useContext(GeneralContext);

    // * react moment
    const vantaRefRef = React.useRef(null);
    vantaRefRef.current = props.vantaRef;

    const snapDecoder = (compId) => {
        const EXCLUDED_FROM_TITLING = ["top", "bottom"];

        if (compId === "contact") {
            panel.set(p => ({
                ...p,
                panelTitle: compId,
                panelSubtitle: null,
            }))
        } else {
            
                    panel.set(p => ({
                        ...p,
                        panelTitle: EXCLUDED_FROM_TITLING.includes(compId) ? null : compId.split('-')[0],
                        panelSubtitle: EXCLUDED_FROM_TITLING.includes(compId) ? null : compId.split('-')[1],
                    }))
        }

        switch(compId) {
            case "bottom":
            case "contact":
            case "top":
                setCurrentColor("#767676");
                vantaRefRef.current.setOptions({
                    highlightColor: 0x767676,
                    midtoneColor: 0x767676,
                    lowlightColor: 0x767676,
                })
                break;
            case "mods-flintlock":
                setCurrentColor("#ff0000");
                vantaRefRef.current.setOptions({
                    highlightColor: 0xff0000,
                    midtoneColor: 0xff0000,
                    lowlightColor: 0xff0000,
                })
                break;
            case "tools-HUID":
                setCurrentColor("#3dffa4");
                vantaRefRef.current.setOptions({
                    highlightColor: 0x3dffa4,
                    midtoneColor: 0x3dffa4,
                    lowlightColor: 0x3dffa4,
                })
                break;
            case "servers-EUDS":
                setCurrentColor("#001489");
                vantaRefRef.current.setOptions({
                    highlightColor: 0x001489,
                    midtoneColor: 0x001489,
                    lowlightColor: 0x001489,
                })
                break;
            case "servers-HLC":
                setCurrentColor("#EF4D99");
                vantaRefRef.current.setOptions({
                    highlightColor: 0xEF4D99,
                    midtoneColor: 0xEF4D99,
                    lowlightColor: 0xEF4D99,
                })
                break;
        }
    }

    React.useEffect(() => {
        mainRef.current.addEventListener('scroll', function() {

            const scrollSnapElements = document.querySelectorAll('[data-id]');

            scrollSnapElements.forEach(function(element) {

                const rect = element.getBoundingClientRect();
                

                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {

                    if (element.dataset.id !== currentSnappedElement) {
                        // ! NEW ELEMENT SNAPPED INTO VIEW
                        currentSnappedElement = element.dataset.id;
                        snapDecoder(element.dataset.id);
                        newHistory(`/nss/#${element.dataset.id}`)
                    }

                }
            });
        });
    }, [])

    const flipPage = (direction, target) => {
        let dir = direction === "prev" ? 1 : -1;
        setPage(p => {
            let outp = {...p};
            let aft = outp[target][0];
            if ((aft + dir) > outp[target][1]) {
                aft = 1;
            } else if ((aft + dir) < 1) {
                aft = outp[target][1];
            } else {
                aft += dir;
            }
            outp[target][0] = aft;
            return outp;
        })
    }

    return (
        <>
            <div ref={mainRef} className='w-full mx-0 lg:w-[calc(100%-8rem)] lg:mx-16 block -mt-16 h-full
                mb-[10dvh] justify-center items-center overflow-y-auto snap-both snap-mandatory box-border'>

                <div data-id="top" className='snap-normal snap-center mt-16 w-[100%] h-[calc(100dvh-8rem)] flex flex-col items-center justify-center'>
                    <div className='min-h-[calc(100%-5rem)] w-full flex items-center justify-center'>
                        <img
                            className='h-96 object-contain max-w-[100%] max-h-[80%]'
                            draggable="false"
                            src={_HIGH_RES}
                        />
                    </div>
                    <Svg name="down" xid="scroll-down" height="2.8rem" />
                </div>

                {/*THE BOTTOM ELEMENT MUST HAVE MB-16 */}
                <div data-id="mods-flintlock" id="mods" className='snap-normal snap-center w-[100%] h-[calc(100dvh-8rem)] min-h-[calc(100dvh-8rem)] flex justify-center items-center'>
                    <div className='h-[40rem] max-h-[calc(100%-8rem)] w-full flex flex-col lg:flex-row lg:flex-wrap justify-between box-border px-4 lg:px-8 items-center'>
                        <CustomRouter currentRoute={page["mods-flintlock"][0]}>
                            <Route route={1}>
                                <div className='w-full max-h-1/3 lg:w-full lg:max-h-1/3 lg:h-1/3'>
                                    <img
                                        src={_FLINTLOCK_IMG}
                                        className='w-full h-full object-contain'
                                    />
                                </div>
                                <div className='w-full min-h-1/3 lg:w-full lg:min-h-1/3 flex flex-col items-center'>
                                    <p className='f-main tracking-wide title-glow text-center  text-[var(--accent)] p-0 m-0 text-lg font-bold lg:w-2/3'>
                                        Flintlock Dueling
                                    </p>
                                    <p className='mt-2 opacity-90 p-0 text-[var(--accent)] text-justify f-main font-normal max-w-full box-border lg:px-8 lg:w-3/4'>
                                    Flintlock Dueling reigns supreme among Starblast's dueling mods, setting itself apart with an intuitive interface tailored for both administrators and players. Beyond its unparalleled convenience, it offers a fully integrated chat system, is the most optimized dueling mod and features an ELO-based scoring system. Words alone won't suffice though, try it out yourself!
                                    </p>
                                </div>
                            </Route>
                            <Route route={2}>
                                <div className='w-full min-h-1/3 lg:w-full lg:min-h-2/3 lg:flex lg:items-center lg:flex-col lg:max-h-2/3'>
                                    <p className='p-0 opacity-90 text-[var(--accent)] text-justify f-main font-normal max-w-full'>
                                    <b>Features:</b><br/>
                                    - <u>Highly optimized</u> - Beats Meg's dueling in all benchmarks 
                                    <br/>- <u>In-game chatting system</u> - A full-fledged, optimized chatting system that includes notifications, DMs, and a chat between all players
                                    <br/>- <u>ELO-based scoring system</u>: Initial rating of 0. Elo Change = K * (Result - Expected Result)
                                    <br/>- <b>Advanced Terminal Interface</b>
                                    <br/>- <b>Advanced User Interface</b> - with <b>Admin Dashboard</b>

                                    <br/><br/><b>Advanced Terminal Interface</b>:
                                    <br/>- <u>Easy-to-use, advanced commands</u> - To see the full list of commands and the startup interface, click [2] (or just simply run the mod) 
                                    <br/>- <u>Helper system</u> - Using `chelp(command)` will describe the desired command in exhaustive detail
                                    <br/>- <u>Feedback system</u> - Always know EXACTLY what your command just did after entering it
                                    </p>
                                </div>
                            </Route>
                            <Route route={3}>
                                <div className='w-full min-h-1/3 lg:w-full lg:min-h-2/3 lg:flex lg:justify-center'>
                                    <p className='mt-2 p-0 opacity-90 text-[var(--accent)] text-justify f-main font-normal max-w-full'>
                                        <br/><b>User Interface</b> includes:
                                        <br/>- <u>Adjust Stats Panel</u> - Fully rendered and optimized stat tree that allows the easiest possible stat changing
                                        <br/>- <u>Ship Tree Picker</u> - No more `Next ship` and `Prev ship`, you can now see the entire ship tree and choose 
                                        <br/>- <u>Teleport button</u> - Want to duel a specific player? Just click the 'teleport' button next to their name and teleport right to them

                                        <br/><br/><b>Admin Dashboard</b> includes:
                                        <br/>- <u>Ban button</u> - You don't have to use the terminal anymore, ban trolls quickly and efficiently. I have personally banned mid-duel
                                        <br/>- <u>Kick button</u> - Provides the same convenience that the ban button does, only that the player can rejoin with their name
                                        <br/>- <u>Force Spectate button</u> - Force a player to be a spectator, then unforce at your own leisure
                                    </p>
                                </div>
                            </Route>
                        </CustomRouter>
                        <div className='w-full flex flex-col mt-auto justify-end lg:w-1/3 lg:h-max lg:max-h-1/3 lg:mx-auto'>
                            <div className='flex justify-between items-center'>
                                <Svg xclick={() => flipPage("prev", "mods-flintlock")} name="down" height="2rem" xs={{transform: 'rotate(90deg)', cursor:'pointer'}}/>
                                <p className='m-0 p-0 f-main text-lg text-[var(--accent)] font-bold'>{page["mods-flintlock"][0]} / {page["mods-flintlock"][1]}</p>
                                <Svg xclick={() => flipPage("next", "mods-flintlock")} name="down" height="2rem" xs={{transform: 'rotate(-90deg)', cursor: 'pointer'}}/>
                            </div>
                            <div className='dnld-btn h-14 w-full rounded-md text-lg mt-4 text-[var(--accent)] grid place-items-center'
                            style={{background: `${currentColor}80`, boxShadow: `${currentColor}80 0px 0px 0.6rem`}}
                            >
                                <div className="flex items-center gap-1">
                                    <Svg name="download" height="1.7rem"/>
                                    <p className='f-main m-0 p-0 opacity-100 font-semibold text-xl text-[var(--accent)]'>
                                        Download latest <small>(v1.1)</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-id="tools-HUID" id="tools" className='snap-normal snap-center w-[100%] h-[calc(100dvh-8rem)] min-h-[calc(100dvh-8rem)] flex justify-center items-center'>
                    <div className='h-[40rem] max-h-[calc(100%-8rem)] w-full flex flex-col lg:flex-row lg:flex-wrap justify-between box-border px-4 lg:px-8 items-center'>
                        <CustomRouter currentRoute={page["tools-HUID"][0]}>
                            <Route route={1}>
                                <div className='w-full max-h-1/3 h-1/3 lg:w-full lg:max-h-1/3 lg:h-1/3 flex justify-center'>
                                    <img
                                        key={"akf498wkaf"}
                                        src={_UIDESIGNER_IMG}
                                        className='w-full h-full object-contain lg:max-w-[66%]'
                                    />
                                </div>
                                <div className='w-full min-h-1/3 lg:w-full lg:min-h-1/3 flex flex-col items-center'>
                                    <p className='f-main tracking-wide title-glow text-center  text-[var(--accent)] p-0 m-0 text-lg font-bold lg:w-2/3'>
                                        HUID (Halcyon's UI designer)
                                    </p>
                                    <p className='mt-2 opacity-90 p-0 text-[var(--accent)] text-justify f-main font-normal max-w-full box-border lg:px-8 lg:w-4/5'>
                                        HUID is at its' core a tool that lets you design Starblast UI Components interactively, rather than the classic imperative way through code. It has a multitude of advanced features including: Gridlining & custom grid size, snapping to center and to size, built-in documentation, built-in project management, built-in subcomponent styling etc. The only thing left to do is to try it out. 
                                    </p>
                                </div>
                            </Route>
                            <Route route={2}>
                                <div className='w-full h-2/3 min-h-1/3 lg:w-full lg:min-h-2/3 lg:flex lg:items-center lg:flex-col lg:max-h-2/3'>
                                    <img
                                        key={"3fk89243ef"}
                                        src={_UIDESIGNER_INACTION_PNG}
                                        className='object-contain h-full'
                                    />
                                </div>
                            </Route>
                            <Route route={3}>
                                <div className='w-full min-h-1/3 lg:w-full lg:min-h-2/3 flex flex-col gap-1 items-center'>
                                    <p className='title-glow f-main mb-2 p-0 opacity-95 font-semibold text-[var(--accent)] text-center'>
                                        Contributors:
                                    </p>
                                    <a href="https://www.naflouille-creations.com/sesame/#search?=notus" target="_blank">
                                        <div className='minor-glow flex f-main opacity-90 text-[var(--accent)] text-center justify-center items-center gap-2'>
                                            Notus - Advice, ideas & testing <Svg name="open_new" height="1rem"/>
                                        </div>
                                    </a>
                                    <a href="https://www.naflouille-creations.com/sesame/#search?=bhpsngum" target="_blank">
                                        <div className='minor-glow flex f-main opacity-90 text-[var(--accent)] text-center justify-center items-center gap-2'>
                                            Bhpsngum - Advice, border width, ideas & testing <Svg name="open_new" height="1rem"/>
                                        </div>
                                    </a>
                                    <div className='minor-glow flex f-main opacity-90 text-[var(--accent)] text-center justify-center items-center gap-2'>
                                        A198 - Ideas, testing and support
                                    </div>
                                    <a href="https://www.naflouille-creations.com/sesame/#search?=wargod" target="_blank">
                                        <div className='flex f-main opacity-90 text-[var(--accent)] text-center justify-center items-center gap-2'>
                                            Wargod - Ideas & testing <Svg name="open_new" height="1rem"/>
                                        </div>
                                    </a>
                                    <a href="https://www.naflouille-creations.com/sesame/#search?=happy+whale" target="_blank">
                                        <div className='flex f-main opacity-90 text-[var(--accent)] text-center justify-center items-center gap-2'>
                                            Happy whale - Ideas & testing <Svg name="open_new" height="1rem"/>
                                        </div>
                                    </a>
                                    <a href="https://www.naflouille-creations.com/sesame/#search?=nebuleuse" target="_blank">
                                        <div className='flex f-main opacity-90 text-[var(--accent)] text-center justify-center items-center gap-2'>
                                            Nebuleuse - Moderation & support <Svg name="open_new" height="1rem"/>
                                        </div>
                                    </a>
                                    <div className='flex f-main opacity-90 text-[var(--accent)] text-center justify-center items-center gap-2'>
                                        Oldgregg - Testing
                                    </div>
                                    <div className='flex f-main mt-2 opacity-90 text-[var(--accent)] text-center text-sm justify-center items-center gap-2'>
                                        ...and everyone else who voted for continuing the project. Thank you &lt;3
                                    </div>
                                </div>
                            </Route>
                        </CustomRouter>
                        <div className='w-full flex flex-col mt-auto justify-end lg:w-1/3 lg:h-max lg:max-h-1/3 lg:mx-auto'>
                            <div className='flex justify-between items-center'>
                                <Svg xclick={() => flipPage("prev", "tools-HUID")} name="down" height="2rem" xs={{transform: 'rotate(90deg)', cursor:'pointer'}}/>
                                <p className='m-0 p-0 f-main text-lg text-[var(--accent)] font-bold'>{page["tools-HUID"][0]} / {page["tools-HUID"][1]}</p>
                                <Svg xclick={() => flipPage("next", "tools-HUID")} name="down" height="2rem" xs={{transform: 'rotate(-90deg)', cursor: 'pointer'}}/>
                            </div>
                            <a href="https://halcyonxt.github.io/ui-designer-tool/" target='_blank'>
                                <div className='dnld-btn h-14 w-full rounded-md text-lg mt-4 text-[var(--accent)] grid place-items-center'
                                style={{background: `${currentColor}80`, boxShadow: `${currentColor}80 0px 0px 0.6rem`}}
                                >
                                        <div className="flex items-center gap-1">
                                            <Svg name="open_new" height="1.5rem"/>
                                            <p className='f-main m-0 p-0 opacity-100 font-semibold text-xl text-[var(--accent)]'>
                                                Try it out
                                            </p>
                                        </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div data-id="servers-EUDS" id="servers" className='snap-normal snap-center mb-16 w-[100%] h-[calc(100dvh-8rem)] min-h-[calc(100dvh-8rem)] flex justify-center items-center'>
                    <div className='h-[40rem] max-h-[calc(100%-8rem)] w-full flex flex-col lg:flex-row lg:flex-wrap justify-between box-border px-4 lg:px-8 items-center'>
                        <CustomRouter currentRoute={page["servers-EUDS"][0]}>
                            <Route route={1}>
                                <div className='w-full max-h-1/3 h-1/3 lg:w-full lg:max-h-1/3 lg:h-1/3 flex justify-center'>
                                    <img
                                        src={_EUDS_IMG}
                                        className='w-full h-full object-contain lg:max-w-[66%]'
                                    />
                                </div>
                                <div className='w-full min-h-1/3 lg:w-full lg:min-h-1/3 flex flex-col items-center'>
                                    <p className='f-main tracking-wide title-glow text-center  text-[var(--accent)] p-0 m-0 text-lg font-bold lg:w-2/3'>
                                        European Dueling Server
                                    </p>
                                    <p className='mt-2 text-center opacity-90 p-0 text-[var(--accent)] f-main font-normal max-w-full box-border lg:px-8 lg:w-2/3'>
                                        This server was created with the sole purpose of gathering all EU duelers into one place.<br/> To practice, and have fun. <br/>Most current EU top duelers are in the server.
                                    </p>
                                </div>
                            </Route>
                        </CustomRouter>
                        <div className='w-full flex flex-col mt-auto justify-end lg:w-1/3 lg:h-max lg:max-h-1/3 lg:mx-auto'>
                            {
                                page["servers-EUDS"][1] !== 1
                                &&
                                <div className='flex justify-between items-center'>
                                    <Svg xclick={() => flipPage("prev", "servers-EUDS")} name="down" height="2rem" xs={{transform: 'rotate(90deg)', cursor:'pointer'}}/>
                                    <p className='m-0 p-0 f-main text-lg text-[var(--accent)] font-bold'>{page["servers-EUDS"][0]} / {page["servers-EUDS"][1]}</p>
                                    <Svg xclick={() => flipPage("next", "servers-EUDS")} name="down" height="2rem" xs={{transform: 'rotate(-90deg)', cursor: 'pointer'}}/>
                                </div>
                            }
                            <a href="https://discord.gg/D2kxNkdMME" target='_blank'>
                                <div className='dnld-btn h-14 w-full rounded-md text-lg mt-4 text-[var(--accent)] grid place-items-center'
                                style={{background: `${currentColor}80`, boxShadow: `${currentColor}80 0px 0px 0.6rem`}}
                                >
                                        <div className="flex items-center gap-1">
                                            <Svg name="open_new" height="1.5rem"/>
                                            <p className='f-main m-0 p-0 opacity-100 font-semibold text-xl text-[var(--accent)]'>
                                                Join
                                            </p>
                                        </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div data-id="servers-HLC" className='snap-normal snap-center w-[100%] h-[calc(100dvh-8rem)] min-h-[calc(100dvh-8rem)] flex justify-center items-center'>
                    <div className='h-[40rem] max-h-[calc(100%-8rem)] w-full flex flex-col lg:flex-row lg:flex-wrap justify-between box-border px-4 lg:px-8 items-center'>
                        <CustomRouter currentRoute={page["servers-HLC"][0]}>
                            <Route route={1}>
                                <div className='w-full max-h-1/3 h-1/3 lg:w-full lg:max-h-1/3 lg:h-1/3 flex justify-center'>
                                    <img
                                        src={_HLC_IMG}
                                        className='w-full h-full object-contain lg:max-w-[66%]'
                                    />
                                </div>
                                <div className='w-full min-h-1/3 lg:w-full lg:min-h-1/3 flex flex-col items-center'>
                                    <p className='f-main mt-8 tracking-wide title-glow text-center  text-[var(--accent)] p-0 lg:m-0 text-lg font-bold lg:w-2/3'>
                                        HLC server
                                    </p>
                                    <p className='mt-2 text-center opacity-90 p-0 text-[var(--accent)] f-main font-normal max-w-full box-border lg:px-8 lg:w-2/3'>
                                        If you want to support me and my projects, you can join this server.
                                    </p>
                                </div>
                            </Route>
                        </CustomRouter>
                        <div className='w-full flex flex-col mt-auto justify-end lg:w-1/3 lg:h-max lg:max-h-1/3 lg:mx-auto'>
                            {
                                page["servers-HLC"][1] !== 1
                                &&
                                <div className='flex justify-between items-center'>
                                    <Svg xclick={() => flipPage("prev", "servers-HLC")} name="down" height="2rem" xs={{transform: 'rotate(90deg)', cursor:'pointer'}}/>
                                    <p className='m-0 p-0 f-main text-lg text-[var(--accent)] font-bold'>{page["servers-HLC"][0]} / {page["servers-HLC"][1]}</p>
                                    <Svg xclick={() => flipPage("next", "servers-HLC")} name="down" height="2rem" xs={{transform: 'rotate(-90deg)', cursor: 'pointer'}}/>
                                </div>
                            }
                            <a href="https://discord.gg/mv6c5zbjxg" target='_blank'>
                                <div className='dnld-btn h-14 w-full rounded-md text-lg mt-4 text-[var(--accent)] grid place-items-center'
                                style={{background: `${currentColor}80`, boxShadow: `${currentColor}80 0px 0px 0.6rem`}}
                                >
                                        <div className="flex items-center gap-1">
                                            <Svg name="open_new" height="1.5rem"/>
                                            <p className='f-main m-0 p-0 opacity-100 font-semibold text-xl text-[var(--accent)]'>
                                                Join
                                            </p>
                                        </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div data-id="contact" id="contact" className='snap-normal snap-center w-[100%] h-[calc(100dvh-8rem)] min-h-[calc(100dvh-8rem)] flex justify-center items-center'>
                    <div className='h-[40rem] max-h-[calc(100%-8rem)] w-full flex flex-col lg:flex-row lg:flex-wrap box-border px-4 lg:px-8 items-center justify-center'>
                        <div className='w-full min-h-1/3 lg:w-full lg:min-h-1/3 flex flex-col items-center'>
                            <p className='my-8 text-center opacity-90 p-0 text-[var(--accent)] f-main font-normal max-w-full box-border lg:px-8 lg:w-2/3'>
                                I am <b>Halcyon</b>, a full-stack developer who believes website presentation should be more expressive.<br/>
                                Throughout my developer journey, each design I created was unique and non-conforming to any preset ideal.<br/><br/>
                                I am available for website comissions. Prices negotiable.<br/>
                            </p>
                            <p className='f-main tracking-wide title-glow text-center  text-[var(--accent)] p-0 m-0 text-lg font-bold lg:w-2/3'>
                                Contact
                            </p>
                            <p className='mt-2 text-center opacity-90 p-0 text-[var(--accent)] f-main font-normal max-w-full box-border lg:px-8 lg:w-2/3'>
                                Email - <u>halcyonxt1987@gmail.com</u>
                            </p>
                            <p className='mt-2 text-center opacity-90 p-0 text-[var(--accent)] f-main font-normal max-w-full box-border lg:px-8 lg:w-2/3'>
                                Discord - <u>h.alcyon</u>
                            </p>
                            <p className='mt-2 text-center opacity-90 p-0 text-[var(--accent)] f-main font-normal max-w-full box-border lg:px-8 lg:w-2/3 flex justify-center'>
                                Github -&nbsp;
                                <a href='https://github.com/halcyonXT' target='_blank'>
                                    <div className="flex items-center gap-2">
                                        <u>halcyonXT</u>
                                        <Svg name="open_new" height="1.3rem"/>
                                    </div>
                                </a>
                            </p>
                            <a href="https://ko-fi.com/halcyonxt#paypalModal" target='_blank'>
                                <div className='dnld-btn h-14 w-full rounded-md text-lg mt-4 text-[var(--accent)] grid place-items-center'
                                style={{background: `${"#FFFFFF"}EC`, boxShadow: `#FFFFFF80 0px 0px 0.6rem`}}
                                >
                                        <div className="flex items-center gap-1 px-8">
                                            <Svg name="donate" fill="#000000" height="1.5rem"/>
                                            <p className='f-main m-0 p-0 opacity-100 font-semibold text-xl text-black'>
                                                Donate
                                            </p>
                                        </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div data-id="bottom" className='snap-normal snap-center mb-16 w-[100%] h-[calc(100dvh-8rem)]'>
                    <div className="w-full h-full box-border p-4 flex flex-col justify-center items-center">
                        <img
                            src={_LOWRES}
                            className='object-contain max-w-[95%] h-28 opacity-75'
                        />
                        <p className='mt-8 p-0 text-[var(--accent)] opacity-75 text-sm f-main'>
                            © Copyright 2024 - halcyonXT (a.k.a. Nanoray) <br/><br/>
                            All rights reserved. <br/><br/>
                            Reproduction, reposting or modification of the contents of this site is prohibited.
                        </p>
                    </div>
                </div>

            </div>
            {
                props.menuOpen
                ?
                ""
                :
                <div className={`f-main mix-blend-lighten absolute top-[5rem] left-4 lg:left-[5.5rem] text-lg select-none 
                font-bold fill-[#FFFFFF50] text-[#FFFFFF50] flex gap-2 items-center duration-100 ${panel.value.panelTitle ? 'opacity-1' : 'opacity-0'}`}>
                    <Svg name={panel.value.panelTitle} height='1.3rem' fill="#FFFFFF50" />
                    <p className='p-0 m-0 capitalize'>
                        {panel.value.panelTitle ? panel.value.panelTitle : ""} {panel.value.panelSubtitle ? "/ " + panel.value.panelSubtitle : ""}
                    </p>
                </div>
            }
        </>
    )
}
