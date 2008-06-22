package edu.pku.ymd.wordnet;

class Wordset implements Synset
{
    WordPair centerWord;
    String definition;
    SynsetType type;
    String[] usageExample;
    String[] wordForms;

    String getDefinition()
    {
        return definition;
    }
    //Retrieve a short description / definition of this concept.
    SynsetType getType()
    {
        return type;
    }
    //Retrieve the type of synset this object represents.
    String[] getUsageExamples()
    {
        return usageExample;
    }
        //Retrieve sentences showing examples of how this synset is used.
    String[] getWordForms()
    {
        return wordForms;
    }    
}
