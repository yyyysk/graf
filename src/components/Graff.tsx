import React, {useState, useEffect, useRef, MouseEvent} from 'react';
import { Button, CssBaseline, Container, Typography, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Position {
  x: number;
  y: number;
}

const scrollX = (): number => document.documentElement.scrollLeft || document.body.scrollLeft;
const scrollY = (): number => document.documentElement.scrollTop || document.body.scrollTop;


const Graff = () => {
  const [color, setColor] = useState('#000000');
  const canvasRef = useRef(null);

  let drawing = false;
  let oldPos: Position;

  // Canvasのcontextを取得
  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  };

  // タッチpositionの取得
  const getPos = <T extends {clientX?: number, clientY?: number, touches?: any[], changedTouches?: any[]}>(e: T): Position => {
    let clientX, clientY;
    if (e.touches || e.changedTouches) {
      const touch = e.touches[0] || e.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (!clientX || !clientY) return {x:0,y:0};

    const cnvRect: ClientRect = canvasRef.current.getBoundingClientRect();
    const x = clientX - cnvRect.left + scrollX();
    const y = clientY - cnvRect.top;
    return {x,y};
  };

  // 描画
  const draw = (ctx: CanvasRenderingContext2D, oldPos: Position, pos: Position): void => {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(oldPos.x, oldPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.closePath();
  };

  // キャンバスクリア
  const clear = (): void => {
    const ctx: CanvasRenderingContext2D = getContext();
    ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
  };

  // Canvasのリスナ設定
  const settingCanvas = (ctx: CanvasRenderingContext2D): void => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const cnv = canvasRef.current;
    if (!cnv) return;

    // PC
    cnv.addEventListener("mousedown", (e: MouseEvent<HTMLElement>) => {
      console.log("mousedown");
      drawing = true;
      oldPos = getPos(e);
    }, false);
    cnv.addEventListener("mouseup", () => drawing = false, false);
    cnv.addEventListener("mousemove", (e: MouseEvent<HTMLElement>) => {
      const pos = getPos(e);
      if (drawing) {
        draw(ctx, oldPos, pos);

        // socket.IOサーバーに、
        // どの点からどの点までを描画するかをの情報を送付する
        // socket.emit("draw", {before:oldPos, after:pos});
        oldPos = pos;
      }
    }, false);
    cnv.addEventListener("mouseout", () => drawing = false, false);

    // SP
    cnv.addEventListener("touchstart", (e: MouseEvent<HTMLElement>) => {
      console.log("mousedown");
      drawing = true;
      oldPos = getPos(e);
    }, false);
    cnv.addEventListener("touchend", () => drawing = false, false);
    cnv.addEventListener("touchmove", (e: MouseEvent<HTMLElement>) => {
      const pos = getPos(e);
      if (drawing) {
        draw(ctx, oldPos, pos);

        // socket.IOサーバーに、
        // どの点からどの点までを描画するかをの情報を送付する
        // socket.emit("draw", {before:oldPos, after:pos});
        oldPos = pos;
      }
    }, false);
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    settingCanvas(ctx);
    ctx.save();
  });

  return(
    <div className="Entry">
		  <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ height: '100vh', backgroundColor: '#fff' }}>
          <Typography component="h2" align="left">Graffiti</Typography>
          <Typography component="div" align="center">
            <canvas ref={canvasRef} height='500' width='300' style={{border: '1px solid #eee'}}/>
          </Typography>
          <Typography component="div" align="center">
            <Button color="secondary" variant="contained" style={{margin: "16px"}} >
              <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>退出</Link>
            </Button>
            <Button variant="contained" color="primary">
              次の人に渡す 
            </Button>
          </Typography>
        </Typography>
      </Container>
      <Typography component="div" align="center" style={{position: "fixed", bottom: 0, width: "100%", background: "#eee"}}>
        <Typography component="div" align="center" style={{display: "flex", justifyContent: "center", margin: "12px", alignItems: "center"}}>
          <div>
            <img alt="pen" width="16" height="16" src="/images/pen.png" />
            <input type="color" id="head" name="head" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div>
            <Button color="secondary" size="small" variant="contained" style={{margin: "0 16px"}} onClick={() => clear()}>クリア</Button>
          </div>
        </Typography>
      </Typography>
    </div>
  );
};

export default Graff;
