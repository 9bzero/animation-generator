import{useState}from'react'
  type Ease="linear"|"ease"|"ease-in"|"ease-out"|"ease-in-out"|"bounce"
  const PRESETS=[
    {n:"Fade In",css:"@keyframes fadeIn{from{opacity:0}to{opacity:1}}"},
    {n:"Slide Up",css:"@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}"},
    {n:"Zoom In",css:"@keyframes zoomIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}"},
    {n:"Spin",css:"@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}"},
    {n:"Pulse",css:"@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}"},
    {n:"Shake",css:"@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}"},
    {n:"Bounce",css:"@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}"},
    {n:"Flip",css:"@keyframes flip{from{transform:perspective(400px) rotateY(0)}to{transform:perspective(400px) rotateY(360deg)}}"},
  ]
  export default function App(){
    const[preset,setPreset]=useState(0)
    const[duration,setDuration]=useState(1.0)
    const[delay,setDelay]=useState(0)
    const[count,setCount]=useState("infinite")
    const[timing,setTiming]=useState<Ease>("ease")
    const[direction,setDirection]=useState("normal")
    const[key,setKey]=useState(0)
    const[cp,setCp]=useState(false)
    const animName=PRESETS[preset].n.toLowerCase().replace(/s/g,"-")
    const css=`${PRESETS[preset].css}

  .animated {
    animation: ${animName} ${duration}s ${timing} ${delay}s ${count} ${direction};
  }`
    const copy=()=>{navigator.clipboard.writeText(css);setCp(true);setTimeout(()=>setCp(false),2000)}
    return(
      <div style={{minHeight:"100vh",display:"flex",fontFamily:"Inter,system-ui,sans-serif",color:"#e2e8f0"}}>
        <style>{PRESETS[preset].css+" .preview-anim{animation:"+animName+" "+duration+"s "+timing+" "+delay+"s "+count+" "+direction+"}"}</style>
        <div style={{width:320,borderRight:"1px solid #1e293b",padding:"1.5rem",display:"flex",flexDirection:"column",gap:"1rem",background:"#111827",overflowY:"auto",flexShrink:0}}>
          <h1 style={{fontWeight:800,fontSize:"1.3rem",color:"#f8fafc"}}>✨ Animation Generator</h1>
          <div>
            <div style={{color:"#94a3b8",fontSize:"0.8rem",marginBottom:"0.5rem"}}>PRESET</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem"}}>
              {PRESETS.map((p,i)=><button key={p.n} onClick={()=>{setPreset(i);setKey(k=>k+1)}} style={{padding:"0.35rem 0.5rem",background:preset===i?"#6366f1":"#1e293b",color:preset===i?"#fff":"#94a3b8",border:"none",borderRadius:6,cursor:"pointer",fontSize:"0.78rem"}}>{p.n}</button>)}
            </div>
          </div>
          {[{l:"Duration",v:duration,set:setDuration,min:0.1,max:5,step:0.1,unit:"s"},{l:"Delay",v:delay,set:setDelay,min:0,max:3,step:0.1,unit:"s"}].map(({l,v,set,min,max,step,unit})=>(
            <div key={l}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",marginBottom:"0.35rem"}}>
                <span style={{color:"#94a3b8"}}>{l}</span><span style={{color:"#38bdf8",fontFamily:"monospace"}}>{v}{unit}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={v} onChange={e=>set(+e.target.value)} style={{width:"100%",accentColor:"#38bdf8"}}/>
            </div>
          ))}
          {[{l:"Timing",v:timing,set:setTiming,opts:["linear","ease","ease-in","ease-out","ease-in-out"]},{l:"Iteration",v:count,set:setCount,opts:["1","2","3","infinite"]},{l:"Direction",v:direction,set:setDirection,opts:["normal","reverse","alternate"]}].map(({l,v,set,opts})=>(
            <div key={l}>
              <div style={{color:"#94a3b8",fontSize:"0.8rem",marginBottom:"0.4rem"}}>{l}</div>
              <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
                {opts.map(o=><button key={o} onClick={()=>set(o as any)} style={{padding:"0.25rem 0.6rem",background:v===o?"#1e40af":"#1e293b",color:v===o?"#93c5fd":"#94a3b8",border:"none",borderRadius:4,cursor:"pointer",fontSize:"0.75rem"}}>{o}</button>)}
              </div>
            </div>
          ))}
          <pre style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:8,padding:"0.75rem",fontSize:"0.7rem",fontFamily:"JetBrains Mono,monospace",color:"#86efac",overflowX:"auto",whiteSpace:"pre-wrap",maxHeight:200}}>{css}</pre>
          <div style={{display:"flex",gap:"0.5rem"}}>
            <button onClick={copy} style={{flex:1,padding:"0.6rem",background:cp?"#166534":"#6366f1",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:"0.85rem"}}>{cp?"✓ Copied!":"Copy CSS"}</button>
            <button onClick={()=>setKey(k=>k+1)} style={{padding:"0.6rem 0.9rem",background:"#1e293b",color:"#94a3b8",border:"1px solid #334155",borderRadius:8,cursor:"pointer",fontSize:"0.85rem"}}>↺</button>
          </div>
        </div>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"#0f172a"}}>
          <div key={key} className="preview-anim" style={{width:100,height:100,background:"linear-gradient(135deg,#6366f1,#38bdf8)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem"}}>✨</div>
        </div>
      </div>
    )
  }