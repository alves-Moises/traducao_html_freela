

const acento = '[áéíóúâêôãõüöäëï]';
const vogal = '[áéíóúâêôãõàèaeiouüöäëï]';
const consoante = '[bcçdfghjklmñnpqrstvwyxz]';

const syl = {
    20: " -.!?:;",
    10: "bçdfgjkpqtv",
    8: "sc",
    7: "m",
    6: "lzx",
    5: "nr",
    4: "h",
    3: "wy",
    2: "eaoáéíóúôâêûàãõäëïöü",
    1: "iu",
    breakpair:
        "sl|sm|sn|sc|sr|rn|bc|lr|lz|bd|bj|bg|bq|bt|bv|pt|pc|dj|pç|ln|nr|mn|tp|bf|bp|xc|sç|ss|rr",
};

let spri = {};

Object
    .keys(syl)
    .filter(pri => pri.match(/\d/))
    .forEach(pri => {
        for (let x of syl[pri].split('')) {
        spri[x] = Number(pri);
        }
    });

const sylseppair = syl.breakpair.replace(/(\p{L})(\p{L})/gu, '(?<=($1))(?=($2))');

function syllable(word, opts = {}) {
    const sylSep = opts.sylSep || '|';
    let punctuation = {};
    word = word.replace(/(\p{P})/ug, (match, p1, offset) => {
        punctuation[offset] = p1;
        return '';
    });
    word = word
        .replace(new RegExp(sylseppair, 'g'), '|')
        .replace(/(\p{L})(?=(\p{L})(\p{L}))/ug, (m, m1, m2, m3) => (spri[m1.toLowerCase()] < spri[m2.toLowerCase()] && spri[m2.toLowerCase()] >= spri[m3.toLowerCase()]) ? m1 + '|' : m1)
        .replace(new RegExp('('+vogal+')('+consoante+')('+vogal+')', 'ig'), '$1|$2$3')
        .replace(/(de)(us)/ig, '$1|$2')
        .replace(/([a])(i[ru])$/i, '$1|$2')
        .replace(/(?<!^h)([ioeê])([e])/ig, '$1|$2')
        .replace(/([ioeêé])([ao])/ig, '$1|$2')
        .replace(/([^qg]u)(ai|ou|a)/i, '$1|$2')
        .replace(new RegExp('([^qgc]u)(i|ei|iu|ir|'+acento+'|e)', 'i'), '$1|$2')
        .replace(/([lpt]u)\|(i)(?=\|[ao])/ig, '$1$2')
        .replace(/([^q]u)(o)/i, '$1|$2')
        .replace(new RegExp('([aeio])('+acento+')', 'i'), '$1|$2')
        .replace(new RegExp('([íúô])('+vogal+')', 'i'), '$1|$2')
        .replace(/^a(o|e)/i, 'a|$1')
        .replace(/rein/ig, 're|in')
        .replace(/ae/ig, 'a|e')
        .replace(/ain/ig, 'a|in')
        .replace(/ao(?!s)/ig, 'a|o')
        .replace(/cue/ig, 'cu|e')
        .replace(/cui(?=\|[mnr])/ig, 'cu|i')
        .replace(/cui(?=\|da\|de$)/ig, 'cu|i')
        .replace(/coi(?=[mn])/ig, 'co|i')
        .replace(/cai(?=\|?[mnd])/ig, 'ca|i')
        .replace(new RegExp('ca\\|i(?=\\|?[m]'+acento+')', 'ig'), 'cai')
        .replace(/cu([áó])/ig, 'cu|$1')
        .replace(/ai(?=\|?[z])/ig, 'a|i')
        .replace(/i(u\|?)n/ig, 'i|$1n')
        .replace(/i(u\|?)r/ig, 'i|$1r')
        .replace(/i(u\|?)v/ig, 'i|$1v')
        .replace(/i(u\|?)l/ig, 'i|$1l')
        .replace(/ium/ig, 'i|um')
        .replace(/([ta])iu/ig, '$1i|u')
        .replace(/miu\|d/ig, 'mi|u|d')
        .replace(/au\|to(?=i)/ig, 'au|to|')
        .replace(new RegExp('(?<='+vogal+')i\\|nh(?=[ao])', 'ig'), '|i|nh')
        .replace(/oi([mn])/ig, 'o|i$1')
        .replace(/oi\|b/ig, 'o|i|b')
        .replace(/ois(?!$)/ig, 'o|is')
        .replace(new RegExp('o(i\\|?)s(?='+acento+')','ig'), 'o|$1s')
        .replace(/([dtm])aoi/ig, '$1a|o|i')
        .replace(/(?<=[trm])u\|i(?=\|?[tvb][oa])/ig, 'ui')
        .replace(/^gas\|tro(?!-)/ig, 'gas|tro|')
        .replace(/^fais/ig, 'fa|is')
        .replace(/^hie/ig, 'hi|e')
        .replace(/^ciu/ig, 'ci|u')
        .replace(/(?<=^al\|ca)\|i/ig, 'i')
        .replace(/(?<=^an\|ti)(p)\|?/ig, '|$1')
        .replace(/(?<=^an\|ti)(\-p)\|?/ig, '$1')
        .replace(/(?<=^neu\|ro)p\|/ig, '|p')
        .replace(/(?<=^pa\|ra)p\|/ig, '|p')
        .replace(/(?<=^ne\|)op\|/ig, 'o|p')
        .replace(/^re(?=[i]\|?[md])/ig, 're|')
        .replace(/^re(?=i\|n[ií]\|c)/ig, 're|')
        .replace(/^re(?=i\|nau\|g)/ig, 're|')
        .replace(/^re(?=[u]\|?[ntsr])/ig, 're|')
        .replace(new RegExp('^vi\\|de\\|o('+vogal+')', 'ig'), 'o|$1')
        .replace(/s\|s$/i, 'ss')
        .replace(/\|\|/g, '\|');
    return sylSep === '|' ? word : word.replace(/\|/g, sylSep);
}

