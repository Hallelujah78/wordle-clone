// react
import { useRef, useEffect } from "react";

// styles
import { rotate } from "../styles/animations/rotate";
import { slowWiggle } from "../styles/animations/slowWiggle";
// third party
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { SiNetlify } from "react-icons/si";

// utils

// data

// components

// state

// hooks
import useTrapFocus from "../hooks/useTrapFocus";

// models

// assets
import muzak from "../assets/audio/late_night_radio.mp3";

interface InformationProps {
  close: () => void;
  isVisible: boolean;
  isMuted: boolean;
}

const Information: React.FC<InformationProps> = ({
  close,
  isVisible,
  isMuted,
}) => {
  const selfRef = useRef<HTMLDivElement>(null);
  useTrapFocus(selfRef);
  const audioRef = useRef<HTMLAudioElement>(null);

  const closeInfo = () => {
    close();
  };

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    let playPromise: Promise<void>;
    try {
      if (isVisible && currentAudioRef && !isMuted) {
        // play the audio
        playPromise = currentAudioRef.play();
      }
    } catch (error) {
      console.log(error);
    }

    return () => {
      if (
        currentAudioRef &&
        currentAudioRef.paused &&
        playPromise !== undefined &&
        !isMuted
      ) {
        currentAudioRef?.pause();
      } else if (!isMuted) {
        playPromise.catch((err) => {
          if (err.name !== "AbortError") {
            console.log(err.message);
          }
        });
      }
    };
  }, [isVisible, isMuted]);
  return (
    <Wrapper ref={selfRef} data-testid="information">
      <div className="modal">
        <button
          data-testid="close-info"
          onClick={() => {
            closeInfo();
          }}
          aria-label="close information"
          className="close"
        >
          <FaTimes />
        </button>
        <div className="credit-container">
          <h1>CREDITS</h1>
          <p>
            Dumpster GIF by <a href="https://giphy.com/100soft">100% Soft</a>
          </p>
          <p>
            Mario font by{" "}
            <a href="https://www.fontspace.com/brotherszzz-paramount17-fonts">
              BROTHERSZZZ
            </a>
          </p>
          <p>
            Credit music by <a href="https://incompetech.com/">Kevin MacLeod</a>
          </p>
        </div>

        <div className="social-container">
          <div className="icon-container">
            <a href="https://www.linkedin.com/in/gavan-browne/">
              <FaLinkedin
                className="icon"
                aria-label="view my LinkedIn profile"
              />
            </a>
            <a href="https://github.com/Hallelujah78">
              <FaGithubSquare
                className="icon"
                aria-label="view my GitHub profile"
              />
            </a>
            <a href="https://gwib-personal-portfolio-react.netlify.app/">
              <SiNetlify
                className="icon"
                aria-label="view my portfolio on Netlify"
              />
            </a>
          </div>
        </div>

        <audio loop ref={audioRef} src={muzak}></audio>
      </div>
    </Wrapper>
  );
};
export default Information;

const Wrapper = styled.div`
  font-size: calc(1rem + 0.390625vw);
  text-align: center;
  z-index: 100;
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
  .modal {
    display: grid;
    place-content: center;
    width: 90vw;
    height: 90vh;
    border-radius: 1rem;
    background: black;
    color: white;
    position: relative;
    p {
      margin: 3rem;
      a {
        background-color: transparent;
        text-decoration: none;
        color: white;
        border-bottom: 1px solid gray;
      }
    }
  }

  .close {
    display: grid;
    color: white;
    background-color: transparent;
    border: none;
    font-size: calc(1.25rem + 0.390625vw);
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;

    &:hover {
      animation: ${rotate} 4s infinite linear;
    }
  }

  .social-container {
    .icon-container {
      .icon {
        text-decoration: none;
        color: white;
        cursor: pointer;
        &:hover {
          animation: ${slowWiggle} 3s infinite linear;
        }
      }
      max-width: 80%;
      margin: auto;
      display: flex;
      font-size: calc(2.5rem + 0.390625vw);
      justify-content: space-evenly;
    }
    position: relative;
    margin-top: 5rem;
  }
`;
