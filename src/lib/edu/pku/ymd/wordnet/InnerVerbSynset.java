package edu.pku.ymd.wordnet;

interface InnerVerbSynset extends InnerSynset
{
    WordPair[] getAntonyms();
    WordPair[] getDerivationallyRelatedForms();
    WordPair[] getEntailments();
    WordPair[] getHypernyms();
    WordPair[] getOutcomes();
    WordPair[] getPhrases();
    WordPair[] getRegions();
    WordPair[] getTroponyms();
    WordPair[] getVerbGroup();
}
