"use strict"

const prompt = require("prompt")
const rand = require("random")
const thesaurus = require("thesaurus")
const pos = require("parts-of-speech")
let sent = new Array()
let topFive = new Array() 
let lexedSent = new Array()

// uses lexer package to lexify the sentence (get parts of speech for
// words in sentence) then call identify() function to replace 
// adjectives with new words
function lexifySentence() {
    prompt.get('sentence', function(err, result) {
        if (err) done()
        else {
            let words = new pos.Lexer().lex(result.sentence)
            let tagger = new pos.Tagger()
            let taggedWords = tagger.tag(words)
            for (var i in taggedWords) {
                let pair = new Array()
                var taggedWord = taggedWords[i];
                var word = taggedWord[0];
                var tag = taggedWord[1];
                pair.push(word)
                pair.push(tag)
                lexedSent.push(pair)
            }
            identify(lexedSent)
            var newSent = sent.join()
            newSent = newSent.replace(/,/g, " ")
            newSent = newSent.replace(".", "")
            newSent = newSent.trim()
            var final = newSent.concat(".")
            console.log(final)
        } 
    })
}

// prints out lexified sentence if error brought up
function done() {
    console.log(lexedSent)
}

// uses thesaurus package to generate synonym for word passed into 
// this function
function newWord(word) {
    let wordList = thesaurus.find(word)
    for (var i = 0; i < 5; i++) {
        topFive.push(wordList[i])
    }
    let randNum = rand.int(0, 5)
    let syn = wordList[randNum]
    return syn
}

// identifies index of word in list that is adjective (if there is one)
// then replaces it with synonym
function identify(lst) {
    for ( var i = 0; i < lst.length; i++) {
        let innerList = lst[i]
        let innerWord = innerList[0]
        let posIdentity = innerList[1]
        if (posIdentity == "JJ") {
            let replacement = newWord(innerWord)
            sent[i] = replacement
        } else {
            sent.push(innerWord)
        }
    }
}

// prompt user to enter in a sentence and call lexify sentence to carry out
// necessary operations
prompt.start()
lexifySentence()