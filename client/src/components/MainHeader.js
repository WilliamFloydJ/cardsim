const MainHeader = () => {
  return (
    <header className="App-header">
      <div>
        <img src="./Web-Img/MTGIcon.png" />
        <h1>MTG Sandbox</h1>
      </div>

      <ul>
        <li>
          <a href="/">Cards</a>
        </li>
        <li>
          <a href="/decks">Decks</a>
        </li>
      </ul>
    </header>
  );
};

export default MainHeader;
