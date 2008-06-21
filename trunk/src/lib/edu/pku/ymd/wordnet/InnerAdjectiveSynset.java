package edu.pku.ymd.wordnet;

interface AdjectiveSynset extends Synset
{
    WordPair[] getAntonyms();
    WordPair[] getAttributes();
    WordPair getParticiple();
    WordPair[] getPertainyms();
    WordPair[] getRegions();
    WordPair[] getRelated();
    WordPair[] getSimilar();
}