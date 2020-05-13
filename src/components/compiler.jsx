export function tokenize (raw) {
  let i = 0
  let tokens = []

  while (i < raw.length) {
    let c = raw[i]

    if (c === '&') {
      let c2 = raw[i + 1]
      let value = c + c2

      if (c2 === 'r') {
        tokens.push({type: 'reset', value})
      } else if (/[0-9a-f]/.test(c2)) {
        tokens.push({type: 'color', value})
      } else if (/[lmno]/.test(c2)) {
        tokens.push({type: 'style', value})
      }
      i += 2
      continue
    }

    let value = ''
    do {
      value += c
      c = raw[++i]
    } while (c && c !== '&')
    tokens.push({type: 'text', value})
  }

  return tokens
}

export function parse (tokens) {
  let i = 0
  let walk = () => {
    let token = tokens[i]

    if (token.type === 'text') {
      i++
      return token.value
    }

    if (token.type === 'color') {
      let content = []
      let node = ['color', token.value, content]
      token = tokens[++i]

      while (token && token.type !== 'reset' && token.type !== 'color') {
        content.push(walk())
        token = tokens[i]
      }

      return node
    }

    if (token.type === 'style') {
      let content = []
      let node = ['style', token.value, content]
      token = tokens[++i]

      while (token && (token.type === 'text' || token.type === 'style')) {
        content.push(walk())
        token = tokens[i]
      }

      return node
    }

    if (token.type === 'reset') {
      i++
      return null
    }
  }

  let ast = []
  while (i < tokens.length) {
    let node = walk()
    if (node) {
      ast.push(node)
    }
  }

  return ast
}

export function compile (raw) {
  let ast = parse(tokenize(raw))
  let transformArray = nodes => nodes.map(node => {
    if (typeof node === 'string') {
      return node
    } else {
      const [type, code, content] = node
      return <span class={'mc-' + code[1]}>{ transformArray(content) }</span>
    }
  })
  return transformArray(ast)
}

export default compile
