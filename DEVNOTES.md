# Creating a Wordle App from Scratch

## Server with Database or Not?

- ideally we'd have a server and the answer would be hidden from the client
  - players couldn't cheat by inspecting the answer in dev tools
  - this would allow a leaderboard
  - different scores depending on the number of attempts
- Reasons I'm not going the server+auth+database route:
  - the main purpose of the project is to build something in TypeScript (which is relatively new to me)
  - this is a simple app for a portfolio project
    - I already have two paid Render servers
    - I'd have to modify an existing server to do it for free
    - it requires auth
    - it requires using a database
  - all of this adds too much work and takes focus away from using TypeScript to create something that should be relatively simple
  - if the Wordle word is randomly chosen on the frontend we can just let the user complete the puzzle and then immediately create a new game
  - if the Wordle word is chosen on the backend then we are stuck with either having no auth and have the word expire at 12:00pm and create a new word at 12:01am OR we have auth and store the current word on a per user basis in a database
    - again, this is very doable but it is time consuming

## What we'll need

- first we need the [words](https://dagshub.com/arjvik/wordle-wordlist/src/master/answerlist.txt "text file of Wordle answers on github ")
  - there are 12,947 allowed answers
  - there are about 2,309 game answers so far
  - many allowed answers are obscure:
    - words such as abrin, abris, absey, absit, abuna, abune will be accepted as valid guesses
  - I've chosen to use the 2309 words that have been used as game answers so far
    - there is a problem with the 2309 word list
      - common words are flagged as not valid answers
      - could check word frequency in some body of english text
- local storage to persist through refreshes/navigation away from the page
- state: current game answer, the current guess index, letters used, previous guesses, whether a letter has been guessed, whether a letter is in the correct position, whether a letter is in the incorrect position
- a killer name. I thought Wurdil and then googled to see if it meant anything. Wur Dil means "The Heart" in Urdu, so that's cool. Wurdil in Western Frisian means "Word." Wurdil Wedstriid - literally word game
  - based on the code I've written so far I may call it "Wurdil - Dumpster Fire Editon" :smiley:

---

## NYT Wordle: How it works

- 6 chances to guess a 5-letter word
- the Wordle play area:
  <img src="./src/assets/nyt-wordle-screen.png">

### Non-touch device

- input letters via keyboard or using the mouse with the keyboard displayed under the guesses, and they appear in the current guess boxes
- you must hit or click enter to submit your guess:
  <img src="./src/assets/wordle-guess-1.png">
- letters which are in the word:
  - but in the wrong place are yellow
  - but in the right place are green
- to submit a guess, the guess must be in the word list
- keys that are not A-Z, enter or delete are ignored
- warn on submit if not enough letters

### Hitting Enter (submitting a guess)

- if the guess is correct

  - set game to over
  - set the background color of the guess letters to green
  - set the background color of the corresponding keyboard letters to green
  - congratulate the user

- else if the guess is not a word

  - notify user, do nothing else?

- else the guess is a valid possible answer
  - if this was your final (6th) guess
    - you lost, bad luck
    - notify the user of the word
    - set the game to be over
      - the NYT surprisingly does this with a fairly plain tooltip type element
  - else this is not your final guess
    - increment guess index
    - set letter index to 0

### Coloring the letters

- todays answer is 'OFTEN'
- if we guess SOFTY
  - S and Y are dark gray on the keyboard and in the guess squares
  - F, T, and Y are yellow on the keyboard and in the guess squares
- if we guess EATER

  - E, A, and R are dark gray
  - T and E are green

- guessing SOFTY again (which you are allowed to do)

  - the T and E on the keyboard remain green because we have them in the right positions in one of our answers (EATER)
    - they don't revert to yellow based on our last answer which had no letters in the correct positions

- inline, this works:

```js
 style={{background:
 `${guesses[0][0] === answer.charAt(0) ? "green" : "white"}`,
        }}
```

- animation:

```js
.spin{
  animation:spin 2s linear;
}

@keyframes spin { 100% { transform:rotateX(360deg); } }
```

- this is better and can be adapted more easily: https://jsfiddle.net/wLLLsjLd/2/
- modded it easily:

```js
body {
    background: #ecf0f1;
}
ul {
    width: 50%;
    margin: 120px auto;
}
li {
    width: 200px;
    height: 200px;
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
    list-style: none;
    position: relative;
    cursor: pointer;
    font-family:'Open Sans';
    font-weight: 300;
    -webkit-perspective: 1000;
    -moz-perspective: 1000;
    perspective: 1000;
}
div {
    color: yellow;
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    transition: all 0.5s ease;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
}
.front {
    z-index: 3;
    color: #fff;
    text-align: center;
    line-height: 210px;
    font-size: 20px;
    background: #e3e3e3;
}
li:hover > .front{
    z-index: 0;
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    transform: rotateX(180deg);
}
li:hover > .back {
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    transform: rotateX(0deg);
}
.back {
    color: #fff;
    text-align: center;
    line-height: 200px;
    font-size: 20px;
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    transform: rotateY(180deg);
    transform: rotateX(180deg);
    background: #34495e;
}
#box1 {
    background: red;
}


<ul>
    <li>
        <div class="front" id="box1">This is a div to rotate.
        </div>
        <div class="back">This is the div rotated.</div>
    </li>
</ul>

```

- on hitting enter

  - if nth letter of guess is equal to nth letter of answer
    - color is green on keyboard and in guess
  - else if nth letter of guess is included in answer
    - color is yellow
  - else color is dark gray

  answer, currentGuessIndex, guesses

  const assignLetterColor = (answer, currentGuessIndex, guesses) =>{
  const guess = guesses[currentGuessIndex];
  const answerArray = answer.split();

  for (let i = 0; i<answerArray.length, i++){
  if(guess[i] === answerArray[i])
  }

  }

### Using a function to set CSS with styled components (my own code!):

- the following should help

```js
const Shade = ({ color, shades, index }) => {
  return (
    <>
      <Wrapper index={index} color={color} shades={shades}>
        <p className="rgb">{`${shades[index].red},${shades[index].green},${shades[index].blue}`}</p>
        <p className="hex">{`#${rgbToHex(shades[index].red)}${rgbToHex(
          shades[index].green
        )}${rgbToHex(shades[index].blue)}`}</p>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div.attrs((props) => ({
  style: {
    background: `rgb(${props.shades[props.index].red},${
      props.shades[props.index].green
    },${props.shades[props.index].blue})`,
    color: findHighestContrast(
      calculateLuminance(
        props.shades[props.index].red,
        props.shades[props.index].green,
        props.shades[props.index].blue
      )
    ),
  },
}))`
  min-width: 25%;
  font-size: 0.9rem;
  display: grid;
  min-height: 30%;
  place-items: center;
  p.rgb {
    margin-top: 15%;
  }
  p.hex {
    margin-bottom: 15%;
  }
