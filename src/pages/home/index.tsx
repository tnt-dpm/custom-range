import './home.scss';

const Home = () => {
  return (
    <main className="home__container">
      <h1>Hello!</h1>
      <p>
        Thank you for taking the time to review my technical test.
      </p>
      <h2>What's inside</h2>
      <ul>
        <li>Two ranges: one normal and one with fixed options.</li>
        <li>Draggable thumbs, editable values only in the first one.</li>
        <li>Separation into small components (LabelInput, Thumb…).</li>
        <li>Basic tests to check functionality and snapshots for static components.</li>
      </ul>
      <h2>The how</h2>
      <ul>
        <li>
          The first thing I did was set up the whole environment: create the app
          without a CLI, just the basics, with minimal routes and an aside for
          the links. A bit of minimal styling and adding the linter and tests
          with a couple of snapshots to have everything integrated. Once I had
          that skeleton, I dove into the component itself.
        </li>
        <li>
          My first approach was to create nodes for each step inside the range
          and place the thumb inside, but I realized that if we got too liberal
          with that it wouldn't scale very well. Filling the DOM with three
          thousand divs isn't ideal.
        </li>
        <li>
          After that I went for visual percentages; after all, I think it's the
          cleanest approach and the user wouldn't notice how the magic works
          underneath. I'm not a math wizard, but I think what I've done makes
          some sense.
        </li>
        <li>
          I started with fixed values and static thumbs. When I saw I was
          cramming too much code into the Range component, I decided to create
          the LabelInput with its own onClick edit logic encapsulated. I think I
          might still have a small bug/edge case when changing values onChange,
          but I also think it's visually better for the user to see the thumb
          move as they change numbers in the input.
        </li>

        <li>
          Once that was done, I moved on to the thumbs. Here I had to ask
          ChatGPT for help because I wasn't sure how to tackle it. First I
          looked at other people's code, because the machine doesn't really suit
          me for working and it often confuses me more than it clarifies things,
          but in the end I listened and understood what I wanted it to do.
        </li>

        <li>
          As with LabelInput, I tried encapsulating the thumb's logic in its own
          component so as not to clutter the Range component more than
          necessary.
        </li>

        <li>
          Once everything worked, I added the mocks. I've used the public
          folder, which Vite serves, to avoid complicating my life with that.
          With a basic fetch hook with loading and error states I think it's
          enough for the test. Building the component took most of my time and I
          didn't want to overcomplicate it further.
        </li>

        <li>
          Then I handled the min and max values, which worked fine in the first
          exercise, and later the options list for the second exercise, which I
          had to integrate into the component. By creating my own min/max (like
          low/high) and a snap to move between fixed or non-fixed values, it was
          done.
        </li>

        <li>
          The last step was to add some more styles, the hover on the button,
          lock the LabelInput with the “is fixed” prop, add some tests and make it keyboard usable.
        </li>
      </ul>
      <h2>The result</h2>
      <p>
        I think the result is pretty good. I also think it can be greatly
        improved, and since this is the first time I build a component like
        this, I'd really appreciate other points of view — maybe I
        overcomplicated some parts, maybe I fell short, or maybe there's another
        approach or way of doing it that hasn't occurred to me. Apart from the
        “nodes” idea (my first approach) and then the visual play with CSS (my
        second), nothing else has come to mind. And honestly, the libraries I
        stalked for inspiration had so many options that I couldn't see a clear
        path forward.
      </p>
    </main>
  );
};

export default Home;
