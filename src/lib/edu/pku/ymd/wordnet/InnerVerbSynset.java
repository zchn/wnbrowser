package edu.pku.ymd.wordnet;

interface VerbSynset extends Synset
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