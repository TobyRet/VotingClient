import jsdom from 'jsdom'

const doc = jsdom.jsdoc('<!doctype HTML><html><body></body></html>')
const win = doc.defaultView

global.document = doc
global.window = win

Object.keys(window).forEach((key) => {
    if(!(key in global)) {
        gloabl[key] = window[key]    
    }
})

chai.use(chaiImmutable)
