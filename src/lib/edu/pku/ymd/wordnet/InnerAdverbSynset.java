package edu.pku.ymd.wordnet;

public interface AdverbSynset extends Synset
{
    WordPair[] getAntonyms();
    WordPair[] getPertainyms(String wordForm);
    WordPair[] getRegions();
}