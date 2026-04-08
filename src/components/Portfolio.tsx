'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

// ── PURE CYBERPUNK RED/BLACK ──────────────────────────────────────────────────
const R  = '#FF4655'   // valorant red
const W  = '#FFFBF5'   // bright off-white
const B  = '#0A0909'   // near-black
const S  = '#140C0C'   // dark red-tinted surface
const DR = '#7A1C24'   // dark red for borders
const DIM = 'rgba(255,255,255,0.45)'  // dimmed text

const EMAIL = 'vishweshmash86@gmail.com'
const PHONE = '+91 95375 17519'

// ── parallax hook ─────────────────────────────────────────────────────────────
function useParallax() {
  const mx = useMotionValue(0); const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness:55, damping:22 })
  const y = useSpring(my, { stiffness:55, damping:22 })
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set((e.clientX/window.innerWidth-0.5)*2)
      my.set((e.clientY/window.innerHeight-0.5)*2)
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [mx, my])
  return { x, y }
}

// ── typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(texts: string[], speed = 75, pause = 1600) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [ch, setCh] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const cur = texts[idx]
    if (!del && ch < cur.length) { const t=setTimeout(()=>setCh(c=>c+1),speed+Math.random()*35); return ()=>clearTimeout(t) }
    if (!del && ch === cur.length) { const t=setTimeout(()=>setDel(true),pause); return ()=>clearTimeout(t) }
    if (del && ch > 0) { const t=setTimeout(()=>setCh(c=>c-1),speed/2); return ()=>clearTimeout(t) }
    if (del && ch === 0) { setDel(false); setIdx(i=>(i+1)%texts.length) }
  }, [ch, del, idx, texts, speed, pause])
  useEffect(() => setDisplay(texts[idx].slice(0,ch)), [ch, idx, texts])
  return display
}


// ── mobile detection ─────────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
}
// ── data ──────────────────────────────────────────────────────────────────────
const ABILITIES = [
  { key:'C', name:'EMBROID',     type:'BASIC',     desc:'Threads logic into physical fabric. Merges the family craft with technology. Passive — no other agent has it.' },
  { key:'Q', name:'COMPILE',     type:'SIGNATURE', desc:'Full-stack deployment at extreme velocity. Leaves competitors with critical errors and zero test coverage.' },
  { key:'E', name:'FREELANCE',   type:'BASIC',     desc:'Enters independent contract mode. Client acquisition in 3s. Penetrates any market. No cooldown.' },
  { key:'X', name:'AKIRA DRIVE', type:'ULTIMATE',  desc:'Overclocks all systems. Reality becomes the canvas. Full creative chaos. 7 points.' },
]

const LOADOUT = [
  { name:'NEXT.JS',        tier:'S', power:95 },
  { name:'REACT',          tier:'S', power:92 },
  { name:'TYPESCRIPT',     tier:'A', power:84 },
  { name:'UNITY',          tier:'A', power:80 },
  { name:'BLENDER',        tier:'A', power:72 },
  { name:'AFTER EFFECTS',  tier:'B', power:65 },
  { name:'THREE.JS',       tier:'B', power:68 },
  { name:'SUPABASE',       tier:'B', power:70 },
]

const BUILD_BOARD = {
  doing: [
    { id:'B01', title:'Portfolio v3',    desc:'This very site. Valorant-aesthetic, full overload mode.', tag:'WEB',    hot:true  },
    { id:'B02', title:'3D Art Practice', desc:'Learning Blender. Currently stuck on topology. Send help.', tag:'ART',   hot:false },
    { id:'B03', title:'Freelance Hunt',  desc:'Actively looking for interesting contracts and collabs.',  tag:'CAREER', hot:true  },
  ],
  planned: [
    { id:'B04', title:'Gacha Mobile Game', desc:'Casual pet-collecting game, Coin Master inspired, Unity.', tag:'GAME', hot:false },
    { id:'B05', title:'Retrowave Vault',   desc:'Curated lofi art marketplace. Gumroad meets Are.na.',    tag:'WEB',  hot:false },
    { id:'B06', title:'Hardware Tinkering',desc:'Learning electronics via the embroidery machine PCBs.',  tag:'ELEC', hot:false },
  ],
  shipped: [
    { id:'B07', title:'HeapOverflow', desc:'Full Q&A platform. Next.js + PostgreSQL + Drizzle.',  tag:'WEB', hot:false },
    { id:'B08', title:'Augst AI',     desc:'Freelance full-stack on a live AI product. MongoDB.', tag:'WEB', hot:false },
    { id:'B09', title:'VShell',       desc:'Unix shell in C. Pipes, redirects, job control.',     tag:'SYS', hot:false },
  ],
}

const THOUGHTS = [
  {
    id:'T01', date:'APR 2026', tag:'CRAFT',
    title:'On shipping vs perfecting',
    preview:'Every project I\'ve actually finished had one thing in common: I decided it was done before it was perfect.',
    body:`Every project I've actually finished had one thing in common: I decided it was done before it was perfect. The unfinished ones are still waiting for the perfect moment that never comes.

There's a version of me that's been "almost done" with a game project for eight months. It's not that it needs more features. It's that I keep imagining a better version of it and then feeling bad about the current one.

The projects I've shipped — HeapOverflow, the shell, the freelance work — all got done because I committed to a scope and held that line. The portfolio you're reading right now exists because I stopped redesigning it in my head and started writing code.

Perfection is a moving target. Shipping is a decision. Make it.`,
  },
  {
    id:'T02', date:'MAR 2026', tag:'DESIGN',
    title:'Embroidery taught me about grids',
    preview:'Running inventory for the business made me realize — fabric patterns are just CSS grids with thread.',
    body:`Running inventory for the business made me realize — fabric patterns are just CSS grids with thread. Every design in the showroom is a constraint-based system: fixed loom width, fixed thread count, fixed color palette. And within those constraints, infinite variation.

This is the most underrated design lesson. Constraints aren't limitations — they're the structure that makes creativity possible. When you have infinite options you get paralysis. When you have a grid, you make things.

Working with my father on the embroidery side taught me more about systematic thinking than any CS course. He can look at a pattern and tell you the thread count, the color sequence, the machine tension — all from memory. That's domain knowledge compounding over decades.

I think about that every time I'm designing a component system. The framework is the loom. Learn it deeply.`,
  },
  {
    id:'T03', date:'MAR 2026', tag:'TECH',
    title:'Why I still use Linux',
    preview:'Fedora because it forces you to understand the machine. Every time something breaks and you fix it, you own a little more.',
    body:`Fedora because it forces you to understand the machine. Every time something breaks and you fix it, you own a little more of your environment. That ownership compounds.

Windows is a black box that mostly works. macOS is a beautiful black box. Linux is a transparent box that sometimes explodes. The explosion is the lesson.

When your wifi driver breaks after a kernel update and you have to figure out DKMS and module signing, you learn more about how operating systems actually work than any textbook will teach you. That knowledge transfers. It makes you better at debugging, better at systems thinking, better at reading error messages everywhere.

The other reason: it's mine. My setup, my config, my tools. No telemetry I didn't choose, no update schedule I can't control. In a world where every piece of software is trying to rent you something, that feels important.

Also rice is fun. My desktop looks exactly how I want it to.`,
  },
  {
    id:'T04', date:'FEB 2026', tag:'MUSIC',
    title:'Hip-hop and software have the same energy',
    preview:'Both are about taking something that exists — a sample, a library — and transforming it into something that feels completely yours.',
    body:`Both are about taking something that exists — a sample, a library — and transforming it into something that feels completely yours. The craft is in the remix.

J Dilla didn't invent the drum machine. He invented a way of playing it that felt drunk and human and loose in a way no one had done before. That's not about the tool. That's about what you bring to it.

React didn't invent component-based UI. But the way you compose it, the decisions you make about state, the abstractions you choose — that's your voice. Two developers given the same stack will build completely different things, and one of them will feel right and the other won't.

I listen to a lot of hip-hop while coding. Not because it's good background noise (it is) but because it's a reminder that technical mastery and creative identity can coexist. You can know all the theory and still sound like you.

MF DOOM knew his references. He just made them his.`,
  },
  {
    id:'T05', date:'FEB 2026', tag:'LIFE',
    title:'Surat is underrated',
    preview:'Everyone leaves for Bangalore or the US. But there\'s something about building here, away from the noise.',
    body:`Everyone leaves for Bangalore or the US. But there's something about building here, away from the noise. Lower cost, lower distraction, same internet speed.

Surat is a city that moves fast but doesn't talk about it. No startup scene, no networking events, no VCs at coffee shops. Just work. If you're building something here, you're building it because you want to build it — not because you're surrounded by people who make it feel inevitable.

I think that's actually healthy. The best ideas I've had came when I wasn't surrounded by other people's ideas. There's a clarity you get from a place that isn't optimized for the thing you're trying to do.

Also the food is genuinely incredible and I will die on this hill. The dhokla alone is worth the geographical obscurity.

If you're a developer in a Tier 2 city feeling like you're missing out — you might be. Or you might just be building in a lower-noise environment than you realize. Both are true. Use it.`,
  },
]

