package edu.pku.ymd.wordnet;

interface InnerSynset
{
    String getDefinition();
    SynsetType getType();
    WordPair[] getWordForms();
}