`;

export default Shade;
```

### Components

- SingleGuess
  - index
- GuessLetter
  - index
- GuessList
  - renders SingleGuess
- Keyboard
  - renders Keys
- Key

### Refactoring the key press handlers

- each key on the onscreen keyboard might trigger the key press handler
- the logic for the clicked/touched key will be the same as the logic for pressing a physical key on the keyboard
- no need to refactor!

  - can just create a new KeyboardEvent with a key prop and dispatch it on the document!
  - now that is cool

  ### Logic to color the letters (see above also)

- on hitting enter

  - if nth letter of guess is equal to nth letter of answer
    - color is green on keyboard and in guess
  - else if nth letter of guess is included in answer && keyboard key is already green
    - color is yellow in guess
    - don't change keyboard color
  - else color is dark gray

- I would asume that a letter can change from yellow to green on the keyboard but not the other way

  - this has to be correct

- keyboard key colors can only be updated when an answer is submitted
  - when enter is pressed
- the .back tile can have its color updated immediately
  - color only revealed when enter is pressed - trigger animation

### The keyboard color update

- do this first, easier to manage
- App renders Keyboard which renders Key
- every time enter is pressed (assuming conditions are met) we run a function:
  - I think we pass the background color to the Key as a prop
  - therefore, I think we need some state??
- on the other hand, each key can derive what its color should be by running some code itself - but it can only be triggered when enter is pressed && the guess is valid
- keyboard state:

```js
[{"a": "#808080"}, {"b": "#808080"}...]
```

- #808080 being the unused default color - set as a global var
- this is held in app
- each time we submit a guess (have to figure out how to determine when a guess is successfully submitted)
  - we iterate over that guesses' letters
  - if guess[0] === answer[0]
    - update keyboard to green
  - else if answer.includes(guess[0]) && keyboard.letter !== "green"
    - set keyboard letter to yellow
  - else set keyboard to dark gray - the letter is not in the answer

### Updating Tile Colors

- thought
  - allow currentGuessIndex to move to 6 (0-5 is six guesses)
  - index only incremented on a valid guess
  - execute the animation to flip the tiles when currentGuessIndex is updated

### Scaling the UI/responsiveness - it's not mobile first

- Using site on my old J3 Samsung, I think that not scaling the UI down after about 650px height is probably a bad idea.
- we'll use a media query and just make everything scale down

  - supposedly the screen is 1280 x 720 but the content doesn't fit unless you scroll the URL bar out of the way and is cramped even then
  - NYT wordle looks fine on my old J3
  - the please rotate your device warning should only occur in portrait mode where the height is less than arbitrary number, say 450, otherwise we scale it down
  - the NYT version doesn't use a fixed arbitrary height
    - if device is in portrait mode then only display 'please rotate device' when the height becomes less than the width
    - if device is in landscape mode and the width is 400px or more then show 'please rotate' at 399px height
    - if device is in landscape mode and the width is less than 400px
      - show 'please rotate' when height is less than width

### Explosion?

- explosion? when the game is over cause the tiles in the guesses to fly away in random directions and rotate on X and Y randomly
- we'll do this in a separate small project just to mess with framer-motion

### NYT Wordle accessability and element focus

- when using tab to navigate between elements the ability for the physical enter key to submit an answer is disabled
- when opening a menu using keyboard navigation/enter, the first element to be focused when the menu is opened is the close menu option

### Next Commit

### Todo

- test mute button display and toggle

### Testing

- the elements render - DONE
- the info button makes the Information.tsx visible - DONE
- when the game is in progress we can simulate a key press or click a button and this causes a letter to appear in a tile element - DONE
- there are 5 guess tiles per guess - DONE
- there are 6 Guess components displayed on screen - DONE
- there are 30 guess tiles on screen - DONE
- there are 28 keyboard keys - DONE
- when we submit a partial answer - DONE
  - we see a toast message stating that the answer is invalid
  - we can delete the letters we have entered
- when we submit an answer that is not a valid guess (not a word) - DONE
  - we see a toast message stating the answer is invalid
  - we can delete our incorrect values
- when we submit a valid guess that is not the answer - DONE
  - we can no longer delete the values we have entered
- when we submit 6 incorrect guesses - DONE

  - the GameOver component is displayed
  - a toast message is displayed telling us what the answer was
  - a new game and close button are visible

  - Each alphabetic key does what is expected - DONE

- unhappy path - DONE
  - keys 0-9 and all keys that are not A-Z or backspace or enter don't do anything - since we aren't using an input to capture what we type, we can't use .type() to test this
