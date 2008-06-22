package edu.pku.ymd.wordnet;

class NounWordset extends Wordset implements NounSynset
{
    WordPair[] Antonyms;
    WordPair[] Attributes;
    WordPair[] Hypernyms;
    WordPair[] Hyponyms;
    
    String[] getAntonyms(String wordForm)
    {
        String[] ret = new String[Antonyms.length()];
        for(int i = 0; i < Antonyms.length(); i++){
            ret[i] = Antonyms[i].word;
        }
        return ret;
    }
    //Returns the antonyms (words with the opposite meaning), if any, associated with a word form in this synset.
    String[] getAttributes()        
    {
        String[] ret = new String[Attributes.length()];
        for(int i = 0; i < Attributes.length(); i++){
            ret[i] = Attributes[i].word;
        }
        return ret;
    }
    //Returns adjectives that describes states associated with this noun synset's concept.
    String[] getHypernyms()
    {
        String[] ret = new String[Hypernyms.length()];
        for(int i = 0; i < Hypernyms.length(); i++){
            ret[i] = Hypernyms[i].word;
        }
        return ret;
    }
        
    //Returns the direct hypernyms (superordinate types), if any, of this type.
    String[] getHyponyms()    
    {
        String[] ret = new String[Hyponyms.length()];
        for(int i = 0; i < Hyponyms.length(); i++){
            ret[i] = Hyponyms[i].word;
        }
        return ret;
    }
    //Returns the direct hyponyms (subordinate type), if any, of this type.
}