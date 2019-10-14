import Tone from 'tone'
const html = require('choo/html')

module.exports = function printMessages (state) {
  const messages = state.chat.messages
  var synth = new Tone.Synth().toMaster()
  Tone.Transport.start()

  function printState () {
    // map a message to notes and play it
    const msg = messages.map(x => x.message)
    // TODO: pick a random message and play it?
    const notes = changeWordsToNotes(msg[0])

    const synthPart = new Tone.Sequence(
      function (time, note) {
        synth.triggerAttackRelease(note, '8n', time)
      }, notes, '4n')
    synthPart.start()
  }

  function changeWordsToNotes (msg) {
    const letterToNote = {
      a: 'C1',
      b: 'D1',
      c: 'E1',
      d: 'F1',
      e: 'G1',
      f: 'A1',
      g: 'B1',
      h: 'C2',
      i: 'D2',
      j: 'E2',
      k: 'F2',
      l: 'G2',
      m: 'A2',
      n: 'B2',
      o: 'C3',
      p: 'D3',
      q: 'E3',
      r: 'F3',
      s: 'G3',
      t: 'A3',
      u: 'B3',
      v: 'C4',
      w: 'D4',
      x: 'E4',
      y: 'F4',
      z: 'G4'
    }

    const msgArr = msg.split('')
    const noteArr = []
    msgArr.map(letter => {
      noteArr.push(letterToNote[letter])
    })
    return noteArr
  }
  return html`
    <h1 onclick=${printState}>Play Msg</h1>
  `
}
