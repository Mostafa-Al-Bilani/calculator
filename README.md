<h1>Postfix/Prefix Calculator</h1>
<p>Postfix/Prefix Calculator Overview:
This project is a calculator built using HTML, CSS, and JavaScript. 
  It features the ability to switch between postfix and prefix evaluation modes while handling all possible cases and scenarios
  . Additionally, the calculator includes a theme toggle to switch between dark and light modes and a tutorial pop-up button for guidance.</p>
<p>
  The website was uploaded to github pages you can access it from here: 
  <a href="https://mostafa-al-bilani.github.io/calculator/" target="_blank">Website</a>.
</p>
<h1>Postfix/Prefix Calculator Tutorial</h1>

<h2>Button Functions:</h2>
<ul>
  <li>
    <b>C Button:</b> Clears everything and resets the calculator.
  </li>
  <li>
    <b>D Button:</b> Deletes the last entered character.
  </li>
  <li>
    <b>Enter Button:</b> Used to input single or multiple-digit numbers.
  </li>
  <li>
    <b>= Button:</b> This button is disabled under the following conditions:
    <ul>
      <li>The user has not entered anything yet.</li>
      <li>The user has not pressed <code>Enter</code> after inputting a number.</li>
      <li>In <b>Postfix</b> mode, if the last item is a number.</li>
      <li>In <b>Prefix</b> mode, if the last item is an operator.</li>
      <li>
        The count of operators is not exactly one less than the count of numbers.
      </li>
    </ul>
  </li>
</ul>

<h2>Operators (<code>+</code>, <code>-</code>, <code>x</code>, <code>/</code>):</h2>
<ul>
  <li>Operators are entered directly without pressing the <code>Enter</code> button.</li>
</ul>

<h2>Mode-Specific Rules:</h2>
<h3>Postfix Mode:</h3>
<ul>
  <li>You cannot start with an operator.</li>
  <li>You must input at least two numbers before using an operator.</li>
</ul>

<h3>Prefix Mode:</h3>
<ul>
  <li>You cannot start with a number.</li>
  <li>You must input an operator first.</li>
</ul>

<p>
  Use this tutorial to guide your usage of the Postfix/Prefix Calculator and
  ensure seamless operation in both modes!
</p>