const LORE = [
  `Vishwesh Mashruwala. 23. CS grad from San Jose State, December 2025. Currently back in Surat helping run the family embroidery business while building my own thing on the side.`,
  `I write code, break things, fix things. Full-stack mostly — Next.js, React, TypeScript. Also been getting into Unity and Blender. Game dev is the long-term thing.`,
  `The embroidery work is genuinely interesting actually. Running inventory systems for it, learning how physical manufacturing works. It's just engineering with thread.`,
  `Into hip-hop, basketball, lofi, anime. Pixel art occasionally. I like things that are made with taste, whatever the medium.`,
  `Not looking to relocate right now. Available for freelance. Respond fast, ship faster.`,
]

const GALLERY = [
  { id:'01', title:'RETROWAVE VAULT',  type:'CONCEPT',    year:'2025', desc:'Curated marketplace for retro & lofi digital art.',                color:R },
  { id:'02', title:'PIXEL RPG FOLIO',  type:'WEB',        year:'2024', desc:'Gamified pixel-art portfolio. Framer Motion + CSS sprites.',        color:'#C9A84C' },
  { id:'03', title:'DICOM VIEWER',     type:'3D / UNITY', year:'2024', desc:'Medical surface reconstruction using Marching Cubes on DICOM data.',color:'#67E8F9' },
  { id:'04', title:'GENE PREDICTOR',   type:'BIO / ML',   year:'2023', desc:'HMM-based prokaryotic gene prediction. Bio meets software.',        color:'#4ADE80' },
  { id:'05', title:'CAL HACKS BUILD',  type:'HACKATHON',  year:'2023', desc:'24-hour build at UC Berkeley. Shipped live, sleep-deprived.',       color:'#A78BFA' },
  { id:'06', title:'TREEHACKS BUILD',  type:'HACKATHON',  year:'2023', desc:'Stanford hackathon. React + Node.js built in one weekend.',         color:'#FB923C' },
]

const TERMINAL_LINES = [
  { d:0,    t:'> SYSTEM BOOT — PORTFOLIO v3.0', c:R },
  { d:350,  t:'> AGENT: VISHWESH MASHRUWALA',   c:W },
  { d:700,  t:'> LOCATION: SURAT, INDIA',        c:W },
  { d:1050, t:'> STATUS: AVAILABLE FOR HIRE',    c:'#4ADE80' },
  { d:1500, t:'',                                 c:W },
  { d:1500, t:"  you weren't here",              c:'rgba(255,255,255,0.5)' },
  { d:2100, t:'  i really miss you',             c:'rgba(255,255,255,0.35)' },
  { d:2700, t:'',                                 c:W },
  { d:2700, t:'> DEPLOYING INTERFACE...',        c:R },
]

// ── utils ─────────────────────────────────────────────────────────────────────
function B4({ size=12, color=R, op=0.6 }: { size?:number; color?:string; op?:number }) {
  const cs = (p:string):React.CSSProperties => {
    const base:React.CSSProperties={position:'absolute',width:size,height:size,borderColor:color,borderStyle:'solid',opacity:op}
    if(p==='tl') return{...base,top:0,left:0,borderWidth:'2px 0 0 2px'}
    if(p==='tr') return{...base,top:0,right:0,borderWidth:'2px 2px 0 0'}
    if(p==='bl') return{...base,bottom:0,left:0,borderWidth:'0 0 2px 2px'}
    return{...base,bottom:0,right:0,borderWidth:'0 2px 2px 0'}
  }
  return <><div style={cs('tl')}/><div style={cs('tr')}/><div style={cs('bl')}/><div style={cs('br')}/></>
}

function RGBSplit({ children, intensity=3 }: { children:React.ReactNode; intensity?:number }) {
  const [g,setG]=useState(false)
  useEffect(()=>{
    const go=()=>{setG(true);setTimeout(()=>setG(false),55+Math.random()*80)}
    const sc=()=>setTimeout(()=>{go();sc()},600+Math.random()*1800)
    sc()
  },[])
  if(!g) return <>{children}</>
  const ox=(Math.random()-0.5)*intensity*2,oy=(Math.random()-0.5)*intensity
  return(
    <div className="relative" style={{display:'inline-block'}}>
      <div style={{position:'absolute',inset:0,color:'#F00',mixBlendMode:'screen',transform:`translate(${ox}px,${oy}px)`,pointerEvents:'none',opacity:0.65}}>{children}</div>
      <div style={{position:'absolute',inset:0,color:'#0FF',mixBlendMode:'screen',transform:`translate(${-ox}px,${-oy}px)`,pointerEvents:'none',opacity:0.65}}>{children}</div>
      <div style={{position:'relative'}}>{children}</div>
    </div>
  )
}

function GlitchOverlay() {
  const [bars,setBars]=useState<{y:number;h:number;op:number}[]>([])
  useEffect(()=>{
    const id=setInterval(()=>{
      if(Math.random()>0.7){
        setBars(Array.from({length:Math.ceil(Math.random()*3)},()=>({y:Math.random()*100,h:0.3+Math.random()*1.8,op:0.07+Math.random()*0.18})))
        setTimeout(()=>setBars([]),55+Math.random()*90)
      }
    },280)
    return()=>clearInterval(id)
  },[])
  return(
    <div className="fixed inset-0 pointer-events-none z-30">
      {bars.map((b,i)=>(
        <div key={i} className="absolute left-0 right-0"
          style={{top:`${b.y}%`,height:`${b.h}%`,background:R,opacity:b.op,mixBlendMode:'screen',transform:`translateX(${(Math.random()-0.5)*20}px)`}}/>
      ))}
      <div className="absolute inset-0" style={{backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)'}}/>
    </div>
  )
}

// ── Intro ─────────────────────────────────────────────────────────────────────
function VHSStatic({opacity=1}:{opacity?:number}){
  const ref=useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    const c=ref.current;if(!c)return
    const ctx=c.getContext('2d')!;let raf:number
    const draw=()=>{
      c.width=window.innerWidth;c.height=window.innerHeight
      const img=ctx.createImageData(c.width,c.height);const d=img.data
      for(let i=0;i<d.length;i+=4){const v=Math.random()>0.5?255:0;d[i]=v;d[i+1]=v;d[i+2]=v;d[i+3]=Math.random()*75}
      for(let y=0;y<c.height;y++)if(Math.random()>0.97){const off=Math.floor(Math.random()*40)-20;for(let x=0;x<c.width;x++){const si=(y*c.width+x)*4;const di=(y*c.width+Math.min(c.width-1,Math.max(0,x+off)))*4;d[di]=d[si];d[di+1]=d[si+1];d[di+2]=d[si+2]}}
      ctx.putImageData(img,0,0);raf=requestAnimationFrame(draw)
    }
    draw();return()=>cancelAnimationFrame(raf)
  },[])
  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" style={{opacity}}/>
}

function SpeedLines({active}:{active:boolean}){
  if(!active)return null
  return(
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
        {Array.from({length:80}).map((_,i)=>{
          const a=(i/80)*Math.PI*2
          return(<motion.line key={i} x1={640} y1={360} x2={640+Math.cos(a)*1400} y2={360+Math.sin(a)*1400}
            stroke={i%5===0?R:W} strokeWidth={0.5+Math.random()*2}
            initial={{opacity:0,pathLength:0}} animate={{opacity:[0,0.9,0],pathLength:[0,1]}}
            transition={{duration:0.5,delay:i*0.004,ease:'easeOut'}}/>)
        })}
      </svg>
    </div>
  )
}

