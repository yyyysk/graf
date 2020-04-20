import React, {useEffect, useRef, MouseEvent} from 'react';
import { Button, CssBaseline, Container, Typography, TextField } from '@material-ui/core';

interface Position {
  x: number;
  y: number;
}

const scrollX = (): number => document.documentElement.scrollLeft || document.body.scrollLeft;
const scrollY = (): number => document.documentElement.scrollTop || document.body.scrollTop;


const Graff = () => {
  const canvasRef = useRef(null);

  // Canvasのcontextを取得
  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  };

  // タッチpositionの取得
  const getPosX = (e: MouseEvent<HTMLElement>): Position => {
    if (!canvasRef.current) return {x: 0, y:0};

    console.log(canvasRef.current);
    const cnvRect: ClientRect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - cnvRect.right + scrollX();
    const y = e.clientY - cnvRect.top + scrollY();

    return {x,y};
  };

  // Canvasのリスナ設定
  const settingCanvas = (ctx: CanvasRenderingContext2D): void => {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const cnv = canvasRef.current;
    // PC
    cnv.addEventListener("mousedown", (e: MouseEvent<HTMLElement>) => {
      console.log("mousedown");
      drawing = true;
      oldPos = getPos(e);
    }, false);
    cnv.addEventListener("mouseup", () => drawing = false, false);
    cnv.addEventListener("mousemove", (e: MouseEvent<HTMLElement>) => {
      const pos = getPos(e);
      console.log("mousemove : x=" + pos.x + ", y=" + pos.y + ", drawing=" + drawing);
      if (drawing) {
        ctx.beginPath();
        ctx.moveTo(oldPos.x, oldPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.closePath();

        // socket.IOサーバーに、
        // どの点からどの点までを描画するかをの情報を送付する
        // socket.emit("draw", {before:oldPos, after:pos});
        oldPos = pos;
      }
    }, false);
    cnv.addEventListener("mouseout", () => drawing = false, false);
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    ctx.fillRect(0, 0, 100, 100);
    ctx.save();
  });

  return(
    <div className="Entry">
		  <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ height: '100vh', backgroundColor: '#fff' }}>
          <Typography component="h2" align="left">Graffiti</Typography>
          <Typography component="div" align="center">
            <canvas ref={canvasRef} height='500' style={{width: '100%', border: '1px solid #eee'}}/>
          </Typography>
          <Typography component="div" align="center">
            <Button variant="contained" color="primary">
              次の人に渡す 
            </Button>
          </Typography>
        </Typography>
      </Container>
    </div>
  );
};

export default Graff;