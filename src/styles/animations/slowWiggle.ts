import { keyframes } from "styled-components";

export const slowWiggle = keyframes`
0% {transform: rotate(0deg) scale(1) rotateX(0deg) rotateY(0deg)}
25% {transform: rotate(-15deg) scale(1.1) rotateX(-15deg) rotateY(-15deg)}
50% {transform: rotate(15deg) scale(1.2) rotateX(15deg) rotateY(15deg)}
75% {transform: rotate(-15deg) scale(1.1) rotateX(-15deg) rotateY(-15deg)}
100% {transform: rotate(0deg) scale(1) rotateX(0deg) rotateY(0deg)}


`;
