## Purpose of This File

- when developing apps, it's common to encounter certain difficulties that have to be overcome
- this can be time consuming/frustrating
- for each project, I will record issues encountered and how to overcome

### 1 - Styled components, createGlobalStyle and Google Fonts

- fonts you set won't take effect unless you put them in `:root`, `#root`, `html`, or `*`, etc, like so:

```js
const GlobalStyle = createGlobalStyle`
:root{
font-family: "Libre Franklin", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;

}
`;
```

- may seem obvious but when also using something like `styled-reset` you may start down the path of "`styled-reset` must be causing my fonts to not work"

### 2 Destructure props when a component is rendering another component and props are being passed

- this is so basic but for the love of god you need to:

```js
const Guess: React.FC<GuessProps> = ({ guess }) => {...}
```

- use the `{}` around the params to destructure

### 3 'styled-reset' package

- this package doesn't appear to set `box-sizing: border-box;` which is something I would use on all projects
- I had to set my `nav` to `border-box` manually

### 4 DOMException: play() request interrupted woes

- When the user clicks a button and makes the Information.tsx element visible, music will start to play.
- when the user closes the Information.tsx element, the music should be paused
- because play() returns a promise and we are testing with Cypress, the music may not have started playing by the time we attempt to pause() it
- I've chosen to render the audio element inside Information.tsx
  - I think this is incorrect
    - Information.tsx gets removed from the DOM when not visible
    - Your cleanup function in the useEffect attempts to call pause
    - if the play promise hasn't resolved you don't call pause BUT you
      will still get an error that the media was removed before play request could finish
- I got around this by incrementally understanding promises:

```js
useEffect(() => {
  const currentAudioRef = audioRef.current;
  let playPromise: Promise<void>;
  try {
    if (isVisible && currentAudioRef) {
      // play the audio
      playPromise = currentAudioRef.play();
    }
  } catch (error) {
    console.log(error);
  }

  return () => {
    if (
      currentAudioRef &&
      !currentAudioRef.paused &&
      playPromise !== undefined
    ) {
      currentAudioRef?.pause();
    } else {
      playPromise.catch((err) => {
        if (err.name !== "AbortError") {
          console.log(err.message);
        }
      });
    }
  };
}, [isVisible]);
```

- the ref stuff I know
- we create a playPromise and since play() returns a promise we can assign the result
- in our cleanup
  - if playPromise is not undefined that means our promise resolved, and so we can call audio.pause()
  - if playPromise is undefined then we can catch the AbortError that will
    be caused by interrupting the play() request
- now our Cypress test doesn't fall over due to an uncaught AbortError
- as per Chat Gippity we can use AbortConroller:

```js
const controller = new AbortController();
const signal = controller.signal;

// Create an audio or video element
const mediaElement = document.createElement("video");
mediaElement.src = "your_media_source_here";

// Start playback
mediaElement.play();

// To abort the play request, call the abort method on the controller
controller.abort();
```

- we could also store our controller and media in a Map:

```js
const controllers = new Map();

function abortPlay(mediaElement) {
  if (controllers.has(mediaElement)) {
    controllers.get(mediaElement).abort();
    controllers.delete(mediaElement);
  }
}

function playMedia(mediaElement) {
  const controller = new AbortController();
  controllers.set(mediaElement, controller);

  const signal = controller.signal;

  // Start playback
  mediaElement
    .play()
    .then(() => {
      // Playback completed
      controllers.delete(mediaElement);
    })
    .catch((error) => {
      // Playback aborted or encountered an error
      if (error.name === "AbortError") {
        console.log("Playback aborted.");
      } else {
        console.error("Playback error:", error);
      }
      controllers.delete(mediaElement);
    });

  // Example: Abort playback after 5 seconds
  setTimeout(() => {
    abortPlay(mediaElement);
  }, 5000);
}

// Example usage
const videoElement = document.createElement("video");
videoElement.src = "your_video_source_here";
document.body.appendChild(videoElement);

playMedia(videoElement);
```

- it's worth noting that the `signal` is never used
  - for me that says maybe this isn't a great solution but I'm not willing to go down that ChatGPT rabbithole

### 5 Cypress .type() won't work if you're not typing into an input (or similar element)

- the answer to this is not `cypress-real-events`
- the potential answer (it may be hacky or bad practice) is just to add a `tabindex={0}` to your App.tsx
- after this is done, .type() will work
  - you don't have to get or focus the element that has the tabindex on it
  - get an element (eg `#root`) and chain `type()` onto that and it works
