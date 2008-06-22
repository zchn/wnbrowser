package edu.pku.ymd.wordnet

class InnerWordset
{
    WordPair centerWord;
    String definition;
    SynsetType type;
    String[] usageExample;
    WordPair[] wordForms;

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
    WordPair[] getWordForms()
    {
        return wordForms;
    }    
}
