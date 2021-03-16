import React from 'react';
import './Chessboard.scss';
import Tile from './Tile.jsx';

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const pieces = [];

for (let i = 0; i < 8; i++) {
    pieces.push({
        image: 'assets/pawn_b.png',
        x: i,
        y: 6
    })
}

for (let i = 0; i < 8; i++) {
    pieces.push({
        image: 'assets/pawn_w.png',
        x: i,
        y: 1
    })
}

for (let p = 0; p < 2; p++) {
    const type = p === 0 ? 'b' : 'w';
    const y = p === 0 ? 7 : 0;

    pieces.push({ image: `assets/rook_${type}.png`, x: 0, y: y});
    pieces.push({ image: `assets/rook_${type}.png`, x: 7, y: y});
    pieces.push({ image: `assets/knight_${type}.png`, x: 1, y: y});
    pieces.push({ image: `assets/knight_${type}.png`, x: 6, y: y});
    pieces.push({ image: `assets/bishop_${type}.png`, x: 2, y: y});
    pieces.push({ image: `assets/bishop_${type}.png`, x: 5, y: y});
    pieces.push({ image: `assets/king_${type}.png`, x: 4, y: y});
    pieces.push({ image: `assets/queen_${type}.png`, x: 3, y: y});
    
}

let activePiece = null;

const grabPiece = (e) => {
    if (e.target.className === 'chess-piece') {
        activePiece = e.target;
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        e.target.style.position = "absolute";
        e.target.style.left = `${x}px`;
        e.target.style.top = `${y}px`;
    }
}

const movePiece = (e) => {
    if (activePiece) {
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`;
        activePiece.style.top = `${y}px`;
    }
}

const dropPiece = (e) => {
    if (activePiece) {
        activePiece = null;
    }
}


export default function Chessboard() {
    let board = [];
    for (let i = verticalAxis.length - 1; i >= 0; i--) {
        for (let j = 0; j < horizontalAxis.length; j++) {
            const number = j + i + 2;
            let image = undefined;
            pieces.forEach((p) => {
                if (p.x === j && p.y === i) {
                    image = p.image
                }
            })
            board.push(<Tile key={`${i},${j}`} number={number} image={image}/>)
        }
    }
    return (
        <div 
            onMouseDown={e => grabPiece(e)} 
            onMouseMove={e => movePiece(e)} 
            onMouseUp={e => dropPiece(e)}
            className="chessboard"
        >
            {board}
        </div>
    )
};