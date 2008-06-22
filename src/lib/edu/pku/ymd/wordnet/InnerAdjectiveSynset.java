package edu.pku.ymd.wordnet;

interface InnerAdjectiveSynset extends InnerSynset
{
    WordPair[] getAntonyms();
    WordPair[] getAttributes();
    WordPair getParticiple();
    WordPair[] getPertainyms();
    WordPair[] getRegions();
    WordPair[] getRelated();
    WordPair[] getSimilar();
}