function IntroSequence({onDone}:{onDone:()=>void}){
  const [s,setS]=useState(0)
  useEffect(()=>{
    setTimeout(()=>setS(1),300);setTimeout(()=>setS(2),1100)
    setTimeout(()=>setS(3),1700);setTimeout(()=>setS(4),1900)
    setTimeout(()=>setS(5),3200);setTimeout(onDone,3600)
  },[onDone])
  return(
    <div className="fixed inset-0 z-[100] overflow-hidden" style={{background:B}}>
      {s>=1&&s<3&&<VHSStatic opacity={s===2?0.3:0.8}/>}
      {s===2&&(
        <motion.div className="absolute inset-0 pointer-events-none z-50" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
            {['M640,360 L820,180','M640,360 L900,420','M640,360 L500,100','M640,360 L300,300','M640,360 L720,600','M640,360 L1100,280','M640,360 L200,500'].map((d,i)=>(
              <motion.path key={i} d={d} stroke={i<3?R:W} strokeWidth={i<3?2:1} fill="none"
                initial={{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:[0,1,0.6]}}
                transition={{duration:0.25,delay:i*0.025}}/>
            ))}
            <motion.circle cx="640" cy="360" r="8" fill={R} initial={{scale:0,opacity:0}} animate={{scale:[0,3,1],opacity:[0,1,0.8]}} transition={{duration:0.3}}/>
          </svg>
        </motion.div>
      )}
      {s===3&&<motion.div className="absolute inset-0 z-[60] pointer-events-none" style={{background:W}} initial={{opacity:1}} animate={{opacity:0}} transition={{duration:0.4}}/>}
      {s===4&&(
        <motion.div className="absolute inset-0 z-40 flex items-center justify-center" initial={{opacity:0}} animate={{opacity:1}}>
          <div className="absolute inset-0" style={{background:'rgba(10,9,9,0.9)'}}/>
          <SpeedLines active/>
          <div className="relative z-10 text-center">
            <motion.div initial={{scale:2.2,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.35,ease:[0.16,1,0.3,1]}}
              style={{fontFamily:'var(--font-display)',fontSize:'clamp(80px,18vw,200px)',color:W,lineHeight:0.88,letterSpacing:'0.04em',textShadow:`6px 0 ${R},-6px 0 ${R},0 0 80px ${R}88`}}>
              VISHWESH
            </motion.div>
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
              style={{fontFamily:'var(--font-mono)',fontSize:'clamp(14px,2vw,20px)',color:R,letterSpacing:'0.5em',marginTop:10}}>
              MASHRUWALA
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.18}}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <div style={{width:40,height:1,background:R}}/>
              <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:R,letterSpacing:'0.4em'}}>FREEZE FRAME</span>
              <div style={{width:40,height:1,background:R}}/>
            </motion.div>
          </div>
        </motion.div>
      )}
      {s===1&&<>
        <motion.div className="absolute left-0 right-0 h-1 pointer-events-none z-20" style={{background:R,opacity:0.7}} animate={{top:['0%','100%','0%']}} transition={{duration:0.4,repeat:Infinity,ease:'linear'}}/>
        <div className="absolute bottom-8 left-8" style={{fontFamily:'var(--font-mono)',fontSize:13,color:R,opacity:0.8}}>
          <motion.div animate={{opacity:[1,0,1]}} transition={{duration:0.3,repeat:Infinity}}>LOADING AGENT...</motion.div>
        </div>
      </>}
      {s===5&&<motion.div className="absolute inset-0 z-50" style={{background:B}} initial={{opacity:1}} animate={{opacity:0}} transition={{duration:0.4}}/>}
    </div>
  )
}

// ── NAV ───────────────────────────────────────────────────────────────────────
const PANELS = ['AGENT','LORE','BUILD','THOUGHTS','GALLERY','CONTACT']

function Nav({panel,setPanel,thoughtId,setThoughtId}:{panel:string;setPanel:(p:string)=>void;thoughtId:string|null;setThoughtId:(id:string|null)=>void}){
  const [menuOpen, setMenuOpen] = useState(false)
  const go = (p:string) => { setPanel(p); setThoughtId(null); setMenuOpen(false) }
  return(
    <>
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
        style={{background:`${B}CC`,backdropFilter:'blur(14px)',borderBottom:`1px solid ${DR}55`}}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={()=>go('AGENT')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M2 2L12 22L14 16L8 8Z" fill={R}/>
            <path d="M22 2L12 22L10 16L16 8Z" fill={W} opacity="0.9"/>
          </svg>
          <RGBSplit intensity={2}>
            <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:W,letterSpacing:'0.28em'}}>VISHWESH</span>
          </RGBSplit>
        </div>
        <div className="hidden md:flex gap-0.5">
          {PANELS.map((p,i)=>(
            <button key={p} onClick={()=>go(p)}
              style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.18em',padding:'7px 13px',
                background:panel===p&&!thoughtId?R:'transparent',
                color:panel===p&&!thoughtId?B:DIM,
                border:panel===p&&!thoughtId?`1px solid ${R}`:`1px solid rgba(255,255,255,0.08)`,
                clipPath:'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',cursor:'pointer',transition:'all 0.16s'}}>
              <span style={{opacity:0.5,marginRight:3}}>{String(i+1).padStart(2,'0')}_</span>{p}
            </button>
          ))}
        </div>
        <div className="hidden md:block" style={{fontFamily:'var(--font-mono)',fontSize:11,color:`${R}88`,letterSpacing:'0.2em'}}>SURAT // IND</div>
        <button className="md:hidden flex flex-col justify-center gap-1.5 p-1"
          onClick={()=>setMenuOpen(o=>!o)}
          style={{background:'transparent',border:'none',cursor:'pointer',width:32,height:32}}>
          <motion.div animate={{rotate:menuOpen?45:0,y:menuOpen?8:0}} transition={{duration:0.2}}
            style={{width:22,height:2,background:R,borderRadius:1}}/>
          <motion.div animate={{opacity:menuOpen?0:1}} transition={{duration:0.2}}
            style={{width:22,height:2,background:R,borderRadius:1}}/>
          <motion.div animate={{rotate:menuOpen?-45:0,y:menuOpen?-8:0}} transition={{duration:0.2}}
            style={{width:22,height:2,background:R,borderRadius:1}}/>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen&&(
          <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
            transition={{duration:0.2}}
            className="fixed left-0 right-0 z-40 md:hidden"
            style={{top:52,background:`${B}F8`,backdropFilter:'blur(14px)',borderBottom:`1px solid ${DR}55`}}>
            {PANELS.map((p,i)=>(
              <button key={p} onClick={()=>go(p)}
                className="w-full text-left flex items-center gap-3 px-5 py-4"
                style={{background:panel===p&&!thoughtId?`${R}18`:'transparent',
                  borderBottom:`1px solid ${DR}33`,
                  fontFamily:'var(--font-mono)',fontSize:13,letterSpacing:'0.2em',
                  color:panel===p&&!thoughtId?R:DIM,cursor:'pointer',border:'none',
                  borderBottomColor:`${DR}33`,borderBottomWidth:1,borderBottomStyle:'solid' as const}}>
                <span style={{color:R,opacity:0.5,fontSize:11}}>{String(i+1).padStart(2,'0')}_</span>
                {p}
                {panel===p&&!thoughtId&&<div className="ml-auto w-1.5 h-1.5 rounded-full" style={{background:R}}/>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


// ── WIDGETS ───────────────────────────────────────────────────────────────────
function Terminal(){
  const [lines,setLines]=useState<typeof TERMINAL_LINES>([])
  const [cur,setCur]=useState(true)
  const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    TERMINAL_LINES.forEach(l=>setTimeout(()=>{setLines(p=>[...p,l]);if(ref.current)ref.current.scrollTop=9999},l.d))
    const id=setInterval(()=>setCur(c=>!c),520);return()=>clearInterval(id)
  },[])
  return(
    <motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
      className="relative" style={{width:272,background:`${S}F5`,border:`1px solid ${DR}88`,backdropFilter:'blur(8px)'}}>
      <B4 size={9} color={R} op={0.55}/>
      <div className="flex items-center gap-2 px-3 py-2" style={{borderBottom:`1px solid ${DR}55`}}>
        <div className="flex gap-1.5">{['#FF5F57','#FFBD2E','#28C840'].map(c=><div key={c} className="w-2.5 h-2.5 rounded-full" style={{background:c,opacity:0.85}}/>)}</div>
        <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:DIM,letterSpacing:'0.18em'}}>TERMINAL — VISHWESH</span>
      </div>
      <div ref={ref} className="px-3 py-2.5" style={{maxHeight:155,overflowY:'hidden'}}>
        {lines.map((l,i)=><div key={i} style={{fontFamily:'var(--font-mono)',fontSize:12,lineHeight:1.85,color:l.c,whiteSpace:'pre'}}>{l.t}</div>)}
        <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:R}}>{cur?'▊':' '}</span>
      </div>
    </motion.div>
  )
}

function NowPlaying(){
  const [tick,setTick]=useState(0)
  useEffect(()=>{const id=setInterval(()=>setTick(t=>t+1),280);return()=>clearInterval(id)},[])
  const heights=[12,22,16,26,10,20,14,24,12,20]
  return(
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
      className="relative px-4 py-3" style={{background:`${S}F5`,border:`1px solid ${DR}88`,minWidth:210,backdropFilter:'blur(8px)'}}>
      <B4 size={9} color={R} op={0.5}/>
      <div className="flex items-center gap-2 mb-3">
        <motion.div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:R}}
          animate={{boxShadow:[`0 0 4px ${R}`,`0 0 14px ${R}`,`0 0 4px ${R}`]}}
          transition={{duration:1,repeat:Infinity}}/>
        <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:R,letterSpacing:'0.28em'}}>NOW PLAYING</span>
      </div>
      <div style={{fontFamily:'var(--font-mono)',fontSize:15,color:W,marginBottom:2,letterSpacing:'0.04em'}}>you weren't here</div>
      <div style={{fontFamily:'var(--font-mono)',fontSize:12,color:DIM,marginBottom:12}}>i really miss you</div>
      <div className="flex items-end gap-0.5" style={{height:32}}>
        {heights.map((h,i)=>{
          const a=Math.max(4,h+Math.sin((tick+i)*1.4)*8)
          return <motion.div key={i} animate={{height:a}} transition={{duration:0.25}}
            style={{width:6,background:i%3===0?R:`${DR}CC`,borderRadius:1}}/>
        })}
      </div>
    </motion.div>
  )
}

