import { h, render } from 'https://esm.sh/preact';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

function App(props) {
  return html`
  <div>
    ${props.cpus.map((cpu) => {
    return html`
    <div class="bar"><div class="bar-inner" style="width: ${cpu}%"></div><span class="label">${cpu.toFixed(2)}% usage</span></div >
    `;
  })}
  </div>`;
}

let url = new URL("/realtime/cpus", window.location.href);
url.protocol = url.protocol.replace("http", "ws");
let ws = new WebSocket(url.href);
ws.onmessage = (e) => {
  let cpus = JSON.parse(e.data);
  render(html`<${App} cpus=${cpus}></${App}>`, document.body);
};
