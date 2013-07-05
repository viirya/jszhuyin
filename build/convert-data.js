var result = {};

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

var line;
while (line = readline()) {
  line = decode_utf8(line).split(' ');
  if (line[1].indexOf('_punctuation_') !== -1) continue;

  switch (scriptArgs[0]) {
    case 'words':
    default:
      if (line[0].length !== 1) continue;
    break;
    case 'phrases':
      if (line[0].length === 1) continue;
    break;
  }
  if (!result[line[1]]) result[line[1]] = [];

  result[line[1]].push([line[0], parseFloat(line[2])]);
}

for (syllables in result) {
  result[syllables] = result[syllables].sort(
    function(a, b) {
      return (b[1] - a[1]);
    }
  );
}

var jsonStr = JSON.stringify(result).replace(/\],/g, '],\n');

print(jsonStr);

quit(0);
