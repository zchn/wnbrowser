package edu.pku.ymd.wordnet;

class NounWordset extends Wordset implements NounSynset
{
    
    WordSense[] getAntonyms(String wordForm);
    //Returns the antonyms (words with the opposite meaning), if any, associated with a word form in this synset.
    AdjectiveSynset[] getAttributes();
    //Returns adjectives that describes states associated with this noun synset's concept.
    NounSynset[] getHypernyms();
    //Returns the direct hypernyms (superordinate types), if any, of this type.
    NounSynset[] getHyponyms();
    //Returns the direct hyponyms (subordinate type), if any, of this type.
}