function Minimap(){
  const [ping,setPing]=useState(true)
  useEffect(()=>{const id=setInterval(()=>setPing(p=>!p),1800);return()=>clearInterval(id)},[])
  return(
    <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.45}}
      className="relative" style={{width:185,background:`${S}F5`,border:`1px solid ${DR}88`,backdropFilter:'blur(8px)'}}>
      <B4 size={9} color={R} op={0.5}/>
      <div className="flex items-center gap-2 px-3 py-2" style={{borderBottom:`1px solid ${DR}55`}}>
        <div className="w-2 h-2 rotate-45 flex-shrink-0" style={{background:R}}/>
        <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:R,letterSpacing:'0.28em'}}>LOCATION</span>
      </div>
      <div className="relative mx-3 my-2" style={{height:82,background:`${R}08`,border:`1px solid ${DR}44`}}>
        {[25,50,75].map(p=>(
          <div key={p}>
            <div className="absolute top-0 bottom-0" style={{left:`${p}%`,width:1,background:`${DR}44`}}/>
            <div className="absolute left-0 right-0" style={{top:`${p}%`,height:1,background:`${DR}44`}}/>
          </div>
        ))}
        <div className="absolute" style={{left:'55%',top:'38%',transform:'translate(-50%,-50%)'}}>
          <motion.div animate={{scale:ping?[1,2.8,1]:1,opacity:ping?[0.8,0,0.8]:0.8}}
            transition={{duration:1.8,ease:'easeOut'}}
            className="absolute rounded-full"
            style={{width:22,height:22,border:`1px solid ${R}`,top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}/>
          <div className="w-2.5 h-2.5 rounded-full" style={{background:R,boxShadow:`0 0 10px ${R}`}}/>
        </div>
        <div className="absolute" style={{left:'55%',top:0,bottom:0,width:1,background:`${R}55`}}/>
        <div className="absolute" style={{top:'38%',left:0,right:0,height:1,background:`${R}55`}}/>
      </div>
      <div className="px-3 pb-2.5 flex justify-between items-center">
        <span style={{fontFamily:'var(--font-display)',fontSize:18,color:W,letterSpacing:'0.08em'}}>SURAT</span>
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:DIM}}>21.2°N</span>
      </div>
    </motion.div>
  )
}

function LoadoutWidget(){
  const [hov,setHov]=useState<number|null>(null)
  return(
    <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.5}}
      className="relative px-4 py-3" style={{background:`${S}F5`,border:`1px solid ${DR}88`,minWidth:220,backdropFilter:'blur(8px)'}}>
      <B4 size={9} color={R} op={0.5}/>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rotate-45 flex-shrink-0" style={{background:R}}/>
        <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:R,letterSpacing:'0.28em'}}>LOADOUT</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {LOADOUT.map((s,i)=>(
          <div key={s.name} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            className="flex items-center gap-2.5 cursor-default transition-all duration-150"
            style={{opacity:hov===null||hov===i?1:0.4}}>
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0"
              style={{background:s.tier==='S'?R:s.tier==='A'?`${DR}CC`:`${DR}77`,
                fontFamily:'var(--font-mono)',fontSize:10,color:W,fontWeight:'bold'}}>
              {s.tier}
            </div>
            <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:hov===i?W:DIM,
              letterSpacing:'0.1em',flex:1,transition:'color 0.15s'}}>
              {s.name}
            </span>
            <div style={{width:48,height:2,background:`${DR}44`}}>
              <motion.div initial={{width:0}} animate={{width:`${s.power}%`}}
                transition={{delay:0.6+i*0.06,duration:0.9,ease:[0.16,1,0.3,1]}}
                style={{height:'100%',background:hov===i?W:R}}/>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function RankCard(){
  return(
    <motion.div initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:0.4}}
      className="relative px-4 py-3" style={{background:`${S}F5`,border:`1px solid ${DR}88`,minWidth:200,backdropFilter:'blur(8px)'}}>
      <B4 size={9} color={R} op={0.5}/>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rotate-45 flex-shrink-0" style={{background:R}}/>
        <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:R,letterSpacing:'0.28em'}}>AGENT STATS</span>
      </div>
      <div className="flex items-center gap-3 mb-3 pb-3" style={{borderBottom:`1px solid ${DR}55`}}>
        <motion.div className="flex items-center justify-center w-12 h-12 rotate-45 flex-shrink-0"
          style={{background:`${DR}44`,border:`1.5px solid ${R}`}}
          animate={{boxShadow:[`0 0 8px ${R}40`,`0 0 24px ${R}80`,`0 0 8px ${R}40`]}}
          transition={{duration:2,repeat:Infinity}}>
          <div className="-rotate-45"><div style={{fontFamily:'var(--font-display)',fontSize:18,color:R,lineHeight:1}}>R</div></div>
        </motion.div>
        <div>
          <div style={{fontFamily:'var(--font-display)',fontSize:22,color:W,letterSpacing:'0.05em',lineHeight:1}}>RADIANT</div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:12,color:R,marginTop:2,opacity:0.75}}>+492 RR</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[{l:'AGE',v:'23'},{l:'PROJECTS',v:'4+'},{l:'LOCATION',v:'SRT'}].map(s=>(
          <div key={s.l} className="text-center">
            <div style={{fontFamily:'var(--font-display)',fontSize:22,color:W,lineHeight:1}}>{s.v}</div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:DIM,letterSpacing:'0.15em',marginTop:2}}>{s.l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function AbilityCross({active,setActive}:{active:number|null;setActive:(i:number|null)=>void}){
  return(
    <div className="grid grid-cols-2 gap-1" style={{width:122}}>
      {ABILITIES.map((ab,i)=>(
        <motion.div key={ab.key} whileHover={{scale:1.07}} whileTap={{scale:0.92}}
          onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)}
          className="relative flex flex-col items-center justify-center gap-1 cursor-pointer"
          style={{width:59,height:59,
            background:active===i?`${R}22`:`${S}EE`,
            border:`1px solid ${active===i?R:DR+'66'}`,
            boxShadow:active===i?`0 0 20px ${R}55`:'none',
            transition:'all 0.15s'}}>
          <div style={{color:active===i?R:DIM,lineHeight:1}}>
            {ab.key==='C'&&<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" stroke="currentColor" strokeWidth="1.5"/><rect x="6" y="6" width="6" height="6" fill="currentColor"/></svg>}
            {ab.key==='Q'&&<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><polygon points="9,2 16,14 2,14" stroke="currentColor" strokeWidth="1.5"/></svg>}
            {ab.key==='E'&&<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="9" r="2.5" fill="currentColor"/></svg>}
            {ab.key==='X'&&<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><path d="M9 2L11 7H16L12 10.5L13.5 16L9 13L4.5 16L6 10.5L2 7H7Z" stroke="currentColor" strokeWidth="1.3"/></svg>}
          </div>
          <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:active===i?R:DIM,letterSpacing:'0.12em'}}>{ab.key}</span>
          {ab.type==='ULTIMATE'&&<div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full" style={{background:'#FFD700',boxShadow:'0 0 8px #FFD700'}}/>}
        </motion.div>
      ))}
    </div>
  )
}

