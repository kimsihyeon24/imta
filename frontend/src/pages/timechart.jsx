import React, { useState } from "react";

const Timechart = () => {
  const size = 800;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 20;
  const totalSegments = 144;
  const anglePerSegment = 360 / totalSegments;

  const rainbowColors = [
    "#FF0000", // 빨강
    "#FF8000", // 주황
    "#FFFF00", // 노랑
    "#008000", // 초록
    "#0000FF", // 파랑
    "#000080", // 남색
    "#800080", // 보라
  ];

  const [segmentColors, setSegmentColors] = useState(new Array(totalSegments).fill(null));
  const [tempStart, setTempStart] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [colorIdx, setColorIdx] = useState(0);

  // 마우스 움직임 시 현재 호버 구간 인덱스 계산 및 업데이트
  const handleMouseMoveSVG = (event) => {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const dx = mouseX - cx;
    const dy = mouseY - cy;

    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;

    const index = Math.floor(angle / anglePerSegment);
    setHoverIndex(index);
  };

  // 클릭 시 시작점-끝점 선택 및 구간 색상 할당
  const handleClickSVG = () => {
    if (tempStart === null) {
      if (hoverIndex !== null) {
        setTempStart(hoverIndex);
      }
    } else if (hoverIndex !== null) {
      const newColors = [...segmentColors];
      const startIdx = tempStart;
      const endIdx = hoverIndex;

      let length = 0;
      if (startIdx <= endIdx) {
        length = endIdx - startIdx + 1;
        for (let i = startIdx; i <= endIdx; i++) {
          newColors[i % totalSegments] = rainbowColors[colorIdx % rainbowColors.length];
        }
      } else {
        length = totalSegments - startIdx + endIdx + 1;
        for (let i = 0; i < length; i++) {
          newColors[(startIdx + i) % totalSegments] = rainbowColors[colorIdx % rainbowColors.length];
        }
      }

      setSegmentColors(newColors);
      setColorIdx(prev => (prev + 1) % rainbowColors.length);
      setTempStart(null);
      setHoverIndex(null);
    }
  };

  // 인덱스 기준 좌표 계산
  const getCoordinates = (index, radius = r) => {
    const angle = ((anglePerSegment * index - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  // 원호(d arc) 생성 - 10분 단위 구간 하나 그리기
  const generateArcPath = (index) => {
    const startAngle = anglePerSegment * index - 90;
    const endAngle = startAngle + anglePerSegment;
    const rad = Math.PI / 180;

    const startX = cx + r * Math.cos(startAngle * rad);
    const startY = cy + r * Math.sin(startAngle * rad);
    const endX = cx + r * Math.cos(endAngle * rad);
    const endY = cy + r * Math.sin(endAngle * rad);
    const largeArcFlag = 0;

    return `M${cx},${cy} L${startX},${startY} A${r},${r} 0 ${largeArcFlag} 1 ${endX},${endY} Z`;
  };

  // 임시 하이라이트 구간 렌더링 (클릭 후 마우스 이동 시)
  const renderTempHighlight = () => {
    if (tempStart === null || hoverIndex === null) return null;

    const highlightArcs = [];
    if (tempStart <= hoverIndex) {
      for (let i = tempStart; i <= hoverIndex; i++) {
        highlightArcs.push(
          <path
            key={`highlight-${i}`}
            d={generateArcPath(i)}
            fill="rgba(255,255,255,0.3)"
            stroke="none"
          />
        );
      }
    } else {
      for (let i = tempStart; i < totalSegments; i++) {
        highlightArcs.push(
          <path
            key={`highlight-${i}`}
            d={generateArcPath(i)}
            fill="rgba(255,255,255,0.3)"
            stroke="none"
          />
        );
      }
      for (let i = 0; i <= hoverIndex; i++) {
        highlightArcs.push(
          <path
            key={`highlight-${i}`}
            d={generateArcPath(i)}
            fill="rgba(255,255,255,0.3)"
            stroke="none"
          />
        );
      }
    }
    return highlightArcs;
  };

  // 시작점, 마우스 현재 위치 선 표시
  const startLine = tempStart !== null ? (
    <line
      x1={cx}
      y1={cy}
      x2={getCoordinates(tempStart).x}
      y2={getCoordinates(tempStart).y}
      stroke="red"
      strokeWidth={4}
    />
  ) : null;

  const hoverLine = hoverIndex !== null ? (
    <line
      x1={cx}
      y1={cy}
      x2={getCoordinates(hoverIndex).x}
      y2={getCoordinates(hoverIndex).y}
      stroke="blue"
      strokeWidth={4}
    />
  ) : null;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
    >
      <div className="w-[80%] flex justify-center items-center">
        <svg
          width={size}
          height={size}
          onMouseMove={handleMouseMoveSVG}
          onClick={handleClickSVG}
          style={{ cursor: "pointer" }}
        >
          <circle cx={cx} cy={cy} r={r} fill="white" stroke="black" strokeWidth={3} />

          {/* 고정된 색상 구간 */}
          {segmentColors.map((color, idx) =>
            color ? (
              <path key={idx} d={generateArcPath(idx)} fill={color} stroke="none" />
            ) : null
          )}

          {/* 임시 하이라이트 */}
          {renderTempHighlight()}

          {/* 시작/호버 선 */}
          {startLine}
          {hoverLine}

          <text x={cx} y={cy} textAnchor="middle" dy="8" fontSize="24" fill="black">
            원형 시간표
          </text>
        </svg>
      </div>

      <div className="mt-4 text-white text-center">
        클릭하여 구간 시작점을 선택하세요.<br />
        두 번째 클릭까지 구간이 하이라이트되고, 두 번째 클릭 시 선택 구간이 색상으로 채워집니다.<br />
        무지개 색상은 순서대로 지정됩니다.
      </div>
    </div>
  );
};

export default Timechart;
