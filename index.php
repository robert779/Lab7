<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<title>Beer store</title>
<link rel="stylesheet" href="stylesGrid.css">
</head>
<script src="scripts.js" defer></script>

<body>
    <map name="contactsmap">
      <area shape="rect" coords="20,10,90,90" href="https://discord.com" alt="Discord">
      <area shape="rect" coords="110,10,190,90" href="https://web.telegram.org/k/" alt="Telegram">
      <area shape="rect" coords="200,10,290,90" href="https://www.instagram.com/cpp.whugs/?hl=ua" alt="Instagram">
    </map>
<div class="container">
  <header><img src="images/logo.png" alt="Лого магазину" class="logo">
  <h1>Бережіть воду – пийте пиво!</h1></header>
  <div class="right">
  <h2>Ваш Кошик:</h2>
  Кошик порожній
  </div>
  <div class="top"><button id="play">play</button></div>
  <div class="content">
    <div id="work" class="work">
        <div class="controls">
          <span id="log"></span>
          <button id="close">close</button>
          <button id="start">start</button>
          <button id="reload">reload</button>
        </div>
        <div class="anim">
          <div class="quad" style="background-image:url('images/tex1.png')"></div>
          <div class="quad" style="background-image:url('images/tex2.png')"></div>
          <div class="quad" style="background-image:url('images/tex3.png')"></div>
          <div class="quad" style="background-image:url('images/tex4.png')"></div>
          <div id="circle"></div>
        </div>
    </div>
    <div id="tableWrap">
  <table>
    <tr>
      <th>Local</th>
      <th>Server</th>
    </tr>
    <tr>
      <td id="localCol"></td>
      <td id="serverCol"></td>
    </tr>
  </table>
</div>
</div>
  <div class="left">
        <h2>Меню</h2>
    <ul>
      <li><a href="index.html">Головна сторінка</a></li>
    </ul>
  </div>
  <div class="bottom"><p>У п’ятницю – щасливі години:</p><p> -20% на все пиво!</p></div>
  <footer><h1>Зворотній зв'язок за номером +380661234567</h1>
    <img src = "images/contacts.png" class="contacts", usemap="#contactsmap">
    </footer>
</div>
</body>
</html>