// fitlrar a palvra para array
function separated_to_arr(word_arr){
    var new_word = word_arr.split("|")
    return new_word
}

//recebe a palavra em array e inverte
function invert_arr_word(word_arr){
    var new_arr = []
    var len = word_arr.length
    // alert("Vai quebrar: " + len + word_arr)
    console.log(`via quebrar? ${word_arr}`)
    console.log(len)
    console.log(word_arr)
    for( i=0; i < len; i++ ){
        new_arr[i] = word_arr[len - i - 1]
    }
    console.log("nova palavra: " + new_arr)
    return new_arr
}

//separar silabas
function separate_sylbs(phrase_arr){    
    console.log("separate_sylbs")
    console.log(phrase_arr)

    //passando por cada palavra e separando as silabas
    var new_phrase = ""
    
    // para cada palavra no array...
    for( var i = 0; i < phrase_arr.length; i++){
        
        var new_wordd = ""
        let actual_word = phrase_arr[i];
        let separated_word = syllable(actual_word)
        let inverted_arr = invert_arr_word(separated_to_arr(separated_word))
        // console.log(`Palara invertida?${i}: ${inverted_arr}`)
        console.log("palavra invertidda: ")
        console.log(inverted_arr)
        // #####################

        // ivnertendo a palvra atual
        for( var j = 0; j < inverted_arr.length; j++){
            new_wordd += inverted_arr[j]
        }
        
        console.log("palavra: " + new_wordd)
        new_phrase = new_phrase + " " + new_wordd + " "
        new_phrase = new_phrase.trim()
        
    }
    console.log(`NovaFrase: ${new_phrase}`)
    return new_phrase
}

function get_phrase(side){
    phrase = document.getElementById(side == "l" ? "PT_to_P_input" : "P_to_PT_input")
    return phrase.value
}

// frase para array
function phrase_to_array(phrase){
    return phrase.trim().split(" ")
}

// main_funcion L-side
function PT_to_P(){
    document.getElementById("PT_to_P_output").innerHTML = ""
    
    var phrase = get_phrase("l")
    var phrase_arr = phrase_to_array(phrase)


    var separated_syl = separate_sylbs(phrase_arr)
    document.getElementById("PT_to_P_output").innerHTML = separated_syl

}
// ================================================

// main untranslate  R-side
function P_to_PT(){
    document.getElementById("P_to_PT_output").innerHTML = ""
    
    var phrase = get_phrase("r")
    var phrase_arr = phrase_to_array(phrase)
    
    var separated_syl = separate_sylbs(phrase_arr)

    document.getElementById("P_to_PT_output").innerHTML = separated_syl

}

// Getting l_btn...
var l_btn = document.getElementById("l-btn")
var r_btn = document.getElementById("r-btn")

l_btn.addEventListener("click", PT_to_P)
r_btn.addEventListener("click", P_to_PT)