function AbilityCallout({ab}:{ab:typeof ABILITIES[0]|null}){
  return(
    <AnimatePresence mode="wait">
      {ab&&(
        <motion.div key={ab.key} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:4}}
          transition={{duration:0.18}}
          className="relative p-4" style={{background:W,width:248}}>
          <div className="absolute top-0 left-0 w-3 h-3" style={{borderTop:`2px solid ${B}`,borderLeft:`2px solid ${B}`}}/>
          <div style={{fontFamily:'var(--font-mono)',fontSize:12,color:R,letterSpacing:'0.18em',marginBottom:5}}>// {ab.key} — {ab.name} //</div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:11,color:'rgba(0,0,0,0.45)',letterSpacing:'0.2em',marginBottom:10}}>{ab.type}</div>
          <p style={{fontFamily:'var(--font-body)',fontSize:16,color:B,lineHeight:1.65,fontWeight:500}}>{ab.desc}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── AGENT PANEL ───────────────────────────────────────────────────────────────
function AgentPanel(){
  const [ab,setAb]=useState<number|null>(null)
  const isMobile = useIsMobile()
  const {x,y}=useParallax()
  const bgX=useTransform(x,v=>isMobile?0:v*-22),bgY=useTransform(y,v=>isMobile?0:v*-14)
  const artX=useTransform(x,v=>isMobile?0:v*-8),artY=useTransform(y,v=>isMobile?0:v*-5)
  const wLX=useTransform(x,v=>isMobile?0:v*14),wLY=useTransform(y,v=>isMobile?0:v*10)
  const wRX=useTransform(x,v=>isMobile?0:v*18),wRY=useTransform(y,v=>isMobile?0:v*12)
  const activeAb=ab!==null?ABILITIES[ab]:null
  const typed=useTypewriter(['CREATIVE DEVELOPER','FREELANCER','FULL-STACK ENG.','GAME DEV','3D ARTIST (learning)'])

  // ── MOBILE LAYOUT ──────────────────────────────────────────────────────────
  if(isMobile){
    return(
      <div className="relative w-full overflow-y-auto" style={{minHeight:'100svh',paddingTop:52}}>
        {/* Agent art as full-screen bg */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img src="/agent-art.png" alt="Agent"
            style={{position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',
              height:'85vh',width:'auto',objectFit:'contain',objectPosition:'bottom',
              filter:`drop-shadow(0 0 40px ${R}44)`,opacity:0.35}}/>
          <div style={{position:'absolute',inset:0,background:`linear-gradient(to bottom, ${B}EE 0%, ${B}88 40%, ${B}AA 70%, ${B}FF 100%)`}}/>
          <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse 80% 60% at 60% 50%, ${DR}22 0%, transparent 70%)`}}/>
        </div>

        {/* Content — scrollable column */}
        <div className="relative z-10 flex flex-col px-5 pt-6 pb-10 gap-5">

          {/* Role + typewriter */}
          <motion.div initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:0.1}} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div style={{width:20,height:20,border:`2px solid ${R}`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:10,height:10,background:R,transform:'rotate(45deg)'}}/>
              </div>
              <span style={{fontFamily:'var(--font-mono)',fontSize:13,color:W,letterSpacing:'0.25em'}}>DUELIST</span>
            </div>
            <div className="flex items-center gap-1 ml-7">
              <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:R,letterSpacing:'0.15em'}}>{typed}</span>
              <motion.span animate={{opacity:[1,0,1]}} transition={{duration:0.7,repeat:Infinity}}
                style={{fontFamily:'var(--font-mono)',fontSize:11,color:R}}>_</motion.span>
            </div>
          </motion.div>

          {/* Big name */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.2}}>
            <RGBSplit intensity={3}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(56px,16vw,80px)',
                color:W,lineHeight:0.88,letterSpacing:'0.02em',textShadow:`3px 0 ${R}55`}}>
                VISHWESH
              </div>
            </RGBSplit>
            <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(12px,4vw,18px)',
              color:'transparent',WebkitTextStroke:`1px ${W}28`,letterSpacing:'0.18em',marginTop:4}}>
              MASHRUWALA
            </div>
            <div style={{height:2,background:R,width:120,margin:'12px 0'}}/>
            <p style={{fontFamily:'var(--font-body)',fontSize:16,color:DIM,lineHeight:1.7,maxWidth:300}}>
              CS grad. Creative dev. Ships code and art from Surat, India.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="flex gap-3">
            <a href={`mailto:${EMAIL}`}
              style={{fontFamily:'var(--font-mono)',fontSize:12,letterSpacing:'0.18em',padding:'10px 20px',
                background:R,color:B,clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                textDecoration:'none',display:'inline-block'}}>HIRE ME</a>
            <a href="https://github.com/vishwesh-mashruwala" target="_blank" rel="noopener noreferrer"
              style={{fontFamily:'var(--font-mono)',fontSize:12,letterSpacing:'0.18em',padding:'10px 20px',
                color:DIM,border:`1px solid rgba(255,255,255,0.22)`,
                clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                textDecoration:'none',display:'inline-block'}}>GITHUB</a>
          </motion.div>

          {/* Rank card */}
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.6}}>
            <RankCard/>
          </motion.div>

          {/* Abilities */}
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.7}} className="flex flex-col gap-2">
            <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:R,letterSpacing:'0.25em'}}>ABILITIES</span>
            <div className="flex gap-2">
              <AbilityCross active={ab} setActive={setAb}/>
            </div>
            <AbilityCallout ab={activeAb}/>
          </motion.div>

          {/* Minimap + Now Playing side by side */}
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.8}} className="flex gap-3">
            <Minimap/>
            <NowPlaying/>
          </motion.div>

          {/* Loadout full width */}
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.9}}>
            <LoadoutWidget/>
          </motion.div>

          {/* Terminal */}
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1.0}}>
            <Terminal/>
          </motion.div>
        </div>
      </div>
    )
  }

  // ── DESKTOP LAYOUT (unchanged) ─────────────────────────────────────────────
  return(
    <div className="relative w-full h-full overflow-hidden">
      <motion.div style={{x:bgX,y:bgY}} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(100px,18vw,220px)',color:'transparent',
          WebkitTextStroke:`1.5px ${R}18`,lineHeight:1,letterSpacing:'0.06em',userSelect:'none',whiteSpace:'nowrap'}}>
          VISHWESH
        </div>
      </motion.div>
      <motion.div initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:0.1}}
        className="absolute flex flex-col gap-2 z-20" style={{top:82,left:48}}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center" style={{border:`2px solid ${R}`}}>
            <div className="w-3 h-3 rotate-45" style={{background:R}}/>
          </div>
          <span style={{fontFamily:'var(--font-mono)',fontSize:15,color:W,letterSpacing:'0.28em'}}>DUELIST</span>
        </div>
        <div className="flex items-center gap-2 ml-9">
          <span style={{fontFamily:'var(--font-mono)',fontSize:13,color:R,letterSpacing:'0.18em'}}>{typed}</span>
          <motion.span animate={{opacity:[1,0,1]}} transition={{duration:0.7,repeat:Infinity}}
            style={{fontFamily:'var(--font-mono)',fontSize:13,color:R}}>_</motion.span>
        </div>
      </motion.div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}}
        className="absolute z-20" style={{top:148,left:52,fontFamily:'var(--font-display)',fontSize:24,color:`${W}33`,letterSpacing:'0.1em'}}>
        01
      </motion.div>
      <motion.div style={{x:wLX,y:wLY}} className="absolute z-20">
        <div className="absolute flex flex-col justify-end" style={{bottom:44,left:48,maxWidth:360}}>
          <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.1,ease:[0.16,1,0.3,1]}}>
            <RGBSplit intensity={4}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(68px,9.5vw,108px)',
                color:W,lineHeight:0.9,letterSpacing:'0.02em',whiteSpace:'nowrap',textShadow:`4px 0 ${R}55`}}>
                VISHWESH
              </div>
            </RGBSplit>
            <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(15px,2.2vw,24px)',
              color:'transparent',WebkitTextStroke:`1px ${W}28`,letterSpacing:'0.18em',marginTop:6}}>
              MASHRUWALA
            </div>
          </motion.div>
          <motion.div initial={{width:0}} animate={{width:'200px'}} transition={{delay:0.5,duration:0.7}}
            style={{height:2,background:R,margin:'16px 0',flexShrink:0}}/>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}}
            style={{fontFamily:'var(--font-body)',fontSize:18,color:DIM,lineHeight:1.7,marginBottom:20}}>
            CS grad. Creative dev. Ships code<br/>and art from Surat, India.
          </motion.p>
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.9}} className="flex gap-3 flex-wrap">
            <a href={`mailto:${EMAIL}`}
              style={{fontFamily:'var(--font-mono)',fontSize:13,letterSpacing:'0.2em',padding:'10px 24px',
                background:R,color:B,clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                transition:'background 0.18s',cursor:'pointer',textDecoration:'none',display:'inline-block'}}
              onMouseEnter={e=>(e.currentTarget.style.background=W)}
              onMouseLeave={e=>(e.currentTarget.style.background=R)}>HIRE ME</a>
            <a href="https://github.com/vishwesh-mashruwala" target="_blank" rel="noopener noreferrer"
              style={{fontFamily:'var(--font-mono)',fontSize:13,letterSpacing:'0.2em',padding:'10px 24px',
                color:DIM,border:`1px solid rgba(255,255,255,0.22)`,
                clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                transition:'all 0.18s',cursor:'pointer',textDecoration:'none',display:'inline-block'}}
              onMouseEnter={e=>{e.currentTarget.style.color=W;e.currentTarget.style.borderColor='rgba(255,255,255,0.6)'}}
              onMouseLeave={e=>{e.currentTarget.style.color=DIM;e.currentTarget.style.borderColor='rgba(255,255,255,0.22)'}}>GITHUB</a>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none">
        <motion.div style={{x:artX,y:artY}} initial={{opacity:0,y:40,scale:1.08}} animate={{opacity:1,y:0,scale:1}}
          transition={{duration:1.2,ease:[0.16,1,0.3,1]}}>
          <div style={{height:'96vh',display:'flex',alignItems:'flex-end',justifyContent:'center',position:'relative'}}>
            <svg viewBox="0 0 400 600" fill="none" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              <line x1="28" y1="380" x2="120" y2="345" stroke={R} strokeWidth="2" opacity="0.35"/>
              <line x1="16" y1="402" x2="105" y2="370" stroke={R} strokeWidth="1.2" opacity="0.2"/>
              <line x1="374" y1="380" x2="280" y2="345" stroke={R} strokeWidth="1.6" opacity="0.25"/>
            </svg>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{width:320,height:55,background:`radial-gradient(ellipse at bottom, ${R}66 0%, transparent 70%)`}}/>
            <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
              style={{width:220,height:5,background:R,filter:'blur(10px)'}}
              animate={{opacity:[0.4,1,0.4],scaleX:[0.8,1.2,0.8]}}
              transition={{duration:2,repeat:Infinity,ease:'easeInOut'}}/>
            <img src="/agent-art.png" alt="Agent" className="relative z-10 w-auto object-contain object-bottom"
              style={{height:'100%',maxHeight:'100%',filter:`drop-shadow(-10px 0 36px ${R}35) drop-shadow(10px 0 36px ${B}DD)`}}/>
          </div>
        </motion.div>
      </div>
      <motion.div style={{x:wRX,y:wRY}} className="absolute z-20">
        <div className="absolute" style={{top:78,right:44}}><Terminal/></div>
      </motion.div>
      <div className="absolute z-20 flex flex-col gap-3" style={{right:44,top:'52%',transform:'translateY(-50%)'}}>
        <AbilityCross active={ab} setActive={setAb}/>
        <AbilityCallout ab={activeAb}/>
      </div>
      <div className="absolute z-20" style={{top:'50%',left:44,transform:'translateY(-50%)'}}><RankCard/></div>
      <div className="absolute z-20 flex gap-3 items-end" style={{bottom:36,left:'50%',transform:'translateX(-50%)'}}>
        <Minimap/><NowPlaying/><LoadoutWidget/>
      </div>
      {[{l:'3.5%',t:'28%'},{l:'3.5%',t:'60%'},{l:'3.5%',t:'82%'},{r:'2.8%',t:'32%'},{r:'2.8%',t:'62%'},{r:'2.8%',t:'85%'}].map((d,i)=>(
        <div key={i} className="absolute" style={{left:(d as any).l,right:(d as any).r,top:d.t,width:6,height:6,background:R,opacity:0.45}}/>
      ))}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}} className="absolute z-20"
        style={{right:14,bottom:'28%',fontFamily:'var(--font-mono)',fontSize:12,color:`${R}33`,letterSpacing:'0.5em',writingMode:'vertical-rl',transform:'rotate(180deg)'}}>
        VISHWESH
      </motion.div>
    </div>
  )
}

// ── LORE PANEL ────────────────────────────────────────────────────────────────
function LorePanel(){
  const {x,y}=useParallax()
  const bgX=useTransform(x,v=>v*-30),bgY=useTransform(y,v=>v*-20)
  const tX=useTransform(x,v=>v*8),tY=useTransform(y,v=>v*5)
  return(
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center pt-16">
      <motion.div style={{x:bgX,y:bgY}} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span style={{fontFamily:'var(--font-display)',fontSize:'clamp(80px,16vw,200px)',color:'transparent',WebkitTextStroke:`1px ${R}0F`,userSelect:'none',whiteSpace:'nowrap'}}>LORE</span>
      </motion.div>
      <div className="relative z-10 max-w-3xl w-full px-12 py-8 overflow-y-auto" style={{maxHeight:'calc(100vh - 80px)'}}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-6 h-6 flex items-center justify-center" style={{border:`2px solid ${R}`}}><div className="w-3 h-3 rotate-45" style={{background:R}}/></div>
            <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:R,letterSpacing:'0.35em'}}>CLASSIFIED DOSSIER // AGENT 01</span>
          </div>
          <RGBSplit intensity={3}><h2 style={{fontFamily:'var(--font-display)',fontSize:'clamp(52px,8vw,96px)',color:W,lineHeight:0.9,letterSpacing:'0.02em'}}>AGENT LORE</h2></RGBSplit>
        </motion.div>
        <motion.div style={{x:tX,y:tY}} className="space-y-6">
          {LORE.map((p,i)=>(
            <motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.12+0.3}}
              className="relative pl-6" style={{borderLeft:`2px solid ${i===LORE.length-1?R:DR+'88'}`}}>
              <p style={{fontFamily:'var(--font-body)',fontSize:19,color:i===LORE.length-1?W:DIM,lineHeight:1.75}}>{p}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.9}} className="mt-10 grid grid-cols-4 gap-4">
          {[{l:'THREAT LEVEL',v:'RADIANT'},{l:'ORIGIN',v:'SURAT'},{l:'SPECIALTY',v:'FULL-STACK'},{l:'CLEARANCE',v:'LEVEL 9'}].map(s=>(
            <div key={s.l} className="relative p-4" style={{border:`1px solid ${DR}66`,background:`${R}08`}}>
              <B4 size={9} color={R} op={0.35}/>
              <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:R,letterSpacing:'0.2em',marginBottom:5,opacity:0.75}}>{s.l}</div>
              <div style={{fontFamily:'var(--font-display)',fontSize:20,color:W,letterSpacing:'0.05em'}}>{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ── BUILD BOARD ───────────────────────────────────────────────────────────────
const TAG_COLORS: Record<string,string> = {
  WEB:'#00B4D4', ART:'#A78BFA', GAME:'#4ADE80', ELEC:'#FBBF24', CAREER:R, SYS:'#FB923C'
}
function BuildCard({item,delay}:{item:typeof BUILD_BOARD.doing[0];delay:number}){
  const [hov,setHov]=useState(false)
  return(
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="relative p-4 cursor-default transition-all duration-200"
      style={{background:hov?`${R}0D`:`${S}CC`,border:`1px solid ${hov?R:DR}55`,marginBottom:10}}>
      <B4 size={8} color={R} op={hov?0.5:0.2}/>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:DIM,letterSpacing:'0.15em'}}>{item.id}</span>
        <div className="flex items-center gap-2">
          {item.hot&&<motion.div className="w-2 h-2 rounded-full" style={{background:R,boxShadow:`0 0 6px ${R}`}} animate={{opacity:[1,0.3,1]}} transition={{duration:1,repeat:Infinity}}/>}
          <span style={{fontFamily:'var(--font-mono)',fontSize:9,padding:'2px 8px',background:`${TAG_COLORS[item.tag]||R}22`,color:TAG_COLORS[item.tag]||R,letterSpacing:'0.1em'}}>{item.tag}</span>
        </div>
      </div>
      <div style={{fontFamily:'var(--font-display)',fontSize:18,color:W,letterSpacing:'0.04em',lineHeight:1.1,marginBottom:5}}>{item.title}</div>
      <p style={{fontFamily:'var(--font-body)',fontSize:15,color:DIM,lineHeight:1.55}}>{item.desc}</p>
    </motion.div>
  )
}
function BuildPanel(){
  const {x,y}=useParallax()
  const bgX=useTransform(x,v=>v*-28),bgY=useTransform(y,v=>v*-18)
  const cols=[
    {label:'IN PROGRESS',key:'doing',  color:R,  items:BUILD_BOARD.doing},
    {label:'PLANNED',    key:'planned',color:'#00B4D4',items:BUILD_BOARD.planned},
    {label:'SHIPPED',    key:'shipped',color:DIM,items:BUILD_BOARD.shipped},
  ]
  return(
    <div className="relative w-full h-full overflow-hidden pt-16">
      <motion.div style={{x:bgX,y:bgY}} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span style={{fontFamily:'var(--font-display)',fontSize:'clamp(80px,16vw,200px)',color:'transparent',WebkitTextStroke:`1px ${R}0C`,userSelect:'none',whiteSpace:'nowrap'}}>BUILD</span>
      </motion.div>
      <div className="relative z-10 h-full flex flex-col px-10 py-6 overflow-y-auto" style={{maxHeight:'calc(100vh - 64px)'}}>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="mb-6">
          <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:R,letterSpacing:'0.35em'}}>// CURRENTLY BUILDING //</span>
          <RGBSplit intensity={3}><h2 style={{fontFamily:'var(--font-display)',fontSize:'clamp(48px,7vw,88px)',color:W,lineHeight:0.9,letterSpacing:'0.02em',marginTop:4}}>BUILD BOARD</h2></RGBSplit>
        </motion.div>
        <div className="grid grid-cols-3 gap-4">
          {cols.map((col,ci)=>(
            <div key={col.key}>
              <div className="flex items-center gap-2 mb-4 pb-2" style={{borderBottom:`2px solid ${col.color}55`}}>
                <div className="w-2.5 h-2.5 rotate-45 flex-shrink-0" style={{background:col.color}}/>
                <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:col.color,letterSpacing:'0.25em'}}>{col.label}</span>
                <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:DIM,marginLeft:'auto'}}>{col.items.length}</span>
              </div>
              {col.items.map((item,ii)=><BuildCard key={item.id} item={item} delay={ci*0.06+ii*0.08+0.2}/>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── THOUGHTS ─────────────────────────────────────────────────────────────────
const TAG_C: Record<string,string> = {CRAFT:R,DESIGN:'#A78BFA',TECH:'#00B4D4',MUSIC:'#FBBF24',LIFE:'#4ADE80'}

function ThoughtPage({thought,onBack}:{thought:typeof THOUGHTS[0];onBack:()=>void}){
  const {x,y}=useParallax()
  const bgX=useTransform(x,v=>v*-20),bgY=useTransform(y,v=>v*-12)
  return(
    <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}
      transition={{duration:0.4,ease:[0.16,1,0.3,1]}}
      className="relative w-full h-full overflow-hidden pt-16">
      <motion.div style={{x:bgX,y:bgY}} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span style={{fontFamily:'var(--font-display)',fontSize:'clamp(60px,12vw,160px)',color:'transparent',
          WebkitTextStroke:`1px ${R}0A`,userSelect:'none',textAlign:'center',lineHeight:1}}>
          {thought.tag}
        </span>
      </motion.div>
      <div className="relative z-10 max-w-2xl mx-auto px-12 py-8 overflow-y-auto" style={{maxHeight:'calc(100vh - 80px)'}}>
        {/* Back button */}
        <button onClick={onBack} className="flex items-center gap-2 mb-8 transition-all duration-200"
          style={{fontFamily:'var(--font-mono)',fontSize:12,color:DIM,letterSpacing:'0.2em',background:'transparent',border:'none',cursor:'pointer'}}
          onMouseEnter={e=>e.currentTarget.style.color=R}
          onMouseLeave={e=>e.currentTarget.style.color=DIM}>
          ← BACK TO THOUGHTS
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:DIM,letterSpacing:'0.2em'}}>{thought.date}</span>
          <span style={{fontFamily:'var(--font-mono)',fontSize:10,padding:'3px 10px',
            background:`${TAG_C[thought.tag]||R}22`,color:TAG_C[thought.tag]||R,letterSpacing:'0.15em'}}>
            {thought.tag}
          </span>
        </div>
        <RGBSplit intensity={2}>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(36px,6vw,72px)',color:W,lineHeight:0.95,letterSpacing:'0.02em',marginBottom:20}}>
            {thought.title}
          </h1>
        </RGBSplit>
        <div style={{height:2,background:`linear-gradient(to right, ${R}, transparent)`,marginBottom:28,width:120}}/>

        {/* Body */}
        {thought.body.split('\n\n').map((para,i)=>(
          <motion.p key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.1+0.2}}
            style={{fontFamily:'var(--font-body)',fontSize:19,color:i===0?W:DIM,lineHeight:1.8,marginBottom:22}}>
            {para}
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}

function ThoughtsPanel({onOpenThought}:{onOpenThought:(id:string)=>void}){
  const {x,y}=useParallax()
  const bgX=useTransform(x,v=>v*-25),bgY=useTransform(y,v=>v*-16)
  return(
    <div className="relative w-full h-full overflow-hidden pt-16">
      <motion.div style={{x:bgX,y:bgY}} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span style={{fontFamily:'var(--font-display)',fontSize:'clamp(80px,16vw,200px)',color:'transparent',WebkitTextStroke:`1px ${R}0C`,userSelect:'none',whiteSpace:'nowrap'}}>THOUGHTS</span>
      </motion.div>
      <div className="relative z-10 h-full flex flex-col px-10 py-6 overflow-y-auto" style={{maxHeight:'calc(100vh - 64px)'}}>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="mb-6">
          <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:R,letterSpacing:'0.35em'}}>// TAKES & OPINIONS //</span>
          <RGBSplit intensity={3}><h2 style={{fontFamily:'var(--font-display)',fontSize:'clamp(48px,7vw,88px)',color:W,lineHeight:0.9,letterSpacing:'0.02em',marginTop:4}}>THOUGHTS</h2></RGBSplit>
        </motion.div>
        <div className="flex flex-col gap-2">
          {THOUGHTS.map((t,i)=>(
            <motion.button key={t.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.08+0.2}}
              onClick={()=>onOpenThought(t.id)}
              className="w-full text-left transition-all duration-200"
              style={{background:`${S}BB`,border:`1px solid ${DR}55`,padding:'18px 22px',cursor:'pointer'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=`${R}0D`;(e.currentTarget as HTMLElement).style.borderColor=R}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background=`${S}BB`;(e.currentTarget as HTMLElement).style.borderColor=`${DR}55`}}>
              <div className="flex items-center gap-5">
                <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:DIM,letterSpacing:'0.15em',minWidth:80}}>{t.date}</span>
                <div style={{fontFamily:'var(--font-display)',fontSize:22,color:W,letterSpacing:'0.04em',lineHeight:1,flex:1}}>{t.title}</div>
                <span style={{fontFamily:'var(--font-mono)',fontSize:10,padding:'3px 10px',
                  background:`${TAG_C[t.tag]||R}22`,color:TAG_C[t.tag]||R,letterSpacing:'0.12em',flexShrink:0}}>
                  {t.tag}
                </span>
                <span style={{color:R,fontSize:20,flexShrink:0}}>→</span>
              </div>
              <p style={{fontFamily:'var(--font-body)',fontSize:15,color:DIM,marginTop:8,lineHeight:1.6,paddingLeft:0}}>{t.preview}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── GALLERY ───────────────────────────────────────────────────────────────────
function GalleryPanel(){
  const [active,setActive]=useState<number|null>(null)
  const {x,y}=useParallax()
  const bgX=useTransform(x,v=>v*-25),bgY=useTransform(y,v=>v*-16)
  return(
    <div className="relative w-full h-full overflow-hidden pt-16">
      <motion.div style={{x:bgX,y:bgY}} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span style={{fontFamily:'var(--font-display)',fontSize:'clamp(80px,16vw,200px)',color:'transparent',WebkitTextStroke:`1px ${R}0C`,userSelect:'none',whiteSpace:'nowrap'}}>GALLERY</span>
      </motion.div>
      <div className="relative z-10 h-full flex flex-col px-10 py-6 overflow-y-auto" style={{maxHeight:'calc(100vh - 64px)'}}>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="mb-6 flex items-end justify-between">
          <div>
            <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:R,letterSpacing:'0.35em'}}>// CREATIVE WORKS //</span>
            <RGBSplit intensity={3}><h2 style={{fontFamily:'var(--font-display)',fontSize:'clamp(48px,7vw,88px)',color:W,lineHeight:0.9,letterSpacing:'0.02em',marginTop:4}}>GALLERY</h2></RGBSplit>
          </div>
          <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:DIM,letterSpacing:'0.15em'}}>HOVER TO INSPECT</span>
        </motion.div>
        <div className="grid grid-cols-3 gap-3">
          {GALLERY.map((item,i)=>(
            <motion.div key={item.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07+0.2}}
              onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)}
              className="relative cursor-pointer overflow-hidden"
              style={{aspectRatio:'4/3',border:`1px solid ${active===i?item.color:DR}55`,background:`${S}AA`,transition:'border-color 0.2s'}}>
              <B4 size={10} color={active===i?item.color:R} op={active===i?0.7:0.25}/>
              <motion.div className="absolute inset-0" animate={{opacity:active===i?0.1:0}} transition={{duration:0.2}} style={{background:item.color}}/>
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex items-start justify-between">
                  <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:active===i?item.color:DIM,letterSpacing:'0.2em',transition:'color 0.2s'}}>{item.id}</span>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:10,padding:'3px 10px',border:`1px solid ${item.color}55`,color:item.color,letterSpacing:'0.15em'}}>{item.type}</span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <motion.div animate={{scale:active===i?1.15:1,opacity:active===i?1:0.3}} transition={{duration:0.25}}
                    style={{width:52,height:52,border:`1px solid ${item.color}`,display:'flex',alignItems:'center',justifyContent:'center',transform:'rotate(45deg)'}}>
                    <div style={{transform:'rotate(-45deg)',fontFamily:'var(--font-display)',fontSize:22,color:item.color}}>{item.id}</div>
                  </motion.div>
                </div>
                <div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:20,color:active===i?item.color:W,letterSpacing:'0.04em',lineHeight:1,transition:'color 0.2s',marginBottom:5}}>{item.title}</div>
                  <AnimatePresence>
                    {active===i&&(
                      <motion.p initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
                        style={{fontFamily:'var(--font-body)',fontSize:14,color:DIM,lineHeight:1.5,overflow:'hidden'}}>
                        {item.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:DIM,letterSpacing:'0.2em',marginTop:5}}>{item.year}</div>
                </div>
              </div>
              <motion.div animate={{opacity:active===i?1:0}} transition={{duration:0.2}}
                className="absolute bottom-0 left-0 right-0 h-0.5" style={{background:item.color,boxShadow:`0 0 12px ${item.color}`}}/>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function ContactPanel(){
  const {x,y}=useParallax()
  const bgX=useTransform(x,v=>v*-28),bgY=useTransform(y,v=>v*-18)
  const [form,setForm]=useState({name:'',email:'',message:''})
  const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle')
  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();setStatus('sending')
    try{
      const res=await fetch('https://api.emailjs.com/api/v1.0/email/send',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({service_id:'YOUR_SERVICE_ID',template_id:'YOUR_TEMPLATE_ID',user_id:'YOUR_PUBLIC_KEY',
          template_params:{from_name:form.name,from_email:form.email,message:form.message,to_email:EMAIL}})
      })
      if(res.ok){setStatus('sent');setForm({name:'',email:'',message:''})}else setStatus('error')
    }catch{setStatus('error')}
  }
  const inp={width:'100%',background:`${S}AA`,border:`1px solid ${DR}77`,padding:'12px 16px',fontFamily:'var(--font-mono)',fontSize:14,color:W,outline:'none',letterSpacing:'0.05em'} as React.CSSProperties
  return(
    <div className="relative flex h-full pt-16 overflow-hidden">
      <motion.div style={{x:bgX,y:bgY}} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span style={{fontFamily:'var(--font-display)',fontSize:'clamp(90px,20vw,240px)',color:'transparent',WebkitTextStroke:`1px ${R}08`,userSelect:'none',whiteSpace:'nowrap'}}>CONTACT</span>
      </motion.div>
      <div className="relative z-10 flex w-full max-w-5xl mx-auto px-10 py-8 gap-12">
        <div className="flex flex-col justify-center" style={{minWidth:300}}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:12,color:R,letterSpacing:'0.35em',marginBottom:12}}>// OPEN CHANNEL //</div>
            <RGBSplit intensity={3}><h2 style={{fontFamily:'var(--font-display)',fontSize:'clamp(48px,7vw,88px)',color:W,lineHeight:0.9,letterSpacing:'0.02em'}}>GET IN TOUCH</h2></RGBSplit>
            <p style={{fontFamily:'var(--font-body)',fontSize:18,color:DIM,marginTop:16,lineHeight:1.7}}>Freelance projects, collabs, interesting problems.<br/>Async-friendly. Fast turnaround.</p>
          </motion.div>
          <div className="flex flex-col gap-2 mt-8">
            {[{l:'EMAIL',v:EMAIL,h:`mailto:${EMAIL}`},{l:'PHONE',v:PHONE,h:`tel:+919537517519`},{l:'GITHUB',v:'https://github.com/VishweshMashru',h:'https://github.com/VishweshMashru'}].map((lnk,i)=>(
              <motion.a key={lnk.l} href={lnk.h} target="_blank" rel="noopener noreferrer"
                initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.08+0.3}}
                className="flex items-center gap-4 py-3.5 px-5 transition-all duration-200"
                style={{border:`1px solid ${DR}55`,background:`${R}05`,textDecoration:'none'}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=`${R}10`;(e.currentTarget as HTMLElement).style.borderColor=`${R}77`}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background=`${R}05`;(e.currentTarget as HTMLElement).style.borderColor=`${DR}55`}}>
                <div className="w-1.5 h-1.5 flex-shrink-0" style={{background:R}}/>
                <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:R,letterSpacing:'0.28em',minWidth:68}}>{lnk.l}</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:16,color:DIM}}>{lnk.v}</span>
              </motion.a>
            ))}
          </div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}
            className="flex items-center gap-3 mt-6 px-5 py-3"
            style={{border:'1px solid rgba(74,222,128,0.25)',background:'rgba(74,222,128,0.05)',maxWidth:270}}>
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:'#4ADE80',boxShadow:'0 0 10px #4ADE80'}}/>
            <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'rgba(74,222,128,0.85)',letterSpacing:'0.2em'}}>AVAILABLE FOR WORK</span>
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.3}}
          className="flex-1 relative p-7" style={{border:`1px solid ${DR}66`,background:`${R}05`}}>
          <B4 size={11} color={R} op={0.4}/>
          <div style={{fontFamily:'var(--font-mono)',fontSize:11,color:R,letterSpacing:'0.3em',marginBottom:22}}>// SEND MESSAGE //</div>
          {status==='sent'?(
            <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="flex flex-col items-center justify-center h-full gap-5 py-16">
              <div className="w-14 h-14 rotate-45 flex items-center justify-center" style={{border:`2px solid ${R}`}}>
                <div className="-rotate-45 text-2xl" style={{color:R}}>✓</div>
              </div>
              <div style={{fontFamily:'var(--font-display)',fontSize:32,color:W,letterSpacing:'0.05em'}}>MESSAGE SENT</div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:13,color:DIM,letterSpacing:'0.15em'}}>I'll get back to you ASAP</div>
              <button onClick={()=>setStatus('idle')} style={{fontFamily:'var(--font-mono)',fontSize:12,color:R,border:`1px solid ${DR}77`,padding:'10px 24px',cursor:'pointer',background:'transparent',marginTop:8,letterSpacing:'0.2em'}}>SEND ANOTHER</button>
            </motion.div>
          ):(
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {[{id:'name',label:'YOUR NAME',type:'text',ph:'Tanjiro Kamado'},{id:'email',label:'YOUR EMAIL',type:'email',ph:'tanjiro@ds.corp'}].map(f=>(
                <div key={f.id}>
                  <label style={{fontFamily:'var(--font-mono)',fontSize:10,color:`${R}AA`,letterSpacing:'0.25em',display:'block',marginBottom:8}}>{f.label}</label>
                  <input type={f.type} required placeholder={f.ph} value={(form as any)[f.id]}
                    onChange={e=>setForm(p=>({...p,[f.id]:e.target.value}))}
                    style={inp}
                    onFocus={e=>e.target.style.borderColor=R} onBlur={e=>e.target.style.borderColor=`${DR}77`}/>
                </div>
              ))}
              <div>
                <label style={{fontFamily:'var(--font-mono)',fontSize:10,color:`${R}AA`,letterSpacing:'0.25em',display:'block',marginBottom:8}}>MESSAGE</label>
                <textarea required rows={5} placeholder="Tell me about your project..." value={form.message}
                  onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                  style={{...inp,resize:'none'} as React.CSSProperties}
                  onFocus={e=>e.target.style.borderColor=R} onBlur={e=>e.target.style.borderColor=`${DR}77`}/>
              </div>
              {status==='error'&&<div style={{fontFamily:'var(--font-mono)',fontSize:12,color:R}}>// ERROR — configure EmailJS or email directly</div>}
              <button type="submit" disabled={status==='sending'}
                style={{fontFamily:'var(--font-mono)',fontSize:13,letterSpacing:'0.25em',padding:'13px 30px',
                  background:status==='sending'?`${R}66`:R,color:B,border:'none',cursor:status==='sending'?'not-allowed':'pointer',
                  clipPath:'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',transition:'all 0.2s',alignSelf:'flex-start'}}>
                {status==='sending'?'SENDING...':'SEND MESSAGE →'}
              </button>
              <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:DIM,letterSpacing:'0.12em',marginTop:-8}}>// emailjs.com — free — replace YOUR_SERVICE_ID etc.</div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function Portfolio(){
  const [introOver,setIntroOver]=useState(false)
  const [panel,setPanel]=useState('AGENT')
  const [thoughtId,setThoughtId]=useState<string|null>(null)
  const done=useCallback(()=>setIntroOver(true),[])

  const openThought=(id:string)=>{ setThoughtId(id) }
  const closeThought=()=>{ setThoughtId(null) }

  const currentThought=THOUGHTS.find(t=>t.id===thoughtId)||null

  return(
    <div className="relative w-full overflow-hidden" style={{height:'100svh',background:B}}>
      <AnimatePresence>{!introOver&&<IntroSequence key="intro" onDone={done}/>}</AnimatePresence>
      {introOver&&(<>
        {/* Atmospheric bg */}
        <div className="absolute inset-0 pointer-events-none"
          style={{background:`radial-gradient(ellipse 70% 60% at 58% 50%, ${DR}22 0%, ${B} 68%)`}}/>
        {/* Red circuit grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{backgroundImage:`linear-gradient(${DR} 1px, transparent 1px), linear-gradient(90deg, ${DR} 1px, transparent 1px)`,backgroundSize:'60px 60px'}}/>
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{background:`linear-gradient(to right, transparent, ${R}, transparent)`,opacity:0.6}}/>
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{background:`linear-gradient(to right, transparent, ${DR}, transparent)`,opacity:0.5}}/>
        <GlitchOverlay/>
        <Nav panel={panel} setPanel={setPanel} thoughtId={thoughtId} setThoughtId={setThoughtId}/>
        <AnimatePresence mode="wait">
          {thoughtId && currentThought ? (
            <motion.div key={`thought-${thoughtId}`} className="absolute inset-0"
              initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}
              transition={{duration:0.38,ease:[0.16,1,0.3,1]}}>
              <ThoughtPage thought={currentThought} onBack={closeThought}/>
            </motion.div>
          ) : (
            <motion.div key={panel} className="absolute inset-0"
              initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
              transition={{duration:0.38,ease:[0.16,1,0.3,1]}}>
              {panel==='AGENT'   &&<AgentPanel/>}
              {panel==='LORE'    &&<LorePanel/>}
              {panel==='BUILD'   &&<BuildPanel/>}
              {panel==='THOUGHTS'&&<ThoughtsPanel onOpenThought={openThought}/>}
              {panel==='GALLERY' &&<GalleryPanel/>}
              {panel==='CONTACT' &&<ContactPanel/>}
            </motion.div>
          )}
        </AnimatePresence>
      </>)}
    </div>
  )
}
