package edu.pku.ymd.wordnet;

interface Synset
{
    String getDefinition();
    SynsetType getType();
    WordPair[] getWordForms();
}