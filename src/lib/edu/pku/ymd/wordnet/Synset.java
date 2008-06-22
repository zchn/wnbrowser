package edu.pku.ymd.wordnet;

public interface Synset
{
    String getDefinition();
    //Retrieve a short description / definition of this concept.
    SynsetType getType();
    //Retrieve the type of synset this object represents.
    String[] getUsageExamples();
    //Retrieve sentences showing examples of how this synset is used.
    String[] getWordForms();
    //Retrieve the word forms.
}