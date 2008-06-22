package edu.pku.ymd.wordnet;

public interface InnerAdverbSynset extends InnnerSynset
{
    WordPair[] getAntonyms();
    WordPair[] getPertainyms(String wordForm);
    WordPair[] getRegions();
}
